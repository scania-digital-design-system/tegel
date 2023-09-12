import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';

const radioButtonCss = ".sc-tds-radio-button:root,.tds-mode-light.sc-tds-radio-button{--tds-radio-button-color:var(--tds-grey-958);--tds-radio-button-interaction-01:var(--tds-blue-800);--tds-radio-button-interaction-02:var(--tds-white);--tds-radio-button-background-hover:var(--tds-blue-800);--tds-radio-button-background-focus:var(--tds-blue-800);--tds-radio-button-disabled:var(--tds-grey-600);--tds-radio-button-border-color-disabled-after:var(--tds-grey-500);--tds-radio-button-color-disabled-after:var(--tds-grey-700);--tds-radio-button-color-disabled-before:var(--tds-grey-700)}.tds-mode-dark.sc-tds-radio-button{--tds-radio-button-color:var(--tds-white);--tds-radio-button-interaction-01:var(--tds-white);--tds-radio-button-interaction-02:var(--tds-grey-958);--tds-radio-button-background-hover:var(--tds-white);--tds-radio-button-background-focus:var(--tds-white);--tds-radio-button-disabled:var(--tds-grey-600);--tds-radio-button-border-color-disabled-after:var(--tds-grey-700);--tds-radio-button-color-disabled-after:var(--tds-grey-700)}.tds-radio-button.sc-tds-radio-button{box-sizing:border-box;display:flex;align-items:center;margin-left:-4px;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-radio-button-color)}.tds-radio-button.sc-tds-radio-button *.sc-tds-radio-button{box-sizing:border-box}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button{appearance:none;outline:none;margin:0;border:0;width:24px;height:24px;border-radius:50%;position:relative;cursor:pointer;flex-shrink:0;align-self:flex-start}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button+label.sc-tds-radio-button{padding:var(--tds-spacing-element-4) 0 var(--tds-spacing-element-4) var(--tds-spacing-element-4);cursor:pointer}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button::before,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button::after{content:\"\";position:absolute;border-radius:50%;box-sizing:border-box}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button::before{width:24px;height:24px;left:0;top:0}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button::after{border:1px solid var(--tds-radio-button-interaction-01);background-color:var(--tds-radio-button-interaction-02);width:16px;height:16px;left:4px;top:4px}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:hover::before{background-color:var(--tds-radio-button-background-hover);opacity:0.12}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:focus::before{background-color:var(--tds-radio-button-background-focus);opacity:0.24;animation:rb-focus 0.4s cubic-bezier(0.65, 0.05, 0.38, 0.95) forwards}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:disabled,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].disabled.sc-tds-radio-button{cursor:not-allowed}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:disabled::after,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].disabled.sc-tds-radio-button::after{border-color:var(--tds-radio-button-border-color-disabled-after);background-color:var(--tds-radio-button-interaction-02)}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:disabled+label.sc-tds-radio-button,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].disabled.sc-tds-radio-button+label.sc-tds-radio-button{color:var(--tds-radio-button-disabled);cursor:not-allowed}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:disabled:hover::before,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].disabled.sc-tds-radio-button:hover::before{display:none;opacity:1}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:checked::after{border:4px solid var(--tds-radio-button-interaction-01)}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:checked:disabled:hover::before,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:checked:disabled::before,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:checked.disabled:hover::before,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:checked.disabled::before{display:block;width:16px;height:16px;left:4px;top:4px;border:1px solid var(--tds-radio-button-color-disabled-before);box-sizing:content-box}.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:checked:disabled::after,.tds-radio-button.sc-tds-radio-button .tds-form-input[type=radio].sc-tds-radio-button:checked.disabled::after{border:4px solid var(--tds-radio-button-interaction-02);background-color:var(--tds-radio-button-color-disabled-after);left:5px;top:5px}@keyframes rb-focus{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:0.24}}";

const TdsRadioButton$1 = /*@__PURE__*/ proxyCustomElement(class TdsRadioButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.handleChange = () => {
      this.tdsChange.emit({
        radioId: this.radioId,
        value: this.value,
      });
    };
    this.name = undefined;
    this.value = undefined;
    this.radioId = generateUniqueId();
    this.checked = false;
    this.required = false;
    this.disabled = false;
  }
  render() {
    return (h("div", { class: "tds-radio-button" }, h("input", { class: "tds-form-input", type: "radio", name: this.name, id: this.radioId, value: this.value, checked: this.checked, "aria-checked": this.checked, required: this.required, disabled: this.disabled, onChange: () => this.handleChange() }), h("label", { htmlFor: this.radioId }, h("slot", { name: "label" }))));
  }
  get host() { return this; }
  static get style() { return radioButtonCss; }
}, [6, "tds-radio-button", {
    "name": [1],
    "value": [1],
    "radioId": [1, "radio-id"],
    "checked": [516],
    "required": [4],
    "disabled": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-radio-button"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-radio-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsRadioButton$1);
      }
      break;
  } });
}

const TdsRadioButton = TdsRadioButton$1;
const defineCustomElement = defineCustomElement$1;

export { TdsRadioButton, defineCustomElement };
