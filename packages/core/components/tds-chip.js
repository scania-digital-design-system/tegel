import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as generateUniqueId, h as hasSlot } from './utils.js';

const chipCss = ".sc-tds-chip-s>*{display:inline-flex;align-items:center}.sc-tds-chip-h .sc-tds-chip-s>[slot=label]{padding-top:2px}.component.sc-tds-chip .tds-chip-component.sc-tds-chip{display:inline-flex}.component.sc-tds-chip .tds-chip-component.sc-tds-chip label.sc-tds-chip{background-color:var(--tds-chips-background);color:var(--tds-chips-color);font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);display:inline-flex;align-items:center;border-radius:16px;cursor:pointer;white-space:nowrap}.component.sc-tds-chip .tds-chip-component.sc-tds-chip label.sc-tds-chip:hover{background-color:var(--tds-chips-background-hover)}.component.sc-tds-chip .tds-chip-component.lg.sc-tds-chip label.sc-tds-chip{height:32px;padding:0 16px;gap:8px}.component.sc-tds-chip .tds-chip-component.sm.sc-tds-chip label.sc-tds-chip{height:24px;padding:0 12px;gap:6px}.component.sc-tds-chip .tds-chip-component.sm.prefix.sc-tds-chip label.sc-tds-chip{padding:0 12px 0 6px}.component.sc-tds-chip .tds-chip-component.sm.suffix.sc-tds-chip label.sc-tds-chip{padding:0 6px 0 12px}.component.sc-tds-chip .tds-chip-component.lg.prefix.sc-tds-chip label.sc-tds-chip{padding:0 16px 0 8px}.component.sc-tds-chip .tds-chip-component.lg.suffix.sc-tds-chip label.sc-tds-chip{padding:0 8px 0 16px}.component.sc-tds-chip .tds-chip-component.lg.prefix.suffix.sc-tds-chip label.sc-tds-chip{padding:0 8px}.component.sc-tds-chip .tds-chip-component.sm.prefix.suffix.sc-tds-chip label.sc-tds-chip{padding:0 6px}.component.sc-tds-chip .tds-chip-component.sc-tds-chip input.sc-tds-chip{opacity:0;position:absolute;z-index:-1}.component.sc-tds-chip .tds-chip-component.sc-tds-chip input.sc-tds-chip:focus-visible+label.sc-tds-chip{outline:2px solid var(--tds-blue-400);outline-offset:-2px;background-color:var(--tds-chips-background-focus)}.component.sc-tds-chip .tds-chip-component.sc-tds-chip input.sc-tds-chip:checked+label.sc-tds-chip{background-color:var(--tds-chips-background-active);color:var(--tds-chips-color-active)}.component.sc-tds-chip .tds-chip-component.sc-tds-chip input.sc-tds-chip:checked+label.sc-tds-chip:hover{background-color:var(--tds-chips-background-active-hover)}";

const TdsChip$1 = /*@__PURE__*/ proxyCustomElement(class TdsChip extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.tdsClick = createEvent(this, "tdsClick", 6);
    this.handleChange = () => {
      this.checked = !this.checked;
      this.tdsChange.emit({
        chipId: this.chipId,
        checked: this.checked,
        value: this.value,
      });
    };
    this.handleClick = () => {
      this.tdsClick.emit({
        chipId: this.chipId,
      });
    };
    this.type = 'button';
    this.size = 'lg';
    this.chipId = generateUniqueId();
    this.checked = false;
    this.name = undefined;
    this.value = undefined;
  }
  renderInputAttributes() {
    if (this.type !== 'button') {
      return {
        value: this.value,
        checked: this.checked,
        name: this.name,
        onChange: () => this.handleChange(),
      };
    }
    return {
      onClick: () => this.handleClick(),
    };
  }
  render() {
    const inputAttributes = this.renderInputAttributes();
    const hasPrefixSlot = hasSlot('prefix', this.host);
    const hasLabelSlot = hasSlot('label', this.host);
    const hasSuffixSlot = hasSlot('suffix', this.host);
    return (h(Host, null, h("div", { class: "component" }, h("div", { class: {
        'tds-chip-component': true,
        'sm': this.size === 'sm',
        'lg': this.size === 'lg',
        'prefix': hasPrefixSlot,
        'suffix': hasSuffixSlot,
      } }, h("input", Object.assign({ type: this.type, id: this.chipId }, inputAttributes)), h("label", { onClick: (event) => event.stopPropagation(), htmlFor: this.chipId }, hasPrefixSlot && h("slot", { name: "prefix" }), hasLabelSlot && h("slot", { name: "label" }), hasSuffixSlot && h("slot", { name: "suffix" }))))));
  }
  get host() { return this; }
  static get style() { return chipCss; }
}, [6, "tds-chip", {
    "type": [1],
    "size": [1],
    "chipId": [1, "chip-id"],
    "checked": [516],
    "name": [1],
    "value": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-chip"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-chip":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsChip$1);
      }
      break;
  } });
}

const TdsChip = TdsChip$1;
const defineCustomElement = defineCustomElement$1;

export { TdsChip, defineCustomElement };
