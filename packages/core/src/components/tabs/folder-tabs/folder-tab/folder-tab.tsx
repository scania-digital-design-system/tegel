import { Component, Host, h, Method, State, Prop, Element } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the tab link or button.
 */
@Component({
  tag: 'tds-folder-tab',
  styleUrl: 'folder-tab.scss',
  shadow: true,
})
export class TdsFolderTab {
  @Element() host: HTMLElement;

  /** Disables the Tab. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  @State() tabWidth: number;

  /** @internal Method to set the width of the tab. Used by the <tds-folder-tabs> */
  @Method()
  async setTabWidth(width: number) {
    this.tabWidth = width;
  }

  /** @internal Method to set the tab as selected. Used by the <tds-folder-tabs> */
  @Method()
  async setSelected(selected: boolean) {
    this.selected = selected;
  }

  connectedCallback() {
    const elements = this.host.querySelectorAll('button, a');
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      if (!element.getAttribute('aria-controls')) {
        console.warn(
          'Tegel folder-tab component: Interactive elements should have aria-controls attribute to link the tab to its corresponding panel',
        );
      }
      if (element.getAttribute('role') !== 'tab') {
        console.warn(
          'Tegel folder-tab component: Interactive elements should have attribute role="tab"',
        );
      }
      if (this.disabled) {
        element.setAttribute('aria-disabled', 'true');
      } else {
        element.removeAttribute('aria-disabled');
      }
    }
  }

  render() {
    return (
      <Host aria-selected={this.selected}>
        <div
          class={{
            selected: this.selected,
            disabled: this.disabled,
          }}
          style={{ width: `${this.tabWidth}px` }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
