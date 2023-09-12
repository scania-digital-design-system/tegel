import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const headerDropdownListUserCss = ":host{background-color:var(--tds-header-avatar-item-background);display:flex;height:84px}:host .user-box{gap:16px;width:100%;padding:0 16px;display:flex;align-items:center;border-bottom:1px solid var(--tds-nav-dropdown-item-border-color)}:host img,:host slot[name=thumbnail]::slotted(*){width:34px;border-radius:100%}:host .user-content{display:flex;flex-direction:column;gap:4px}:host .user-content .header{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls)}:host .user-content .subheader{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-header-avatar-item-color)}";

const TdsHeaderDropdownListLgUser = /*@__PURE__*/ proxyCustomElement(class TdsHeaderDropdownListLgUser extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.imgUrl = undefined;
    this.imgAlt = undefined;
    this.header = undefined;
    this.subheader = undefined;
  }
  render() {
    return (h(Host, { role: "listitem" }, h("div", { class: "user-box" }, this.imgUrl && h("img", { src: this.imgUrl, alt: this.imgAlt }), h("slot", { name: "thumbanil" }), h("div", { class: "user-content" }, h("div", { class: "header" }, this.header, h("slot", { name: "header" })), h("div", { class: "subheader" }, this.subheader, h("slot", { name: "subheader" }))))));
  }
  get host() { return this; }
  static get style() { return headerDropdownListUserCss; }
}, [1, "tds-header-dropdown-list-user", {
    "imgUrl": [1, "img-url"],
    "imgAlt": [1, "img-alt"],
    "header": [1],
    "subheader": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-dropdown-list-user"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-dropdown-list-user":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderDropdownListLgUser);
      }
      break;
  } });
}

const TdsHeaderDropdownListUser = TdsHeaderDropdownListLgUser;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderDropdownListUser, defineCustomElement };
