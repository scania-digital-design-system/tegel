import { Component, Host, h, Prop, Method, State } from '@stencil/core';

@Component({
  tag: 'tds-inline-tab',
  styleUrl: 'inline-tab.scss',
  shadow: true,
})
export class TdsInlineTab {
  /** Disables the Tab. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  /** @internal Method to set the Tab as selected. Used by the <tds-inline-tabs> */
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
