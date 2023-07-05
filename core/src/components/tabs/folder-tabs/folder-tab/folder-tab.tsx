import { Component, Host, h, Method, State, Prop } from '@stencil/core';

@Component({
  tag: 'tds-folder-tab',
  styleUrl: 'folder-tab.scss',
  shadow: true,
})
export class TdsFolderTab {
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

  render() {
    return (
      <Host role="listitem">
        <div
          class={`${this.disabled ? 'disabled' : ''}
                  ${this.selected ? 'selected' : ''}`}
          style={{ width: `${this.tabWidth}px` }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
