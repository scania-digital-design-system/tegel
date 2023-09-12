import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';

const checkboxCss = ".sc-tds-checkbox-h{align-items:center;position:relative;box-sizing:border-box}.tds-checkbox.sc-tds-checkbox{box-sizing:border-box;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-checkbox-text);display:flex;align-items:center;margin-left:-4px}.tds-checkbox.sc-tds-checkbox *.sc-tds-checkbox{box-sizing:border-box}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox{appearance:none;outline:none;margin:0;border:0;border-radius:2px;width:24px;height:24px;position:relative;cursor:pointer;flex-shrink:0;align-self:flex-start}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox+label.sc-tds-checkbox{color:var(--tds-checkbox-color);padding-left:var(--tds-spacing-element-4);padding-top:var(--tds-spacing-element-4);padding-bottom:var(--tds-spacing-element-4);cursor:pointer;display:flex;align-items:center}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox+label.sc-tds-checkbox::before{content:\"\";position:absolute;width:100%;height:100%;left:0;top:0}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox::before,.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox::after{content:\"\";position:absolute;box-sizing:border-box}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox::before{width:24px;height:24px;left:0;top:0;border-radius:4px}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox::after{border:1px solid var(--tds-checkbox-interaction-01);background-color:var(--tds-checkbox-interaction-02);width:16px;height:16px;left:4px;top:4px;border-radius:2px}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:hover::before{background-color:var(--tds-checkbox-background-hover);opacity:var(--tds-checkbox-background-opacity-hover)}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:focus::before{background-color:var(--tds-checkbox-background-focus);opacity:var(--tds-checkbox-background-opacity-focus);transition:opacity 0.2s ease-in-out}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:disabled,.tds-checkbox.sc-tds-checkbox input[type=checkbox].disabled.sc-tds-checkbox{cursor:not-allowed}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:disabled::after,.tds-checkbox.sc-tds-checkbox input[type=checkbox].disabled.sc-tds-checkbox::after{border-color:var(--tds-checkbox-border-color-disabled-after)}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:disabled+label.sc-tds-checkbox,.tds-checkbox.sc-tds-checkbox input[type=checkbox].disabled.sc-tds-checkbox+label.sc-tds-checkbox{color:var(--tds-grey-600);cursor:not-allowed}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:disabled:hover::before,.tds-checkbox.sc-tds-checkbox input[type=checkbox].disabled.sc-tds-checkbox:hover::before{display:none}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked::after{background-image:var(--tds-checkbox-background-img);background-color:var(--tds-checkbox-interaction-01);background-repeat:no-repeat;background-position:center}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked:hover::before{background-color:var(--tds-checkbox-background-hover);opacity:var(--tds-checkbox-background-opacity-hover)}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked:disabled:hover::before,.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked:disabled::before,.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked.disabled:hover::before,.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked.disabled::before{display:block;width:16px;height:16px;left:4px;top:4px;border:1px solid #b0b7c4}.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked:disabled::after,.tds-checkbox.sc-tds-checkbox input[type=checkbox].sc-tds-checkbox:checked.disabled::after{background-image:var(--tds-checkbox-background-img-disabled);background-color:var(--tds-checkbox-interaction-02);color:var(--tds-checkbox-color-disabled-after)}";

const TdsCheckbox = /*@__PURE__*/ proxyCustomElement(class TdsCheckbox extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.tdsFocus = createEvent(this, "tdsFocus", 6);
    this.tdsBlur = createEvent(this, "tdsBlur", 6);
    this.handleChange = () => {
      this.checked = !this.checked;
      this.tdsChange.emit({
        checkboxId: this.checkboxId,
        checked: this.checked,
        value: this.value,
      });
    };
    this.name = undefined;
    this.checkboxId = generateUniqueId();
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.value = undefined;
  }
  /** Toggles the checked value of the component. */
  async toggleCheckbox() {
    this.checked = !this.checked;
    return {
      checkboxId: this.checkboxId,
      checked: this.checked,
    };
  }
  /** Set the input as focus when clicking the component */
  handleFocus(event) {
    this.tdsFocus.emit(event);
  }
  /** Set the input as blur when clicking outside the component */
  handleBlur(event) {
    this.tdsBlur.emit(event);
  }
  render() {
    return (h("div", { class: "tds-checkbox" }, h("input", { "aria-checked": this.checked, "aria-required": this.required, "aria-describedby": this.host.getAttribute('aria-describedby'), "aria-labelledby": this.host.getAttribute('aria-labelledby'), required: this.required, type: "checkbox", name: this.name, value: this.value, id: this.checkboxId, checked: this.checked, disabled: this.disabled, onFocus: (event) => this.handleFocus(event), onBlur: (event) => this.handleBlur(event), onChange: () => {
        this.handleChange();
      } }), h("label", { htmlFor: this.checkboxId }, h("slot", { name: "label" }))));
  }
  get host() { return this; }
  static get style() { return checkboxCss; }
}, [6, "tds-checkbox", {
    "name": [1],
    "checkboxId": [1, "checkbox-id"],
    "disabled": [4],
    "required": [4],
    "checked": [516],
    "value": [1],
    "toggleCheckbox": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-checkbox"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-checkbox":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsCheckbox);
      }
      break;
  } });
}

export { TdsCheckbox as T, defineCustomElement as d };
