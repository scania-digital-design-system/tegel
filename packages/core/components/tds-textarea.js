import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const textareaCss = ".textarea-container.sc-tds-textarea{border-radius:4px 4px 0 0;position:relative;box-sizing:border-box;height:auto;width:100%;min-width:208px;display:inline-flex;background-color:transparent;flex-flow:row wrap;border-bottom:0}.textarea-container.no-min-width.sc-tds-textarea{min-width:unset}.textarea-container.sc-tds-textarea .textarea-wrapper.sc-tds-textarea{position:relative;width:unset;min-width:100%}.textarea-container.sc-tds-textarea:not(.textarea-disabled) .textarea-wrapper.sc-tds-textarea::before,.textarea-container.sc-tds-textarea:not(.textarea-disabled) .textarea-wrapper.sc-tds-textarea::after{content:\"\";height:2px;width:0;position:absolute;background:var(--tds-textarea-bar);transition:0.35s ease all}.textarea-container.sc-tds-textarea:not(.textarea-disabled) .textarea-wrapper.sc-tds-textarea::before{left:50%}.textarea-container.sc-tds-textarea:not(.textarea-disabled) .textarea-wrapper.sc-tds-textarea::after{right:50%}.textarea-container.sc-tds-textarea:not(.textarea-disabled) .textarea-wrapper.sc-tds-textarea::after,.textarea-container.sc-tds-textarea:not(.textarea-disabled) .textarea-wrapper.sc-tds-textarea::before{top:calc(100% - 2px)}.textarea-input.sc-tds-textarea{border-radius:4px 4px 0 0;width:100%;box-sizing:border-box;margin:0;border:none;outline:none;height:100%;color:var(--tds-textarea-color);background-color:var(--tds-textarea-background);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:var(--tds-spacing-element-20) var(--tds-spacing-element-16);display:block;resize:vertical;border-bottom:1px solid var(--tds-textarea-border-bottom);transition:border-bottom-color 200ms ease}.textarea-input.sc-tds-textarea::placeholder{opacity:1;color:var(--tds-textarea-placeholder)}.textarea-input.sc-tds-textarea:focus::placeholder{color:var(--tds-textarea-placeholder-focus-color)}.textarea-input.sc-tds-textarea:disabled{background-color:var(--tds-textarea-disabled-background);color:var(--tds-textarea-disabled-color);cursor:not-allowed}.textarea-input.sc-tds-textarea:disabled::placeholder{color:var(--tds-textarea-disabled-placeholder)}.textarea-input.sc-tds-textarea:disabled~.textfield-label-inside.sc-tds-textarea{color:var(--tds-textarea-disabled-label)}.textarea-input.sc-tds-textarea::-webkit-resizer{display:none}.textarea-input.sc-tds-textarea:hover{border-bottom-color:var(--tds-textarea-border-bottom-hover)}.textarea-resizer-icon.sc-tds-textarea{color:var(--tds-textarea-resize-icon);position:absolute;display:block;bottom:2px;right:1px;padding-bottom:2px;padding-right:2px;pointer-events:none;background-color:var(--tds-textarea-background)}.textarea-resizer-icon.sc-tds-textarea svg.sc-tds-textarea{display:block}.textarea-label.sc-tds-textarea{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);display:block;z-index:1;margin-bottom:var(--tds-spacing-element-8);color:var(--tds-textarea-label-color)}.textarea-container.textarea-label-inside.sc-tds-textarea .textarea-label.sc-tds-textarea{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);transition:0.1s ease all;color:var(--tds-textarea-label-inside-color);position:absolute;top:var(--tds-spacing-element-20);left:var(--tds-spacing-element-16)}.textarea-container.textarea-label-inside.sc-tds-textarea .textarea-input.sc-tds-textarea::placeholder{color:transparent}.textarea-container.textarea-label-inside.sc-tds-textarea .textarea-input.sc-tds-textarea .sc-tds-textarea::placeholder{color:transparent}.textarea-container.textarea-label-inside.sc-tds-textarea .textarea-input.sc-tds-textarea:focus::placeholder{transition:color 0.35s ease;color:var(--tds-textarea-placeholder-focus-color)}.textarea-container.textarea-focus.textarea-label-inside.sc-tds-textarea .textarea-label.sc-tds-textarea{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);top:var(--tds-spacing-element-8)}.textarea-container.textarea-focus.sc-tds-textarea .textarea-wrapper.sc-tds-textarea::before,.textarea-container.textarea-focus.sc-tds-textarea .textarea-wrapper.sc-tds-textarea::after{width:50%}.textarea-container.textarea-data.textarea-label-inside.sc-tds-textarea .textarea-label.sc-tds-textarea{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);top:var(--tds-spacing-element-8)}.textarea-textcounter.sc-tds-textarea{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);color:var(--tds-textarea-textcounter);float:right;flex-basis:100%;text-align:right;padding-top:var(--tds-spacing-element-4)}.textarea-textcounter.sc-tds-textarea .textfield-textcounter-divider.sc-tds-textarea{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);color:var(--tds-textarea-textcounter-divider)}.textarea-helper.sc-tds-textarea{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);display:flex;gap:8px;align-items:center;padding-top:var(--tds-spacing-element-4);color:var(--tds-textarea-helper);flex-grow:2;flex-basis:auto}.textarea-helper.sc-tds-textarea~.textarea-textcounter.sc-tds-textarea{flex-basis:auto}.textarea-success.sc-tds-textarea .textarea-input.sc-tds-textarea{border-bottom-color:var(--tds-textarea-border-bottom-success)}.textarea-error.sc-tds-textarea .textarea-input.sc-tds-textarea{border-bottom-color:var(--tds-textarea-border-bottom-error)}.textarea-error.sc-tds-textarea .textarea-wrapper.sc-tds-textarea::after,.textarea-error.sc-tds-textarea .textarea-wrapper.sc-tds-textarea::before{background:var(--tds-textarea-bar-error)}.textarea-error.sc-tds-textarea .textarea-helper.sc-tds-textarea{color:var(--tds-textarea-helper-error)}.textarea-disabled.sc-tds-textarea .textarea-input.sc-tds-textarea{border-bottom-color:transparent}.textarea-disabled.sc-tds-textarea .textarea-label.sc-tds-textarea{color:var(--tds-textarea-disabled-label)}.textarea-icon__readonly.sc-tds-textarea{display:none;position:absolute;right:18px;top:18px;color:var(--tds-textarea-icon-read-only-color)}.textarea-icon__readonly-label.sc-tds-textarea{display:none;position:absolute;right:18px;top:48px;font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);padding:8px;color:var(--tds-textarea-icon-read-only-label-color);background-color:var(--tds-textarea-icon-read-only-label-background);white-space:nowrap;border-radius:4px 0 4px 4px}.textarea-readonly.sc-tds-textarea{pointer-events:none}.textarea-readonly.sc-tds-textarea .textarea-icon__readonly.sc-tds-textarea{display:block}.textarea-readonly.sc-tds-textarea .textarea-icon__readonly.sc-tds-textarea:hover~.textarea-icon__readonly-label.sc-tds-textarea{display:block}.textarea-readonly.sc-tds-textarea .textfield-input.sc-tds-textarea{padding-right:54px;background-color:transparent}.textarea-readonly.sc-tds-textarea .textfield-container.sc-tds-textarea{background-color:transparent}";

