import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './checkbox.js';
import { d as defineCustomElement$2 } from './icon.js';

const dropdownOptionCss = ":host{display:block;background-color:var(--tds-dropdown-option-background)}:host .dropdown-option{display:flex;align-items:center;color:var(--tds-dropdown-option-color);border-bottom:1px solid var(--tds-dropdown-option-border);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls)}:host .dropdown-option.selected{background-color:var(--tds-dropdown-option-background-selected)}:host .dropdown-option.disabled{color:var(--tds-dropdown-option-color-disabled)}:host .dropdown-option.lg{height:47px}:host .dropdown-option.md{height:47px}:host .dropdown-option.sm{height:39px}:host .dropdown-option button{all:unset;width:100%;height:100%}:host .dropdown-option button .single-select{display:flex;align-items:center;justify-content:space-between;padding:0 16px}:host .dropdown-option button:focus{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .dropdown-option .multiselect{width:100%;height:100%}:host .dropdown-option .multiselect tds-checkbox{display:flex;height:100%;width:100%;padding:0 16px}:host .dropdown-option:hover{background-color:var(--tds-dropdown-option-background-hover);cursor:pointer}:host .dropdown-option:hover.disabled{background-color:var(--tds-dropdown-option-background);cursor:not-allowed}:host([hidden]){display:none}";

const TdsDropdownOption$1 = /*@__PURE__*/ proxyCustomElement(class TdsDropdownOption extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsSelect = createEvent(this, "tdsSelect", 6);
    this.tdsFocus = createEvent(this, "tdsFocus", 6);
    this.tdsBlur = createEvent(this, "tdsBlur", 6);
    this.componentWillRender = () => {
      this.parentElement =
        this.host.parentElement.tagName === 'TDS-DROPDOWN'
          ? this.host.parentElement
          : this.host.getRootNode().host;
      this.multiselect = this.parentElement.multiselect;
      this.size = this.parentElement.size;
      this.label = this.host.textContent.trim();
    };
    this.handleSingleSelect = () => {
      if (!this.disabled) {
        this.selected = true;
        this.parentElement.setValue(this.value, this.label);
        this.parentElement.close();
        this.tdsSelect.emit({
          value: this.value,
          selected: this.selected,
        });
      }
    };
    this.handleMultiselect = (event) => {
      if (!this.disabled) {
        if (event.detail.checked) {
          this.parentElement.setValue(this.value, this.label);
          this.selected = true;
          this.tdsSelect.emit({
            value: this.value,
            selected: this.selected,
          });
        }
        else {
          this.parentElement.removeValue(this.value);
          this.selected = false;
          this.tdsSelect.emit({
            value: this.value,
            selected: this.selected,
          });
        }
      }
    };
    this.handleFocus = (event) => {
      this.tdsFocus.emit(event);
    };
    this.handleBlur = (event) => {
      this.tdsBlur.emit(event);
    };
    this.value = undefined;
    this.disabled = false;
    this.selected = false;
    this.multiselect = undefined;
    this.size = 'lg';
  }
  /** Method to select/deselect an option. */
  async setSelected(selected) {
    this.selected = selected;
  }
  render() {
    return (h(Host, { role: "option", "aria-disabled": this.disabled, "aria-selected": this.selected }, h("div", { class: `dropdown-option 
          ${this.size}
          ${this.selected ? 'selected' : ''}
          ${this.disabled ? 'disabled' : ''}
          ` }, this.multiselect ? (h("div", { class: "multiselect", onKeyDown: (event) => {
        if (event.key === 'Escape') {
          this.parentElement.close();
        }
      } }, h("tds-checkbox", { onTdsChange: (event) => {
        this.handleMultiselect(event);
      }, disabled: this.disabled, checked: this.selected }, h("div", { slot: "label" }, h("slot", null))))) : (h("button", { onClick: () => {
        this.handleSingleSelect();
      }, onFocus: (event) => this.handleFocus(event), onBlur: (event) => this.handleBlur(event), disabled: this.disabled }, h("div", { class: "single-select" }, h("slot", null), this.selected && h("tds-icon", { name: "tick", size: "16px" })))))));
  }
  static get delegatesFocus() { return true; }
  get host() { return this; }
  static get style() { return dropdownOptionCss; }
}, [17, "tds-dropdown-option", {
    "value": [1],
    "disabled": [4],
    "selected": [32],
    "multiselect": [32],
    "size": [32],
    "setSelected": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-dropdown-option", "tds-checkbox", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-dropdown-option":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsDropdownOption$1);
      }
      break;
    case "tds-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsDropdownOption = TdsDropdownOption$1;
const defineCustomElement = defineCustomElement$1;

export { TdsDropdownOption, defineCustomElement };
