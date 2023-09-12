import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { e as inheritAttributes } from './utils.js';
import { d as defineCustomElement$1 } from './popover-core.js';

const popoverCanvasCss = ".tds-popover-canvas.sc-tds-popover-canvas{box-sizing:border-box;display:inline-block;color:var(--tds-popover-canvas-color);background-color:var(--tds-popover-canvas-background);box-shadow:0 3px 3px rgba(0, 0, 0, 0.15), 0 -1px 1px rgba(0, 0, 0, 0.1);border-radius:4px;z-index:900}.tds-popover-canvas.sc-tds-popover-canvas *.sc-tds-popover-canvas{box-sizing:border-box}";

const TdsPopoverCanvas = /*@__PURE__*/ proxyCustomElement(class TdsPopoverCanvas extends HTMLElement {
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
    this.modifiers = [];
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.host, ['style', 'class']);
  }
  render() {
    var _a;
    return (h(Host, null, h("tds-popover-core", Object.assign({}, this.inheritedAttributes, { class: {
        'tds-popover-canvas': true,
        [(_a = this.inheritedAttributes.class) !== null && _a !== void 0 ? _a : '']: true,
      }, selector: this.selector, referenceEl: this.referenceEl, show: this.show, placement: this.placement, offsetSkidding: this.offsetSkidding, offsetDistance: this.offsetDistance, modifiers: this.modifiers, trigger: 'click' }), h("div", null, h("slot", null)))));
  }
  get host() { return this; }
  static get style() { return popoverCanvasCss; }
}, [6, "tds-popover-canvas", {
    "selector": [1],
    "referenceEl": [16],
    "show": [4],
    "placement": [1],
    "offsetSkidding": [2, "offset-skidding"],
    "offsetDistance": [2, "offset-distance"],
    "modifiers": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-popover-canvas", "tds-popover-core"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-popover-canvas":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsPopoverCanvas);
      }
      break;
    case "tds-popover-core":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TdsPopoverCanvas as T, defineCustomElement as d };
