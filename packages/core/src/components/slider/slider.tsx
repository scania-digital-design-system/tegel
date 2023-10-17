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

  private minusElement: HTMLElement = null;

  private plusElement: HTMLElement = null;

  private inputElement: HTMLInputElement = null;

  private thumbGrabbed: boolean = false;

  private thumbLeft: number = 0;

  private tickValues: Array<number> = [];

  private useControls: boolean = false;

  private useInput: boolean = false;

  private useSmall: boolean = false;

  private useSnapping: boolean = false;

  private supposedValueSlot: number = -1;

  private eventListenersAdded: boolean = false;

  private resizeObserverAdded: boolean = false;

  /** Sends the value of the slider when changed. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    value: string;
  }>;

  /** Public method to re-initialise the slider if some configuration props are changed */
  @Method() async reset() {
    // @TODO: maybe refactor to use watch-decorators instead
    this.componentWillLoad();
    this.componentDidLoad();
  }

  @Listen('keydown')
  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
      case '-':
        this.stepLeft();
        break;

      case 'ArrowRight':
      case 'ArrowUp':
      case '+':
        this.stepRight();
        break;

      default:
        break;
    }
  }

  @Listen('mouseup', { target: 'window' })
  handleMouseUp() {
    if (!this.thumbGrabbed) {
      return;
    }

    this.thumbGrabbed = false;
    this.thumbInnerElement.classList.remove('pressed');
    this.updateValue();

    this.trackElement.focus();
  }

  @Listen('touchend', { target: 'window' })
  handleTouchEnd() {
    if (!this.thumbGrabbed) {
      return;
    }

    this.thumbGrabbed = false;
    this.thumbInnerElement.classList.remove('pressed');
    this.updateValue();

    this.trackElement.focus();
  }

  @Listen('mousemove', { target: 'window' })
  handleMouseMove(event) {
    if (!this.thumbGrabbed) {
      return;
    }

    this.thumbCore(event);
  }

  @Listen('touchmove', { target: 'window' })
  handleTouchMove(event) {
    event.preventDefault();

    if (!this.thumbGrabbed) {
      return;
    }

    this.thumbCore(event);
  }

  @Watch('value')
  handleValueUpdate(newVal) {
    this.calculateThumbLeftFromValue(newVal);
    this.updateValueForced(newVal);
    this.updateTrack();
  }

  updateSupposedValueSlot(localLeft) {
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

  thumbCore(event) {
    const numTicks = parseInt(this.ticks);
    const trackRect = this.trackElement.getBoundingClientRect();
    let localLeft = 0;
    if (event.type === 'mousemove') {
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

    this.updateValue();
  }

  updateTrack() {
    const trackWidth = this.getTrackWidth();
    const percentageFilled = (this.thumbLeft / trackWidth) * 100;
    this.trackFillElement.style.width = `${percentageFilled}%`;
  }

  dispatchChangeEvent() {
    this.tdsChange.emit({ value: this.value });
  }

  updateValue() {
    const trackWidth = this.getTrackWidth();
    const numTicks = parseInt(this.ticks);

    /* if snapping (supposedValueSlot > 0) is enabled, make sure we display the supposed value (instead of maybe getting a -1/+1 depending on rounding)  */
    if (this.useSnapping && numTicks) {
      const supposedValue = this.tickValues[this.supposedValueSlot];
      this.value = `${supposedValue}`;
      this.calculateThumbLeftFromValue(supposedValue);
    } else {
      const percentage = this.thumbLeft / trackWidth;
      this.value = `${Math.trunc(this.getMin() + percentage * (this.getMax() - this.getMin()))}`;
    }
    this.updateTrack();
    this.dispatchChangeEvent();
  }

  updateValueForced(value) {
    this.value = value;
    this.dispatchChangeEvent();
  }

  getMin() {
    return parseFloat(this.min);
  }

  getMax() {
    return parseFloat(this.max);
  }

  constrainThumb(x) {
    const width = this.getTrackWidth();

    if (x < 0) {
      return 0;
    }

    if (x > width) {
      return width;
    }

    return x;
  }

  getTrackWidth() {
    const trackRect = this.trackElement.getBoundingClientRect();
    return trackRect.right - trackRect.left;
  }

  calculateThumbLeftFromValue(value) {
    const initValue = value;
    const trackWidth = this.getTrackWidth();

    const normalizedValue = initValue - this.getMin();
    const normalizedMax = this.getMax() - this.getMin();

    const calculatedLeft = (normalizedValue / normalizedMax) * trackWidth;

    this.thumbLeft = calculatedLeft;
    this.updateSupposedValueSlot(this.thumbLeft);

    this.thumbElement.style.left = `${this.thumbLeft}px`;
  }

  componentDidLoad() {
    if (!this.resizeObserverAdded) {
      this.resizeObserverAdded = true;

      const resizeObserver = new ResizeObserver((/* entries */) => {
        this.calculateThumbLeftFromValue(this.value);
        this.updateTrack();
      });

      resizeObserver.observe(this.wrapperElement);
    }

    if (!this.eventListenersAdded) {
      this.eventListenersAdded = true;

      this.thumbElement.addEventListener('mousedown', (event) => {
        event.preventDefault();
        this.grabThumb();
      });

      this.thumbElement.addEventListener('touchstart', () => {
        this.grabThumb();
      });

      if (this.useControls) {
        this.minusElement.addEventListener('click', () => {
          this.stepLeft();
        });

        this.plusElement.addEventListener('click', () => {
          this.stepRight();
        });
      }

      if (this.inputElement) {
        this.inputElement.addEventListener('keydown', (event) => {
          event.stopPropagation();

          if (event.key === 'Enter') {
            this.updateSliderValueOnInputChange();
            this.inputElement.blur();
          }
        });
      }
    }

    this.calculateThumbLeftFromValue(this.value);
    this.updateTrack();
  }

  /** Updates the slider value based on the current input value */
  private updateSliderValueOnInputChange() {
    let newValue = parseInt(this.inputElement.value);

    if (newValue < this.getMin()) {
      newValue = this.getMin();
    } else if (newValue > this.getMax()) {
      newValue = this.getMax();
    }

    this.calculateThumbLeftFromValue(newValue);
    this.updateValueForced(newValue);
    this.updateTrack();
  }

  grabThumb() {
    if (this.readOnly) {
      return;
    }
    this.thumbGrabbed = true;
    this.thumbInnerElement.classList.add('pressed');
  }

  calculateInputSizeFromMax() {
    return this.max.length;
  }

  controlsStep(delta) {
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
      this.updateValue();
    } else {
      const trackWidth = this.getTrackWidth();
      const percentage = this.thumbLeft / trackWidth;

      let currentValue = this.getMin() + percentage * (this.getMax() - this.getMin());

      currentValue += delta;
      currentValue = Math.round(currentValue);

      if (currentValue < this.getMin()) {
        currentValue = this.getMin();
      } else if (currentValue > this.getMax()) {
        currentValue = this.getMax();
      }

      this.value = `${currentValue}`;
      this.calculateThumbLeftFromValue(this.value);
      this.updateValueForced(currentValue);
      this.updateTrack();
    }
  }

  stepLeft() {
    this.controlsStep(-parseInt(this.step));
  }

  stepRight() {
    this.controlsStep(parseInt(this.step));
  }

  componentWillLoad() {
    const numTicks = parseInt(this.ticks);

    if (numTicks > 0) {
      this.tickValues = [this.getMin()];

      const step = (this.getMax() - this.getMin()) / (numTicks + 1);

      for (let i = 1; i < numTicks + 1; i++) {
        this.tickValues.push(this.getMin() + Math.round(step * i));
      }

      this.tickValues.push(this.getMax());
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

    const min = this.getMin();
    const max = this.getMax();

    if (min > max) {
      console.warn(
        'min-prop must have a higher value than max-prop for the component to work correctly.',
      );
      this.disabled = true;
    }
  }

  render() {
    return (
      <div class={`tds-slider-wrapper ${this.readOnly ? 'read-only' : ''}`}>
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
              <div
                ref={(el) => {
                  this.minusElement = el as HTMLElement;
                }}
                class="tds-slider__input-value min-value"
              >
                {this.min}
              </div>
            </div>
          )}

          {this.useControls && (
            <div class="tds-slider__controls">
              <div
                ref={(el) => {
                  this.minusElement = el as HTMLElement;
                }}
                class="tds-slider__control tds-slider__control-minus"
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
              <div
                ref={(el) => {
                  this.minusElement = el as HTMLElement;
                }}
                class="tds-slider__input-value"
              >
                {this.max}
              </div>
              <div class="tds-slider__input-field-wrapper">
                <input
                  onFocus={(e) => {
                    if (this.readOnly) {
                      e.preventDefault();
                      this.inputElement.blur();
                    }
                  }}
                  size={this.calculateInputSizeFromMax()}
                  class="tds-slider__input-field"
                  value={this.value}
                  ref={(el) => {
                    this.inputElement = el as HTMLInputElement;
                  }}
                  onBlur={() => this.updateSliderValueOnInputChange()}
                />
              </div>
            </div>
          )}

          {this.useControls && (
            <div class="tds-slider__controls">
              <div
                ref={(el) => {
                  this.plusElement = el as HTMLElement;
                }}
                class="tds-slider__control tds-slider__control-plus"
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
