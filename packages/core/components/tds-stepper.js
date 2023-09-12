import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId } from './utils.js';

const stepperCss = ":host [role=list]{display:flex;justify-content:space-evenly;min-width:100%}:host [role=list]:not(.text-position-aside){display:table;table-layout:fixed;width:100%;list-style:none}:host [role=list].vertical{height:100%;display:flex;flex-direction:column;justify-content:unset;gap:52px}:host [role=list].vertical.sm{gap:36px}:host [role=list].horizontal.text-position-aside{justify-content:unset}";

const TdsStepper$1 = /*@__PURE__*/ proxyCustomElement(class TdsStepper extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.internalTdsPropsChange = createEvent(this, "internalTdsPropsChange", 6);
    this.orientation = 'horizontal';
    this.labelPosition = 'below';
    this.size = 'lg';
    this.hideLabels = false;
    this.stepperId = generateUniqueId();
  }
  componentWillLoad() {
    this.host.children[0].classList.add('first');
    this.host.children[this.host.children.length - 1].classList.add('last');
    if (this.orientation === 'vertical') {
      this.labelPosition = 'aside';
    }
  }
  handleDirectionChange() {
    this.internalTdsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['orientation'],
      orientation: this.orientation,
    });
  }
  handleLabelPositionChange() {
    this.internalTdsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['labelPosition'],
      labelPosition: this.labelPosition,
    });
  }
  handleSizeChange() {
    this.internalTdsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['size'],
      size: this.size,
    });
  }
  handleHideLabelsChange() {
    this.internalTdsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['hideLabels'],
      hideLabels: this.hideLabels,
    });
  }
  render() {
    return (h(Host, null, h("div", { role: "list", class: `${this.orientation} text-position-${this.labelPosition} ${this.size}` }, h("slot", null))));
  }
  get host() { return this; }
  static get watchers() { return {
    "orientation": ["handleDirectionChange"],
    "labelPosition": ["handleLabelPositionChange"],
    "size": ["handleSizeChange"],
    "hideLabels": ["handleHideLabelsChange"]
  }; }
  static get style() { return stepperCss; }
}, [1, "tds-stepper", {
    "orientation": [1],
    "labelPosition": [1, "label-position"],
    "size": [1],
    "hideLabels": [4, "hide-labels"],
    "stepperId": [1, "stepper-id"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-stepper"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-stepper":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsStepper$1);
      }
      break;
  } });
}

const TdsStepper = TdsStepper$1;
const defineCustomElement = defineCustomElement$1;

export { TdsStepper, defineCustomElement };
