import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './side-menu-item.js';

const sideMenuCollapseButtonCss = ":host{position:sticky;bottom:0;display:none;height:68px;border-top:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host .icon{transform:rotateZ(90deg);transition:all 0.2s ease-in-out;width:20px;height:20px}:host .state-collapsed .icon{transform:translateX(-50%) rotateZ(90deg) rotateX(180deg);color:var(--tds-sidebar-side-menu-single-item-color);margin-left:0;position:absolute;left:50%}@media (min-width: 992px){:host{display:block}}";

const TdsSideMenuCollapseButton$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuCollapseButton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsCollapse = createEvent(this, "tdsCollapse", 3);
    this.internalTdsCollapse = createEvent(this, "internalTdsCollapse", 6);
    this.handleClick = () => {
      /** Emit a public event that the user can prevent. */
      const tdsCollapseEvent = this.tdsCollapse.emit({
        collapsed: !this.collapsed,
      });
      /** If the public event was not prevented. */
      if (!tdsCollapseEvent.defaultPrevented) {
        /** Emit internal event that is listened to by other side-menu components */
        this.collapsed = !this.collapsed;
        this.internalTdsCollapse.emit({
          collapsed: this.collapsed,
        });
      }
    };
    this.collapsed = false;
  }
  collapseSideMenuEventHandler(event) {
    this.collapsed = event.detail.collapsed;
  }
  connectedCallback() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
    this.collapsed = this.sideMenuEl.collapsed;
  }
  render() {
    return (h(Host, { role: "button", tabindex: "0", onClick: () => {
        this.handleClick();
      } }, h("div", { class: {
        'wrapper': true,
        'state-collapsed': this.collapsed,
      } }, h("tds-side-menu-item", { class: {
        button: true,
      } }, h("a", null, h("svg", { class: "icon", slot: "icon", fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16 1.975a1 1 0 0 1 1 1v20.3l9.311-9.312a1 1 0 0 1 1.415 1.414l-9.887 9.887a2.6 2.6 0 0 1-3.677 0l-9.887-9.887a1 1 0 1 1 1.414-1.414L15 23.274V2.975a1 1 0 0 1 1-1ZM5.188 28.001a1 1 0 0 0 0 2h21.62a1 1 0 1 0 0-2H5.188Z", fill: "currentColor" })), h("slot", null))))));
  }
  get host() { return this; }
  static get style() { return sideMenuCollapseButtonCss; }
}, [1, "tds-side-menu-collapse-button", {
    "collapsed": [32]
  }, [[16, "internalTdsSideMenuPropChange", "collapseSideMenuEventHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-collapse-button", "tds-side-menu-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-collapse-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuCollapseButton$1);
      }
      break;
    case "tds-side-menu-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsSideMenuCollapseButton = TdsSideMenuCollapseButton$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenuCollapseButton, defineCustomElement };
