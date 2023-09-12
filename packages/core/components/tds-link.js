import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const linkCss = ":host{display:inline}:host ::slotted(*){all:unset;cursor:pointer;outline:none;color:var(--tds-link);text-decoration:underline}:host ::slotted(*:focus-visible){color:var(--tds-link-focus);text-decoration:none;outline:2px solid var(--tds-link-focus);outline-offset:-2px}:host ::slotted(*:active){color:var(--tds-link);text-decoration:underline;text-decoration-color:var(--tds-link)}:host ::slotted(*:hover){color:var(--tds-link-hover);text-decoration:underline;text-decoration-color:var(--tds-link-hover)}:host ::slotted(*:visited){color:var(--tds-link-visited);text-decoration-color:var(--tds-link-visited)}.disabled ::slotted(*){color:var(--tds-link-disabled);text-decoration-color:var(--tds-link-disabled);pointer-events:none}.no-underline ::slotted(*){text-decoration:none}.no-underline:hover ::slotted(*){text-decoration:none}";

const TdsLink$1 = /*@__PURE__*/ proxyCustomElement(class TdsLink extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.disabled = false;
    this.underline = true;
  }
  connectedCallback() {
    this.host.children[0].classList.add('tds-link-component');
  }
  render() {
    return (h("span", { class: `        
          ${this.disabled ? 'disabled' : ''}
          ${!this.underline ? 'no-underline' : ''}
          ` }, h("slot", null)));
  }
  get host() { return this; }
  static get style() { return linkCss; }
}, [1, "tds-link", {
    "disabled": [4],
    "underline": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-link"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-link":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsLink$1);
      }
      break;
  } });
}

const TdsLink = TdsLink$1;
const defineCustomElement = defineCustomElement$1;

export { TdsLink, defineCustomElement };
