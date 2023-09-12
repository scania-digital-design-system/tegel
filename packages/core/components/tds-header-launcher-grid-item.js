import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const headerLauncherGridItemCss = ":host{display:block;width:96px;height:96px}:host ::slotted(a),:host ::slotted(button){all:unset;box-sizing:border-box;border-right:1px solid var(--tds-nav-item-border-color);width:100%;height:100%;border:none;padding:0 12px;display:flex;text-align:center;justify-content:center;align-items:center;flex-direction:column;gap:8px;font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);background-color:var(--tds-header-app-launcher-menu-bg);color:var(--tds-header-app-launcher-grid-color);border-radius:4px;transition:background-color 150ms ease}:host ::slotted(a:hover),:host ::slotted(button:hover){background-color:var(--tds-header-app-launcher-grid-hover-background);cursor:pointer}:host ::slotted(a:focus-visible),:host ::slotted(button:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}";

const TdsHeaderLauncherGridItem$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncherGridItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, { role: "listitem" }, h("slot", null)));
  }
  static get style() { return headerLauncherGridItemCss; }
}, [1, "tds-header-launcher-grid-item"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher-grid-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher-grid-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncherGridItem$1);
      }
      break;
  } });
}

const TdsHeaderLauncherGridItem = TdsHeaderLauncherGridItem$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderLauncherGridItem, defineCustomElement };
