import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const spinnerCss = ":root{--tds-spinner-background:var(--tds-blue-400);--tds-spinner-background-inverted:var(--tds-white);--tds-spinner-speed:1.8s;--tds-spinner-speed-lg:2s;--tds-spinner-radius-xs:8px;--tds-spinner-radius-sm:12px;--tds-spinner-radius-md:26px;--tds-spinner-radius-lg:42px;--tds-spinner-radius:var(--tds-spinner-radius-lg);--tds-spinner-stroke-width-xs:3px;--tds-spinner-stroke-width-sm:4px;--tds-spinner-stroke-width-md:6px;--tds-spinner-stroke-width-lg:8px;--tds-spinner-stroke-width:var(--tds-spinner-stroke-width-lg);--PI:3.14159265358979}:host{box-sizing:border-box;display:block}:host *{box-sizing:border-box}.tds-spinner-svg{width:calc(var(--tds-spinner-radius) * 2);height:calc(var(--tds-spinner-radius) * 2);transform:scale(-1, 1) rotate(-90deg)}.tds-spinner-svg-xs{--tds-spinner-radius:var(--tds-spinner-radius-xs);--tds-spinner-stroke-width:var(--tds-spinner-stroke-width-xs);--tds-spinner-animation-speed:var(--tds-spinner-speed)}.tds-spinner-svg-sm{--tds-spinner-radius:var(--tds-spinner-radius-sm);--tds-spinner-stroke-width:var(--tds-spinner-stroke-width-sm);--tds-spinner-animation-speed:var(--tds-spinner-speed)}.tds-spinner-svg-md{--tds-spinner-radius:var(--tds-spinner-radius-md);--tds-spinner-stroke-width:var(--tds-spinner-stroke-width-md);--tds-spinner-animation-speed:var(--tds-spinner-speed)}.tds-spinner-svg-lg{--tds-spinner-radius:var(--tds-spinner-radius-lg);--tds-spinner-stroke-width:var(--tds-spinner-stroke-width-lg);--tds-spinner-animation-speed:var(--tds-spinner-speed-lg)}.tds-spinner-circle{cx:var(--tds-spinner-radius);cy:var(--tds-spinner-radius);r:calc(var(--tds-spinner-radius) - var(--tds-spinner-stroke-width) / 2);fill:none;--tds-spinner-stroke-dash:calc((2 * var(--PI)) * var(--tds-spinner-radius));stroke-dasharray:var(--tds-spinner-stroke-dash);stroke-width:var(--tds-spinner-stroke-width);animation:dash var(--tds-spinner-animation-speed) cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite}.tds-spinner-circle-standard{stroke:var(--tds-spinner-background)}.tds-spinner-circle-inverted{stroke:var(--tds-spinner-background-inverted)}@keyframes dash{from{stroke-dashoffset:calc(-1 * var(--tds-spinner-stroke-dash))}to{stroke-dashoffset:var(--tds-spinner-stroke-dash)}}";

const TdsSpinner$1 = /*@__PURE__*/ proxyCustomElement(class TdsSpinner extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.size = 'lg';
    this.variant = 'standard';
  }
  render() {
    return (h("div", { "aria-live": "assertive", role: "status", "aria-label": "loading" }, h("svg", { class: `tds-spinner-svg tds-spinner-svg-${this.size}`, "aria-hidden": "true" }, h("circle", { class: `tds-spinner-circle tds-spinner-circle-${this.variant}` }))));
  }
  static get style() { return spinnerCss; }
}, [0, "tds-spinner", {
    "size": [1],
    "variant": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-spinner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSpinner$1);
      }
      break;
  } });
}

const TdsSpinner = TdsSpinner$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSpinner, defineCustomElement };
