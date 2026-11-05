import {
  Component,
  h,
  Prop,
  Listen,
  EventEmitter,
  Event,
  Method,
  Watch,
  Element,
  State,
} from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';

@Component({
  tag: 'tds-slider',
  styleUrl: 'slider.scss',
  shadow: false,
})
export class TdsSlider {
  @Element() host!: HTMLElement;

  /** Text for label */
  @Prop({ reflect: true }) label: string = '';

  /** Slider type */
  @Prop({ reflect: true }) type: 'standard' | 'reverse' | 'range' = 'standard';

  /** Initial value for the standard/reverse slider */
  @Prop({ reflect: true, mutable: true }) value: string = '0';

  /** Initial left value for the range slider */
  @Prop({ reflect: true, mutable: true }) leftValue: string = '0';

  /** Initial right value for the range slider */
  @Prop({ reflect: true, mutable: true }) rightValue: string = '10';

  /** Minimum limit */
  @Prop({ reflect: true }) min: string = '0';

  /** Maximum limit */
  @Prop({ reflect: true }) max: string = '100';

  /** Number of tick markers (tick for min- and max-value will be added automatically) */
  @Prop({ reflect: true }) ticks: string = '0';

  /** Decide to show numbers above the tick markers or not  */
  @Prop({ reflect: true }) showTickNumbers: boolean = false;

  /** @deprecated Deprecated, use tooltipMode instead. */
  @Prop({ reflect: true }) tooltip: boolean = false;

  /** Defines how/when to show the tooltip. If type is range, controls when the tooltip is shown on both thumbs */
  @Prop({ reflect: true }) tooltipMode: 'hover' | 'press' | 'always' | 'never' = 'never';

  /** Sets the disabled state for the whole component  */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Sets the read only state for the whole component  */
  @Prop({ reflect: true }) readOnly: boolean = false;

  /** Decide to show the controls or not. Not compatible with input nor the range slider */
  @Prop({ reflect: true }) controls: boolean = false;

  /** Decide to show the input field or not. Not compatible with controls */
  @Prop({ reflect: true }) input: boolean = false;

  /** Defines how much to increment/decrement the value when using controls */
  @Prop({ reflect: true }) step: string = '1';

  /** Name property (will be inherited by the native slider component) */
  @Prop({ reflect: true }) name: string = '';

  /** Sets the size of the thumb */
  @Prop({ reflect: true }) thumbSize: 'sm' | 'lg' = 'lg';

  /** Snap to the tick's grid */
  @Prop({ reflect: true }) snap: boolean = false;

  /** Sets the aria-label for the slider control. */
  @Prop({ reflect: true }) tdsAriaLabel: string = '';

  /** ID for the Slider's input element, randomly generated if not specified. */
  @Prop({ reflect: true }) sliderId: string = generateUniqueId();

  /** Sets the read only aria label for the input field */
  @Prop({ reflect: true }) tdsReadOnlyAriaLabel: string = '';

  @State() private tooltipControl = false;

  @State() private tooltipControlRight = false;

  /** This can refer to the thumb element for the standard/reverse slider or the left thumb element for the range slider */
  @State() private leftThumbGrabbed: boolean = false;

  /** This is only used for the range slider and it refers to the right thumb */
  @State() private rightThumbGrabbed: boolean = false;

  private wrapperElement: HTMLElement | null = null;

  /** This can be the thumb element for the standard/reverse slider or the left thumb element for the range slider */
  private leftThumbElement: HTMLElement | null = null;

  /** This is only used for the range slider and it corresponds to the right thumb element */
  private rightThumbElement: HTMLElement | null = null;

  // /** This can be the thumb inner element for the standard/reverse slider or the left thumb inner element for the range slider */
  // private leftThumbInnerElement: HTMLElement | null = null;

  // /** This is only used for the range slider and it corresponds to the right thumb inner element */
  // private rightThumbInnerElement: HTMLElement | null = null;

  private trackElement: HTMLElement | null = null;

  private trackFillElement: HTMLElement | null = null;

  /** This can refer to the thumb element for the standard/reverse slider or the left thumb element for the range slider. It's the distance from the left border of the track to the thumb */
  private thumbLeftLeft: number = 0;

  /** This is only used for the range slider and it refers to the right thumb. It's the distance from the left border of the track to the thumb */
  private thumbLeftRight: number = 0;

  private tickValues: Array<number> = [];

  private useControls: boolean = false;

  private useInput: boolean = false;

  private useSmall: boolean = false;

  private useSnapping: boolean = false;

  private supposedValueSlot: number = -1;

  private supposedValueSlotRight: number = -1;

  private resizeObserverAdded: boolean = false;

  private initialLeftValue: string = '0';

  private initialRightValue: string = '100';

  private resetEventListenerAdded: boolean = false;

  private formElement: HTMLFormElement | null = null;

  private ariaLiveElement: HTMLElement | null = null;

  private roundToStep(val: number): number {
    const stepNum = parseFloat(this.step);
    if (!stepNum) {
      return parseFloat(val.toFixed());
    }
    const rounded = Math.round(val / stepNum) * stepNum;
    const precision = (stepNum.toString().split('.')[1] || '').length;
    return parseFloat(rounded.toFixed(precision));
  }

