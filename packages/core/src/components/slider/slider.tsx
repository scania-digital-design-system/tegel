import { Component, h, Prop, Listen, EventEmitter, Event, Method, Watch } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';

@Component({
  tag: 'tds-slider',
  styleUrl: 'slider.scss',
  shadow: false,
})
export class TdsSlider {
  /** Text for label */
  @Prop() label: string = '';

  /** Initial value */
  @Prop({ mutable: true }) value: string = '0';

  /** Minimum value */
  @Prop() min: string = '0';

  /** Maximum value */
  @Prop() max: string = '100';

  /** Number of tick markers (tick for min- and max-value will be added automatically) */
  @Prop() ticks: string = '0';

  /** Decide to show numbers above the tick markers or not  */
  @Prop() showTickNumbers: boolean = false;

  /** Decide to show the tooltip or not */
  @Prop() tooltip: boolean = false;

  /** Sets the disabled state for the whole component  */
  @Prop() disabled: boolean = false;

  /** Sets the read only state for the whole component  */
  @Prop() readOnly: boolean = false;

  /** Decide to show the controls or not */
  @Prop() controls: boolean = false;

  /** Decide to show the input field or not */
  @Prop() input: boolean = false;

  /** Defines how much to increment/decrement the value when using controls */
  @Prop() step: string = '1';

  /** Name property (will be inherited by the native slider component) */
  @Prop() name: string = '';

  /** Sets the size of the thumb */
  @Prop() thumbSize: 'sm' | 'lg' = 'lg';

  /** Snap to the tick's grid */
  @Prop() snap: boolean = false;

  /** ID for the Slider's input element, randomly generated if not specified. */
  @Prop() sliderId: string = generateUniqueId();

  private wrapperElement: HTMLElement = null;

  private thumbElement: HTMLElement = null;

  private thumbInnerElement: HTMLElement = null;

  private trackElement: HTMLElement = null;

  private trackFillElement: HTMLElement = null;

  private thumbGrabbed: boolean = false;

  private thumbLeft: number = 0;

  private tickValues: Array<number> = [];

  private useControls: boolean = false;

  private useInput: boolean = false;

  private useSmall: boolean = false;

  private useSnapping: boolean = false;

  private supposedValueSlot: number = -1;

  private resizeObserverAdded: boolean = false;

  /** Sends the value of the slider when changed. Fires after mouse up and touch end events. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    value: string;
  }>;

  /** Sends the value of the slider while moving the thumb. Fires on mouse move and touch move events. */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsInput: EventEmitter<{
    value: string;
  }>;

  /** Public method to re-initialise the slider if some configuration props are changed */
  @Method() async reset() {
    this.componentWillLoad();
    this.componentDidLoad();
  }

  @Listen('keydown')
  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
      case '-':
        this.stepLeft(event);
        break;

      case 'ArrowRight':
      case 'ArrowUp':
      case '+':
        this.stepRight(event);
        break;

