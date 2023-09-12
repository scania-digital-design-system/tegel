import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { h as hasSlot, g as generateUniqueId } from './utils.js';
import { d as defineCustomElement$2 } from './divider.js';

const cardCss = ".card{box-sizing:border-box;box-shadow:var(--tds-card-box);background-color:var(--tds-card-background);display:block;border-radius:4px;overflow:hidden}.card *{box-sizing:border-box}.card.clickable:hover{box-shadow:var(--tds-card-box-hover);cursor:pointer}.card .card-header{font:var(--tds-headline-06);letter-spacing:var(--tds-headline-06-ls);padding:16px;display:flex;align-items:center}.card .card-header slot[name=thumbnail]::slotted(*){width:36px;height:36px;border-radius:100%;margin-right:16px}.card .card-header .card-top-header{padding-left:16px;display:flex;flex-direction:column}.card .card-header .card-top-header.no-header-img{padding-left:0}.card .card-header.below{padding-top:16px}.card .header-subheader{display:flex;flex-direction:column;gap:4px}.card .header-subheader .header,.card .header-subheader slot[name=header]{color:var(--tds-card-headline)}.card .header-subheader .subheader,.card .header-subheader slot[name=subheader]{color:var(--tds-card-sub-headline)}.card .card-body-img{width:100%}.card .tds-divider{margin:16px 16px 0;background-color:var(--tds-card-divider);height:1px}.card .card-body{display:block;word-wrap:break-word}.card slot[name=body]::slotted(*){font:var(--tds-detail-03);letter-spacing:var(--tds-detail-03-ls);color:var(--tds-card-body-color);padding:0 16px;margin-bottom:16px;margin-top:16px;max-width:336px}.card slot[name=actions]::slotted(*){display:flex;padding:16px;color:var(--tds-card-icon-color)}button{border:none;text-align:left;padding:0}button:focus-visible{outline:2px solid var(--tds-blue-400);outline-offset:-2px}button:active{box-shadow:var(--tds-card-box-pressed)}";

const TdsCard$1 = /*@__PURE__*/ proxyCustomElement(class TdsCard extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsClick = createEvent(this, "tdsClick", 6);
    this.handleClick = () => {
      this.tdsClick.emit({
        cardId: this.cardId,
      });
    };
    this.getCardHeader = () => {
      const usesHeaderSlot = hasSlot('header', this.host);
      const usesSubheaderSlot = hasSlot('subheader', this.host);
      const usesThumbnailSlot = hasSlot('thumbnail', this.host);
      return (h("div", { class: "card-header" }, usesThumbnailSlot && h("slot", { name: "thumbnail" }), h("div", { class: "header-subheader" }, this.header && h("span", { class: "header" }, this.header), usesHeaderSlot && h("slot", { name: "header" }), this.subheader && h("span", { class: "subheader" }, this.subheader), usesSubheaderSlot && h("slot", { name: "subheader" }))));
    };
    this.getCardContent = () => {
      const usesBodySlot = hasSlot('body', this.host);
      const usesBodyImageSlot = hasSlot('body-image', this.host);
      const usesActionsSlot = hasSlot('actions', this.host);
      return (h("div", null, this.imagePlacement === 'below-header' && this.getCardHeader(), h("div", { class: `card-body` }, usesBodyImageSlot && h("slot", { name: "body-image" }), this.bodyImg && h("img", { class: "card-body-img", src: this.bodyImg, alt: this.bodyImgAlt }), this.imagePlacement === 'above-header' && this.getCardHeader(), this.bodyDivider && h("tds-divider", null), usesBodySlot && h("slot", { name: "body" })), usesActionsSlot && h("slot", { name: `actions` })));
    };
    this.modeVariant = null;
    this.imagePlacement = 'below-header';
    this.header = undefined;
    this.subheader = undefined;
    this.bodyImg = undefined;
    this.bodyImgAlt = undefined;
    this.bodyDivider = false;
    this.clickable = false;
    this.cardId = generateUniqueId();
  }
  render() {
    return (h(Host, { class: this.modeVariant && `tds-mode-variant-${this.modeVariant}` }, this.clickable ? (h("button", { class: `card ${this.clickable ? 'clickable' : ''} ${this.imagePlacement}`, onClick: () => {
        if (this.clickable) {
          this.handleClick();
        }
      } }, this.getCardContent())) : (h("div", { class: `card ${this.clickable ? 'clickable' : ''} ${this.imagePlacement}` }, this.getCardContent()))));
  }
  get host() { return this; }
  static get style() { return cardCss; }
}, [1, "tds-card", {
    "modeVariant": [1, "mode-variant"],
    "imagePlacement": [1, "image-placement"],
    "header": [1],
    "subheader": [1],
    "bodyImg": [1, "body-img"],
    "bodyImgAlt": [1, "body-img-alt"],
    "bodyDivider": [4, "body-divider"],
    "clickable": [4],
    "cardId": [1, "card-id"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-card", "tds-divider"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-card":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsCard$1);
      }
      break;
    case "tds-divider":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsCard = TdsCard$1;
const defineCustomElement = defineCustomElement$1;

export { TdsCard, defineCustomElement };
