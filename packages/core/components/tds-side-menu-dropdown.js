import { proxyCustomElement, HTMLElement, h, Host, Fragment } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './side-menu-item.js';

const sideMenuDropdownCss = ":host{display:block}:host .wrapper{display:flex;flex-direction:column}:host .dropdown-icon{margin-left:auto;transition:all 0.2s ease-in-out}:host .state-open .dropdown-icon{transform:rotateZ(180deg)}:host .state-open .menu{display:block}:host .state-collapsed .menu{--side-menu-width:68px;position:absolute;left:var(--side-menu-width);box-shadow:var(--tds-nav-dropdown-menu-box);background-color:var(--tds-sidebar-side-menu-subnav-background)}:host .state-collapsed .menu .heading-collapsed{all:unset;box-sizing:border-box;padding:16px 24px 15px;min-height:48px;display:flex;align-items:center;border-bottom:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top);font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls)}:host :not(.state-collapsed) .menu ::slotted(tds-side-menu-dropdown-list){width:100%}:host .menu{display:none;flex-direction:column}";

const TdsSideMenuDropdown$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuDropdown extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.defaultOpen = false;
    this.buttonLabel = undefined;
    this.selected = false;
    this.open = false;
    this.hoverState = undefined;
    this.collapsed = false;
  }
  collapsedSideMenuEventHandler(event) {
    this.collapsed = event.detail.collapsed;
  }
  onEventPointerEnter() {
    this.setHoverStateOpen();
  }
  onEventFocus() {
    this.setHoverStateOpen();
  }
  onEventPointerLeave() {
    this.setHoverStateClosed();
  }
  onEventBlur() {
    this.setHoverStateClosed();
  }
  setHoverStateOpen() {
    this.hoverState = { isHovered: true, updatedAt: Date.now() };
  }
  setHoverStateClosed() {
    const leftAt = Date.now();
    const toleranceInMilliseconds = 150;
    setTimeout(() => {
      if (this.hoverState.isHovered && this.hoverState.updatedAt < leftAt) {
        this.hoverState = { isHovered: false, updatedAt: Date.now() };
      }
    }, toleranceInMilliseconds);
  }
  getIsOpenState() {
    var _a;
    return this.collapsed ? (_a = this.hoverState) === null || _a === void 0 ? void 0 : _a.isHovered : this.open;
  }
  connectedCallback() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
    this.open = this.defaultOpen;
  }
  render() {
    return (h(Host, null, h("div", { class: {
        'wrapper': true,
        'state-open': this.getIsOpenState(),
        'state-collapsed': this.collapsed,
      } }, h("tds-side-menu-item", { class: "button", active: this.getIsOpenState(), selected: this.selected, onClick: () => {
        this.open = !this.open;
      } }, h("button", null, h("slot", { name: "icon" }), !this.collapsed && (h(Fragment, null, this.buttonLabel, h("slot", { name: "label" }), h("tds-icon", { class: "dropdown-icon", name: "chevron_down", size: "16px" }))))), h("div", { class: "menu" }, this.collapsed && (h("h3", { class: "heading-collapsed" }, this.buttonLabel, h("slot", { name: "label" }))), h("slot", null)))));
  }
  get host() { return this; }
  static get style() { return sideMenuDropdownCss; }
}, [1, "tds-side-menu-dropdown", {
    "defaultOpen": [4, "default-open"],
    "buttonLabel": [1, "button-label"],
    "selected": [4],
    "open": [32],
    "hoverState": [32],
    "collapsed": [32]
  }, [[16, "internalTdsSideMenuPropChange", "collapsedSideMenuEventHandler"], [1, "pointerenter", "onEventPointerEnter"], [0, "focusin", "onEventFocus"], [1, "pointerleave", "onEventPointerLeave"], [0, "focusout", "onEventBlur"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-dropdown", "tds-icon", "tds-side-menu-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-dropdown":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuDropdown$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "tds-side-menu-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsSideMenuDropdown = TdsSideMenuDropdown$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenuDropdown, defineCustomElement };
