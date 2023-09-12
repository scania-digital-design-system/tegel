import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const sideMenuCss = ":host{pointer-events:none;display:block;position:fixed;top:0;width:100%;height:100%;z-index:500}:host .wrapper{height:inherit;}:host .wrapper slot:not([name])::slotted(*){border-bottom:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host .wrapper ::slotted([slot=end]){border-top:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host .wrapper .tds-side-menu-list-end{margin-top:68px}:host .state-closed{display:none}:host .state-open slot[name=overlay]::slotted(tds-side-menu-overlay){opacity:0.4}:host .state-open slot[name=close-button]::slotted(tds-side-menu-close-button){opacity:1}:host .state-upper-slot-empty .tds-side-menu-list-upper{display:none}:host .state-upper-slot-empty .tds-side-menu-list-end{margin-top:0}:host .state-upper-slot-empty ::slotted([slot=end]){border-top:none;border-bottom:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}@media (max-width: 992px){:host(.menu-opened){pointer-events:auto;z-index:500}}@media (min-width: 992px){:host(.menu-persistent){pointer-events:auto;position:static;width:272px;height:auto;border-right:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host(.menu-persistent) .wrapper slot[name=overlay]::slotted(tds-side-menu-overlay){display:none}:host(.menu-persistent) .wrapper slot[name=close-button]::slotted(tds-side-menu-close-button){display:none}:host(.menu-persistent) .menu{width:272px}:host(.menu-persistent) .state-closed{display:block}:host(.menu-persistent):host(.menu-collapsed){width:69px}:host(.menu-persistent):host(.menu-collapsed) .menu{width:68px}:host(.menu-persistent) slot[name=end]::slotted(*){display:none}}.menu{width:80%;height:inherit;position:relative;left:0;display:flex;flex-direction:column;justify-content:space-between}.menu *{padding:0;margin:0;box-sizing:border-box}@media (max-width: 384px){.menu{width:100%}}aside .tds-side-menu-wrapper{display:flex;justify-content:space-between;flex-direction:column;flex-grow:1;background-color:var(--tds-sidebar-side-menu-background-cover);overflow-y:auto}aside .tds-side-menu-wrapper::-webkit-scrollbar{width:4px;background-color:inherit}aside .tds-side-menu-wrapper::-webkit-scrollbar-thumb{background-color:var(--tds-grey-300)}aside .tds-side-menu-wrapper ::-webkit-scrollbar-button{height:0;width:0}";

const GRID_LG_BREAKPOINT = '992px';
const TdsSideMenu$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenu extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsCollapse = createEvent(this, "tdsCollapse", 7);
    this.internalTdsCollapse = createEvent(this, "internalTdsCollapse", 6);
    this.internalTdsSideMenuPropChange = createEvent(this, "internalTdsSideMenuPropChange", 6);
    this.handleMatchesLgBreakpointChange = (e) => {
      const isBelowLg = !e.matches;
      if (isBelowLg) {
        this.collapsed = false;
      }
    };
    this.open = false;
    this.persistent = false;
    this.collapsed = false;
    this.isUpperSlotEmpty = false;
    this.isCollapsed = false;
  }
  connectedCallback() {
    this.matchesLgBreakpointMq = window.matchMedia(`(min-width: ${GRID_LG_BREAKPOINT})`);
    this.matchesLgBreakpointMq.addEventListener('change', this.handleMatchesLgBreakpointChange);
    this.isCollapsed = this.collapsed;
  }
  componentDidLoad() {
    const upperSlot = this.host.shadowRoot.querySelector('slot:not([name])');
    const upperSlotElements = upperSlot.assignedElements();
    const hasUpperSlotElements = (upperSlotElements === null || upperSlotElements === void 0 ? void 0 : upperSlotElements.length) > 0;
    if (!hasUpperSlotElements) {
      this.isUpperSlotEmpty = true;
    }
  }
  disconnectedCallback() {
    this.matchesLgBreakpointMq.removeEventListener('change', this.handleMatchesLgBreakpointChange);
  }
  onCollapsedChange(newVal) {
    /** Emits the internal collapse event when the prop has changed. */
    this.internalTdsSideMenuPropChange.emit({
      changed: ['collapsed'],
      collapsed: newVal,
    });
    this.isCollapsed = newVal;
  }
  collapsedSideMenuEventHandler(event) {
    this.collapsed = event.detail.collapsed;
  }
  render() {
    return (h(Host, { role: "navigation", class: {
        'menu-opened': this.open,
        'menu-persistent': this.persistent,
        'menu-collapsed': this.collapsed,
      } }, h("div", { class: {
        'wrapper': true,
        'state-upper-slot-empty': this.isUpperSlotEmpty,
        'state-open': this.open,
        'state-closed': !this.open,
      } }, h("slot", { name: "overlay" }), h("aside", { class: `menu` }, h("slot", { name: "close-button" }), h("div", { class: "tds-side-menu-wrapper" }, h("ul", { class: `tds-side-menu-list tds-side-menu-list-upper` }, h("slot", null)), h("ul", { class: `tds-side-menu-list tds-side-menu-list-end` }, h("slot", { name: "end" }))), h("slot", { name: "sticky-end" })))));
  }
  get host() { return this; }
  static get watchers() { return {
    "collapsed": ["onCollapsedChange"]
  }; }
  static get style() { return sideMenuCss; }
}, [1, "tds-side-menu", {
    "open": [4],
    "persistent": [4],
    "collapsed": [4],
    "isUpperSlotEmpty": [32],
    "isCollapsed": [32]
  }, [[16, "internalTdsCollapse", "collapsedSideMenuEventHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenu$1);
      }
      break;
  } });
}

const TdsSideMenu = TdsSideMenu$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenu, defineCustomElement };
