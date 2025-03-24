import { Component, Host, h, Prop, Method, State, Element } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the tab link or button.
 */
@Component({
  tag: 'tds-inline-tab',
  styleUrl: 'inline-tab.scss',
  shadow: true,
})
export class TdsInlineTab {
  @Element() host: HTMLElement;

  /** Disables the Tab. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  /** @internal Method to set the Tab as selected. Used by the <tds-inline-tabs> */
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
          'Tegel inline-tab component: Interactive elements should have aria-controls attribute to link the tab to its corresponding panel',
        );
      }
      if (element.getAttribute('role') !== 'tab') {
        console.warn(
          'Tegel inline-tab component: Interactive elements should have attribute role="tab"',
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
            'inline-tab-item': true,
            'selected': this.selected,
            'disabled': this.disabled,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
