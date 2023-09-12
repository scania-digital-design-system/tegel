import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as getPreviousNestedChildOfSiblingsMatching, d as isHeadingElement } from './utils.js';

const headerLauncherGridCss = ".tds-header-launcher-grid{box-sizing:border-box;padding:12px;margin:0;list-style:none;width:100%;display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;border-radius:none}";

const TdsHeaderLauncherGrid$1 = /*@__PURE__*/ proxyCustomElement(class TdsHeaderLauncherGrid extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.headingElement = undefined;
  }
  componentWillLoad() {
    const listRoot = this.host;
    const headingEl = getPreviousNestedChildOfSiblingsMatching(listRoot, (el) => {
      const e = el;
      return isHeadingElement(e);
    });
    if (headingEl) {
      this.headingElement = headingEl;
    }
    else {
      console.warn('Heading element for list not found');
    }
  }
  render() {
    var _a;
    const listAttributes = {
      'class': 'tds-header-launcher-grid',
      'role': 'list',
      'aria-labelledby': (_a = this.headingElement) === null || _a === void 0 ? void 0 : _a.id,
    };
    return (h(Host, null, h("div", Object.assign({}, listAttributes), h("slot", null))));
  }
  get host() { return this; }
  static get style() { return headerLauncherGridCss; }
}, [4, "tds-header-launcher-grid", {
    "headingElement": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-header-launcher-grid"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-header-launcher-grid":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsHeaderLauncherGrid$1);
      }
      break;
  } });
}

const TdsHeaderLauncherGrid = TdsHeaderLauncherGrid$1;
const defineCustomElement = defineCustomElement$1;

export { TdsHeaderLauncherGrid, defineCustomElement };
