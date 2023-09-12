import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const accordionItemCss = ".tds-accordion-item{box-sizing:border-box;list-style:none;color:var(--tds-accordion-color);position:relative;border-top:1px solid var(--tds-accordion-border)}.tds-accordion-item *{box-sizing:border-box}.tds-accordion-item button.tds-accordion-header-icon-start,.tds-accordion-item button.tds-accordion-header-icon-end{all:unset}.tds-accordion-item .tds-accordion-header-icon-start,.tds-accordion-item .tds-accordion-header-icon-end,.tds-accordion-item button.tds-accordion-header-icon-start,.tds-accordion-item button.tds-accordion-header-icon-end{box-sizing:border-box;cursor:pointer;display:flex;align-items:center;width:100%;font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);padding:var(--tds-spacing-element-16);background-color:var(--tds-accordion-background)}.tds-accordion-item .tds-accordion-header-icon-start *,.tds-accordion-item .tds-accordion-header-icon-end *,.tds-accordion-item button.tds-accordion-header-icon-start *,.tds-accordion-item button.tds-accordion-header-icon-end *{box-sizing:border-box}.tds-accordion-item .tds-accordion-header-icon-start .tds-accordion-icon,.tds-accordion-item .tds-accordion-header-icon-end .tds-accordion-icon,.tds-accordion-item button.tds-accordion-header-icon-start .tds-accordion-icon,.tds-accordion-item button.tds-accordion-header-icon-end .tds-accordion-icon{transform-origin:center;transition:transform 0.15s ease-in-out;color:var(--tds-accordion-icon-color)}.tds-accordion-item .tds-accordion-header-icon-start .tds-accordion-icon>tds-icon,.tds-accordion-item .tds-accordion-header-icon-end .tds-accordion-icon>tds-icon,.tds-accordion-item button.tds-accordion-header-icon-start .tds-accordion-icon>tds-icon,.tds-accordion-item button.tds-accordion-header-icon-end .tds-accordion-icon>tds-icon{display:block}.tds-accordion-item .tds-accordion-title{flex-grow:2}.tds-accordion-item .tds-accordion-panel{cursor:default;padding:var(--tds-spacing-element-8) var(--tds-spacing-layout-64) var(--tds-spacing-element-32) var(--tds-spacing-element-16);display:none;font:var(--tds-detail-03);letter-spacing:var(--tds-detail-03-ls)}.tds-accordion-item .tds-accordion-panel p{margin:0;padding:0}.tds-accordion-item .tds-accordion-panel--padding-reset{padding-right:var(--tds-spacing-element-16)}.tds-accordion-item .tds-accordion-header-icon-end .tds-accordion-icon{margin:0 0 0 var(--tds-spacing-element-32)}.tds-accordion-item .tds-accordion-header-icon-start .tds-accordion-title{order:1}.tds-accordion-item .tds-accordion-header-icon-start .tds-accordion-icon{order:0;margin:0 var(--tds-spacing-element-16) 0 0}.tds-accordion-item.disabled,.tds-accordion-item.disabled .tds-accordion-header-icon-end,.tds-accordion-item.disabled .tds-accordion-header-icon-start,.tds-accordion-item.disabled .tds-accordion-panel{color:var(--tds-accordion-color-disabled);cursor:not-allowed}.tds-accordion-item.disabled .tds-accordion-icon,.tds-accordion-item.disabled .tds-accordion-header-icon-end .tds-accordion-icon,.tds-accordion-item.disabled .tds-accordion-header-icon-start .tds-accordion-icon,.tds-accordion-item.disabled .tds-accordion-panel .tds-accordion-icon{color:var(--tds-accordion-color-disabled)}.tds-accordion-item.disabled:hover,.tds-accordion-item.disabled:hover *,.tds-accordion-item.disabled:focus,.tds-accordion-item.disabled:focus *,.tds-accordion-item.disabled:active,.tds-accordion-item.disabled:active *,.tds-accordion-item.disabled.active,.tds-accordion-item.disabled.active *{cursor:not-allowed}.tds-accordion-item.disabled:hover .tds-accordion-header-icon-start,.tds-accordion-item.disabled:hover .tds-accordion-header-icon-end,.tds-accordion-item.disabled:focus .tds-accordion-header-icon-start,.tds-accordion-item.disabled:focus .tds-accordion-header-icon-end,.tds-accordion-item.disabled:active .tds-accordion-header-icon-start,.tds-accordion-item.disabled:active .tds-accordion-header-icon-end,.tds-accordion-item.disabled.active .tds-accordion-header-icon-start,.tds-accordion-item.disabled.active .tds-accordion-header-icon-end{background-color:var(--tds-accordion-bg);outline:none;pointer-events:none}.tds-accordion-item.disabled:hover .tds-accordion-header-icon-start::after,.tds-accordion-item.disabled:hover .tds-accordion-header-icon-end::after,.tds-accordion-item.disabled:focus .tds-accordion-header-icon-start::after,.tds-accordion-item.disabled:focus .tds-accordion-header-icon-end::after,.tds-accordion-item.disabled:active .tds-accordion-header-icon-start::after,.tds-accordion-item.disabled:active .tds-accordion-header-icon-end::after,.tds-accordion-item.disabled.active .tds-accordion-header-icon-start::after,.tds-accordion-item.disabled.active .tds-accordion-header-icon-end::after{border-color:transparent}.tds-accordion-item.expanded .tds-accordion-panel{display:block;padding-bottom:31px}.tds-accordion-item.expanded .tds-accordion-icon{transform:rotate(180deg)}.tds-accordion-item.expanded .tds-accordion-header-icon-end .tds-accordion-icon{margin-right:0;margin-left:var(--tds-spacing-element-32)}.tds-accordion-item.expanded .tds-accordion-header-icon-start .tds-accordion-icon{margin-left:0;margin-right:var(--tds-spacing-element-16)}.tds-accordion-item:focus{border-top:1px solid var(--tds-accordion-border-focus)}.tds-accordion-item[disabled=true]:focus{border-color:var(--tds-accordion-border)}:host(:focus) .tds-accordion-item{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host(:focus) .tds-accordion-item .tds-accordion-header-icon-start,:host(:focus) .tds-accordion-item .tds-accordion-header-icon-end{background-color:var(--tds-accordion-background-focus);outline:none}:host(:hover) .tds-accordion-header-icon-start,:host(:hover) .tds-accordion-header-icon-end{background-color:var(--tds-accordion-background-hover)}:host(:active) .tds-accordion-header-icon-start,:host(:active) .tds-accordion-header-icon-end{background-color:var(--tds-accordion-background-active);outline:none}";

