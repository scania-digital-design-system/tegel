import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { e as inheritAttributes } from './utils.js';
import { d as defineCustomElement$2 } from './popover-core.js';

const popoverMenuCss = ".tds-popover-menu.sc-tds-popover-menu{box-sizing:border-box;overflow:hidden;width:160px;background-color:var(--tds-popover-menu-background);padding:16px 6px;box-shadow:0 3px 3px rgba(0, 0, 0, 0.15), 0 -1px 1px rgba(0, 0, 0, 0.1);border-radius:4px;z-index:900}.tds-popover-menu.sc-tds-popover-menu *.sc-tds-popover-menu{box-sizing:border-box}.tds-popover-menu.fluid-width.sc-tds-popover-menu{width:unset}tds-popover-core.sc-tds-popover-menu{padding:6px 0 !important}.sc-tds-popover-menu-s>tds-divider{display:block;padding:6px !important}";

const TdsPopoverMenu$1 = /*@__PURE__*/ proxyCustomElement(class TdsPopoverMenu extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.inheritedAttributes = [];
    this.selector = '';
    this.referenceEl = undefined;
    this.show = null;
    this.placement = 'auto';
    this.offsetSkidding = 0;
    this.offsetDistance = 8;
    this.fluidWidth = false;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.host, ['style', 'class']);
  }
  render() {
    var _a;
    return (h(Host, null, h("tds-popover-core", { class: {
        'tds-popover-menu': true,
        [(_a = this.inheritedAttributes.class) !== null && _a !== void 0 ? _a : '']: true,
        'fluid-width': this.fluidWidth,
      }, selector: this.selector, referenceEl: this.referenceEl, show: this.show, placement: this.placement, offsetSkidding: this.offsetSkidding, offsetDistance: this.offsetDistance }, h("div", { role: "list" }, h("slot", null)))));
  }
  get host() { return this; }
  static get style() { return popoverMenuCss; }
}, [6, "tds-popover-menu", {
    "selector": [1],
    "referenceEl": [16],
    "show": [4],
    "placement": [1],
    "offsetSkidding": [2, "offset-skidding"],
    "offsetDistance": [2, "offset-distance"],
    "fluidWidth": [4, "fluid-width"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-popover-menu", "tds-popover-core"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-popover-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsPopoverMenu$1);
      }
      break;
    case "tds-popover-core":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsPopoverMenu = TdsPopoverMenu$1;
const defineCustomElement = defineCustomElement$1;

export { TdsPopoverMenu, defineCustomElement };
