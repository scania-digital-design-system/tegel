import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';
import { d as defineCustomElement$6 } from './core-header-item.js';
import { d as defineCustomElement$5 } from './header-item.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './popover-canvas.js';
import { d as defineCustomElement$2 } from './popover-core.js';

const headerDropdownCss = ":host{height:var(--tds-header-height);position:relative}:host .menu{flex-direction:column;overflow-y:auto;max-height:calc(100vh - var(--tds-header-height));box-shadow:var(--tds-nav-dropdown-menu-box);background-color:var(--tds-header-app-launcher-menu-background);border-top-right-radius:0;border-top-left-radius:0}:host .menu::-webkit-scrollbar{width:4px;background-color:inherit}:host .menu::-webkit-scrollbar-thumb{background-color:var(--tds-grey-300)}:host .menu ::-webkit-scrollbar-button{height:0;width:0}:host .state-open .dropdown-icon{transform:rotatetds-z-index(180deg)}:host .state-open .button{position:relative;z-index:901}";

const TdsHeaderDropdown$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderDropdown extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.uuid = generateUniqueId();
    this.label = undefined;
    this.noDropdownIcon = false;
    this.selected = false;
    this.open = false;
    this.buttonEl = undefined;
  }
  onAnyClick(event) {
    // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
    const isClickOutside = !event.composedPath().includes(this.host);
    if (isClickOutside) {
      this.open = false;
    }
  }
  toggleDropdown() {
    this.open = !this.open;
  }
  render() {
    return (h(Host, null, h("div", { class: {
        'state-open': this.open,
      } }, h("tds-header-item", { class: "button", active: this.open, selected: this.selected }, h("button", { ref: (el) => {
        this.buttonEl = el;
      }, "aria-expanded": `${this.open}`, "aria-controls": `launcher-${this.uuid}`, "aria-current": this.selected ? 'location' : 'false', onClick: () => {
        this.toggleDropdown();
      } }, h("slot", { name: "icon" }), this.label, h("slot", { name: "label" }), !this.noDropdownIcon && (h("tds-icon", { class: "dropdown-icon", name: "chevron_down", size: "16px" })))), this.buttonEl && (h("tds-popover-canvas", { id: `tds-dropdown-${this.uuid}`, class: "menu", referenceEl: this.buttonEl, placement: "bottom-start", show: this.open, offsetDistance: 0, modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: [],
          },
        },
      ] }, h("slot", null))))));
  }
  get host() { return this; }
  static get style() { return headerDropdownCss; }
}, [1, "tds-header-dropdown", {
    "label": [1],
    "noDropdownIcon": [4, "no-dropdown-icon"],
    "selected": [4],
    "open": [32],
    "buttonEl": [32]
  }, [[4, "click", "onAnyClick"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-dropdown", "tds-core-header-item", "tds-header-item", "tds-icon", "tds-popover-canvas", "tds-popover-core"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-dropdown":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderDropdown$1);
      }
      break;
    case "tds-core-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "tds-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "tds-popover-canvas":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "tds-popover-core":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsHeaderDropdown = TdsHeaderDropdown$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderDropdown, defineCustomElement };
