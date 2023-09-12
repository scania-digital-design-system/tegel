import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const inlineTabsCss = ":host{box-sizing:border-box;display:flex;background-color:var(--tds-inline-tabs-background);position:relative}:host *{box-sizing:border-box}:host::after{content:\" \";display:block;border-bottom:1px solid var(--tds-inline-tabs-horizontal-divider-background);opacity:var(--tds-inline-tabs-horizontal-divider-opacity);left:0;right:0;bottom:0;position:absolute}:host .wrapper{display:flex;flex-wrap:nowrap;white-space:nowrap;width:100%;overflow-x:scroll;scrollbar-width:none}:host .wrapper::-webkit-scrollbar{display:none}:host .scroll-right-button{right:0;z-index:201}:host .scroll-left-button{left:0;z-index:201}:host .scroll-right-button,:host .scroll-left-button{color:var(--tds-folder-tabs-scroll-btn-color);cursor:pointer;border:0;width:0;background-color:var(--tds-inline-tabs-scroll-btn-background);display:none;justify-content:center;align-items:center;opacity:0;pointer-events:none;position:sticky}:host .scroll-right-button.show,:host .scroll-left-button.show{min-width:48px;display:block;opacity:1;pointer-events:all}:host .scroll-right-button:hover,:host .scroll-left-button:hover{background-color:var(--tds-folder-tabs-scroll-btn-background-hover)}:host .scroll-right-button:active,:host .scroll-left-button:active{background-color:var(--tds-folder-tabs-scroll-btn-background-active)}:host .scroll-right-button:focus,:host .scroll-left-button:focus{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .scroll-right-button svg,:host .scroll-left-button svg{fill:var(--tds-folder-tabs-scroll-btn-color)}";

const TdsInlineTabs$1 = /*@__PURE__*/ proxyCustomElement(class TdsInlineTabs extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsChange = createEvent(this, "tdsChange", 7);
    this.navWrapperElement = null; // reference to container with nav buttons
    this.componentWidth = 0; // visible width of this component
    this.buttonsWidth = 0; // total width of all nav items combined
    this.scrollWidth = 0; // total amount that is possible to scroll in the nav wrapper
    this.addResizeObserver = () => {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const componentWidth = entry.contentRect.width;
          let buttonsWidth = 0;
          const navButtons = Array.from(this.host.children);
          navButtons.forEach((navButton) => {
            const style = window.getComputedStyle(navButton);
            buttonsWidth +=
              navButton.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
          });
          this.componentWidth = componentWidth;
          this.buttonsWidth = buttonsWidth;
          this.scrollWidth = buttonsWidth - componentWidth;
          if (this.buttonsWidth > this.componentWidth) {
            this.evaluateScrollButtons();
          }
          else {
            this.showLeftScroll = false;
            this.showRightScroll = false;
          }
        });
      });
      resizeObserver.observe(this.navWrapperElement);
    };
    this.addEventListenerToTabs = () => {
      this.children = this.children.map((item, index) => {
        item.addEventListener('click', () => {
          if (!item.disabled) {
            const tdsChangeEvent = this.tdsChange.emit({
              selectedTabIndex: this.children.indexOf(item),
            });
            if (!tdsChangeEvent.defaultPrevented) {
              this.children.forEach((element) => element.setSelected(false));
              item.setSelected(true);
              this.selectedIndex = index;
              this.tdsChange.emit({
                selectedTabIndex: this.selectedIndex,
              });
            }
          }
        });
        return item;
      });
    };
    this.modeVariant = 'primary';
    this.defaultSelectedIndex = 0;
    this.selectedIndex = undefined;
    this.showLeftScroll = false;
    this.showRightScroll = false;
    this.buttonWidth = 0;
  }
  /** Selects a Tab based on tabindex, will not select a disabled Tab. */
  async selectTab(tabIndex) {
    if (!this.children[tabIndex].disabled) {
      this.children.forEach((element) => element.setSelected(false));
      this.children = this.children.map((element, index) => {
        if (index === tabIndex) {
          element.setSelected(true);
          this.selectedIndex = tabIndex;
          this.tdsChange.emit({
            selectedTabIndex: this.selectedIndex,
          });
        }
        return element;
      });
    }
    return {
      selectedTabIndex: this.selectedIndex,
    };
  }
  handleSelectedIndexUpdate() {
    this.children = Array.from(this.host.children).map((tabElement) => {
      tabElement.setSelected(false);
      return tabElement;
    });
    this.children[this.selectedIndex].setSelected(true);
  }
  scrollRight() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll + this.buttonsWidth;
    this.evaluateScrollButtons();
  }
  scrollLeft() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll - this.buttonsWidth;
    this.evaluateScrollButtons();
  }
  evaluateScrollButtons() {
    const scroll = this.navWrapperElement.scrollLeft;
    if (scroll >= this.scrollWidth) {
      this.showRightScroll = false;
    }
    else {
      this.showRightScroll = true;
    }
    if (scroll <= 0) {
      this.showLeftScroll = false;
    }
    else {
      this.showLeftScroll = true;
    }
  }
  connectedCallback() {
    this.children = Array.from(this.host.children);
    this.children[0].classList.add('first');
    this.children[this.children.length - 1].classList.add('last');
  }
  componentDidLoad() {
    if (this.selectedIndex === undefined) {
      this.addEventListenerToTabs();
      this.children[this.defaultSelectedIndex].setSelected(true);
      this.selectedIndex = this.defaultSelectedIndex;
      this.tdsChange.emit({
        selectedTabIndex: this.selectedIndex,
      });
    }
    else {
      this.children[this.selectedIndex].setSelected(true);
      this.tdsChange.emit({
        selectedTabIndex: this.selectedIndex,
      });
    }
  }
  componentDidRender() {
    if (this.buttonsWidth > this.componentWidth) {
      this.evaluateScrollButtons();
    }
    else {
      this.showLeftScroll = false;
      this.showRightScroll = false;
    }
    this.addResizeObserver();
  }
  render() {
    return (h(Host, { role: "list", class: `${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}` }, h("div", { class: "wrapper", ref: (el) => {
        this.navWrapperElement = el;
      } }, h("button", { class: `scroll-left-button ${this.showLeftScroll ? 'show' : ''}`, onClick: () => this.scrollLeft(), disabled: !this.showLeftScroll }, h("tds-icon", { name: "chevron_left", size: "20px" })), h("slot", null), h("button", { class: `scroll-right-button ${this.showRightScroll ? 'show' : ''}`, onClick: () => this.scrollRight(), disabled: !this.showRightScroll }, h("tds-icon", { name: "chevron_right", size: "20px" })))));
  }
  get host() { return this; }
  static get watchers() { return {
    "selectedIndex": ["handleSelectedIndexUpdate"]
  }; }
  static get style() { return inlineTabsCss; }
}, [1, "tds-inline-tabs", {
    "modeVariant": [1, "mode-variant"],
    "defaultSelectedIndex": [2, "default-selected-index"],
    "selectedIndex": [514, "selected-index"],
    "showLeftScroll": [32],
    "showRightScroll": [32],
    "buttonWidth": [32],
    "selectTab": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-inline-tabs", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-inline-tabs":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsInlineTabs$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsInlineTabs = TdsInlineTabs$1;
const defineCustomElement = defineCustomElement$1;

export { TdsInlineTabs, defineCustomElement };