const TdsAccordionItem$1 = /*@__PURE__*/ proxyCustomElement(class TdsAccordionItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsToggle = createEvent(this, "tdsToggle", 7);
    this.header = '';
    this.expandIconPosition = 'end';
    this.disabled = false;
    this.expanded = false;
    this.paddingReset = false;
  }
  /** Method for toggling the expanded state of the Accordion Item. */
  async toggleAccordionItem() {
    // This is negated in order to emit the value the Accordion Item will have after it has expanded/redacted.
    const event = this.tdsToggle.emit({
      expanded: !this.expanded,
    });
    if (!event.defaultPrevented) {
      this.expanded = !this.expanded;
    }
  }
  render() {
    return (h(Host, null, h("div", { class: `tds-accordion-item
        ${this.disabled ? 'disabled' : ''}
        ${this.expanded ? 'expanded' : ''}
        ` }, h("button", { type: "button", "aria-expanded": this.expanded, class: `tds-accordion-header-icon-${this.expandIconPosition}`, onClick: () => this.toggleAccordionItem(), disabled: this.disabled }, h("div", { class: "tds-accordion-title" }, this.header, h("slot", { name: "header" })), h("div", { class: "tds-accordion-icon" }, h("tds-icon", { name: "chevron_down", size: "16px" }))), h("div", { class: `tds-accordion-panel
            ${this.paddingReset ? 'tds-accordion-panel--padding-reset ' : ''}
            ` }, h("slot", null)))));
  }
  static get style() { return accordionItemCss; }
}, [1, "tds-accordion-item", {
    "header": [1],
    "expandIconPosition": [1, "expand-icon-position"],
    "disabled": [4],
    "expanded": [4],
    "paddingReset": [4, "padding-reset"],
    "toggleAccordionItem": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-accordion-item", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-accordion-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsAccordionItem$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsAccordionItem = TdsAccordionItem$1;
const defineCustomElement = defineCustomElement$1;

export { TdsAccordionItem, defineCustomElement };
