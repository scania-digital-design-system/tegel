import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';
import { d as defineCustomElement$2 } from './icon.js';

const sliderCss = "tds-slider{box-sizing:border-box;width:100%}tds-slider *{box-sizing:border-box}tds-slider input[type=range].tds-slider-native-element{display:none}.tds-slider-wrapper{width:100%}.tds-slider-wrapper.read-only{pointer-events:none}.tds-slider{width:100%;display:flex;flex-wrap:nowrap;padding-top:65px}.tds-slider .tds-slider-inner{width:100%;height:20px;position:relative}.tds-slider .tds-slider__controls{position:relative;top:-25px}.tds-slider .tds-slider__controls .tds-slider__control{cursor:pointer}.tds-slider .tds-slider__controls .tds-slider__control.tds-slider__control-minus{padding:18px 18px 18px 0}.tds-slider .tds-slider__controls .tds-slider__control.tds-slider__control-plus{padding:18px 0 18px 18px}.tds-slider .tds-slider__input-values{position:relative;top:-25px;display:flex;flex-wrap:nowrap;align-items:center}.tds-slider .tds-slider__input-values .tds-slider__input-value{user-select:none;padding:18px;color:var(--tds-grey-700);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls)}.tds-slider .tds-slider__input-values .tds-slider__input-value.min-value{padding-left:0}.tds-slider .tds-slider__input-values .tds-slider__input-field-wrapper{background-color:var(--tds-slider-inputfield-background);display:flex;align-items:center;justify-content:center;border-radius:4px 4px 0 0}.tds-slider .tds-slider__input-values .tds-slider__input-field-wrapper input.tds-slider__input-field{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-slider-input-inputfield-color);border:0;background-color:transparent;text-align:center;padding:12px;box-shadow:inset 0 -1px 0 var(--tds-slider-inputfield-box-shadow);border-radius:4px 4px 0 0}.tds-slider .tds-slider__input-values .tds-slider__input-field-wrapper input.tds-slider__input-field:hover{box-shadow:inset 0 -1px 0 var(--tds-grey-600)}.tds-slider .tds-slider__input-values .tds-slider__input-field-wrapper input.tds-slider__input-field:focus{box-shadow:inset 0 -2px 0 var(--tds-blue-400);outline:0}.tds-slider label{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);user-select:none;position:absolute;color:var(--tds-slider-label-color);padding-bottom:16px;transform:translateY(-100%)}.tds-slider label.offset{padding-bottom:34px}.tds-slider .tds-slider__value{font:var(--tds-detail-01);letter-spacing:var(--tds-detail-01-ls);user-select:none;border-radius:4px;padding:8px;position:absolute;transform:translate(-50%, -100%);top:-24px;background-color:var(--tds-slider-value-tooltip-background);color:var(--tds-slider-value-tooltip-color)}.tds-slider .tds-slider__value svg{color:var(--tds-slider-value-tooltip-background);position:absolute;left:50%;transform:translateX(-50%);top:34px}.tds-slider .tds-slider__thumb{position:absolute}.tds-slider .tds-slider__thumb .tds-slider__thumb-inner{width:20px;height:20px;border-radius:100%;background-color:var(--tds-slider-thumb-color);position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);cursor:pointer}.tds-slider .tds-slider__thumb .tds-slider__thumb-inner::before{content:\" \";display:none;width:48px;height:48px;background-color:var(--tds-slider-thumb-color);position:absolute;border-radius:100%;top:50%;left:50%;transform:translate(-50%, -50%)}.tds-slider .tds-slider__thumb .tds-slider__thumb-inner:hover::before{display:block;opacity:0.08}.tds-slider .tds-slider__thumb .tds-slider__thumb-inner.pressed{width:24px;height:24px}.tds-slider .tds-slider__thumb .tds-slider__thumb-inner.pressed::before{display:block;opacity:0.16 !important}.tds-slider .tds-slider__value-dividers-wrapper{position:relative;width:100%;pointer-events:none}.tds-slider .tds-slider__value-dividers{pointer-events:none;position:absolute;display:flex;justify-content:space-between;width:100%}.tds-slider .tds-slider__value-dividers .tds-slider__value-divider{transform:translateY(-50%);height:16px;background-color:var(--tds-slider-divider-color);color:var(--tds-slider-divider-values-color);width:1px}.tds-slider .tds-slider__value-dividers .tds-slider__value-divider span{display:block;user-select:none;color:var(-tds-grey-700);font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);position:relative;top:-7px;left:50%;transform:translate(-50%, -100%);width:50px;text-align:center}.tds-slider .tds-slider__track{width:100%;height:2px;border-radius:1px;background-color:var(--tds-slider-track-color);position:relative}.tds-slider .tds-slider__track:focus{outline:0}.tds-slider .tds-slider__track:focus .tds-slider__thumb .tds-slider__thumb-inner{width:24px;height:24px}.tds-slider .tds-slider__track:focus .tds-slider__thumb .tds-slider__thumb-inner::before{display:block;opacity:0.08}.tds-slider .tds-slider__track .tds-slider__track-fill{background-color:var(--tds-slider-track-fill-color);border-radius:2px;height:4px;position:absolute;left:0;top:-1px}.tds-slider.disabled{cursor:not-allowed}.tds-slider.disabled>*{pointer-events:none}.tds-slider.disabled label{color:var(--tds-slider-disabled)}.tds-slider.disabled .tds-slider__controls .tds-slider__control{cursor:default}.tds-slider.disabled .tds-slider__controls .tds-slider__control.tds-slider__control-minus svg,.tds-slider.disabled .tds-slider__controls .tds-slider__control.tds-slider__control-plus svg{fill:var(--tds-slider-disabled)}.tds-slider.disabled .tds-slider__input-values .tds-slider__input-value{color:var(--tds-slider-disabled)}.tds-slider.disabled .tds-slider__input-values .tds-slider__input-field-wrapper{pointer-events:none}.tds-slider.disabled .tds-slider__input-values .tds-slider__input-field-wrapper input.tds-slider__input-field{color:var(--tds-slider-disabled);pointer-events:none}.tds-slider.disabled .tds-slider__value{display:none}.tds-slider.disabled .tds-slider__track .tds-slider__track-fill{background-color:var(--tds-slider-disabled)}.tds-slider.disabled .tds-slider__value-dividers .tds-slider__value-divider span{color:var(--tds-slider-disabled)}.tds-slider.disabled .tds-slider__thumb{pointer-events:none}.tds-slider.disabled .tds-slider__thumb .tds-slider__thumb-inner{background-color:var(--tds-slider-disabled);cursor:default}.tds-slider.tds-slider-small .tds-slider__thumb .tds-slider__thumb-inner{width:16px;height:16px}.tds-slider.tds-slider-small .tds-slider__thumb .tds-slider__thumb-inner::before{width:40px;height:40px}.tds-slider.tds-slider-small .tds-slider__thumb .tds-slider__thumb-inner.pressed{width:20px;height:20px}.tds-slider .tds-slider__controls .tds-slider__control{cursor:default}.tds-slider .tds-slider__controls .tds-slider__control.tds-slider__control-minus tds-icon,.tds-slider .tds-slider__controls .tds-slider__control.tds-slider__control-plus tds-icon{color:var(--tds-slider-controls-color)}.tds-slider.disabled .tds-slider__controls .tds-slider__control{cursor:default}.tds-slider.disabled .tds-slider__controls .tds-slider__control.tds-slider__control-minus tds-icon,.tds-slider.disabled .tds-slider__controls .tds-slider__control.tds-slider__control-plus tds-icon{color:var(--tds-slider-disabled)}";

