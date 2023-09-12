import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as getPreviousNestedChildOfSiblingsMatching, d as isHeadingElement } from './utils.js';

const headerDropdownListCss = ":host{display:block;width:190px;padding:0;margin:0;list-style:none;border-radius:unset;background-color:var(--tds-header-app-launcher-menu-bg)}@media all and (max-width: 384px){:host{width:100vw}}:host([size=lg]){width:320px}";

const TdsHeaderDropdownList = /*@__PURE__*/ proxyCustomElement(class TdsHeaderDropdownList extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    // A Map to store the slots and their associated slotchange listeners.
    this.slotListeners = new Map();
    this.size = 'md';
    this.headingElement = undefined;
  }
  componentWillLoad() {
    const { children } = this.host;
    // Set the size prop for each child, if they have such a property
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if ('size' in child) {
        child.size = this.size;
      }
    }
    let listRoot = this.host;
    if (this.host.parentElement.tagName.toLowerCase() === 'tds-header-launcher-list') {
      listRoot = this.host.parentElement;
    }
    const headingEl = getPreviousNestedChildOfSiblingsMatching(listRoot, isHeadingElement);
    if (headingEl) {
      this.headingElement = headingEl;
    }
    else {
      console.warn('Heading element for list not found');
    }
  }
  componentDidLoad() {
    this.host.shadowRoot.querySelectorAll('slot').forEach((slot) => {
      // Add the slotchange event listener.
      const onSlotChange = (e) => {
        this.processAssignedElements(e.target);
      };
      slot.addEventListener('slotchange', onSlotChange);
      onSlotChange({ target: slot });
      // Store the slot and its listener in the Map.
      this.slotListeners.set(slot, onSlotChange);
    });
  }
  processAssignedElements(slot) {
    const nodes = slot.assignedElements();
    nodes.forEach((node) => {
      // Add a listitem role to the assigned element if needed.
      if (node.tagName.toLowerCase() !== 'li' &&
        node.tagName.toLowerCase() !== 'slot' &&
        node.getAttribute('role') !== 'listitem') {
        node.setAttribute('role', 'listitem');
      }
      // If the assigned element is a slot, process its assigned elements recursively.
      if (node.tagName.toLowerCase() === 'slot') {
        this.processAssignedElements(node);
      }
    });
  }
  disconnectedCallback() {
    this.slotListeners.forEach((listener, slot) => {
      // Remove the slotchange event listener and delete the entry from the Map.
      slot.removeEventListener('slotchange', listener);
      this.slotListeners.delete(slot);
    });
  }
  render() {
    var _a;
    const attributes = {
      'role': 'list',
      'aria-labelledby': (_a = this.headingElement) === null || _a === void 0 ? void 0 : _a.id,
    };
    return (h(Host, Object.assign({}, attributes), h("slot", null)));
  }
  get host() { return this; }
  static get style() { return headerDropdownListCss; }
}, [1, "tds-header-dropdown-list", {
    "size": [513],
    "headingElement": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-dropdown-list"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-dropdown-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderDropdownList);
      }
      break;
  } });
}

export { TdsHeaderDropdownList as T, defineCustomElement as d };
