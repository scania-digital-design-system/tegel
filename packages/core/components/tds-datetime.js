import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const datetimeCss = ".tds-datetime-input[type=datetime-local].sc-tds-datetime~.icon-time.sc-tds-datetime,.tds-datetime-input-md[type=datetime-local].sc-tds-datetime~.icon-time.sc-tds-datetime,.tds-datetime-input-sm[type=datetime-local].sc-tds-datetime~.icon-time.sc-tds-datetime{display:none}.tds-datetime-input[type=date].sc-tds-datetime~.icon-time.sc-tds-datetime,.tds-datetime-input-md[type=date].sc-tds-datetime~.icon-time.sc-tds-datetime,.tds-datetime-input-sm[type=date].sc-tds-datetime~.icon-time.sc-tds-datetime{display:none}.tds-datetime-input[type=time].sc-tds-datetime~.icon-datetime-local.sc-tds-datetime,.tds-datetime-input-md[type=time].sc-tds-datetime~.icon-datetime-local.sc-tds-datetime,.tds-datetime-input-sm[type=time].sc-tds-datetime~.icon-datetime-local.sc-tds-datetime{display:none}.tds-datetime-input.sc-tds-datetime{box-sizing:border-box;border-radius:4px 4px 0 0;width:100%;box-sizing:border-box;margin:0;border:none;outline:none;height:100%;color:var(--tds-datetime-color);background-color:var(--tds-datetime-background);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:var(--tds-spacing-element-20) var(--tds-spacing-element-16)}.tds-datetime-input.sc-tds-datetime *.sc-tds-datetime{box-sizing:border-box}.tds-datetime-input.sc-tds-datetime::placeholder{opacity:1;color:var(--tds-datetime-placeholder)}.tds-datetime-input.sc-tds-datetime:focus::placeholder{color:var(--tds-datetime-placeholder-color-focus)}.tds-datetime-input.sc-tds-datetime:disabled{background-color:var(--tds-datetime-background-disabled);color:var(--tds-datetime-color-disabled);cursor:not-allowed}.tds-datetime-input.sc-tds-datetime:disabled::placeholder{color:var(--tds-datetime-placeholder-disabled)}.tds-datetime-input.sc-tds-datetime:disabled~.tds-datetime-label-inside.sc-tds-datetime{color:var(--tds-datetime-label-disabled)}.tds-datetime-input-md.sc-tds-datetime{box-sizing:border-box;border-radius:4px 4px 0 0;width:100%;box-sizing:border-box;margin:0;border:none;outline:none;height:100%;color:var(--tds-datetime-color);background-color:var(--tds-datetime-background);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:var(--tds-spacing-element-16)}.tds-datetime-input-md.sc-tds-datetime *.sc-tds-datetime{box-sizing:border-box}.tds-datetime-input-md.sc-tds-datetime::placeholder{opacity:1;color:var(--tds-datetime-placeholder)}.tds-datetime-input-md.sc-tds-datetime:focus::placeholder{color:var(--tds-datetime-placeholder-color-focus)}.tds-datetime-input-md.sc-tds-datetime:disabled{background-color:var(--tds-datetime-background-disabled);color:var(--tds-datetime-color-disabled);cursor:not-allowed}.tds-datetime-input-md.sc-tds-datetime:disabled::placeholder{color:var(--tds-datetime-placeholder-disabled)}.tds-datetime-input-md.sc-tds-datetime:disabled~.tds-datetime-label-inside.sc-tds-datetime{color:var(--tds-datetime-label-disabled)}.tds-datetime-input-sm.sc-tds-datetime{box-sizing:border-box;border-radius:4px 4px 0 0;width:100%;box-sizing:border-box;margin:0;border:none;outline:none;height:100%;color:var(--tds-datetime-color);background-color:var(--tds-datetime-background);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:var(--tds-spacing-element-16)}.tds-datetime-input-sm.sc-tds-datetime *.sc-tds-datetime{box-sizing:border-box}.tds-datetime-input-sm.sc-tds-datetime::placeholder{opacity:1;color:var(--tds-datetime-placeholder)}.tds-datetime-input-sm.sc-tds-datetime:focus::placeholder{color:var(--tds-datetime-placeholder-color-focus)}.tds-datetime-input-sm.sc-tds-datetime:disabled{background-color:var(--tds-datetime-background-disabled);color:var(--tds-datetime-color-disabled);cursor:not-allowed}.tds-datetime-input-sm.sc-tds-datetime:disabled::placeholder{color:var(--tds-datetime-placeholder-disabled)}.tds-datetime-input-sm.sc-tds-datetime:disabled~.tds-datetime-label-inside.sc-tds-datetime{color:var(--tds-datetime-label-disabled)}.tds-datetime-container.sc-tds-datetime{border-radius:4px 4px 0 0;display:flex;position:relative;height:56px;box-sizing:border-box;background-color:var(--tds-datetime-background);border-bottom:1px solid var(--tds-datetime-border-bottom);transition:border-bottom-color 200ms ease}.tds-datetime-container.sc-tds-datetime:hover{border-bottom-color:var(--tds-datetime-border-bottom-hover)}.tds-form-datetime-md.sc-tds-datetime .tds-datetime-container.sc-tds-datetime{height:48px}.tds-form-datetime-sm.sc-tds-datetime .tds-datetime-container.sc-tds-datetime{height:40px}.tds-datetime-input-container.sc-tds-datetime{position:relative;width:100%}.tds-datetime-input-container.sc-tds-datetime .datetime-icon.sc-tds-datetime{height:20px;width:20px;position:absolute;top:50%;transform:translateY(-50%);right:18px;pointer-events:none;color:var(--tds-datetime-icon)}.tds-datetime-label.sc-tds-datetime{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);display:block;margin-bottom:var(--tds-spacing-element-8);color:var(--tds-datetime-label-color)}.tds-datetime-label-inside.sc-tds-datetime{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);position:absolute;pointer-events:none;color:var(--tds-datetime-label-inside-color);left:16px}.tds-form-datetime.sc-tds-datetime{display:block;min-width:208px;background:unset}.tds-form-datetime-nomin.sc-tds-datetime{min-width:auto}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input.sc-tds-datetime{padding-top:var(--tds-spacing-element-24);padding-bottom:15px}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime{top:20px}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input.sc-tds-datetime::placeholder{color:transparent}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input.sc-tds-datetime .sc-tds-datetime::placeholder{color:transparent}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input.sc-tds-datetime:focus::placeholder{transition:color 0.35s ease;color:var(--tds-datetime-placeholder-color-focus)}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-md.sc-tds-datetime{padding-top:var(--tds-spacing-element-20);padding-bottom:11px}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-md.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime{top:16px}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-md.sc-tds-datetime::placeholder{color:transparent}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-md.sc-tds-datetime .sc-tds-datetime::placeholder{color:transparent}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-md.sc-tds-datetime:focus::placeholder{transition:color 0.35s ease;color:var(--tds-datetime-placeholder-color-focus)}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-sm.sc-tds-datetime{padding-top:var(--tds-spacing-element-20);padding-bottom:11px}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-sm.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime{top:16px}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-sm.sc-tds-datetime::placeholder{color:transparent}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-sm.sc-tds-datetime .sc-tds-datetime::placeholder{color:transparent}.tds-form-datetime.tds-datetime-container-label-inside.sc-tds-datetime .tds-datetime-input-sm.sc-tds-datetime:focus::placeholder{transition:color 0.35s ease;color:var(--tds-datetime-placeholder-color-focus)}.tds-form-datetime.tds-datetime-container-label-inside.tds-datetime-focus.sc-tds-datetime .tds-datetime-input-sm.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime,.tds-form-datetime.tds-datetime-container-label-inside.tds-datetime-data.sc-tds-datetime .tds-datetime-input-sm.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:0.1s ease all;top:8px}.tds-form-datetime.tds-datetime-container-label-inside.tds-datetime-focus.sc-tds-datetime .tds-datetime-input-md.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime,.tds-form-datetime.tds-datetime-container-label-inside.tds-datetime-data.sc-tds-datetime .tds-datetime-input-md.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:0.1s ease all;top:8px}.tds-form-datetime.tds-datetime-container-label-inside.tds-datetime-focus.sc-tds-datetime .tds-datetime-input.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime,.tds-form-datetime.tds-datetime-container-label-inside.tds-datetime-data.sc-tds-datetime .tds-datetime-input.sc-tds-datetime~.tds-datetime-label-inside.sc-tds-datetime{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:0.1s ease all;top:12px}.tds-datetime-bar.sc-tds-datetime{position:absolute;width:100%}.tds-datetime-bar.sc-tds-datetime::before,.tds-datetime-bar.sc-tds-datetime::after{content:\"\";height:2px;top:54px;width:0;position:absolute;background:var(--tds-datetime-bar);transition:0.35s ease all}.tds-form-datetime-md.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::before,.tds-form-datetime-md.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::after{top:46px}.tds-form-datetime-sm.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::before,.tds-form-datetime-sm.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::after{top:40px}.tds-datetime-bar.sc-tds-datetime::before{left:50%}.tds-datetime-bar.sc-tds-datetime::after{right:50%}.tds-datetime-focus.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::before,.tds-datetime-focus.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::after{width:50%}.tds-datetime-helper.sc-tds-datetime{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);display:block;flex-basis:100%;padding-top:var(--tds-spacing-element-4);color:var(--tds-datetime-helper)}.tds-datetime-helper.sc-tds-datetime .tds-helper.sc-tds-datetime{display:inline-flex;gap:8px}.tds-form-datetime-disabled.sc-tds-datetime .tds-datetime-container.sc-tds-datetime{border-bottom-color:transparent}.tds-form-datetime-disabled.sc-tds-datetime .datetime-icon.sc-tds-datetime tds-icon.sc-tds-datetime{color:var(--tds-datetime-icon-disabled)}.tds-form-datetime-disabled.sc-tds-datetime .tds-datetime-label.sc-tds-datetime{color:var(--tds-datetime-label-disabled);cursor:not-allowed}.tds-form-datetime-success.sc-tds-datetime .tds-datetime-container.sc-tds-datetime{border-bottom-color:var(--tds-datetime-border-bottom-success);color:var(--tds-datetime-color-success)}.tds-form-datetime-success.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::before,.tds-form-datetime-success.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::after{background:var(--tds-datetime-bar-sucess)}.tds-form-datetime-error.sc-tds-datetime .tds-datetime-helper.sc-tds-datetime{color:var(--tds-datetime-helper-error)}.tds-form-datetime-error.sc-tds-datetime .tds-datetime-container.sc-tds-datetime{border-bottom-color:var(--tds-datetime-border-bottom-error)}.tds-form-datetime-error.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::before,.tds-form-datetime-error.sc-tds-datetime .tds-datetime-bar.sc-tds-datetime::after{background:var(--tds-datetime-bar-error)}.tds-form-datetime-error.sc-tds-datetime .datetime-icon.sc-tds-datetime tds-icon.sc-tds-datetime{color:var(--tds-datetime-icon-error)}.tds-datetime-textcounter.sc-tds-datetime{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);color:var(--tds-datetime-textcounter);float:right}.tds-datetime-textcounter.sc-tds-datetime .tds-datetime-textcounter-divider.sc-tds-datetime{letter-spacing:var(--tds-detail-05-ls);color:var(--tds-datetime-textcounter-divider)}input[type=datetime-local].sc-tds-datetime::-webkit-inner-spin-button,input[type=datetime-local].sc-tds-datetime::-webkit-calendar-picker-indicator{opacity:0}input[type=date].sc-tds-datetime::-webkit-inner-spin-button,input[type=date].sc-tds-datetime::-webkit-calendar-picker-indicator{opacity:0}input[type=time].sc-tds-datetime::-webkit-inner-spin-button,input[type=time].sc-tds-datetime::-webkit-calendar-picker-indicator{opacity:0}";

