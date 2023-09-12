import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { j as dfs } from './utils.js';

const sideMenuItemCss = ":host{display:block}:host .component ::slotted(a),:host .component ::slotted(button){all:unset;box-sizing:border-box;height:68px;width:100%;display:flex;align-items:center;gap:12px;padding:0 24px;border:none;background-color:var(--tds-sidebar-side-menu-background-cover);font:var(--tds-headline-07);letter-spacing:var(--tds-headline-07-ls);color:var(--tds-sidebar-side-menu-single-item-color);cursor:pointer}:host .component tds-icon{color:red !important}:host .component ::slotted(a:focus-visible),:host .component ::slotted(button:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .component:hover ::slotted(a),:host .component:hover ::slotted(button){background-color:var(--tds-sidebar-item-state-hover)}:host .component:active ::slotted(a),:host .component:active ::slotted(button){background-color:var(--tds-sidemenu-item-state-active)}:host .component-collapsed ::slotted(a),:host .component-collapsed ::slotted(button){padding:0;display:flex;justify-content:center;align-items:center;position:relative}:host .component-selected:not(:host .component-active) ::slotted(a),:host .component-selected:not(:host .component-active) ::slotted(button){border-left:4px solid var(--tds-sidebar-side-menu-single-subitem-selected-border-color);padding-left:20px;background-color:var(--tds-sidebar-item-state-selected)}@media (min-width: 992px){:host .component.component-collapsed ::slotted(a),:host .component.component-collapsed ::slotted(button){color:rgba(90, 90, 90, 0);overflow:hidden}}";

const TdsSideMenuItem = /*@__PURE__*/ proxyCustomElement(class TdsSideMenuItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.selected = false;
    this.active = false;
    this.collapsed = false;
  }
  updateSlotted(searchPredicate, mutationCallback) {
    const assignedElements = this.slotEl.assignedElements({ flatten: true });
    const firstSlottedElement = assignedElements[0];
    if (firstSlottedElement) {
      const foundElement = dfs(firstSlottedElement, searchPredicate);
      if (foundElement) {
        mutationCallback(foundElement);
      }
    }
  }
  /**
   * This function is needed because we can't use CSS selectors to style something in the light dom
   */
  updateSlottedElements() {
    if (this.slotEl) {
      const isIconOrSvg = (element) => element.tagName.toLowerCase() === 'tds-icon' || element.tagName.toLowerCase() === 'svg';
      const addIconClass = (element) => {
        element.classList.add('__tds-side-menu-item-icon');
        if (this.collapsed) {
          element.classList.add('__tds-side-menu-item-icon-collapsed');
        }
        else {
          element.classList.remove('__tds-side-menu-item-icon-collapsed');
        }
      };
      this.updateSlotted(isIconOrSvg, addIconClass);
    }
  }
  connectedCallback() {
    // closest() will return null if side-menu-item is inside a shadowRoot that
    // does not contain a side-menu. This is the case for the side-menu-dropdown.
    this.sideMenuEl = this.host.closest('tds-side-menu');
  }
  componentDidLoad() {
    this.slotEl = this.host.shadowRoot.querySelector('slot');
    this.updateSlottedElements();
    this.slotEl.addEventListener('slotchange', this.updateSlottedElements);
  }
  collapseSideMenuEventHandler(event) {
    this.collapsed = event.detail.collapsed;
    this.updateSlottedElements();
  }
  render() {
    return (h(Host, null, h("div", { class: {
        'component': true,
        'component-selected': this.selected,
        'component-active': this.active,
        'component-collapsed': this.collapsed,
      } }, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return sideMenuItemCss; }
}, [1, "tds-side-menu-item", {
    "selected": [4],
    "active": [4],
    "collapsed": [32]
  }, [[16, "internalTdsSideMenuPropChange", "collapseSideMenuEventHandler"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-side-menu-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-side-menu-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsSideMenuItem);
      }
      break;
  } });
}

export { TdsSideMenuItem as T, defineCustomElement as d };
