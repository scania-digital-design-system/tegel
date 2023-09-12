import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const footerItemCss = "[role=listitem] ::slotted(a),[role=listitem] ::slotted(button){font:var(--tds-headline-06);letter-spacing:var(--tds-headline-06-ls);color:var(--tds-footer-main-links);opacity:var(--tds-footer-main-links-opacity);text-decoration:none}[role=listitem] ::slotted(a:focus-visible),[role=listitem] ::slotted(button:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}[role=listitem] ::slotted(a:hover),[role=listitem] ::slotted(button:hover){text-decoration:underline}[role=listitem].top-part-child ::slotted(a),[role=listitem].top-part-child ::slotted(button){color:var(--tds-footer-top-links);font-family:\"Scania Sans Semi Condensed\", \"Scania Sans Condensed\", arial, helvetica, sans-serif;font-weight:bold;font-size:14px;line-height:18px}[role=listitem].top-part-child ::slotted(a:focus-visible),[role=listitem].top-part-child ::slotted(button:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}@media all and (max-width: 992px){[role=listitem].top-part-child{border-bottom:1px solid var(--tds-footer-top-divider)}[role=listitem].top-part-child ::slotted(a),[role=listitem].top-part-child ::slotted(button){display:block;height:100%;padding:19px 40px;font-weight:normal}[role=listitem].top-part-child ::slotted(a:hover),[role=listitem].top-part-child ::slotted(button:hover){text-decoration:underline;background-color:var(--tds-footer-top-links-background-hover)}[role=listitem].top-part-child ::slotted(a:focus-visible),[role=listitem].top-part-child ::slotted(button:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}}";

const TdsFooterItem$1 = /*@__PURE__*/ proxyCustomElement(class TdsFooterItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.parentIsTopPart = false;
  }
  connectedCallback() {
    this.parentIsTopPart = this.host.closest('tds-footer-group').parentElement.slot === 'top';
  }
  render() {
    return (h("div", { role: "listitem", class: `${this.parentIsTopPart ? 'top-part-child' : ''}` }, h("slot", null)));
  }
  get host() { return this; }
  static get style() { return footerItemCss; }
}, [1, "tds-footer-item"]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-footer-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-footer-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsFooterItem$1);
      }
      break;
  } });
}

const TdsFooterItem = TdsFooterItem$1;
const defineCustomElement = defineCustomElement$1;

export { TdsFooterItem, defineCustomElement };
