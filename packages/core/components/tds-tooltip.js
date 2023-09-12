import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { e as inheritAttributes } from './utils.js';
import { d as defineCustomElement$2 } from './popover-core.js';

const tooltipCss = ".sc-tds-tooltip:root,.tds-mode-light.sc-tds-tooltip{--tds-tooltip-background:var(--tds-grey-800);--tds-tooltip-color:var(--tds-white)}.tds-mode-dark.sc-tds-tooltip{--tds-tooltip-background:var(--tds-grey-200);--tds-tooltip-color:var(--tds-grey-958)}.tds-tooltip.sc-tds-tooltip{box-sizing:border-box;font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);color:var(--tds-tooltip-color);background-color:var(--tds-tooltip-background);border-radius:4px;padding:8px;word-wrap:break-word;max-width:192px;z-index:900;opacity:0;visibility:hidden;transition:opacity 200ms ease-in, visibility 200ms ease-in}.tds-tooltip.sc-tds-tooltip *.sc-tds-tooltip{box-sizing:border-box}.tds-tooltip.tds-tooltip-top-left.sc-tds-tooltip{border-radius:0 4px 4px}.tds-tooltip.tds-tooltip-top-right.sc-tds-tooltip{border-radius:4px 0 4px 4px}.tds-tooltip.tds-tooltip-bottom-right.sc-tds-tooltip{border-radius:4px 4px 0}.tds-tooltip.tds-tooltip-bottom-left.sc-tds-tooltip{border-radius:4px 4px 4px 0}.tds-tooltip-show.sc-tds-tooltip{opacity:1;visibility:visible}";

const TdsTooltip$1 = /*@__PURE__*/ proxyCustomElement(class TdsTooltip extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.offsetSkidding = 0;
    this.offsetDistance = 8;
    this.popperjsExtraModifiers = [
      {
        name: 'positionCalc',
        enabled: true,
        phase: 'main',
        fn: ({ state }) => {
          if (state.placement === 'bottom-start' || state.placement === 'right-start') {
            this.border = 'top-left';
          }
          else if (state.placement === 'bottom-end' || state.placement === 'left-start') {
            this.border = 'top-right';
          }
          else if (state.placement === 'top-end' || state.placement === 'left-end') {
            this.border = 'bottom-right';
          }
          else if (state.placement === 'top-start' || state.placement === 'right-end') {
            this.border = 'bottom-left';
          }
          else if (state.placement === 'bottom' || state.placement === 'top') {
            this.border = 'default';
          }
        },
      },
    ];
    this.inheritedAttributes = [];
    this.text = '';
    this.selector = '';
    this.referenceEl = undefined;
    this.mouseOverTooltip = false;
    this.show = false;
    this.placement = 'bottom';
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.host, ['style', 'class']);
  }
  render() {
    var _a;
    return (h(Host, null, h("tds-popover-core", Object.assign({}, this.inheritedAttributes, { class: {
        'tds-tooltip': true,
        [`tds-tooltip-${this.border}`]: true,
        [(_a = this.inheritedAttributes.class) !== null && _a !== void 0 ? _a : '']: true,
        'tds-tooltip-show': this.show,
      }, selector: this.selector, referenceEl: this.referenceEl, trigger: this.mouseOverTooltip ? 'hover-popover' : 'hover', modifiers: this.popperjsExtraModifiers, show: this.show, placement: this.placement, autoHide: false, onInternalTdsShow: () => {
        this.show = true;
      }, onInternalTdsClose: () => {
        this.show = false;
      } }), this.text, h("slot", null))));
  }
  get host() { return this; }
  static get style() { return tooltipCss; }
}, [6, "tds-tooltip", {
    "text": [1],
    "selector": [1],
    "referenceEl": [16],
    "mouseOverTooltip": [4, "mouse-over-tooltip"],
    "show": [1028],
    "placement": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-tooltip", "tds-popover-core"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-tooltip":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsTooltip$1);
      }
      break;
    case "tds-popover-core":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsTooltip = TdsTooltip$1;
const defineCustomElement = defineCustomElement$1;

export { TdsTooltip, defineCustomElement };
