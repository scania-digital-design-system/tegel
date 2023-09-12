import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { h as hasSlot } from './utils.js';
import { d as defineCustomElement$2 } from './icon.js';

const textFieldCss = ".text-field-input-lg.sc-tds-text-field{all:unset;border-radius:4px 4px 0 0;width:100%;box-sizing:border-box;margin:0;border:none;outline:none;height:100%;color:var(--tds-text-field-color);background-color:var(--tds-text-field-background);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:var(--tds-spacing-element-20) var(--tds-spacing-element-16)}.text-field-input-lg.sc-tds-text-field::placeholder{color:var(--tds-text-field-color)}.text-field-input-lg.sc-tds-text-field:focus::placeholder{color:var(--tds-text-field-placeholder-focus-color)}.text-field-input-lg.sc-tds-text-field:disabled{cursor:not-allowed;background-color:var(--tds-text-field-background-disabled);color:var(--tds-text-field-color-disabled)}.text-field-input-lg.sc-tds-text-field:disabled::placeholder{color:var(--tds-text-field-placeholder-disabled)}.text-field-input-lg.sc-tds-text-field:disabled~.text-field-label-inside.sc-tds-text-field{color:var(--tds-text-field-label-disabled)}.text-field-input-md.sc-tds-text-field{all:unset;border-radius:4px 4px 0 0;width:100%;box-sizing:border-box;margin:0;border:none;outline:none;height:100%;color:var(--tds-text-field-color);background-color:var(--tds-text-field-background);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:var(--tds-spacing-element-16)}.text-field-input-md.sc-tds-text-field::placeholder{color:var(--tds-text-field-color)}.text-field-input-md.sc-tds-text-field:focus::placeholder{color:var(--tds-text-field-placeholder-focus-color)}.text-field-input-md.sc-tds-text-field:disabled{cursor:not-allowed;background-color:var(--tds-text-field-background-disabled);color:var(--tds-text-field-color-disabled)}.text-field-input-md.sc-tds-text-field:disabled::placeholder{color:var(--tds-text-field-placeholder-disabled)}.text-field-input-md.sc-tds-text-field:disabled~.text-field-label-inside.sc-tds-text-field{color:var(--tds-text-field-label-disabled)}.text-field-input-sm.sc-tds-text-field{all:unset;border-radius:4px 4px 0 0;width:100%;box-sizing:border-box;margin:0;border:none;outline:none;height:100%;color:var(--tds-text-field-color);background-color:var(--tds-text-field-background);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);padding:var(--tds-spacing-element-16)}.text-field-input-sm.sc-tds-text-field::placeholder{color:var(--tds-text-field-color)}.text-field-input-sm.sc-tds-text-field:focus::placeholder{color:var(--tds-text-field-placeholder-focus-color)}.text-field-input-sm.sc-tds-text-field:disabled{cursor:not-allowed;background-color:var(--tds-text-field-background-disabled);color:var(--tds-text-field-color-disabled)}.text-field-input-sm.sc-tds-text-field:disabled::placeholder{color:var(--tds-text-field-placeholder-disabled)}.text-field-input-sm.sc-tds-text-field:disabled~.text-field-label-inside.sc-tds-text-field{color:var(--tds-text-field-label-disabled)}.text-field-container.sc-tds-text-field{border-radius:4px 4px 0 0;display:flex;position:relative;height:56px;box-sizing:border-box;background-color:var(--tds-text-field-background);border-bottom:1px solid var(--tds-text-field-border-bottom);transition:border-bottom-color 200ms ease}.text-field-container.sc-tds-text-field:hover{border-bottom-color:var(--tds-text-field-border-bottom-hover)}.form-text-field-md.sc-tds-text-field .text-field-container.sc-tds-text-field{height:48px}.form-text-field-sm.sc-tds-text-field .text-field-container.sc-tds-text-field{height:40px}.text-field-input-container.sc-tds-text-field{position:relative;width:100%}.text-field-data.sc-tds-text-field,.text-field-input.sc-tds-text-field{color:var(--tds-text-field-data-color)}.text-field-label-outside.sc-tds-text-field>*.sc-tds-text-field{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);display:block;margin-bottom:var(--tds-spacing-element-8);color:var(--tds-text-field-label-color)}.text-field-label-inside.sc-tds-text-field{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);position:absolute;pointer-events:none;color:var(--tds-text-field-label-inside-color);left:16px}.form-text-field.sc-tds-text-field{display:block;min-width:208px}.form-text-field-nomin.sc-tds-text-field{min-width:auto}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-lg.sc-tds-text-field{padding-top:var(--tds-spacing-element-24);padding-bottom:15px}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-lg.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field{top:20px}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-lg.sc-tds-text-field::placeholder{color:transparent}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-lg.sc-tds-text-field .sc-tds-text-field::placeholder{color:transparent}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-lg.sc-tds-text-field:focus::placeholder{transition:color 0.35s ease;color:var(--tds-text-field-placeholder-focus-color)}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-md.sc-tds-text-field{padding-top:var(--tds-spacing-element-20);padding-bottom:11px}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-md.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field{top:16px}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-md.sc-tds-text-field::placeholder{color:transparent}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-md.sc-tds-text-field .sc-tds-text-field::placeholder{color:transparent}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-md.sc-tds-text-field:focus::placeholder{transition:color 0.35s ease;color:var(--tds-text-field-placeholder-focus-color)}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-sm.sc-tds-text-field{padding-top:var(--tds-spacing-element-20);padding-bottom:11px}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-sm.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field{top:16px}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-sm.sc-tds-text-field::placeholder{color:transparent}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-sm.sc-tds-text-field .sc-tds-text-field::placeholder{color:transparent}.form-text-field.text-field-container-label-inside.sc-tds-text-field .text-field-input-sm.sc-tds-text-field:focus::placeholder{transition:color 0.35s ease;color:var(--tds-text-field-placeholder-focus-color)}.form-text-field.text-field-container-label-inside.text-field-focus.sc-tds-text-field .text-field-input-sm.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field,.form-text-field.text-field-container-label-inside.text-field-data.sc-tds-text-field .text-field-input-sm.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:0.1s ease all;top:8px}.form-text-field.text-field-container-label-inside.text-field-focus.sc-tds-text-field .text-field-input-md.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field,.form-text-field.text-field-container-label-inside.text-field-data.sc-tds-text-field .text-field-input-md.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:0.1s ease all;top:8px}.form-text-field.text-field-container-label-inside.text-field-focus.sc-tds-text-field .text-field-input-lg.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field,.form-text-field.text-field-container-label-inside.text-field-data.sc-tds-text-field .text-field-input-lg.sc-tds-text-field~.text-field-label-inside.sc-tds-text-field{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:0.1s ease all;top:12px}.text-field-bar.sc-tds-text-field{position:absolute;width:100%}.text-field-bar.sc-tds-text-field::before,.text-field-bar.sc-tds-text-field::after{content:\"\";height:2px;top:54px;width:0;position:absolute;background:var(--tds-text-field-bar);transition:0.35s ease all}.form-text-field-md.sc-tds-text-field .text-field-bar.sc-tds-text-field::before,.form-text-field-md.sc-tds-text-field .text-field-bar.sc-tds-text-field::after{top:46px}.form-text-field-sm.sc-tds-text-field .text-field-bar.sc-tds-text-field::before,.form-text-field-sm.sc-tds-text-field .text-field-bar.sc-tds-text-field::after{top:40px}.text-field-bar.sc-tds-text-field::before{left:50%}.text-field-bar.sc-tds-text-field::after{right:50%}.text-field-focus.sc-tds-text-field .text-field-bar.sc-tds-text-field::before,.text-field-focus.sc-tds-text-field .text-field-bar.sc-tds-text-field::after{width:50%}.text-field-helper.sc-tds-text-field{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);display:flex;gap:8px;justify-content:space-between;flex-basis:100%;padding-top:var(--tds-spacing-element-4);color:var(--tds-text-field-helper)}.text-field-helper.sc-tds-text-field .text-field-textcounter.sc-tds-text-field{margin-left:auto}.form-text-field-disabled.sc-tds-text-field .text-field-container.sc-tds-text-field{border-bottom-color:transparent}.form-text-field-disabled.sc-tds-text-field .text-field-slot-wrap-prefix.sc-tds-text-field>*.sc-tds-text-field,.form-text-field-disabled.sc-tds-text-field .text-field-slot-wrap-suffix.sc-tds-text-field>*.sc-tds-text-field{color:var(--tds-text-field-ps-color-disabled)}.form-text-field-disabled.sc-tds-text-field .text-field-label-outside.sc-tds-text-field>*.sc-tds-text-field{color:var(--tds-text-field-label-disabled)}.text-field-icon__readonly.sc-tds-text-field{display:none;position:absolute;right:18px;top:18px;color:var(--tds-text-field-icon-read-only-label-color)}.text-field-icon__readonly-label.sc-tds-text-field{display:none;position:absolute;right:18px;top:48px;font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);padding:8px;white-space:nowrap;border-radius:4px 0 4px 4px;background-color:var(--tds-text-field-icon-read-only-label-background)}.form-text-field-readonly.sc-tds-text-field{pointer-events:none}.form-text-field-readonly.sc-tds-text-field .text-field-icon__readonly.sc-tds-text-field{display:block}.form-text-field-readonly.sc-tds-text-field .text-field-icon__readonly.sc-tds-text-field:hover~.text-field-icon__readonly-label.sc-tds-text-field{display:block}.form-text-field-readonly.sc-tds-text-field .text-field-input.sc-tds-text-field{padding-right:54px;background-color:transparent}.form-text-field-success.sc-tds-text-field .text-field-container.sc-tds-text-field{border-bottom-color:var(--tds-text-field-border-bottom-success)}.form-text-field-error.sc-tds-text-field .text-field-helper.sc-tds-text-field{color:var(--tds-text-field-helper-error)}.form-text-field-error.sc-tds-text-field .text-field-container.sc-tds-text-field{border-bottom-color:var(--tds-text-field-border-bottom-error)}.form-text-field-error.sc-tds-text-field .text-field-bar.sc-tds-text-field::before,.form-text-field-error.sc-tds-text-field .text-field-bar.sc-tds-text-field::after{background:var(--tds-text-field-bar-error)}.text-field-helper-error-state.sc-tds-text-field{display:flex;gap:8px;flex-wrap:nowrap}.text-field-textcounter.sc-tds-text-field{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);color:var(--tds-text-field-textcounter);float:right}.text-field-textcounter.sc-tds-text-field .text-field-textcounter-divider.sc-tds-text-field{color:var(--tds-text-field-textcounter-divider)}.text-field-slot-wrap-prefix.sc-tds-text-field,.text-field-slot-wrap-suffix.sc-tds-text-field{align-self:center;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);margin:0 0 0 14px;color:var(--tds-text-field-ps-color)}.text-field-slot-wrap-prefix.sc-tds-text-field-s>:not(tds-icon),.text-field-slot-wrap-suffix.sc-tds-text-field-s>:not(tds-icon){margin:0 0 0 2px}.text-field-slot-wrap-prefix.text-field-error.sc-tds-text-field,.text-field-slot-wrap-suffix.text-field-error.sc-tds-text-field{color:var(--tds-text-field-ps-color-error)}.text-field-slot-wrap-suffix.sc-tds-text-field{margin:0 14px 0 0}.text-field-slot-wrap-suffix.sc-tds-text-field-s>:not(tds-icon){margin:0 2px 0 0}";

