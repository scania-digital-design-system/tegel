import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { u as updateListChildrenRoles, i as inheritAriaAttributes } from './utils.js';

const headerCss = "html,:root{--tds-nav-dropdown-menu-box:0 3px 3px rgb(0 0 0 / 15%), 0 -1px 1px rgb(0 0 0 / 1%);--tds-nav-dropdown-item-border-radius:0 0 4px 4px;--tds-font-family-headline:\"Scania Sans Headline\", arial, helvetica, sans-serif}tds-header{display:block;height:var(--tds-header-height);background-color:var(--tds-header-background);width:100%;z-index:300}nav{box-sizing:border-box;background-color:var(--tds-header-background);width:100%;display:block}nav *{box-sizing:border-box}nav .tds-header-component-list{height:var(--tds-header-height);all:unset;display:flex;justify-content:start;align-items:center}nav tds-header-dropdown,nav tds-header-item{display:none}nav .tds-header-middle-spacer{all:unset;display:block;flex-grow:1;height:var(--tds-header-height);border-right:1px solid var(--tds-header--basic-element-border)}@media screen and (min-width: 992px){nav tds-header-dropdown,nav tds-header-item{display:block}}nav tds-header-item:nth-child(3),nav tds-header-dropdown:nth-child(3){border-left:1px solid var(--tds-header--basic-element-border)}";

const TdsHeader$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeader extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    const callback = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          updateListChildrenRoles(mutation.target);
        }
      });
    };
    this.observer = new MutationObserver(callback);
  }
  componentDidLoad() {
    const hostElement = this.host;
    const navElement = hostElement.querySelector('.tds-header-component-list');
    this.observer.observe(navElement, {
      childList: true,
      subtree: false,
    });
    updateListChildrenRoles(navElement);
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  render() {
    const navAttributes = Object.assign({}, inheritAriaAttributes(this.host));
    return (h(Host, null, h("slot", { name: "hamburger" }), h("slot", { name: "title" }), h("nav", Object.assign({}, navAttributes), h("ul", { class: "tds-header-component-list" }, h("slot", null), h("li", { class: "tds-header-middle-spacer" }), h("slot", { name: "end" })))));
  }
  get host() { return this; }
  static get style() { return headerCss; }
}, [4, "tds-header"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeader$1);
      }
      break;
  } });
}

const TdsHeader = TdsHeader$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeader, defineCustomElement };
