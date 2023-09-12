import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const stepCss = ":host{position:relative;display:table-cell}:host tds-icon{line-height:1}:host [role=listitem]{display:flex;justify-content:start;flex-direction:row;align-items:center;gap:8px}:host [role=listitem].text-below{flex-direction:column}:host [role=listitem].lg{padding:0 20px;font:var(--tds-detail-01);letter-spacing:var(--tds-detail-01-ls)}:host [role=listitem].lg .content-container{height:30px;min-width:30px}:host [role=listitem].lg.vertical::after{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:36px;width:1px;top:40px;left:36px}:host [role=listitem].lg.horizontal::after{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;left:calc(50% + 24px);right:0;top:18px}:host [role=listitem].lg.horizontal::before{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;right:calc(50% + 24px);left:0;top:18px}:host [role=listitem].lg.horizontal.text-aside:not(.hide-labels)::after{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;top:16px;width:10px;left:auto;right:-10px}:host [role=listitem].lg.horizontal.text-aside:not(.hide-labels)::before{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;top:16px;width:10px;left:-10px;right:auto}:host [role=listitem].sm{padding:0 20px;font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls)}:host [role=listitem].sm .content-container{height:24px;min-width:24px}:host [role=listitem].sm.vertical::after{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:20px;width:1px;top:34px;left:32px}:host [role=listitem].sm.vertical::before{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:20px;width:1px;top:34px;left:32px}:host [role=listitem].sm.horizontal::after{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;left:calc(50% + 16px + 8px);right:0;top:13px}:host [role=listitem].sm.horizontal::before{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;left:0;right:calc(50% + 24px);top:13px}:host [role=listitem].sm.horizontal.text-aside:not(.hide-labels)::after{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;top:13px;width:10px;left:auto;right:-10px}:host [role=listitem].sm.horizontal.text-aside:not(.hide-labels)::before{content:\" \";position:absolute;background-color:var(--tds-stepper-icon-step-background-after);opacity:0.16;height:1px;top:13px;width:10px;left:-10px;right:auto}:host [role=listitem] .content-container{border-radius:100px;border:1px solid var(--tds-stepper-icon-background);display:flex;justify-content:center;align-items:center;position:relative}:host [role=listitem] .content-container.error{border-color:var(--tds-negative);color:var(--tds-negative)}:host [role=listitem] .content-container.success{background-color:var(--tds-positive);border-color:var(--tds-positive);color:var(--tds-white)}:host [role=listitem] .content-container.upcoming{background-color:transparent;border-color:var(--tds-stepper-label-border-color-upcoming);color:var(--tds-stepper-label-text-color-upcoming);opacity:var(--tds-stepper-label-text-opacity-upcoming)}:host [role=listitem] .label{text-align:center}:host [role=listitem] .label.lg{font:var(--tds-detail-01);letter-spacing:var(--tds-detail-01-ls)}:host [role=listitem] .label.sm{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls)}:host [role=listitem] .label.upcoming{color:var(--tds-stepper-label-text-color-upcoming);opacity:var(--tds-stepper-label-text-opacity-upcoming)}:host(.last) [role=listitem].sm::after,:host(.last) [role=listitem].lg::after{display:none}:host(.last) [role=listitem].sm.vertical::before{display:none}:host(.first) [role=listitem].sm::before,:host(.first) [role=listitem].lg::before{display:none}";

const TdsStep$1 = /*@__PURE__*/ proxyCustomElement(class TdsStep extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.index = undefined;
    this.state = 'upcoming';
    this.hideLabel = undefined;
    this.size = undefined;
    this.orientation = undefined;
    this.labelPosition = undefined;
  }
  /* Needs to be onload to do this on any updates. */
  componentWillLoad() {
    this.stepperEl = this.el.closest('tds-stepper');
    this.orientation = this.stepperEl.orientation;
    this.labelPosition = this.stepperEl.labelPosition;
    this.size = this.stepperEl.size;
    this.hideLabel = this.stepperEl.hideLabels;
    this.stepperId = this.stepperEl.stepperId;
  }
  handlePropsChange(event) {
    if (this.stepperId === event.detail.stepperId) {
      event.detail.changed.forEach((changedProp) => {
        if (typeof this[changedProp] === 'undefined') {
          throw new Error(`Table prop is not supported: ${changedProp}`);
        }
        if (this[changedProp] === this.orientation && event.detail[changedProp] === 'vertical') {
          this.labelPosition = 'aside';
        }
        this[changedProp] = event.detail[changedProp];
      });
    }
  }
  render() {
    return (h(Host, null, h("div", { role: "listitem", class: `${this.size} ${this.orientation} text-${this.labelPosition} ${this.hideLabel ? 'hide-labels' : ''}` }, h("div", { class: `${this.state} content-container` }, this.state === 'success' || this.state === 'error' ? (h("tds-icon", { name: this.state === 'success' ? 'tick' : 'warning', size: this.size === 'lg' ? '20px' : '16px' })) : (this.index)), !this.hideLabel && (h("div", { class: `label ${this.size} ${this.state}` }, h("slot", { name: "label" }))))));
  }
  get el() { return this; }
  static get style() { return stepCss; }
}, [1, "tds-step", {
    "index": [1],
    "state": [1],
    "hideLabel": [32],
    "size": [32],
    "orientation": [32],
    "labelPosition": [32]
  }, [[16, "internalTdsPropsChange", "handlePropsChange"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-step", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-step":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsStep$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsStep = TdsStep$1;
const defineCustomElement = defineCustomElement$1;

export { TdsStep, defineCustomElement };