  private roundToTick(val: number, right: boolean): number {
    if (this.tickValues.length < 1) {
      return val;
    }
    const tick = this.tickValues[1] - this.tickValues[0];
    let rounded = Math.round(val / tick) * tick;

    if (this.type === 'range') {
      if (right && rounded < Number(this.leftValue)) {
        rounded += tick;
      } else if (!right && rounded > Number(this.rightValue)) {
        rounded -= tick;
      }
    }

    const precision = (tick.toString().split('.')[1] || '').length;
    return parseFloat(rounded.toFixed(precision));
  }

  /** Sends the value of the slider when changed. Fires after mouse up and touch end events. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsChange!: EventEmitter<{
    value: string;
    rightValue?: string;
  }>;

  /** Sends the value of the slider while moving the thumb. Fires on mouse move and touch move events. */
  @Event({
    eventName: 'tdsInput',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsInput!: EventEmitter<{
    value: string;
    rightValue?: string;
  }>;

  /** Public method to re-initialise the slider if some configuration props are changed */
  @Method() async reset() {
    this.componentWillLoad();
    this.componentDidLoad();
  }

  @Listen('keydown')
  handleKeydown(event) {
    const target = event.target as HTMLElement;
    const right = target.id === `${'right-thumb-' + this.sliderId}`;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
      case '-':
        this.stepLeft(event);
        this.announceValueChange(right);
        break;

      case 'ArrowRight':
      case 'ArrowUp':
      case '+':
        this.stepRight(event);
        this.announceValueChange(right);
        break;

      case 'Home':
        this.setToMinValue();
        this.announceValueChange(false);
        break;

      case 'End':
        this.setToMaxValue();
        this.announceValueChange(this.type === 'range');
        break;

      default:
        break;
    }
  }

  @Listen('mouseup', { target: 'window' })
  @Listen('touchend', { target: 'window' })
  handleRelease(event: MouseEvent | TouchEvent) {
    if (!this.leftThumbGrabbed && !this.rightThumbGrabbed) {
      const clickedOnTrack =
        event.target === this.trackElement || event.target === this.trackFillElement;

      if (clickedOnTrack) {
        this.thumbCore(event, false);
      }

      return;
    }

    if (this.leftThumbGrabbed) {
      this.leftThumbGrabbed = false;
      this.updateValue(event, false);
      if (this.tooltipMode === 'press') this.tooltipControl = false;
    }

    if (this.rightThumbGrabbed) {
      this.rightThumbGrabbed = false;
      this.updateValue(event, true);
      if (this.tooltipMode === 'press') this.tooltipControlRight = false;
    }
  }

  @Listen('mousemove', { target: 'window' })
  @Listen('touchmove', { target: 'window' })
  handleMove(event: MouseEvent | TouchEvent) {
    if (!this.leftThumbGrabbed && !this.rightThumbGrabbed) {
      return;
    }

    let right = true;
    if (this.leftThumbGrabbed) {
      right = false;
    }

    this.thumbCore(event, right);
  }

  @Watch('tooltip')
  handleTooltipUpdate(newValue: boolean) {
    if (newValue) {
      this.tooltipMode = 'always';
    } else {
      this.tooltipMode = 'never';
    }
  }

  @Watch('value')
  handleValueUpdate(newValue: string) {
    this.calculateThumbLeftFromValue(newValue, false);
    this.value = newValue;
    this.updateTrack();
  }

  @Watch('leftValue')
  handleLeftValueUpdate(newValue: string) {
    this.calculateThumbLeftFromValue(newValue, false);
    this.leftValue = newValue;
    this.updateTrack();
  }

  @Watch('rightValue')
  handleRightValueUpdate(newValue: string) {
    this.calculateThumbLeftFromValue(newValue, true);
    this.rightValue = newValue;
    this.updateTrack();
  }

  private setToMinValue() {
    if (this.readOnly || this.disabled) {
      return;
    }
    this.forceValueUpdate(this.min, false);
  }

  private setToMaxValue() {
    if (this.readOnly || this.disabled) {
      return;
    }
    this.forceValueUpdate(this.max, true);
  }

  private updateSupposedValueSlot(localLeft, right: boolean) {
    const numTicks = parseInt(this.ticks);
    const trackWidth = this.getTrackWidth();
    const distanceBetweenTicks = Math.round(trackWidth / (numTicks + 1));
    const snappedLocalLeft = Math.round(localLeft / distanceBetweenTicks) * distanceBetweenTicks;

    let minNum = 0;
    let maxNum = trackWidth;
    if (this.type === 'range') {
      // if the closest tick to each of the thumbs is the same and they are both to the left or to the right of the tick, then they can only move away from each other
      if (
        this.supposedValueSlot === this.supposedValueSlotRight &&
        (Number(this.leftValue) - this.tickValues[this.supposedValueSlot]) *
          (Number(this.rightValue) - this.tickValues[this.supposedValueSlotRight]) >=
          0
      ) {
        if (right && localLeft < this.thumbLeftRight) {
          return this.thumbLeftRight;
        } else if (!right && localLeft > this.thumbLeftLeft) {
          return this.thumbLeftLeft;
        }
      }
      if (right) {
        minNum =
          (Number(this.leftValue) - this.tickValues[this.supposedValueSlot] > 0
            ? this.supposedValueSlot + 1
            : this.supposedValueSlot) * distanceBetweenTicks;
      } else {
        maxNum =
          (Number(this.rightValue) - this.tickValues[this.supposedValueSlotRight] < 0
            ? this.supposedValueSlotRight - 1
            : this.supposedValueSlotRight) * distanceBetweenTicks;
      }
    }

    let thumbPositionPX = 0;
    if (snappedLocalLeft >= minNum && snappedLocalLeft <= maxNum) {
      thumbPositionPX = snappedLocalLeft;
    } else if (snappedLocalLeft > maxNum) {
      thumbPositionPX = maxNum;
    } else if (snappedLocalLeft < minNum) {
      thumbPositionPX = minNum;
    }

    if (right) {
      this.supposedValueSlotRight = Math.round(thumbPositionPX / distanceBetweenTicks);
    } else {
      this.supposedValueSlot = Math.round(thumbPositionPX / distanceBetweenTicks);
    }

    return snappedLocalLeft;
  }

  private thumbCore(event, right: boolean) {
    const numTicks = parseInt(this.ticks);
    const trackRect = this.trackElement?.getBoundingClientRect();
    if (!trackRect) return;

    let localLeft = 0;
    if (event.type === 'mousemove' || event.type === 'mouseup') {
      localLeft = event.clientX - trackRect.left;
    } else if (event.type === 'touchmove') {
      localLeft = event.touches[0].clientX - trackRect.left;
    } else console.warn('Slider component: Unsupported event!');

    let isRight = right;
    // If there is a click on the track to the right of the right thumb, then we move the right one. Every other click moves the left one
    // If we are dragging, the "right" boolean is passed correctly and there is no need to overwrite it
    if (!this.leftThumbGrabbed && !this.rightThumbGrabbed && localLeft > this.thumbLeftRight) {
      isRight = true;
    }
    if (isRight) {
      this.supposedValueSlotRight = -1;
    } else {
      this.supposedValueSlot = -1;
    }

    if (this.useSnapping && numTicks > 0) {
      localLeft = this.updateSupposedValueSlot(localLeft, isRight);
    }
    if (isRight) {
      this.thumbLeftRight = this.constrainThumb(localLeft, isRight);
      if (this.rightThumbElement) {
        this.rightThumbElement.style.left = `${this.thumbLeftRight}px`;
      }
      this.rightThumbElement?.focus();
    } else {
      this.thumbLeftLeft = this.constrainThumb(localLeft, isRight);
      if (this.leftThumbElement) {
        this.leftThumbElement.style.left = `${this.thumbLeftLeft}px`;
      }
      this.leftThumbElement?.focus();
    }

    this.updateValue(event, isRight);
  }

  private updateTrack() {
    const trackWidth = this.getTrackWidth();
    const percentageFilled = (this.thumbLeftLeft / trackWidth) * 100;
    if (this.trackFillElement) {
      switch (this.type) {
        case 'reverse': {
          this.trackFillElement.style.width = `${100 - percentageFilled}%`;
          this.trackFillElement.style.left = 'unset';
          this.trackFillElement.style.right = '0';
          break;
        }
        case 'range': {
          const percentageFilledEnd = 100 - (this.thumbLeftRight / trackWidth) * 100;
          this.trackFillElement.style.left = `${percentageFilled}%`;
          this.trackFillElement.style.right = `${percentageFilledEnd}%`;
          this.trackFillElement.style.width = 'auto';
          break;
        }
        case 'standard':
        default: {
          this.trackFillElement.style.width = `${percentageFilled}%`;
          this.trackFillElement.style.left = '0';
          this.trackFillElement.style.right = 'unset';
        }
      }
    }
  }

  private announcementDebounceTimeout!: NodeJS.Timeout;

  private announceValueChange(right: boolean) {
    if (!this.ariaLiveElement) return;

    // Debounce announcements to prevent too many rapid announcements
    clearTimeout(this.announcementDebounceTimeout);
    this.announcementDebounceTimeout = setTimeout(() => {
      if (!this.ariaLiveElement) return;
      this.ariaLiveElement.textContent = `${this.label ? this.label + ' ' : ''}${right ? this.rightValue : this.type === 'range' ? this.leftValue : this.value} of ${
        this.max
      }`;
    }, 50);
  }
  private updateValue(event, right: boolean) {
    const trackWidth = this.getTrackWidth();
    const min = parseFloat(this.min);
    const max = parseFloat(this.max);

    if (right) {
      if (this.useSnapping && this.supposedValueSlotRight >= 0) {
        const snappedValue = this.tickValues[this.supposedValueSlotRight];
        this.rightValue = snappedValue.toString();
        this.calculateThumbLeftFromValue(snappedValue, true);
      } else {
        const percentage = this.thumbLeftRight / trackWidth;
        const calculatedValue = min + percentage * (max - min);
        this.rightValue = this.roundToStep(calculatedValue).toString();
      }

      this.updateElementsAfterValueUpdate(event, true, this.rightValue);
    } else {
      // If snapping is enabled and a valid supposedValueSlot is available,
      // snap the value to the closest tick. Use the snapped value to update
      // the slider's thumb position and internal value.
      if (this.useSnapping && this.supposedValueSlot >= 0) {
        const snappedValue = this.tickValues[this.supposedValueSlot];
        if (this.type === 'range') {
          this.leftValue = snappedValue.toString();
        } else {
          this.value = snappedValue.toString();
        }
        this.calculateThumbLeftFromValue(snappedValue, false);
      } else {
        const percentage = this.thumbLeftLeft / trackWidth;
        const calculatedValue = min + percentage * (max - min);
        if (this.type === 'range') {
          this.leftValue = this.roundToStep(calculatedValue).toString();
        } else {
          this.value = this.roundToStep(calculatedValue).toString();
        }
      }
      this.updateElementsAfterValueUpdate(
        event,
        false,
        this.type === 'range' ? this.leftValue : this.value,
      );
    }
  }
  // Follow up to updateValue, to be used for all: value, leftValue and RightValue
  private updateElementsAfterValueUpdate(event, right: boolean, value: string) {
    this.updateTrack();
    // Update ARIA attributes
    if (right && this.rightThumbElement) {
      this.rightThumbElement.setAttribute('aria-valuenow', value);
      this.rightThumbElement.setAttribute('aria-valuetext', `${value} of ${this.max}`);
    }
    if (!right && this.leftThumbElement) {
      this.leftThumbElement.setAttribute('aria-valuenow', value);
      this.leftThumbElement.setAttribute('aria-valuetext', `${value} of ${this.max}`);
    }

    if (this.type === 'range') {
      this.tdsInput.emit({ value: this.leftValue, rightValue: this.rightValue });
    } else {
      this.tdsInput.emit({ value });
    }

    /* Emit event after user has finished dragging the thumb */
    if (event.type === 'touchend' || event.type === 'mouseup') {
      if (this.type === 'range') {
        this.tdsChange.emit({ value: this.leftValue, rightValue: this.rightValue });
      } else {
        this.tdsChange.emit({ value });
      }
      this.announceValueChange(right);
    }
  }

  private forceValueUpdate(newValue: string, right: boolean) {
    this.calculateThumbLeftFromValue(newValue, right);
    // Update ARIA attributes
    if (right) {
      this.rightValue = newValue;
      if (this.rightThumbElement) {
        this.rightThumbElement.setAttribute('aria-valuenow', this.rightValue);
        this.rightThumbElement.setAttribute('aria-valuetext', `${this.rightValue} of ${this.max}`);
      }
    } else if (this.leftThumbElement) {
      if (this.type === 'range') {
        this.leftValue = newValue;
      } else {
        this.value = newValue;
      }
      this.leftThumbElement.setAttribute('aria-valuenow', newValue);
      this.leftThumbElement.setAttribute('aria-valuetext', `${newValue}`);
    }

    if (this.type === 'range') {
      this.tdsChange.emit({ value: this.leftValue, rightValue: this.rightValue });
    } else {
      this.tdsChange.emit({ value: this.value });
    }
    this.updateTrack();
    this.announceValueChange(right);
  }

  private constrainThumb(x: number, right: boolean) {
    const width = this.getTrackWidth();

    if (this.type === 'range') {
      if (right && x <= this.thumbLeftLeft) {
        return this.thumbLeftLeft;
      }
      if (!right && x >= this.thumbLeftRight) {
        return this.thumbLeftRight;
      }
    }
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

  // Calculates the position of the thumb on the track
  // Since it receives the value in the argument, it can be used for the left or right thumb, depending on the "right" boolean parameter
  private calculateThumbLeftFromValue(value, right: boolean) {
    const initValue = value;
    const trackWidth = this.getTrackWidth();

    const normalizedValue = initValue - parseFloat(this.min);
    const normalizedMax = parseFloat(this.max) - parseFloat(this.min);

    const calculatedLeft = (normalizedValue / normalizedMax) * trackWidth;

    if (right) {
      this.thumbLeftRight = calculatedLeft;
      this.updateSupposedValueSlot(calculatedLeft, true);
      if (this.rightThumbElement) {
        this.rightThumbElement.style.left = `${this.thumbLeftRight}px`;
        this.rightThumbElement.setAttribute('aria-valuenow', this.rightValue);
      }
    } else {
      this.thumbLeftLeft = calculatedLeft;
      this.updateSupposedValueSlot(this.thumbLeftLeft, false);
      if (this.leftThumbElement) {
        this.leftThumbElement.style.left = `${this.thumbLeftLeft}px`;
        this.leftThumbElement.setAttribute(
          'aria-valuenow',
          this.type === 'range' ? this.leftValue : this.value,
        );
      }
    }
  }

  /** Updates the slider value based on the current input value */
  private updateSliderValueOnInputChange(event: FocusEvent | KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const name = inputElement.name;
    const numTicks = parseInt(this.ticks);

    let newValue = parseFloat(inputElement.value);

    // Check if the new value is different from the current value
    if (
      newValue ===
      parseFloat(
        name === 'right-value-input'
          ? this.rightValue
          : name === 'left-value-input'
            ? this.leftValue
            : this.value,
      )
    ) {
      return; // Exit the function if the new value is the same as the current value
    }

    const minNum = parseFloat(name === 'right-value-input' ? this.leftValue : this.min);
    const maxNum = parseFloat(name === 'left-value-input' ? this.rightValue : this.max);

    if (newValue < minNum) {
      newValue = minNum;
    } else if (newValue > maxNum) {
      newValue = maxNum;
    }
    let rounded = this.roundToStep(newValue);
    if (this.useSnapping && numTicks > 0) {
      rounded = this.roundToTick(newValue, name === 'right-value-input');
    }
    this.forceValueUpdate(rounded.toString(), name === 'right-value-input');
  }

  /** Updates the slider value when using tds-text-field (reads value from host element) */
  private updateSliderValueFromTextField(event: CustomEvent) {
    const hostEl = event.target as HTMLTdsTextFieldElement; // tds-text-field host element exposes a value prop
    const name = hostEl.name;
    const raw = hostEl && typeof hostEl.value !== 'undefined' ? hostEl.value : '';
    let newValue = parseFloat(raw);
    const numTicks = parseInt(this.ticks);

    if (Number.isNaN(newValue)) {
      return;
    }

    const minNum = parseFloat(name === 'right-value-input' ? this.leftValue : this.min);
    const maxNum = parseFloat(name === 'left-value-input' ? this.rightValue : this.max);

    if (newValue < minNum) {
      newValue = minNum;
    } else if (newValue > maxNum) {
      newValue = maxNum;
    }

    let rounded = this.roundToStep(newValue);
    if (this.useSnapping && numTicks > 0) {
      rounded = this.roundToTick(newValue, name === 'right-value-input');
    }
    this.forceValueUpdate(rounded.toString(), name === 'right-value-input');
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

  private grabThumb(right: boolean) {
    if (this.readOnly) {
      return;
    }
    if (right) {
      this.rightThumbGrabbed = true;
      if (this.tooltipMode === 'press') {
        this.tooltipControlRight = true;
      }
    } else {
      this.leftThumbGrabbed = true;
      if (this.tooltipMode === 'press') {
        this.tooltipControl = true;
      }
    }
  }

  private calculateInputSizeFromMax() {
    const inputs = this.host.querySelectorAll('tds-text-field input[type="number"]');
    for (const input of inputs) {
      if (input) {
        if (this.readOnly) {
          // explicit size to fit suffix icon
          (input as HTMLElement).style.width = `${52 + this.max.length * 8}px`;
        } else {
          input.setAttribute('size', `${this.max.length}`);
        }
      }
    }
  }

  private manageStepWithSnap(
    event,
    supposedSlotVarName: string,
    value: string,
    minNum: number,
    maxNum: number,
    stepDir: number,
  ) {
    if (this.tickValues.includes(Number(value))) {
      this[supposedSlotVarName] += stepDir;
    } else if (
      (this.tickValues[this[supposedSlotVarName]] < Number(value) && stepDir > 0) ||
      (this.tickValues[this[supposedSlotVarName]] >= Number(value) && stepDir < 0)
    ) {
      this[supposedSlotVarName] += stepDir;
    }

    if (this[supposedSlotVarName] < minNum) {
      this[supposedSlotVarName] = minNum;
    } else if (this[supposedSlotVarName] > maxNum) {
      this[supposedSlotVarName] = maxNum;
    }
    this.updateValue(event, supposedSlotVarName === 'supposedValueSlotRight');
  }

  private controlsStep(delta: number, event: KeyboardEvent) {
    if (this.readOnly || this.disabled) {
      return;
    }

    const target = event.target as HTMLElement;
    const right = target.id === `${'right-thumb-' + this.sliderId}`;
    const numTicks = parseInt(this.ticks);

    /* if snapping is enabled, instead just increment or decrement the current "fixed" value from our ticknumber array */
    if (this.useSnapping && numTicks > 0) {
      const stepDir = delta > 0 ? 1 : -1;

      //simple case - works for stamdard and reverse slider
      let minNum = 0;
      let maxNum = numTicks + 1;
      if (!right && this.type !== 'range') {
        this.manageStepWithSnap(event, 'supposedValueSlot', this.value, minNum, maxNum, stepDir);
      } else {
        // if the closest tick to each of the thumbs is the same and they are both to the left or to the right of the tick, then they can only move away from each other
        if (
          this.supposedValueSlot === this.supposedValueSlotRight &&
          (Number(this.leftValue) - this.tickValues[this.supposedValueSlot]) *
            (Number(this.rightValue) - this.tickValues[this.supposedValueSlotRight]) > // if 50-50 remove the =
            0
        ) {
          if ((right && stepDir < 0) || (!right && stepDir > 0)) {
            return;
          }
        }
        if (right) {
          minNum =
            Number(this.leftValue) - this.tickValues[this.supposedValueSlot] > 0 // if 50-50 remove the =
              ? this.supposedValueSlot + 1
              : this.supposedValueSlot;
          this.manageStepWithSnap(
            event,
            'supposedValueSlotRight',
            this.rightValue,
            minNum,
            maxNum,
            stepDir,
          );
        } else {
          maxNum =
            Number(this.rightValue) - this.tickValues[this.supposedValueSlotRight] < 0 // if 50-50 remove the =
              ? this.supposedValueSlotRight - 1
              : this.supposedValueSlotRight;
          this.manageStepWithSnap(
            event,
            'supposedValueSlot',
            this.leftValue,
            minNum,
            maxNum,
            stepDir,
          );
        }
      }
    } else {
      const trackWidth = this.getTrackWidth();
      const percentage = (right ? this.thumbLeftRight : this.thumbLeftLeft) / trackWidth;

      let currentValue =
        parseFloat(this.min) + percentage * (parseFloat(this.max) - parseFloat(this.min));

      currentValue += delta;
      currentValue = this.roundToStep(currentValue);
      const minNum = right ? parseFloat(this.leftValue) : parseFloat(this.min);
      const maxNum =
        target.id === `${'left-thumb-' + this.sliderId}`
          ? parseFloat(this.rightValue)
          : parseFloat(this.max);

      if (currentValue < minNum) {
        currentValue = minNum;
      } else if (currentValue > maxNum) {
        currentValue = maxNum;
      }

      if (right) {
        this.rightValue = `${currentValue}`;
      } else if (this.type === 'range') {
        this.leftValue = `${currentValue}`;
      } else {
        this.value = `${currentValue}`;
      }

      this.forceValueUpdate(`${currentValue}`, right);
    }
  }

  private stepLeft(event) {
    this.controlsStep(-parseFloat(this.step), event);
  }

  private stepRight(event) {
    this.controlsStep(parseFloat(this.step), event);
  }

  private resetToInitialValue = () => {
    this.forceValueUpdate(this.initialLeftValue, false);
    if (this.type === 'range') {
      this.forceValueUpdate(this.initialRightValue, true);
    }
    this.reset();
  };

  componentWillLoad() {
    if (this.readOnly && !this.tdsReadOnlyAriaLabel) {
      console.warn('tds-slider: tdsReadOnlyAriaLabel is recommended when readonly is true');
    }

    const numTicks = parseInt(this.ticks);

    if (numTicks > 0) {
      this.tickValues = [parseFloat(this.min)];

      const interval = (parseFloat(this.max) - parseFloat(this.min)) / (numTicks + 1);
      const precision = (parseFloat(this.step).toString().split('.')[1] || '').length;

      for (let i = 1; i <= numTicks; i++) {
        const raw = parseFloat(this.min) + interval * i;
        this.tickValues.push(parseFloat(raw.toFixed(precision)));
      }

      this.tickValues.push(parseFloat(this.max));
    }

    this.useInput = false;
    this.useControls = false;

    if (this.type !== 'range' && this.controls) {
      this.useControls = true;
    } else if (this.input) {
      this.useInput = true;
    }

    // Deprecated: To be removed once tooltip prop is deleted
    if (this.tooltip) {
      this.tooltipMode = 'always';
    }

    if (this.tooltipMode === 'always') {
      this.tooltipControl = true;
      this.tooltipControlRight = true;
    }

    this.useSmall = this.thumbSize === 'sm';
    this.useSnapping = this.snap;

    const min = parseFloat(this.min);
    const max = parseFloat(this.max);

    if (min > max) {
      console.warn(
        'min-prop must have a lower value than max-prop for the component to work correctly.',
      );
      this.disabled = true;
    }

    const initialLeft = parseFloat(this.leftValue);
    const initialRight = parseFloat(this.rightValue);

    if (initialLeft > initialRight) {
      console.warn(
        'initial-left-value prop must have a lower value than initial-right-value prop for the component to work correctly.',
      );
      this.disabled = true;
    }
  }

  componentDidLoad() {
    this.calculateInputSizeFromMax();
    if (!this.resizeObserverAdded && typeof ResizeObserver !== 'undefined') {
      this.resizeObserverAdded = true;

      let resizeObserver;
      if (this.type === 'range') {
        resizeObserver = new ResizeObserver(() => {
          this.calculateThumbLeftFromValue(this.rightValue, true);
          this.calculateThumbLeftFromValue(this.leftValue, false);
          this.updateTrack();
        });
      } else {
        resizeObserver = new ResizeObserver(() => {
          this.calculateThumbLeftFromValue(this.value, false);
          this.updateTrack();
        });
      }

      if (this.wrapperElement) resizeObserver.observe(this.wrapperElement);
    }

    if (this.type === 'range') {
      this.calculateThumbLeftFromValue(this.leftValue, false);
      this.calculateThumbLeftFromValue(this.rightValue, true);
    } else {
      this.calculateThumbLeftFromValue(this.value, false);
    }
    this.updateTrack();

    // Only set the initial value once:
    if (!this.initialLeftValue) {
      if (this.type === 'range') {
        this.initialLeftValue = this.leftValue;
      } else {
        this.initialLeftValue = this.value;
      }
    }
    if (!this.initialRightValue) {
      this.initialRightValue = this.rightValue;
    }

    // Set initial aria attributes
    if (this.leftThumbElement) {
      this.leftThumbElement.setAttribute(
        'aria-valuenow',
        this.type === 'range' ? this.leftValue : this.value,
      );
      this.leftThumbElement.setAttribute(
        'aria-valuetext',
        `${this.type === 'range' ? this.leftValue : this.value} of ${this.max}`,
      );

      // Ensure the thumb can receive focus via keyboard
      this.leftThumbElement.tabIndex = this.disabled ? -1 : 0;
    }
    if (this.type === 'range') {
      if (this.rightThumbElement) {
        this.rightThumbElement.setAttribute('aria-valuenow', this.value);
        this.rightThumbElement.setAttribute('aria-valuetext', `${this.value} of ${this.max}`);

        // Ensure the thumb can receive focus via keyboard
        this.rightThumbElement.tabIndex = this.disabled ? -1 : 0;
      }
    }
  }

  componentDidRender() {
    // Only add the event listener once:
    if (!this.resetEventListenerAdded) {
      this.formElement = this.host.closest('form');

      if (this.formElement) {
        this.formElement.addEventListener('reset', this.resetToInitialValue);
        this.resetEventListenerAdded = true;
      }
    }
  }

  connectedCallback() {
    if (this.resetEventListenerAdded && this.formElement) {
      this.formElement.removeEventListener('reset', this.resetToInitialValue);
      this.resetEventListenerAdded = false;
    }
  }

  render() {
    const ariaLabel = this.readOnly ? this.tdsReadOnlyAriaLabel : this.label || this.tdsAriaLabel;
    return this.type !== 'range' ? (
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
          step={this.step}
          value={this.value}
          disabled={this.disabled}
        ></input>
        {/* Hidden element for screen reader announcement */}
        <div
          class="sr-only"
          aria-live="assertive"
          ref={(el) => {
            this.ariaLiveElement = el as HTMLElement;
          }}
        ></div>
        <div
          class={{
            'tds-slider': true,
            'disabled': this.disabled,
            'tds-slider-small': this.useSmall,
          }}
          ref={(el) => {
            this.wrapperElement = el as HTMLElement;
          }}
          aria-disabled={this.disabled ? 'true' : 'false'}
        >
          <label id={`${this.sliderId}-label`} class={{ offset: this.showTickNumbers }}>
            {this.label}
          </label>

          {!this.showTickNumbers && !this.controls && (
            <div class="tds-slider__input-values">
              <div class="tds-slider__input-value min-value">{this.min}</div>
            </div>
          )}

          {this.useControls && (
            <div class="tds-slider__controls">
              <div
                class="tds-slider__control tds-slider__control-minus"
                onClick={(event) => this.stepLeft(event)}
                role="button"
                aria-label="Decrease value"
                tabindex={this.disabled || this.readOnly ? '-1' : '0'}
              >
                <tds-icon svgTitle="minus_icon" name="minus" size="16px"></tds-icon>
              </div>
            </div>
          )}

          <div class="tds-slider-inner" tabIndex={-1}>
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
              role="presentation"
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
                  this.leftThumbElement = el as HTMLElement;
                }}
                onMouseDown={() => this.grabThumb(false)}
                onTouchStart={() => this.grabThumb(false)}
                onFocus={() => {
                  if (this.tooltipMode === 'hover' || this.tooltipMode === 'press')
                    this.tooltipControl = true;
                }}
                onBlur={() => {
                  if (this.tooltipMode === 'hover' || this.tooltipMode === 'press')
                    this.tooltipControl = false;
                }}
                role="slider"
                aria-valuemin={this.min}
                aria-valuemax={this.max}
                aria-valuenow={this.value}
                aria-valuetext={`${this.value} of ${this.max}`}
                aria-labelledby={`${this.sliderId}-label`}
                aria-label={ariaLabel}
                tabindex={this.disabled ? '-1' : '0'}
              >
                {this.tooltipControl && (
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
                        d="M8.15882 12.6915L0 0H18L9.84118 12.6915C9.44754 13.3038 8.55246 13.3038 8.15882 12.6915Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                <div
                  class={{ 'tds-slider__thumb-inner': true, 'pressed': this.leftThumbGrabbed }}
                  // ref={(el) => {
                  //   this.leftThumbInnerElement = el as HTMLElement;
                  // }}
                  onMouseEnter={() => {
                    if (this.tooltipMode === 'hover') this.tooltipControl = true;
                  }}
                  onMouseLeave={() => {
                    if (this.tooltipMode === 'hover') this.tooltipControl = false;
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div class={{ 'tds-slider__input-values': true, 'tick-numbers': this.showTickNumbers }}>
            {!this.showTickNumbers && !this.controls && (
              <div class="tds-slider__input-value max-value">{this.max}</div>
            )}
            {this.useInput && (
              <div class="tds-slider__input-field-wrapper">
                <tds-text-field
                  noMinWidth
                  size="sm"
                  type="number"
                  value={this.value}
                  min={this.min}
                  max={this.max}
                  readOnly={this.readOnly}
                  onTdsChange={(e) => console.log(e)}
                  tdsAriaLabel={this.readOnly ? this.tdsReadOnlyAriaLabel : ariaLabel}
                  onTdsBlur={(event) => this.updateSliderValueFromTextField(event as CustomEvent)}
                  onKeyDown={(event) => this.handleInputFieldEnterPress(event)}
                ></tds-text-field>
              </div>
            )}
          </div>

          {this.useControls && (
            <div class="tds-slider__controls">
              <div
                class="tds-slider__control tds-slider__control-plus"
                onClick={(event) => this.stepRight(event)}
                role="button"
                aria-label="Increase value"
                tabindex={this.disabled || this.readOnly ? '-1' : '0'}
              >
                <tds-icon svgTitle="plus_icon" name="plus" size="16px"></tds-icon>
              </div>
            </div>
          )}
        </div>
      </div>
    ) : (
      <div
        class={{
          'tds-slider-wrapper': true,
          'read-only': this.readOnly,
        }}
      >
        <div
          class={{
            'tds-slider': true,
            'disabled': this.disabled,
            'tds-slider-small': this.useSmall,
          }}
          ref={(el) => {
            this.wrapperElement = el as HTMLElement;
          }}
          aria-disabled={this.disabled ? 'true' : 'false'}
          aria-label={ariaLabel}
        >
          <label
            id={`${this.sliderId}-label`}
            class={{ offset: this.showTickNumbers, range: true }}
          >
            {this.label}
          </label>

          <div class={{ 'tds-slider__input-values': true, 'tick-numbers': this.showTickNumbers }}>
            {this.useInput && (
              <div class="tds-slider__input-field-wrapper">
                <tds-text-field
                  noMinWidth
                  size="sm"
                  type="number"
                  value={this.leftValue}
                  min={this.min}
                  max={this.rightValue}
                  readOnly={this.readOnly}
                  onTdsChange={(e) => console.log(e)}
                  tdsAriaLabel={
                    this.readOnly ? this.tdsReadOnlyAriaLabel : `input-${ariaLabel}-left`
                  }
                  onTdsBlur={(event) => this.updateSliderValueFromTextField(event as CustomEvent)}
                  onKeyDown={(event) => this.handleInputFieldEnterPress(event)}
                  name="left-value-input"
                ></tds-text-field>
              </div>
            )}
            {!this.showTickNumbers && (
              <div class="tds-slider__input-value min-value">{this.min}</div>
            )}
          </div>

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
              role="presentation"
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
                  this.leftThumbElement = el as HTMLElement;
                }}
                onMouseDown={() => this.grabThumb(false)}
                onTouchStart={() => this.grabThumb(false)}
                onFocus={() => {
                  if (this.tooltipMode === 'hover' || this.tooltipMode === 'press')
                    this.tooltipControl = true;
                }}
                onBlur={() => {
                  if (this.tooltipMode === 'hover' || this.tooltipMode === 'press')
                    this.tooltipControl = false;
                }}
                role="slider"
                aria-valuemin={this.min}
                aria-valuemax={this.rightValue}
                aria-valuenow={this.leftValue}
                aria-valuetext={`${this.leftValue} of ${this.max}`}
                aria-label={`thumb-${ariaLabel}-left`}
                tabindex={this.disabled ? '-1' : '0'}
                id={`left-thumb-${this.sliderId}`}
              >
                {this.tooltipControl && (
                  <div class="tds-slider__value">
                    {this.leftValue}
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.15882 12.6915L0 0H18L9.84118 12.6915C9.44754 13.3038 8.55246 13.3038 8.15882 12.6915Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                <div
                  class={{ 'tds-slider__thumb-inner': true, 'pressed': this.leftThumbGrabbed }}
                  // ref={(el) => {
                  //   this.leftThumbInnerElement = el as HTMLElement;
                  // }}
                  onMouseEnter={() => {
                    if (this.tooltipMode === 'hover') this.tooltipControl = true;
                  }}
                  onMouseLeave={() => {
                    if (this.tooltipMode === 'hover') this.tooltipControl = false;
                  }}
                ></div>
              </div>

              <div
                class="tds-slider__thumb"
                ref={(el) => {
                  this.rightThumbElement = el as HTMLElement;
                }}
                onMouseDown={() => this.grabThumb(true)}
                onTouchStart={() => this.grabThumb(true)}
                onFocus={() => {
                  if (this.tooltipMode === 'hover' || this.tooltipMode === 'press')
                    this.tooltipControlRight = true;
                }}
                onBlur={() => {
                  if (this.tooltipMode === 'hover' || this.tooltipMode === 'press')
                    this.tooltipControlRight = false;
                }}
                role="slider"
                aria-valuemin={this.leftValue}
                aria-valuemax={this.max}
                aria-valuenow={this.rightValue}
                aria-valuetext={`${this.rightValue} of ${this.max}`}
                aria-label={`thumb-${ariaLabel}-right`}
                tabindex={this.disabled ? '-1' : '0'}
                id={`right-thumb-${this.sliderId}`}
              >
                {this.tooltipControlRight && (
                  <div class="tds-slider__value">
                    {this.rightValue}
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.15882 12.6915L0 0H18L9.84118 12.6915C9.44754 13.3038 8.55246 13.3038 8.15882 12.6915Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                <div
                  class={{ 'tds-slider__thumb-inner': true, 'pressed': this.rightThumbGrabbed }}
                  // ref={(el) => {
                  //   this.rightThumbInnerElement = el as HTMLElement;
                  // }}
                  onMouseEnter={() => {
                    if (this.tooltipMode === 'hover') this.tooltipControlRight = true;
                  }}
                  onMouseLeave={() => {
                    if (this.tooltipMode === 'hover') this.tooltipControlRight = false;
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div class={{ 'tds-slider__input-values': true, 'tick-numbers': this.showTickNumbers }}>
            {!this.showTickNumbers && (
              <div class="tds-slider__input-value max-value">{this.max}</div>
            )}
            {this.useInput && (
              <div class="tds-slider__input-field-wrapper">
                <tds-text-field
                  noMinWidth
                  size="sm"
                  type="number"
                  value={this.rightValue}
                  min={this.leftValue}
                  max={this.max}
                  readOnly={this.readOnly}
                  onTdsChange={(e) => console.log(e)}
                  tdsAriaLabel={
                    this.readOnly ? this.tdsReadOnlyAriaLabel : `input-${ariaLabel}-right`
                  }
                  onTdsBlur={(event) => this.updateSliderValueFromTextField(event as CustomEvent)}
                  onKeyDown={(event) => this.handleInputFieldEnterPress(event)}
                  name="right-value-input"
                ></tds-text-field>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