const TdsDatetime$1 = /*@__PURE__*/ proxyCustomElement(class TdsDatetime extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.tdsBlur = createEvent(this, "tdsBlur", 6);
    this.tdsFocus = createEvent(this, "tdsFocus", 6);
    this.getDefaultValue = () => {
      const dateTimeObj = {
        year: this.defaultValue.slice(0, 4),
        month: this.defaultValue.slice(5, 7),
        day: this.defaultValue.slice(8, 10),
        hours: this.defaultValue.slice(11, 13),
        minutes: this.defaultValue.slice(14, 16),
      };
      switch (this.type) {
        case 'datetime-local':
          return `${dateTimeObj.year}-${dateTimeObj.month}-${dateTimeObj.day}T${dateTimeObj.hours}:${dateTimeObj.minutes}`;
        case 'date':
          return `${dateTimeObj.year}-${dateTimeObj.month}-${dateTimeObj.day}`;
        case 'time':
          return `${this.defaultValue.slice(0, 2)}:${this.defaultValue.slice(3, 5)}`;
        default:
          throw new Error('Invalid type.');
      }
    };
    this.type = 'datetime-local';
    this.value = '';
    this.min = undefined;
    this.max = undefined;
    this.defaultValue = 'none';
    this.disabled = false;
    this.size = 'lg';
    this.noMinWidth = false;
    this.modeVariant = null;
    this.name = '';
    this.state = undefined;
    this.autofocus = false;
    this.label = '';
    this.helper = '';
    this.focusInput = undefined;
  }
  componentWillLoad() {
    if (this.defaultValue !== 'none') {
      this.value = this.getDefaultValue();
    }
  }
  // Listener if input enters focus state
  handleFocusIn() {
    this.focusInput = true;
  }
  // Listener if input leaves focus state
  handleFocusOut() {
    this.focusInput = false;
  }
  // Data input event in value prop
  handleInput(e) {
    this.value = e.target.value;
    this.tdsChange.emit(e);
  }
  // Change event isn't a composed:true by default in for input
  handleChange(e) {
    this.tdsChange.emit(e);
  }
  /** Set the input as focus when clicking the whole Datetime with suffix/prefix */
  handleFocusClick(e) {
    this.textInput.focus();
    this.tdsFocus.emit(e);
  }
  /** Set the input as focus when clicking the whole Datetime with suffix/prefix */
  handleBlur(e) {
    this.textInput.blur();
    this.tdsBlur.emit(e);
  }
  render() {
    let className = ' tds-datetime-input';
    if (this.size === 'md') {
      className += `${className}-md`;
    }
    if (this.size === 'sm') {
      className += `${className}-sm`;
    }
    return (h("div", { class: `
        ${this.noMinWidth ? 'tds-form-datetime-nomin' : ''}
        ${this.focusInput ? 'tds-form-datetime tds-datetime-focus' : ' tds-form-datetime'}
        ${this.value.length > 0 ? 'tds-datetime-data' : ''}
        ${this.disabled ? 'tds-form-datetime-disabled' : ''}
        ${this.size === 'md' ? 'tds-form-datetime-md' : ''}
        ${this.size === 'sm' ? 'tds-form-datetime-sm' : ''}
        ${this.state === 'error' || this.state === 'success'
        ? `tds-form-datetime-${this.state}`
        : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}` }, this.label && (h("label", { htmlFor: this.name, class: "tds-datetime-label" }, this.label)), h("div", { onClick: (e) => this.handleFocusClick(e), class: "tds-datetime-container" }, h("div", { class: "tds-datetime-input-container" }, h("input", { ref: (inputEl) => (this.textInput = inputEl), class: className, type: this.type, disabled: this.disabled, value: this.value, min: this.min, max: this.max, autofocus: this.autofocus, name: this.name, onInput: (e) => this.handleInput(e), onBlur: (e) => this.handleBlur(e), onChange: (e) => this.handleChange(e) }), h("div", { class: "datetime-icon icon-datetime-local" }, h("tds-icon", { size: "20px", name: "calendar" })), h("div", { class: "datetime-icon icon-time" }, h("tds-icon", { size: "20px", name: "clock" }))), h("div", { class: "tds-datetime-bar" })), h("div", { class: "tds-datetime-helper" }, this.helper && (h("div", { class: "tds-helper" }, this.state === 'error' && h("tds-icon", { name: "error", size: "16px" }), this.helper)))));
  }
  static get style() { return datetimeCss; }
}, [2, "tds-datetime", {
    "type": [513],
    "value": [513],
    "min": [1],
    "max": [1],
    "defaultValue": [1, "default-value"],
    "disabled": [4],
    "size": [1],
    "noMinWidth": [4, "no-min-width"],
    "modeVariant": [1, "mode-variant"],
    "name": [1],
    "state": [1],
    "autofocus": [4],
    "label": [1],
    "helper": [1],
    "focusInput": [32]
  }, [[0, "focus", "handleFocusIn"], [0, "focusout", "handleFocusOut"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-datetime", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-datetime":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsDatetime$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsDatetime = TdsDatetime$1;
const defineCustomElement = defineCustomElement$1;

export { TdsDatetime, defineCustomElement };
