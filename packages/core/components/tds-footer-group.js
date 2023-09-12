import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const footerGroupCss = ":host{display:block}:host .footer-top-title{font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);opacity:var(--tds-footer-top-title-opacity);color:var(--tds-footer-top-links);padding-bottom:8px}:host button.footer-top-title-button{display:none;border:none;width:100%;font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-footer-top-links);background-color:transparent;text-align:left;padding:19px 24px;justify-content:space-between;border-bottom:1px solid var(--tds-footer-top-divider)}:host button.footer-top-title-button.expanded{border-bottom:none}:host button.footer-top-title-button.expanded tds-icon{transform:rotateZ(180deg)}:host button.footer-top-title-button:hover{cursor:pointer}:host button.footer-top-title-button:active{background-color:var(--tds-footer-top-button-active)}:host button.footer-top-title-button:focus-visible{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host button.footer-top-title-button tds-icon{transition:transform 0.2s ease-in-out}:host [role=list]{list-style:none;padding:0;margin:0;display:flex;gap:8px}:host [role=list].start,:host [role=list].end{gap:24px}:host [role=list].top-part-child{flex-direction:column}@media all and (max-width: 992px){:host [role=list].start:not(.top-part-child){flex-direction:column}:host [role=list].start:not(.top-part-child).start,:host [role=list].start:not(.top-part-child).end{gap:8px}:host [role=list].top-part-child.closed{display:none}:host [role=list].top-part-child{gap:0}:host .footer-top-title{display:none}:host button.footer-top-title-button{display:flex;align-items:center}}";

const TdsFooterGroup$1 = /*@__PURE__*/ proxyCustomElement(class TdsFooterGroup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /** If the group is placed in the main part of the Footer,
     * it can have either start or end as a slot position otherwise undefined. */
    this.slotPosition = null;
    /** Indicates if a group is part of the top part of the Footer. */
    this.topPartGroup = false;
    this.titleText = undefined;
    this.open = false;
  }
  connectedCallback() {
    this.topPartGroup = this.host.parentElement.slot === 'top';
    if (!this.topPartGroup) {
      this.slotPosition = this.host.parentElement.slot === 'end' ? 'end' : 'start';
    }
  }
  render() {
    return (h(Host, null, this.titleText && this.topPartGroup && (h("div", { class: "footer-top-title" }, this.titleText)), this.titleText && this.topPartGroup && (h("button", { onClick: () => {
        this.open = !this.open;
      }, class: `footer-top-title-button  ${this.open ? 'expanded' : 'closed'}` }, this.titleText, h("tds-icon", { name: "chevron_down", size: "20px" }))), h("div", { role: "list", class: `${this.slotPosition ? this.slotPosition : ''}
            ${this.topPartGroup ? 'top-part-child' : ''}
            ${this.open ? 'expanded' : 'closed'}` }, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return footerGroupCss; }
}, [1, "tds-footer-group", {
    "titleText": [1, "title-text"],
    "open": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-footer-group", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-footer-group":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsFooterGroup$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsFooterGroup = TdsFooterGroup$1;
const defineCustomElement = defineCustomElement$1;

export { TdsFooterGroup, defineCustomElement };
