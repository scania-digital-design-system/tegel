import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { j as dfs } from './utils.js';
import { d as defineCustomElement$1 } from './core-header-item.js';

const headerItemCss = ":host ::slotted(button),:host ::slotted(a){all:unset;box-sizing:border-box;background-color:var(--tds-header-background);border-right:1px solid var(--tds-header--basic-element-border);width:100%;height:100%;cursor:pointer;padding:0 24px;display:flex;align-items:center;gap:8px}:host ::slotted(button) *,:host ::slotted(a) *{box-sizing:border-box}:host ::slotted(button:hover),:host ::slotted(a:hover){background-color:var(--tds-header-item-hover)}:host ::slotted(button:focus-visible),:host ::slotted(a:focus-visible){outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .component-active ::slotted(button),:host .component-active ::slotted(a){background-color:var(--tds-header--basic-element-background-open);color:var(--tds-header-nav-item-dropdown-opened-color);border-color:var(--tds-header--basic-element-border-open)}:host .component-selected:not(.component-active) ::slotted(button),:host .component-selected:not(.component-active) ::slotted(a){background-color:var(--tds-header--basic-element-background-selected);padding-top:4px;border-bottom-style:solid;border-bottom-width:4px;border-bottom-color:var(--tds-nav-item-border-color-active)}";

const TdsHeaderItem = /*@__PURE__*/ proxyCustomElement(class TdsHeaderItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.active = false;
    this.selected = false;
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
      const addIconClass = (element) => element.classList.add('__tds-header-item-icon');
      this.updateSlotted(isIconOrSvg, addIconClass);
      const isImage = (element) => element.tagName.toLowerCase() === 'img';
      const addImageClass = (element) => element.classList.add('__tds-header-item-image');
      this.updateSlotted(isImage, addImageClass);
    }
  }
  componentDidLoad() {
    this.slotEl = this.host.shadowRoot.querySelector('slot');
    this.updateSlottedElements();
    this.slotEl.addEventListener('slotchange', this.updateSlottedElements);
  }
  render() {
    return (h(Host, null, h("tds-core-header-item", { class: {
        'component-active': this.active,
        'component-selected': this.selected,
      } }, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return headerItemCss; }
}, [1, "tds-header-item", {
    "active": [4],
    "selected": [4]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-item", "tds-core-header-item"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderItem);
      }
      break;
    case "tds-core-header-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { TdsHeaderItem as T, defineCustomElement as d };
