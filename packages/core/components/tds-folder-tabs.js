import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './icon.js';

const folderTabsCss = ":host{box-sizing:border-box;overflow:hidden;outline:0}:host *{box-sizing:border-box}:host .wrapper{display:flex;overflow-x:scroll;scrollbar-width:none;position:relative}:host .wrapper::-webkit-scrollbar{display:none}:host .scroll-right-button{z-index:201;right:0}:host .scroll-left-button{z-index:201;left:0}:host .scroll-right-button,:host .scroll-left-button{height:50px;color:var(--tds-folder-tabs-scroll-btn-color);cursor:pointer;border:0;width:0;background-color:var(--tds-folder-tabs-scroll-btn-background);display:none;justify-content:center;align-items:center;opacity:0;pointer-events:none;position:sticky}:host .scroll-right-button.show,:host .scroll-left-button.show{min-width:48px;display:block;opacity:1;pointer-events:all}:host .scroll-right-button:hover,:host .scroll-left-button:hover{background-color:var(--tds-folder-tabs-scroll-btn-background-hover)}:host .scroll-right-button:active,:host .scroll-left-button:active{background-color:var(--tds-folder-tabs-scroll-btn-background-active)}:host .scroll-right-button:focus,:host .scroll-left-button:focus{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .scroll-right-button svg,:host .scroll-left-button svg{fill:var(--tds-folder-tabs-scroll-btn-color)}";

const TdsFolderTabs$1 = /*@__PURE__*/ proxyCustomElement(class TdsFolderTabs extends HTMLElement {
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
      this.children = Array.from(this.host.children);
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
            }
          }
        });
        return item;
      });
    };
    this.modeVariant = null;
    this.defaultSelectedIndex = 0;
    this.selectedIndex = undefined;
    this.buttonWidth = 0;
    this.showLeftScroll = false;
    this.showRightScroll = false;
  }
  /** Sets the passed tabindex as the selected Tab. */
  async selectTab(tabIndex) {
    if (!this.children[tabIndex].disabled) {
      this.children.forEach((element) => element.setSelected(false));
      this.children = this.children.map((element, index) => {
        if (index === tabIndex) {
          element.setSelected(true);
          this.selectedIndex = tabIndex;
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
  calculateButtonWidth() {
    this.children = this.children.map((tab) => {
      if (tab.offsetWidth > this.buttonWidth) {
        this.buttonWidth = tab.offsetWidth;
      }
      return tab;
    });
    this.children.forEach((tab) => {
      tab.setTabWidth(this.buttonWidth);
    });
  }
  scrollRight() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll + this.buttonWidth;
    this.evaluateScrollButtons();
  }
  scrollLeft() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll - this.buttonWidth;
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
    this.calculateButtonWidth();
  }
  componentDidUpdate() {
    this.calculateButtonWidth();
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
      } }, h("button", { class: `scroll-left-button ${this.showLeftScroll ? 'show' : ''}`, disabled: !this.showLeftScroll, onClick: () => this.scrollLeft() }, h("tds-icon", { name: "chevron_left", size: "20px" })), h("slot", null), h("button", { class: `scroll-right-button ${this.showRightScroll ? 'show' : ''}`, disabled: !this.showRightScroll, onClick: () => this.scrollRight() }, h("tds-icon", { name: "chevron_right", size: "20px" })))));
  }
  get host() { return this; }
  static get watchers() { return {
    "selectedIndex": ["handleSelectedIndexUpdate"]
  }; }
  static get style() { return folderTabsCss; }
}, [1, "tds-folder-tabs", {
    "modeVariant": [1, "mode-variant"],
    "defaultSelectedIndex": [2, "default-selected-index"],
    "selectedIndex": [514, "selected-index"],
    "buttonWidth": [32],
    "showLeftScroll": [32],
    "showRightScroll": [32],
    "selectTab": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-folder-tabs", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-folder-tabs":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsFolderTabs$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsFolderTabs = TdsFolderTabs$1;
const defineCustomElement = defineCustomElement$1;

export { TdsFolderTabs, defineCustomElement };
