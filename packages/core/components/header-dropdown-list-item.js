import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const headerDropdownListItemCss = ":host{display:block;box-sizing:border-box;height:var(--tds-header-list-item-md-height);width:100%}:host .component{height:100%}:host .component ::slotted(a),:host .component ::slotted(button){all:unset;box-sizing:border-box;border:none;display:flex;align-items:center;height:100%;padding:0 24px;width:100%;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);background-color:var(--tds-nav-dropdown-item-background);color:var(--tds-header-nav-item-dropdown-opened-color)}:host .component ::slotted(a:hover){background-color:var(--tds-nav-item-background-hover);cursor:pointer}:host .component ::slotted(a:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .component-selected{background-color:var(--tds-nav-item-background-selected);padding-right:4px;border-left-width:4px;border-left-style:solid;border-left-color:var(--tds-nav-item-border-color-active)}:host .component-selected ::slotted(a),:host .component-selected ::slotted(button){background-color:var(--tds-nav-item-background-selected)}:host(:not(:last-child)){border-bottom:1px solid var(--tds-nav-dropdown-item-border-color)}:host([size=lg]){height:var(--tds-header-height)}:host([size=lg]) ::slotted(a),:host([size=lg]) ::slotted(button){padding:0 16px;color:var(--tds-header-app-launcher-item-color)}";

const TdsHeaderDropdownListItem = /*@__PURE__*/ proxyCustomElement(class TdsHeaderDropdownListItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.selected = false;
    this.size = 'md';
  }
  render() {
    return (h(Host, null, h("div", { class: {
        'component': true,
        'component-selected': this.selected,
      } }, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return headerDropdownListItemCss; }
}, [1, "tds-header-dropdown-list-item", {
    "selected": [4],
    "size": [513]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-dropdown-list-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-dropdown-list-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderDropdownListItem);
      }
      break;
  } });
}

export { TdsHeaderDropdownListItem as T, defineCustomElement as d };
