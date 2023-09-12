import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const popoverMenuItemCss = ":host{box-sizing:border-box;display:block}:host *{box-sizing:border-box}:host .wrapper{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-popover-menu-color);position:relative;width:100%;display:flex;align-items:center}:host .wrapper:hover{cursor:pointer;background-color:var(--tds-popover-menu-background-hover)}:host .wrapper.disabled{pointer-events:none;color:var(--tds-popover-menu-divider-disabled-color)}:host .wrapper.disabled ::slotted(tds-icon){color:var(--tds-popover-menu-divider-disabled-icon-color)}:host ::slotted(*:not(tds-icon)){all:unset;width:100%;display:inline-flex;display:flex;align-items:center;gap:10px;padding:10px 16px}:host ::slotted(*:focus-visible)::before{z-index:-1;content:\"\";display:block;position:absolute;width:calc(100% - 4px);height:100%;top:0;left:2px;outline:1px solid var(--tds-blue-400);outline-offset:1px}";

const TdsPopoverMenuItem$1 = /*@__PURE__*/ proxyCustomElement(class TdsPopoverMenuItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.disabled = false;
  }
  render() {
    return (h(Host, { role: "listitem" }, h("div", { class: {
        wrapper: true,
        disabled: this.disabled,
      } }, h("slot", null))));
  }
  static get style() { return popoverMenuItemCss; }
}, [1, "tds-popover-menu-item", {
    "disabled": [4]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-popover-menu-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-popover-menu-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsPopoverMenuItem$1);
      }
      break;
  } });
}

const TdsPopoverMenuItem = TdsPopoverMenuItem$1;
const defineCustomElement = defineCustomElement$1;

export { TdsPopoverMenuItem, defineCustomElement };