const TdsSlider$1 = /*@__PURE__*/ proxyCustomElement(class TdsSlider extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.wrapperElement = null;
    this.thumbElement = null;
    this.thumbInnerElement = null;
    this.trackElement = null;
    this.trackFillElement = null;
    this.minusElement = null;
    this.plusElement = null;
    this.inputElement = null;
    this.thumbGrabbed = false;
    this.thumbLeft = 0;
    this.tickValues = [];
    this.readonlyState = false;
    this.useControls = false;
    this.useInput = false;
    this.useSmall = false;
    this.useSnapping = false;
    this.supposedValueSlot = -1;
    this.eventListenersAdded = false;
    this.resizeObserverAdded = false;
    this.label = '';
    this.value = '0';
    this.min = '0';
    this.max = '100';
    this.ticks = '0';
    this.showTickNumbers = false;
    this.tooltip = false;
    this.disabled = false;
    this.readOnly = false;
    this.controls = false;
    this.input = false;
    this.step = '1';
    this.name = '';
    this.thumbSize = 'lg';
    this.snap = false;
    this.sliderId = generateUniqueId();
  }
  /** Public method to re-initialise the slider if some configuration props are changed */
  async reset() {
    // @TODO: maybe refactor to use watch-decorators instead
    this.componentWillLoad();
    this.componentDidLoad();
  }
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
    }
  }
  handleMouseUp() {
    if (!this.thumbGrabbed) {
      return;
    }
    this.thumbGrabbed = false;
    this.thumbInnerElement.classList.remove('pressed');
    this.updateValue();
    this.trackElement.focus();
  }
  handleTouchEnd() {
    if (!this.thumbGrabbed) {
      return;
    }
    this.thumbGrabbed = false;
    this.thumbInnerElement.classList.remove('pressed');
    this.updateValue();
    this.trackElement.focus();
  }
  handleMouseMove(event) {
    if (!this.thumbGrabbed) {
      return;
    }
    this.thumbCore(event);
  }
  handleTouchMove(event) {
    event.preventDefault();
    if (!this.thumbGrabbed) {
      return;
    }
    this.thumbCore(event);
  }
  updateSupposedValueSlot(localLeft) {
    const numTicks = parseInt(this.ticks);
    const trackWidth = this.getTrackWidth();
    const distanceBetweenTicks = Math.round(trackWidth / (numTicks + 1));
    const snappedLocalLeft = Math.round(localLeft / distanceBetweenTicks) * distanceBetweenTicks;
    let thumbPositionPX = 0;
    if (snappedLocalLeft >= 0 && snappedLocalLeft <= trackWidth) {
      thumbPositionPX = snappedLocalLeft;
    }
    else if (snappedLocalLeft > trackWidth) {
      thumbPositionPX = trackWidth;
    }
    else if (snappedLocalLeft < 0) {
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
    }
    else if (event.type === 'touchmove') {
      localLeft = event.touches[0].clientX - trackRect.left;
    }
    else
      console.warn('Slider component: Unsupported event!');
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
    }
    else {
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
      const resizeObserver = new ResizeObserver(( /* entries */) => {
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
            let newValue = parseInt(this.inputElement.value);
            if (newValue < this.getMin()) {
              newValue = this.getMin();
            }
            else if (newValue > this.getMax()) {
              newValue = this.getMax();
            }
            this.calculateThumbLeftFromValue(newValue);
            this.updateValueForced(newValue);
            this.updateTrack();
            this.inputElement.blur();
            this.wrapperElement.focus();
          }
        });
      }
    }
    this.calculateThumbLeftFromValue(this.value);
    this.updateTrack();
  }
  grabThumb() {
    if (this.readonlyState) {
      return;
    }
    this.thumbGrabbed = true;
    this.thumbInnerElement.classList.add('pressed');
  }
  calculateInputSizeFromMax() {
    return this.max.length;
  }
  controlsStep(delta) {
    if (this.readonlyState || this.disabled) {
      return;
    }
    const numTicks = parseInt(this.ticks);
    /* if snapping is enabled, instead just increment or decrement the current "fixed" value from our ticknumber array */
    if (this.useSnapping && numTicks > 0) {
      const stepDir = delta > 0 ? 1 : -1;
      this.supposedValueSlot += stepDir;
      if (this.supposedValueSlot < 0) {
        this.supposedValueSlot = 0;
      }
      else if (this.supposedValueSlot > numTicks + 1) {
        this.supposedValueSlot = numTicks + 1;
      }
      this.updateValue();
    }
    else {
      const trackWidth = this.getTrackWidth();
      const percentage = this.thumbLeft / trackWidth;
      let currentValue = this.getMin() + percentage * (this.getMax() - this.getMin());
      currentValue += delta;
      currentValue = Math.round(currentValue);
      if (currentValue < this.getMin()) {
        currentValue = this.getMin();
      }
      else if (currentValue > this.getMax()) {
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
    this.readonlyState = this.readOnly;
    this.useInput = false;
    this.useControls = false;
    if (this.controls) {
      this.useControls = true;
    }
    else if (this.input) {
      this.useInput = true;
    }
    this.useSmall = this.thumbSize === 'sm';
    this.useSnapping = this.snap;
    const min = this.getMin();
    const max = this.getMax();
    if (min > max) {
      console.warn('min-prop must have a higher value than max-prop for the component to work correctly.');
      this.disabled = true;
    }
  }
  render() {
    return (h("div", { class: `tds-slider-wrapper ${this.readonlyState ? 'read-only' : ''}` }, h("input", { class: "tds-slider-native-element", type: "range", value: this.value, name: this.name, min: this.min, max: this.max, disabled: this.disabled }), h("div", { class: {
        'tds-slider': true,
        'disabled': this.disabled,
        'tds-slider-small': this.useSmall,
      }, ref: (el) => {
        this.wrapperElement = el;
      } }, h("label", { class: this.showTickNumbers && 'offset' }, this.label), this.useInput && (h("div", { class: "tds-slider__input-values" }, h("div", { ref: (el) => {
        this.minusElement = el;
      }, class: "tds-slider__input-value min-value" }, this.min))), this.useControls && (h("div", { class: "tds-slider__controls" }, h("div", { ref: (el) => {
        this.minusElement = el;
      }, class: "tds-slider__control tds-slider__control-minus" }, h("tds-icon", { name: "minus", size: "16px" })))), h("div", { class: "tds-slider-inner" }, this.tickValues.length > 0 && (h("div", { class: "tds-slider__value-dividers-wrapper" }, h("div", { class: "tds-slider__value-dividers" }, this.tickValues.map((value) => (h("div", { class: "tds-slider__value-divider" }, this.showTickNumbers && h("span", null, value))))))), h("div", { class: "tds-slider__track", ref: (el) => {
        this.trackElement = el;
      }, tabindex: this.disabled ? '-1' : '0' }, h("div", { class: "tds-slider__track-fill", ref: (el) => {
        this.trackFillElement = el;
      } }), h("div", { class: "tds-slider__thumb", ref: (el) => {
        this.thumbElement = el;
      } }, this.tooltip && (h("div", { class: "tds-slider__value" }, this.value, h("svg", { width: "18", height: "14", viewBox: "0 0 18 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M8.15882 12.6915L0.990487 1.54076C0.562658 0.875246 1.0405 0 1.83167 0H16.1683C16.9595 0 17.4373 0.875246 17.0095 1.54076L9.84118 12.6915C9.44754 13.3038 8.55246 13.3038 8.15882 12.6915Z", fill: "currentColor" })))), h("div", { class: "tds-slider__thumb-inner", ref: (el) => {
        this.thumbInnerElement = el;
      } })))), this.useInput && (h("div", { class: "tds-slider__input-values" }, h("div", { ref: (el) => {
        this.minusElement = el;
      }, class: "tds-slider__input-value" }, this.max), h("div", { class: "tds-slider__input-field-wrapper" }, h("input", { onFocus: (e) => {
        if (this.readonlyState) {
          e.preventDefault();
          this.inputElement.blur();
        }
      }, size: this.calculateInputSizeFromMax(), class: "tds-slider__input-field", value: this.value, ref: (el) => {
        this.inputElement = el;
      } })))), this.useControls && (h("div", { class: "tds-slider__controls" }, h("div", { ref: (el) => {
        this.plusElement = el;
      }, class: "tds-slider__control tds-slider__control-plus" }, h("tds-icon", { name: "plus", size: "16px" })))))));
  }
  static get style() { return sliderCss; }
}, [0, "tds-slider", {
    "label": [1],
    "value": [1],
    "min": [1],
    "max": [1],
    "ticks": [1],
    "showTickNumbers": [4, "show-tick-numbers"],
    "tooltip": [4],
    "disabled": [4],
    "readOnly": [4, "read-only"],
    "controls": [4],
    "input": [4],
    "step": [1],
    "name": [1],
    "thumbSize": [1, "thumb-size"],
    "snap": [4],
    "sliderId": [1, "slider-id"],
    "reset": [64]
  }, [[0, "keydown", "handleKeydown"], [9, "mouseup", "handleMouseUp"], [9, "touchend", "handleTouchEnd"], [9, "mousemove", "handleMouseMove"], [9, "touchmove", "handleTouchMove"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-slider", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-slider":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSlider$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsSlider = TdsSlider$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSlider, defineCustomElement };
