import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { a as appendHiddenInput, f as findNextFocusableItem, b as findPreviousFocusableItem } from './utils.js';
import { d as defineCustomElement$2 } from './icon.js';

const dropdownCss = ":host button{all:unset;height:100%;width:100%;background-color:var(--tds-dropdown-bg);border-bottom:1px solid var(--tds-dropdown-border-bottom);border-radius:4px 4px 0 0}:host button:hover{border-bottom:1px solid var(--tds-dropdown-border-bottom-hover)}:host button .value-wrapper{padding:0 16px;display:flex;align-items:center;justify-content:space-between}:host button.placeholder{color:var(--tds-dropdown-placeholder-color)}:host button.value{color:var(--tds-dropdown-value-color)}:host button:focus{border-bottom-color:transparent}:host button:focus::before{content:\"\";position:absolute;bottom:0;left:0;width:100%;height:2px;background:var(--tds-dropdown-border-bottom-open)}:host button.error{border-bottom:1px solid var(--tds-negative)}:host button:disabled{color:var(--tds-dropdown-disabled-color);border-bottom:1px solid transparent}:host .filter{display:flex;align-items:center;justify-content:space-between;height:100%;background-color:var(--tds-dropdown-bg);border-bottom:1px solid var(--tds-dropdown-border-bottom);padding-left:16px;border-radius:4px 4px 0 0}:host .filter:hover{border-bottom:1px solid var(--tds-dropdown-border-bottom-hover)}:host .filter.disabled{color:var(--tds-dropdown-disabled-color)}:host .filter .value-wrapper{display:flex;width:100%;height:100%}:host .filter .label-inside-as-placeholder{position:absolute;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);color:var(--tds-dropdown-placeholder-color)}:host .filter .label-inside-as-placeholder.lg{top:20px}:host .filter .label-inside-as-placeholder.md{top:16px}:host .filter .label-inside-as-placeholder.sm{display:none}:host .filter .label-inside-as-placeholder.selected{font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:all 0.2s ease-in-out}:host .filter .label-inside-as-placeholder.selected.lg{top:12px}:host .filter .label-inside-as-placeholder.selected.md{top:8px}:host .filter .label-inside-as-placeholder.selected.sm{display:none}:host .filter .label-inside-as-placeholder.selected+.placeholder:not(.sm){margin-top:8px}:host .filter.focus{border-bottom-color:transparent}:host .filter.focus::before{content:\"\";position:absolute;bottom:0;left:0;width:100%;height:2px;background:var(--tds-dropdown-border-bottom-open)}:host .filter input{flex:1;all:unset;width:100%}:host .filter input::placeholder{color:var(--tds-dropdown-placeholder-color)}:host .filter input:disabled::placeholder{color:var(--tds-dropdown-disabled-color)}:host .filter tds-icon{margin-right:16px}:host{display:block;position:relative;font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls)}:host .label-outside{font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);color:var(--tds-dropdown-label-color);margin-bottom:8px}:host .label-outside.disabled{color:var(--tds-dropdown-disabled-color)}:host .dropdown-select{position:relative}:host .dropdown-select.disabled .label-inside,:host .dropdown-select.disabled .placeholder,:host .dropdown-select.disabled .label-inside-as-placeholder,:host .dropdown-select.disabled .value-wrapper{color:var(--tds-dropdown-disabled-color)}:host .dropdown-select .label-inside{position:absolute;font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);color:var(--tds-dropdown-label-inside-color)}:host .dropdown-select .label-inside.lg{top:12px;left:16px}:host .dropdown-select .label-inside.md{top:8px;left:16px}:host .dropdown-select .label-inside.sm{display:none}:host .dropdown-select .label-inside+.placeholder:not(.sm){margin-top:8px}:host .dropdown-select .placeholder{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .dropdown-select .label-inside-as-placeholder{color:var(--tds-dropdown-placeholder-color)}:host .dropdown-select .label-inside-as-placeholder.selected{position:absolute;font:var(--tds-detail-07);letter-spacing:var(--tds-detail-07-ls);transition:all 0.2s ease-in-out}:host .dropdown-select .label-inside-as-placeholder.selected.lg{top:12px}:host .dropdown-select .label-inside-as-placeholder.selected.md{top:8px}:host .dropdown-select .label-inside-as-placeholder.selected.sm{display:none}:host .dropdown-select .label-inside-as-placeholder.selected+.placeholder:not(.sm){margin-top:8px}:host .dropdown-select.lg{height:55px}:host .dropdown-select.md{height:47px}:host .dropdown-select.sm{height:39px}:host .helper{margin-top:4px;color:var(--tds-dropdown-helper-color);font:var(--tds-detail-05);letter-spacing:var(--tds-detail-05-ls);display:flex;align-items:center;gap:8px}:host .helper.error{color:var(--tds-negative)}:host .helper.disabled{color:var(--tds-dropdown-disabled-color)}:host .dropdown-list{z-index:100;position:absolute;margin-top:1px;width:100%;transform-origin:top;transition:transform 0.2s ease-in-out;box-shadow:rgba(0, 0, 0, 0.1) 0 2px 3px 0;border-radius:0 0 4px 4px;overflow-y:auto}:host .dropdown-list::-webkit-scrollbar{width:4px;background-color:inherit}:host .dropdown-list::-webkit-scrollbar-thumb{background-color:var(--tds-grey-300)}:host .dropdown-list ::-webkit-scrollbar-button{height:0;width:0}:host .dropdown-list.lg{max-height:312px}:host .dropdown-list.md{max-height:312px}:host .dropdown-list.sm{max-height:260px}:host .dropdown-list.up{bottom:100%;margin-top:0;margin-bottom:1px;transform-origin:bottom;display:flex;flex-direction:column-reverse;box-shadow:rgba(0, 0, 0, 0.1) 0 -1px 3px 0;border-radius:4px 4px 0 0}:host .dropdown-list.up.label-outside{bottom:calc(100% - 24px)}:host .dropdown-list.closed{transform:scaleY(0);visibility:hidden}:host .dropdown-list.open{transform:scaleY(1)}:host .dropdown-list .no-result{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);display:flex;align-items:center;padding:0 16px;background-color:var(--tds-dropdown-bg)}:host .dropdown-list .no-result.lg{height:56px}:host .dropdown-list .no-result.md{height:48px}:host .dropdown-list .no-result.sm{height:40px}:host tds-icon{transition:transform 0.2s ease-in-out}:host tds-icon.open{transform:rotateZ(180deg)}";

