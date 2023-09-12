import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sideMenuDropdownListCss = ":host{display:block;width:190px}:host [role=list]{padding:0;margin:0;list-style:none;border-radius:none;background-color:var(--tds-header-app-launcher-menu-bg)}:host .state-collapsed ::slotted(*){border-bottom:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}";

const TdsSideMenuDropdownList$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuDropdownList extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.collapsed = false;
  }
  collapsedSideMenuEventHandler(event) {
    this.collapsed = event.detail.collapsed;
  }
  connectedCallback() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
  }
  render() {
    return (h(Host, { role: "list" }, h("div", { class: {
        'state-collapsed': this.collapsed,
      } }, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return sideMenuDropdownListCss; }
}, [1, "tds-side-menu-dropdown-list", {
    "collapsed": [32]
  }, [[16, "internalTdsSideMenuPropChange", "collapsedSideMenuEventHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-dropdown-list"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-dropdown-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuDropdownList$1);
      }
      break;
  } });
}

const TdsSideMenuDropdownList = TdsSideMenuDropdownList$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenuDropdownList, defineCustomElement };
