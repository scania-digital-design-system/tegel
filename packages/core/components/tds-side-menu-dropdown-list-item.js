import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const sideMenuDropdownListItemCss = ":host{display:block;box-sizing:border-box;height:48px;width:100%}:host .component{height:100%;width:100%}:host .component ::slotted(a),:host .component ::slotted(button){all:unset;box-sizing:border-box;border-right:1px solid var(--tds-nav-item-border-color);display:flex;align-items:center;height:100%;padding:0 24px;width:100%;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);background-color:var(--tds-header-nav-item-dropdown-opened-background);color:var(--tds-header-nav-item-dropdown-opened-color);border:none}:host .component ::slotted(a:hover),:host .component ::slotted(button:hover){background-color:var(--tds-header-nav-item-dropdown-opened-background-hover);cursor:pointer}:host .component ::slotted(a:active),:host .component ::slotted(button:active){background-color:var(--tds-header-nav-item-dropdown-opened-background-active) !important;cursor:pointer}:host .component ::slotted(a:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .component.component-selected ::slotted(a),:host .component.component-selected ::slotted(button){border-left:4px solid var(--tds-nav-item-border-color-active);padding-left:20px;background-color:var(--tds-header-nav-item-dropdown-opened-background-selected)}:host .component.component-dropdown-has-icon:not(.component-collapsed) ::slotted(a),:host .component.component-dropdown-has-icon:not(.component-collapsed) ::slotted(button){padding-left:56px}";

const TdsSideMenuDropdownListItem$1 = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuDropdownListItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.selected = false;
    this.dropdownHasIcon = false;
    this.collapsed = false;
  }
  collapseSideMenuEventHandler(event) {
    this.collapsed = event.detail.collapsed;
  }
  connectedCallback() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
  }
  componentDidLoad() {
    var _a;
    const dropdownEl = this.host.closest('tds-side-menu-dropdown');
    const dropdownBtnIconSlotEl = dropdownEl.shadowRoot.querySelector('slot[name="icon"]');
    const btnIconSlottedEls = dropdownBtnIconSlotEl.assignedElements();
    const hasBtnIcon = (btnIconSlottedEls === null || btnIconSlottedEls === void 0 ? void 0 : btnIconSlottedEls.length) > 0;
    const btnIconIsUserImage = ((_a = btnIconSlottedEls === null || btnIconSlottedEls === void 0 ? void 0 : btnIconSlottedEls[0]) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'tds-side-menu-user-image';
    if (hasBtnIcon && !btnIconIsUserImage) {
      this.dropdownHasIcon = true;
    }
  }
  render() {
    return (h(Host, { role: "listitem" }, h("div", { class: {
        'component': true,
        'component-selected': this.selected,
        'component-dropdown-has-icon': this.dropdownHasIcon,
        'component-collapsed': this.collapsed,
      } }, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return sideMenuDropdownListItemCss; }
}, [1, "tds-side-menu-dropdown-list-item", {
    "selected": [4],
    "dropdownHasIcon": [32],
    "collapsed": [32]
  }, [[16, "internalTdsSideMenuPropChange", "collapseSideMenuEventHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-dropdown-list-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-dropdown-list-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuDropdownListItem$1);
      }
      break;
  } });
}

const TdsSideMenuDropdownListItem = TdsSideMenuDropdownListItem$1;
const defineCustomElement = defineCustomElement$1;

export { TdsSideMenuDropdownListItem, defineCustomElement };