const TdsDropdown$1 = /*@__PURE__*/ proxyCustomElement(class TdsDropdown extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.tdsChange = createEvent(this, "tdsChange", 6);
    this.tdsFocus = createEvent(this, "tdsFocus", 6);
    this.tdsBlur = createEvent(this, "tdsBlur", 6);
    this.tdsInput = createEvent(this, "tdsInput", 6);
    this.setDefaultOption = () => {
      this.children = Array.from(this.host.children)
        .filter((element) => element.tagName === 'TDS-DROPDOWN-OPTION')
        .map((element) => {
        if (this.multiselect) {
          this.defaultValue.split(',').forEach((value) => {
            if (value === element.value) {
              element.setSelected(true);
              this.selection = this.selection
                ? [...this.selection, { value: element.value, label: element.textContent }]
                : [{ value: element.value, label: element.textContent }];
            }
          });
        }
        else {
          if (this.defaultValue === element.value) {
            element.setSelected(true);
            this.selection = [{ value: element.value, label: element.textContent }];
          }
          else {
            element.setSelected(false);
          }
        }
        return element;
      });
    };
    /* Returns a list of all children that are are tds-dropdown-option elements */
    this.getChildren = () => Array.from(this.host.children).filter((element) => element.tagName === 'TDS-DROPDOWN-OPTION');
    this.getOpenDirection = () => {
      var _a, _b, _c, _d, _e;
      if (this.openDirection === 'auto' || !this.openDirection) {
        const dropdownMenuHeight = (_b = (_a = this.dropdownList) === null || _a === void 0 ? void 0 : _a.offsetHeight) !== null && _b !== void 0 ? _b : 0;
        const distanceToBottom = (_e = (_d = (_c = this.host).getBoundingClientRect) === null || _d === void 0 ? void 0 : _d.call(_c).top) !== null && _e !== void 0 ? _e : 0;
        const viewportHeight = window.innerHeight;
        if (distanceToBottom + dropdownMenuHeight + 57 > viewportHeight) {
          return 'up';
        }
        return 'down';
      }
      return this.openDirection;
    };
    this.getValue = () => {
      var _a, _b;
      if (this.filter) {
        return (_a = this.selection) === null || _a === void 0 ? void 0 : _a.map((item) => item.label).toString();
      }
      return (_b = this.selection) === null || _b === void 0 ? void 0 : _b.map((item) => item.label).join(', ');
    };
    this.handleFilter = (event) => {
      this.tdsInput.emit(event);
      const query = event.target.value.toLowerCase();
      /* Check if the query is empty, and if so, show all options */
      if (query === '') {
        this.children = this.children.map((element) => {
          element.removeAttribute('hidden');
          return element;
        });
        this.filterResult = null;
        /* Hide the options that do not match the query */
      }
      else {
        this.filterResult = this.children.filter((element) => {
          if (!element.textContent.toLowerCase().includes(query.toLowerCase())) {
            element.setAttribute('hidden', '');
          }
          else {
            element.removeAttribute('hidden');
          }
          return !element.hasAttribute('hidden');
        }).length;
      }
    };
    this.handleFocus = (event) => {
      this.tdsFocus.emit(event);
    };
    this.handleBlur = (event) => {
      this.tdsBlur.emit(event);
    };
    this.handleChange = () => {
      var _a, _b;
      this.tdsChange.emit({
        name: this.name,
        value: (_b = (_a = this.selection) === null || _a === void 0 ? void 0 : _a.map((item) => item.value).toString()) !== null && _b !== void 0 ? _b : null,
      });
    };
    this.name = undefined;
    this.disabled = false;
    this.helper = undefined;
    this.label = undefined;
    this.labelPosition = undefined;
    this.modeVariant = null;
    this.openDirection = 'auto';
    this.placeholder = undefined;
    this.size = 'lg';
    this.error = false;
    this.multiselect = false;
    this.filter = false;
    this.noResultText = 'No result';
    this.defaultValue = undefined;
    this.open = false;
    this.selection = undefined;
    this.filterResult = undefined;
    this.filterFocus = undefined;
  }
  /** Method that resets the Dropdown, marks all children as non-selected and resets the value to null. */
  async reset() {
    this.children = this.getChildren().map((element) => {
      element.setSelected(false);
      return element;
    });
    this.selection = null;
    this.host.setAttribute('value', null);
    this.handleChange();
  }
  /** Method for setting the value of the Dropdown. */
  async setValue(newValue, newValueLabel) {
    if (this.multiselect) {
      this.selection = this.selection
        ? [...this.selection, { value: newValue, label: newValueLabel }]
        : [{ value: newValue, label: newValueLabel }];
    }
    else {
      this.selection = [{ value: newValue, label: newValueLabel }];
      this.children = this.getChildren().map((element) => {
        if (element.value !== newValue) {
          element.setSelected(false);
        }
        return element;
      });
    }
    this.handleChange();
    this.host.setAttribute('value', this.selection.map((selection) => selection.value).toString());
    return this.selection;
  }
  /** Method for removing a selected value in the Dropdown. */
  async removeValue(oldValue) {
    if (this.multiselect) {
      this.children = this.getChildren().map((element) => {
        if (element.value === oldValue) {
          this.selection = this.selection.filter((item) => item.value !== element.value);
          element.setSelected(false);
        }
        return element;
      });
    }
    else {
      this.reset();
    }
    this.handleChange();
    return this.selection;
  }
  /** Method for closing the Dropdown. */
  async close() {
    this.open = false;
  }
  onAnyClick(event) {
    if (this.open) {
      // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
      const isClickOutside = !event.composedPath().includes(this.host);
      if (isClickOutside) {
        this.open = false;
      }
    }
  }
  async onKeyDown(event) {
    // Get the active element
    const { activeElement } = document;
    if (!activeElement) {
      return;
    }
    if (event.key === 'ArrowDown') {
      /* Get the index of the current focus index, if there is no
      nextElementSibling return the index for the first child in our Dropdown.  */
      const startingIndex = activeElement.nextElementSibling
        ? this.children.findIndex((element) => element === activeElement.nextElementSibling)
        : 0;
      const elementIndex = findNextFocusableItem(this.children, startingIndex);
      this.children[elementIndex].focus();
    }
    else if (event.key === 'ArrowUp') {
      /* Get the index of the current focus index, if there is no
      previousElementSibling return the index for the first last in our Dropdown.  */
      const startingIndex = activeElement.nextElementSibling
        ? this.children.findIndex((element) => element === activeElement.previousElementSibling)
        : 0;
      const elementIndex = findPreviousFocusableItem(this.children, startingIndex);
      this.children[elementIndex].focus();
    }
    else if (event.key === 'Escape') {
      this.open = false;
    }
  }
  // If the Dropdown gets closed,
  // this sets the value of the dropdown to the current selection labels or null if no selection is made.
  handleOpenState() {
    var _a, _b;
    if (this.filter && this.multiselect) {
      if (!this.open) {
        this.inputElement.value = (_b = (_a = this.selection) === null || _a === void 0 ? void 0 : _a.map((item) => item.label).toString()) !== null && _b !== void 0 ? _b : null;
      }
    }
  }
  componentDidLoad() {
    if (this.defaultValue) {
      this.setDefaultOption();
    }
  }
  render() {
    var _a, _b, _c, _d;
    appendHiddenInput(this.host, this.name, (_a = this.selection) === null || _a === void 0 ? void 0 : _a.map((item) => item.value).toString(), this.disabled);
    return (h(Host, { role: "select", class: `${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}` }, this.label && this.labelPosition === 'outside' && (h("div", { class: `label-outside ${this.disabled ? 'disabled' : ''}` }, this.label)), h("div", { class: `dropdown-select ${this.size} ${this.disabled ? 'disabled' : ''}` }, this.filter ? (h("div", { class: `filter ${this.filterFocus ? 'focus' : ''}
            ${this.disabled ? 'disabled' : ''}` }, h("div", { class: "value-wrapper" }, this.label && this.labelPosition === 'inside' && this.placeholder && (h("div", { class: `label-inside ${this.size}` }, this.label)), this.label && this.labelPosition === 'inside' && !this.placeholder && (h("div", { class: `
                    label-inside-as-placeholder
                    ${this.size}
                    ${((_b = this.selection) === null || _b === void 0 ? void 0 : _b.length) ? 'selected' : ''}
                    ` }, this.label)), h("input", {
      // eslint-disable-next-line no-return-assign
      ref: (element) => (this.inputElement = element), class: `${this.labelPosition === 'inside' ? 'placeholder' : ''}`, type: "text", placeholder: this.placeholder, value: this.getValue(), disabled: this.disabled, onInput: (event) => this.handleFilter(event), onBlur: (event) => {
        this.filterFocus = false;
        this.handleBlur(event);
      }, onFocus: (event) => {
        this.open = true;
        this.filterFocus = true;
        this.handleFocus(event);
      }, onKeyDown: (event) => {
        if (event.key === 'Escape') {
          this.open = false;
        }
      }
    })), h("tds-icon", { onClick: () => {
        this.open = !this.open;
      }, class: `${this.open ? 'open' : 'closed'}`, name: "chevron_down", size: "16px" }))) : (h("button", { onClick: () => {
        this.open = !this.open;
      }, onKeyDown: (event) => {
        if (event.key === 'Escape') {
          this.open = false;
        }
      }, class: `
                ${this.selection ? 'value' : 'placeholder'}
                ${this.open ? 'open' : 'closed'}
                ${this.error ? 'error' : ''}
                `, disabled: this.disabled }, h("div", { class: `value-wrapper ${this.size}` }, this.label && this.labelPosition === 'inside' && this.placeholder && (h("div", { class: `label-inside ${this.size}` }, this.label)), this.label && this.labelPosition === 'inside' && !this.placeholder && (h("div", { class: `
                    label-inside-as-placeholder
                    ${this.size}
                    ${((_c = this.selection) === null || _c === void 0 ? void 0 : _c.length) ? 'selected' : ''}
                    ` }, this.label)), h("div", { class: `placeholder ${this.size}` }, ((_d = this.selection) === null || _d === void 0 ? void 0 : _d.length) ? this.getValue() : this.placeholder), h("tds-icon", { class: `${this.open ? 'open' : 'closed'}`, name: "chevron_down", size: "16px" }))))), h("div", { ref: (element) => (this.dropdownList = element), class: `dropdown-list
            ${this.size}
            ${this.open ? 'open' : 'closed'}
            ${this.getOpenDirection()}
            ${this.label && this.labelPosition === 'outside' ? 'label-outside' : ''}` }, h("slot", null), this.filterResult === 0 && (h("div", { class: `no-result ${this.size}` }, this.noResultText))), this.helper && (h("div", { class: `helper ${this.error ? 'error' : ''} ${this.disabled ? 'disabled' : ''}` }, this.error && h("tds-icon", { name: "error", size: "16px" }), this.helper))));
  }
  get host() { return this; }
  static get watchers() { return {
    "open": ["handleOpenState"]
  }; }
  static get style() { return dropdownCss; }
}, [1, "tds-dropdown", {
    "name": [1],
    "disabled": [4],
    "helper": [1],
    "label": [1],
    "labelPosition": [1, "label-position"],
    "modeVariant": [1, "mode-variant"],
    "openDirection": [1, "open-direction"],
    "placeholder": [1],
    "size": [1],
    "error": [4],
    "multiselect": [4],
    "filter": [4],
    "noResultText": [1, "no-result-text"],
    "defaultValue": [1, "default-value"],
    "open": [32],
    "selection": [32],
    "filterResult": [32],
    "filterFocus": [32],
    "reset": [64],
    "setValue": [64],
    "removeValue": [64],
    "close": [64]
  }, [[9, "mousedown", "onAnyClick"], [0, "keydown", "onKeyDown"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["tds-dropdown", "tds-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "tds-dropdown":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TdsDropdown$1);
      }
      break;
    case "tds-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const TdsDropdown = TdsDropdown$1;
const defineCustomElement = defineCustomElement$1;

export { TdsDropdown, defineCustomElement };