const TdsTextarea$1 = /*@__PURE__*/ proxyCustomElement(class TdsTextarea extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.tdsBlur = createEvent(this, "tdsBlur", 6);
    this.tdsInput = createEvent(this, "tdsInput", 6);
    this.tdsFocus = createEvent(this, "tdsFocus", 6);
    this.label = '';
    this.name = '';
    this.helper = undefined;
    this.cols = undefined;
    this.rows = undefined;
    this.labelPosition = 'no-label';
    this.placeholder = '';
    this.value = '';
    this.disabled = false;
    this.readOnly = false;
    this.state = 'default';
    this.maxLength = undefined;
    this.modeVariant = null;
    this.autofocus = false;
    this.noMinWidth = false;
    this.focusInput = undefined;
  }
  handleChange(event) {
    this.tdsChange.emit(event);
  }
  handleBlur(event) {
    this.tdsBlur.emit(event);
    this.focusInput = false;
  }
  // Data input event in value prop
  handleInput(event) {
    this.tdsInput.emit(event);
    this.value = event.target.value;
  }
  /* Set the input as focus when clicking the whole textarea with suffix/prefix */
  handleFocus(event) {
    this.textEl.focus();
    this.focusInput = true;
    this.tdsFocus.emit(event);
  }
  render() {
    var _a;
    return (h("div", { class: `
        textarea-container
        ${this.labelPosition === 'inside' ? 'textarea-label-inside' : ''}
        ${this.focusInput ? 'textarea-focus' : ''}
        ${this.disabled ? 'textarea-disabled' : ''}
        ${this.readOnly ? 'textarea-readonly' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}
        ${this.value ? 'textarea-data' : ''}
        ${this.state === 'error' || this.state === 'success' ? `textarea-${this.state}` : ''}
        ${this.noMinWidth ? 'no-min-width' : ''}
        ` }, this.labelPosition !== 'no-label' && h("span", { class: 'textarea-label' }, this.label), h("div", { class: "textarea-wrapper" }, h("textarea", { class: 'textarea-input', ref: (inputEl) => (this.textEl = inputEl), disabled: this.disabled, readonly: this.readOnly, placeholder: this.placeholder, value: this.value, name: this.name, autofocus: this.autofocus, maxlength: this.maxLength, cols: this.cols, rows: this.rows, onFocus: (event) => {
        if (!this.readOnly) {
          this.handleFocus(event);
        }
      }, onBlur: (event) => {
        if (!this.readOnly) {
          this.handleBlur(event);
        }
      }, onInput: (event) => this.handleInput(event), onChange: (event) => this.handleChange(event) }), h("span", { class: "textarea-resizer-icon" }, h("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.8536 0.853553C12.0488 0.658291 12.0488 0.341709 11.8536 0.146447C11.6583 -0.0488155 11.3417 -0.0488155 11.1464 0.146447L0.146447 11.1464C-0.0488155 11.3417 -0.0488155 11.6583 0.146447 11.8536C0.341709 12.0488 0.658291 12.0488 0.853553 11.8536L11.8536 0.853553ZM11.8536 4.64645C12.0488 4.84171 12.0488 5.15829 11.8536 5.35355L5.35355 11.8536C5.15829 12.0488 4.84171 12.0488 4.64645 11.8536C4.45118 11.6583 4.45118 11.3417 4.64645 11.1464L11.1464 4.64645C11.3417 4.45118 11.6583 4.45118 11.8536 4.64645ZM11.8536 8.64645C12.0488 8.84171 12.0488 9.15829 11.8536 9.35355L9.35355 11.8536C9.15829 12.0488 8.84171 12.0488 8.64645 11.8536C8.45118 11.6583 8.45118 11.3417 8.64645 11.1464L11.1464 8.64645C11.3417 8.45118 11.6583 8.45118 11.8536 8.64645Z", fill: "currentColor" }))), h("span", { class: "textarea-icon__readonly" }, h("tds-icon", { name: "edit_inactive" })), h("span", { class: "textarea-icon__readonly-label" }, "This field is non-editable")), h("span", { class: 'textarea-helper' }, this.state === 'error' && h("tds-icon", { name: "error", size: "16px" }), this.helper), this.maxLength > 0 && (h("div", { class: 'textarea-textcounter' }, this.value === null ? 0 : (_a = this.value) === null || _a === void 0 ? void 0 : _a.length, h("span", { class: "textfield-textcounter-divider" }, " / "), " ", this.maxLength))));
  }
  static get style() { return textareaCss; }
}, [2, "tds-textarea", {
    "label": [1],
    "name": [1],
    "helper": [1],
    "cols": [2],
    "rows": [2],
    "labelPosition": [1, "label-position"],
    "placeholder": [1],
    "value": [1],
    "disabled": [4],
    "readOnly": [4, "read-only"],
    "state": [1],
    "maxLength": [2, "max-length"],
    "modeVariant": [1, "mode-variant"],
    "autofocus": [4],
    "noMinWidth": [4, "no-min-width"],
    "focusInput": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-textarea", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-textarea":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTextarea$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsTextarea = TdsTextarea$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTextarea, defineCustomElement };
