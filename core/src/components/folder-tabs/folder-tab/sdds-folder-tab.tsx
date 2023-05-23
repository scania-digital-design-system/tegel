import { Component, Host, h, Method, State, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-folder-tab',
  styleUrl: 'sdds-folder-tab.scss',
  shadow: true,
})
export class SddsFolderTab {
  /** Disables the tab. */
  @Prop() disabled: boolean = false;

  @State() selected: boolean = false;

  @State() tabWidth: number;

  /** @internal Method to set the width of the tab. Used by the <sdds-folder-tabs> */
  @Method()
  async setTabWidth(width: number) {
    this.tabWidth = width;
  }

  /** @internal Method to set the tab as selected. Used by the <sdds-folder-tabs> */
  @Method()
  async setSelected(selected: boolean) {
    this.selected = selected;
  }

  render() {
    return (
      <Host role="listitem">
        <div
          class={`${this.disabled ? 'disabled' : ''}
                  ${this.selected ? 'selected' : ''}
                `}
          style={{ width: `${this.tabWidth}px` }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
