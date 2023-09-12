import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';

const toggleCss = ".tds-toggle.sc-tds-toggle .toggle-headline.sc-tds-toggle{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-toggle-headline);margin-bottom:12px}.tds-toggle.sc-tds-toggle .toggle-headline.disabled.sc-tds-toggle{color:var(--tds-toggle-headline-disabled)}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle{appearance:initial;margin:0;width:44px;height:24px;position:relative;display:inline-block;vertical-align:middle}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle::after,.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle::before{content:\"\";position:absolute;box-sizing:border-box;transition:all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle::before{width:44px;height:24px;border-radius:16px;background-color:var(--tds-toggle-off-slider);left:0}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle::after{width:16px;height:16px;background-color:var(--tds-toggle-switch);border-radius:50%;left:4px;top:4px}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:focus{outline:none}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:focus::before{background-color:var(--tds-toggle-off-slider-focus);border:1px solid var(--tds-toggle-off-border-focus)}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:checked::before{background-color:var(--tds-toggle-on-slider);border:1px solid var(--tds-toggle-on-border-focus)}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:checked::after{left:24px}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:disabled::before{background-color:var(--tds-toggle-slider-disabled);border:1px solid var(--tds-toggle-slider-disabled)}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:disabled::after{background-color:var(--tds-toggle-switch-disabled)}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:disabled:checked::before{background-color:var(--tds-toggle-on-slider-disabled);border:1px solid var(--tds-toggle-on-slider-disabled)}.tds-toggle.sc-tds-toggle input[type=checkbox].sc-tds-toggle:disabled:checked::after{background-color:var(--tds-toggle-switch-disabled)}.tds-toggle.sc-tds-toggle input[type=checkbox].sm.sc-tds-toggle{width:28px;height:16px}.tds-toggle.sc-tds-toggle input[type=checkbox].sm.sc-tds-toggle::before{width:28px;height:16px}.tds-toggle.sc-tds-toggle input[type=checkbox].sm.sc-tds-toggle::after{width:8px;height:8px}.tds-toggle.sc-tds-toggle input[type=checkbox].sm.sc-tds-toggle:checked::before{background-color:var(--tds-toggle-on-slider)}.tds-toggle.sc-tds-toggle input[type=checkbox].sm.sc-tds-toggle:checked::after{left:16px}.tds-toggle.sc-tds-toggle input[type=checkbox].sm.sc-tds-toggle:disabled::before{background-color:var(--tds-toggle-slider-disabled);border:1px solid var(--tds-toggle-slider-disabled)}.tds-toggle.sc-tds-toggle input[type=checkbox].sm.sc-tds-toggle:disabled::after{background-color:var(--tds-toggle-switch-disabled)}.tds-toggle.sc-tds-toggle label.sc-tds-toggle{display:inline-block;vertical-align:middle;font:var(--tds-detail-01);letter-spacing:var(--tds-detail-01-ls);color:var(--tds-toggle-label-color);padding-left:8px}.tds-toggle.sc-tds-toggle label.disabled.sc-tds-toggle{color:var(--tds-toggle-label-color-disabled)}";

const TdsToggle$1 = /*@__PURE__*/ proxyCustomElement(class TdsToggle extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsToggle = createEvent(this, "tdsToggle", 6);
    this.handleToggle = () => {
      this.checked = !this.checked;
      this.tdsToggle.emit({
        toggleId: this.toggleId,
        checked: this.checked,
      });
    };
    this.checked = false;
    this.required = false;
    this.size = 'lg';
    this.name = undefined;
    this.headline = undefined;
    this.disabled = false;
    this.toggleId = generateUniqueId();
  }
  /** Toggles the Toggle. */
  async toggle() {
    this.checked = !this.checked;
    return {
      toggleId: this.toggleId,
      checked: this.checked,
    };
  }
  render() {
    return (h("div", { class: "tds-toggle" }, this.headline && (h("div", { class: `toggle-headline ${this.disabled ? 'disabled' : ''}` }, this.headline)), h("input", { "aria-describedby": this.host.getAttribute('aria-describedby'), "aria-labelledby": this.host.getAttribute('aria-labelledby'), "aria-checked": this.checked, "aria-required": this.required, onChange: () => this.handleToggle(), class: `${this.size}`, checked: this.checked, disabled: this.disabled, required: this.required, type: "checkbox", name: this.name, id: this.toggleId, role: "switch" }), h("label", { class: `${this.disabled ? 'disabled' : ''}`, htmlFor: this.toggleId }, h("slot", { name: "label" }))));
  }
  get host() { return this; }
  static get style() { return toggleCss; }
}, [6, "tds-toggle", {
    "checked": [516],
    "required": [4],
    "size": [1],
    "name": [1],
    "headline": [1],
    "disabled": [4],
    "toggleId": [1, "toggle-id"],
    "toggle": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-toggle"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-toggle":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsToggle$1);
      }
      break;
  } });
}

const TdsToggle = TdsToggle$1;
const defineCustomElement = defineCustomElement$1;

export { TdsToggle, defineCustomElement };