      default:
        break;
    }
  }

  @Listen('mouseup', { target: 'window' })
  @Listen('touchend', { target: 'window' })
  handleRelease(event: MouseEvent | TouchEvent) {
    if (!this.thumbGrabbed) {
      const clickedOnTrack =
        event.target === this.trackElement || event.target === this.trackFillElement;

      if (clickedOnTrack) {
        this.thumbCore(event);
        this.trackElement.focus();
      }

      return;
    }

    this.thumbGrabbed = false;
    this.thumbInnerElement.classList.remove('pressed');
    this.updateValue(event);

    this.trackElement.focus();
  }

  @Listen('mousemove', { target: 'window' })
  @Listen('touchmove', { target: 'window' })
  handleMove(event: MouseEvent | TouchEvent) {
    if (!this.thumbGrabbed) {
      return;
    }

    this.thumbCore(event);
  }

  @Watch('value')
  handleValueUpdate(newValue: string) {
    this.calculateThumbLeftFromValue(newValue);
    this.value = newValue;
    this.updateTrack();
  }

  private updateSupposedValueSlot(localLeft) {
    const numTicks = parseInt(this.ticks);
    const trackWidth = this.getTrackWidth();
    const distanceBetweenTicks = Math.round(trackWidth / (numTicks + 1));
    const snappedLocalLeft = Math.round(localLeft / distanceBetweenTicks) * distanceBetweenTicks;

    let thumbPositionPX = 0;
    if (snappedLocalLeft >= 0 && snappedLocalLeft <= trackWidth) {
      thumbPositionPX = snappedLocalLeft;
    } else if (snappedLocalLeft > trackWidth) {
      thumbPositionPX = trackWidth;
    } else if (snappedLocalLeft < 0) {
      thumbPositionPX = 0;
    }

    this.supposedValueSlot = Math.round(thumbPositionPX / distanceBetweenTicks);

    return snappedLocalLeft;
  }

  private thumbCore(event) {
    const numTicks = parseInt(this.ticks);
    const trackRect = this.trackElement.getBoundingClientRect();
    let localLeft = 0;
    if (event.type === 'mousemove' || event.type === 'mouseup') {
      localLeft = event.clientX - trackRect.left;
    } else if (event.type === 'touchmove') {
      localLeft = event.touches[0].clientX - trackRect.left;
    } else console.warn('Slider component: Unsupported event!');

    this.supposedValueSlot = -1;

    if (this.useSnapping && numTicks > 0) {
      localLeft = this.updateSupposedValueSlot(localLeft);
    }

    this.thumbLeft = this.constrainThumb(localLeft);
    this.thumbElement.style.left = `${this.thumbLeft}px`;

    this.updateValue(event);
  }

  private updateTrack() {
    const trackWidth = this.getTrackWidth();
    const percentageFilled = (this.thumbLeft / trackWidth) * 100;
    if (this.trackFillElement) {
      this.trackFillElement.style.width = `${percentageFilled}%`;
    }
  }

  private updateValue(event) {
    const trackWidth = this.getTrackWidth();
    const numTicks = parseInt(this.ticks);

    /* if snapping (supposedValueSlot > 0) is enabled, make sure we display the supposed value (instead of maybe getting a -1/+1 depending on rounding)  */
    if (this.useSnapping && numTicks) {
      const supposedValue = this.tickValues[this.supposedValueSlot];
      this.value = `${supposedValue}`;
      this.calculateThumbLeftFromValue(supposedValue);
    } else {
      const percentage = this.thumbLeft / trackWidth;
      this.value = `${Math.trunc(
        parseFloat(this.min) + percentage * (parseFloat(this.max) - parseFloat(this.min)),
      )}`;
    }
    this.updateTrack();

    this.tdsInput.emit({ value: this.value });

    /* Emit event after user has finished dragging the thumb */
    if (event.type === 'touchend' || event.type === 'mouseup') {
      this.tdsChange.emit({ value: this.value });
    }
  }

  private forceValueUpdate(newValue: string) {
    this.calculateThumbLeftFromValue(newValue);
    this.value = newValue;
    this.tdsChange.emit({ value: this.value });
    this.updateTrack();
  }

  private constrainThumb(x: number) {
    const width = this.getTrackWidth();

    if (x < 0) {
      return 0;
    }

    if (x > width) {
      return width;
    }

    return x;
  }

  private getTrackWidth() {
    if (!this.trackElement) {
      return 0;
    }
    const trackRect = this.trackElement.getBoundingClientRect();
    return trackRect.right - trackRect.left;
  }

  private calculateThumbLeftFromValue(value) {
    const initValue = value;
    const trackWidth = this.getTrackWidth();

    const normalizedValue = initValue - parseFloat(this.min);
    const normalizedMax = parseFloat(this.max) - parseFloat(this.min);

    const calculatedLeft = (normalizedValue / normalizedMax) * trackWidth;

    this.thumbLeft = calculatedLeft;
    this.updateSupposedValueSlot(this.thumbLeft);

    if (this.thumbElement) {
      this.thumbElement.style.left = `${this.thumbLeft}px`;
    }
  }

  /** Updates the slider value based on the current input value */
  private updateSliderValueOnInputChange(event: FocusEvent | KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    let newValue = parseInt(inputElement.value);

    // Check if the new value is different from the current value
    if (newValue === parseInt(this.value)) {
      return; // Exit the function if the new value is the same as the current value
    }

    if (newValue < parseFloat(this.min)) {
      newValue = parseFloat(this.min);
    } else if (newValue > parseFloat(this.max)) {
      newValue = parseFloat(this.max);
    }

    this.forceValueUpdate(String(newValue));
  }

  /** Updates the slider value based on the current input value when enter is pressed */
  private handleInputFieldEnterPress(event: KeyboardEvent) {
    event.stopPropagation();
    if (event.key === 'Enter') {
      this.updateSliderValueOnInputChange(event);
      const inputElement = event.target as HTMLInputElement;
      inputElement.blur();
    }
  }

  private grabThumb() {
    if (this.readOnly) {
      return;
    }
    this.thumbGrabbed = true;
    this.thumbInnerElement.classList.add('pressed');
  }

  private calculateInputSizeFromMax() {
    return this.max.length;
  }

  private controlsStep(delta: number, event: KeyboardEvent) {
    if (this.readOnly || this.disabled) {
      return;
    }

    const numTicks = parseInt(this.ticks);

    /* if snapping is enabled, instead just increment or decrement the current "fixed" value from our ticknumber array */
    if (this.useSnapping && numTicks > 0) {
      const stepDir = delta > 0 ? 1 : -1;
      this.supposedValueSlot += stepDir;

      if (this.supposedValueSlot < 0) {
        this.supposedValueSlot = 0;
      } else if (this.supposedValueSlot > numTicks + 1) {
        this.supposedValueSlot = numTicks + 1;
      }
      this.updateValue(event);
    } else {
      const trackWidth = this.getTrackWidth();
      const percentage = this.thumbLeft / trackWidth;

      let currentValue =
        parseFloat(this.min) + percentage * (parseFloat(this.max) - parseFloat(this.min));

      currentValue += delta;
      currentValue = Math.round(currentValue);

      if (currentValue < parseFloat(this.min)) {
        currentValue = parseFloat(this.min);
      } else if (currentValue > parseFloat(this.max)) {
        currentValue = parseFloat(this.max);
      }

      this.value = `${currentValue}`;
      this.forceValueUpdate(this.value);
    }
  }

  private stepLeft(event) {
    this.controlsStep(-parseInt(this.step), event);
  }

  private stepRight(event) {
    this.controlsStep(parseInt(this.step), event);
  }

  componentWillLoad() {
    const numTicks = parseInt(this.ticks);

    if (numTicks > 0) {
      this.tickValues = [parseFloat(this.min)];

      const step = (parseFloat(this.max) - parseFloat(this.min)) / (numTicks + 1);

      for (let i = 1; i < numTicks + 1; i++) {
        this.tickValues.push(parseFloat(this.min) + Math.round(step * i));
      }

      this.tickValues.push(parseFloat(this.max));
    }

    this.useInput = false;
    this.useControls = false;

    if (this.controls) {
      this.useControls = true;
    } else if (this.input) {
      this.useInput = true;
    }

    this.useSmall = this.thumbSize === 'sm';
    this.useSnapping = this.snap;

    const min = parseFloat(this.min);
    const max = parseFloat(this.max);

    if (min > max) {
      console.warn(
        'min-prop must have a higher value than max-prop for the component to work correctly.',
      );
      this.disabled = true;
    }
  }

  componentDidLoad() {
    if (!this.resizeObserverAdded) {
      this.resizeObserverAdded = true;

      const resizeObserver = new ResizeObserver(() => {
        this.calculateThumbLeftFromValue(this.value);
        this.updateTrack();
      });

      resizeObserver.observe(this.wrapperElement);
    }

    this.calculateThumbLeftFromValue(this.value);
    this.updateTrack();
  }

  render() {
    return (
      <div
        class={{
          'tds-slider-wrapper': true,
          'read-only': this.readOnly,
        }}
      >
        <input
          class="tds-slider-native-element"
          type="range"
          name={this.name}
          min={this.min}
          max={this.max}
          value={this.value}
          disabled={this.disabled}
        ></input>

        <div
          class={{
            'tds-slider': true,
            'disabled': this.disabled,
            'tds-slider-small': this.useSmall,
          }}
          ref={(el) => {
            this.wrapperElement = el as HTMLElement;
          }}
        >
          <label class={this.showTickNumbers && 'offset'}>{this.label}</label>

          {this.useInput && (
            <div class="tds-slider__input-values">
              <div class="tds-slider__input-value min-value">{this.min}</div>
            </div>
          )}

          {this.useControls && (
            <div class="tds-slider__controls">
              <div
                class="tds-slider__control tds-slider__control-minus"
                onClick={(event) => this.stepLeft(event)}
              >
                <tds-icon name="minus" size="16px"></tds-icon>
              </div>
            </div>
          )}

          <div class="tds-slider-inner">
            {this.tickValues.length > 0 && (
              <div class="tds-slider__value-dividers-wrapper">
                <div class="tds-slider__value-dividers">
                  {this.tickValues.map((value) => (
                    <div class="tds-slider__value-divider">
                      {this.showTickNumbers && <span>{value}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              class="tds-slider__track"
              ref={(el) => {
                this.trackElement = el as HTMLElement;
              }}
              tabindex={this.disabled ? '-1' : '0'}
            >
              <div
                class="tds-slider__track-fill"
                ref={(el) => {
                  this.trackFillElement = el as HTMLElement;
                }}
              ></div>

              <div
                class="tds-slider__thumb"
                ref={(el) => {
                  this.thumbElement = el as HTMLElement;
                }}
                onMouseDown={() => this.grabThumb()}
                onTouchStart={() => this.grabThumb()}
              >
                {this.tooltip && (
                  <div class="tds-slider__value">
                    {this.value}
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.15882 12.6915L0.990487 1.54076C0.562658 0.875246 1.0405 0 1.83167 0H16.1683C16.9595 0 17.4373 0.875246 17.0095 1.54076L9.84118 12.6915C9.44754 13.3038 8.55246 13.3038 8.15882 12.6915Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                <div
                  class="tds-slider__thumb-inner"
                  ref={(el) => {
                    this.thumbInnerElement = el as HTMLElement;
                  }}
                ></div>
              </div>
            </div>
          </div>

          {this.useInput && (
            <div class="tds-slider__input-values">
              <div class="tds-slider__input-value" onClick={(event) => this.stepLeft(event)}>
                {this.max}
              </div>
              <div class="tds-slider__input-field-wrapper">
                <input
                  size={this.calculateInputSizeFromMax()}
                  class="tds-slider__input-field"
                  value={this.value}
                  readOnly={this.readOnly}
                  onBlur={(event) => this.updateSliderValueOnInputChange(event)}
                  onKeyDown={(event) => this.handleInputFieldEnterPress(event)}
                  type="number"
                  min={this.min}
                  max={this.max}
                />
              </div>
            </div>
          )}

          {this.useControls && (
            <div class="tds-slider__controls">
              <div
                class="tds-slider__control tds-slider__control-plus"
                onClick={(event) => this.stepRight(event)}
              >
                <tds-icon name="plus" size="16px"></tds-icon>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
