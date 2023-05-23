import { Component, Host, h, Prop, Method, State } from '@stencil/core';

@Component({
  tag: 'sdds-inline-tab',
  styleUrl: 'sdds-inline-tab.scss',
  shadow: true,
})
export class SddsInlineTab {
  /** Disables the tab. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  /** @internal Method to set the tab as selected. Used by the <sdds-folder-tabs> */
  @Method()
  async setSelected(selected: boolean) {
    this.selected = selected;
  }

  render() {
    return (
      <Host role="listitem">
        <div
          class={`inline-tab-item  ${this.selected ? 'selected' : ''}
           ${this.disabled ? 'disabled' : ''}`}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
