import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';

const badgeCss = ":host{--tds-badge-background-color:var(--tds-negative);--tds-badge-color-text:var(--tds-white);box-sizing:border-box;display:block}:host *{box-sizing:border-box}.tds-badge{display:block;border-radius:12px;background-color:var(--tds-badge-background-color);text-align:center}.tds-badge.tds-badge-sm{height:8px;width:8px;line-height:8px}.tds-badge.tds-badge-lg{height:20px;line-height:20px;width:20px}.tds-badge.tds-badge-pill{display:inline-block;width:unset;padding-left:8px;padding-right:8px}.tds-badge.tds-badge-hidden{display:none}.tds-badge-text{font-family:var(--tds-font-family-semi-condensed-bold);font-size:12px;color:var(--tds-badge-color-text);font-weight:bold}";

const TdsBadge$1 = /*@__PURE__*/ proxyCustomElement(class TdsBadge extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.value = '';
    this.hidden = false;
    this.size = 'lg';
    this.shape = '';
    this.text = '';
  }
  watchProps() {
    this.checkProps();
  }
  componentWillLoad() {
    this.checkProps();
  }
  checkProps() {
    const valueAsNumber = parseInt(this.value);
    if (!Number.isNaN(valueAsNumber) && this.size !== 'sm') {
      this.shape = this.value.toString().length >= 2 ? 'pill' : '';
      this.size = 'lg';
      this.text = valueAsNumber.toString().length >= 3 ? '99+' : valueAsNumber.toString();
    }
    else {
      // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
      if (this.value !== '' && this.size !== 'sm') {
        console.warn('The provided value is either empty or string, please provide value as number.');
      }
    }
  }
  render() {
    return (h("host", { class: `tds-badge tds-badge-${this.size} ${this.shape === 'pill' ? 'tds-badge-pill' : ''} ${this.hidden ? 'tds-badge-hidden' : ''}` }, h("div", { class: "tds-badge-text" }, this.text)));
  }
  static get watchers() { return {
    "value": ["watchProps"],
    "size": ["watchProps"]
  }; }
  static get style() { return badgeCss; }
}, [1, "tds-badge", {
    "value": [1],
    "hidden": [516],
    "size": [1],
    "shape": [32],
    "text": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-badge"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-badge":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsBadge$1);
      }
      break;
  } });
}

const TdsBadge = TdsBadge$1;
const defineCustomElement = defineCustomElement$1;

export { TdsBadge, defineCustomElement };