const TdsTextField$1 = /*@__PURE__*/ proxyCustomElement(class TdsTextField extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.tdsInput = createEvent(this, "tdsInput", 6);
    this.tdsFocus = createEvent(this, "tdsFocus", 6);
    this.tdsBlur = createEvent(this, "tdsBlur", 6);
    this.type = 'text';
    this.labelPosition = 'no-label';
    this.label = '';
    this.helper = undefined;
    this.placeholder = '';
    this.value = '';
    this.disabled = false;
    this.readOnly = false;
    this.size = 'lg';
    this.modeVariant = null;
    this.noMinWidth = false;
    this.name = '';
    this.state = 'default';
    this.maxLength = undefined;
    this.autofocus = false;
    this.focusInput = undefined;
  }
  handleChange(event) {
    this.tdsChange.emit(event);
  }
  // Data input event in value prop
  handleInput(event) {
    this.tdsInput.emit(event);
    this.value = event.target.value;
  }
  /** Set the input as focus when clicking the whole Text Field with suffix/prefix */
  handleFocus(event) {
    this.textInput.focus();
    this.focusInput = true;
    this.tdsFocus.emit(event);
  }
  /** Set the input as focus when clicking the whole Text Field with suffix/prefix */
  handleBlur(event) {
    this.focusInput = false;
    this.tdsBlur.emit(event);
  }
  render() {
    var _a;
    const usesPrefixSlot = hasSlot('prefix', this.host);
    const usesSuffixSlot = hasSlot('suffix', this.host);
    return (h("div", { class: `
        ${this.noMinWidth ? 'form-text-field-nomin' : ''}
        ${this.focusInput && !this.disabled
        ? 'form-text-field text-field-focus'
        : ' form-text-field'}
        ${this.value ? 'text-field-data' : ''}
        ${this.labelPosition === 'inside' && this.size !== 'sm'
        ? 'text-field-container-label-inside'
        : ''}
        ${this.disabled ? 'form-text-field-disabled' : ''}
        ${this.readOnly ? 'form-text-field-readonly' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}
        ${this.size === 'md' ? 'form-text-field-md' : ''}
        ${this.size === 'sm' ? 'form-text-field-sm' : ''}
        ${this.state === 'error' || this.state === 'success' ? `form-text-field-${this.state}` : ''}
        ` }, this.labelPosition === 'outside' && (h("div", { class: "text-field-label-outside" }, h("div", null, this.label))), h("div", { onClick: () => this.textInput.focus(), class: "text-field-container" }, usesPrefixSlot && (h("div", { class: `text-field-slot-wrap-prefix text-field-${this.state}` }, h("slot", { name: "prefix" }))), h("div", { class: "text-field-input-container" }, h("input", { ref: (inputEl) => (this.textInput = inputEl), class: `text-field-input text-field-input-${this.size}`, type: this.type, disabled: this.disabled, readonly: this.readOnly, placeholder: this.placeholder, value: this.value, autofocus: this.autofocus, maxlength: this.maxLength, name: this.name, onInput: (event) => this.handleInput(event), onChange: (event) => this.handleChange(event), onFocus: (event) => {
        if (!this.readOnly) {
          this.handleFocus(event);
        }
      }, onBlur: (event) => {
        if (!this.readOnly) {
          this.handleBlur(event);
        }
      } }), this.labelPosition === 'inside' && this.size !== 'sm' && (h("label", { class: "text-field-label-inside" }, this.label))), h("div", { class: "text-field-bar" }), usesSuffixSlot && (h("div", { class: `text-field-slot-wrap-suffix text-field-${this.state}` }, h("slot", { name: "suffix" }))), h("span", { class: "text-field-icon__readonly" }, h("tds-icon", { name: "edit_inactive", size: "20px" })), h("span", { class: "text-field-icon__readonly-label" }, "This field is non-editable")), h("div", { class: "text-field-helper" }, this.state === 'error' && (h("div", { class: "text-field-helper-error-state" }, h("tds-icon", { name: "error", size: "16px" }), this.helper)), this.state !== 'error' && this.helper, this.maxLength > 0 && (h("div", { class: "text-field-textcounter" }, this.value === null ? 0 : (_a = this.value) === null || _a === void 0 ? void 0 : _a.length, h("span", { class: "text-field-textcounter-divider" }, " / "), this.maxLength)))));
  }
  get host() { return this; }
  static get style() { return textFieldCss; }
}, [6, "tds-text-field", {
    "type": [513],
    "labelPosition": [1, "label-position"],
    "label": [1],
    "helper": [1],
    "placeholder": [1],
    "value": [513],
    "disabled": [4],
    "readOnly": [4, "read-only"],
    "size": [1],
    "modeVariant": [1, "mode-variant"],
    "noMinWidth": [4, "no-min-width"],
    "name": [1],
    "state": [1],
    "maxLength": [2, "max-length"],
    "autofocus": [4],
    "focusInput": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-text-field", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-text-field":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTextField$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsTextField = TdsTextField$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTextField, defineCustomElement };
