import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId, i as inheritAriaAttributes } from './utils.js';
import { d as defineCustomElement$7 } from './core-header-item.js';
import { d as defineCustomElement$6 } from './header-item.js';
import { d as defineCustomElement$5 } from './header-launcher-button.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './popover-canvas.js';
import { d as defineCustomElement$2 } from './popover-core.js';

const headerLauncherCss = ":host .wrapper{height:var(--tds-header-height);position:relative}:host .wrapper .menu{flex-direction:column;overflow-y:auto;max-height:calc(100vh - var(--tds-header-height));box-shadow:var(--tds-nav-dropdown-menu-box);background-color:var(--tds-header-app-launcher-menu-background);border-radius:0}:host .wrapper .menu::-webkit-scrollbar{width:4px;background-color:inherit}:host .wrapper .menu::-webkit-scrollbar-thumb{background-color:var(--tds-grey-300)}:host .wrapper .menu ::-webkit-scrollbar-button{height:0;width:0}@media all and (max-width: 384px){:host .wrapper .menu{width:100vw}}:host .wrapper.state-list-type-menu .menu{height:calc(100vh - var(--tds-header-height))}:host .wrapper.state-open .button{position:relative;z-index:901}";

const TdsHeaderLauncher$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncher extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.uuid = generateUniqueId();
    this.open = false;
    this.buttonEl = undefined;
    this.hasListTypeMenu = false;
  }
  onAnyClick(event) {
    // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
    const isClickOutside = !event.composedPath().includes(this.host);
    if (isClickOutside) {
      this.open = false;
    }
  }
  componentDidLoad() {
    const slotElement = this.host.shadowRoot.querySelector('slot:not([name])');
    const slottedElements = slotElement.assignedElements();
    const hasListTypeMenu = slottedElements.some((element) => element.tagName.toLowerCase() === 'tds-header-launcher-list');
    if (hasListTypeMenu) {
      this.hasListTypeMenu = true;
    }
  }
  toggleLauncher() {
    this.open = !this.open;
  }
  render() {
    this.ariaAttributes = Object.assign(Object.assign({}, this.ariaAttributes), inheritAriaAttributes(this.host, ['role']));
    const buttonAttributes = Object.assign(Object.assign({}, this.ariaAttributes), { 'aria-expanded': `${this.open}`, 'aria-controls': `launcher-${this.uuid}`, 'class': 'button', 'active': this.open, 'onClick': () => {
        this.toggleLauncher();
      }, 'ref': (el) => {
        this.buttonEl = el;
      } });
    return (h(Host, null, h("div", { class: {
        'wrapper': true,
        'state-open': this.open,
        'state-list-type-menu': this.hasListTypeMenu,
      } }, h("tds-header-launcher-button", Object.assign({}, buttonAttributes)), this.buttonEl && (h("tds-popover-canvas", { id: `tds-launcher-${this.uuid}`, class: "menu", referenceEl: this.buttonEl, placement: "bottom-start", show: this.open, offsetDistance: 0, modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: [],
          },
        },
      ] }, h("slot", null))))));
  }
  get host() { return this; }
  static get style() { return headerLauncherCss; }
}, [1, "tds-header-launcher", {
    "open": [32],
    "buttonEl": [32],
    "hasListTypeMenu": [32]
  }, [[8, "click", "onAnyClick"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher", "tds-core-header-item", "tds-header-item", "tds-header-launcher-button", "tds-icon", "tds-popover-canvas", "tds-popover-core"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncher$1);
      }
      break;
    case "tds-core-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "tds-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "tds-header-launcher-button":
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

const TdsHeaderLauncher = TdsHeaderLauncher$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderLauncher, defineCustomElement };
