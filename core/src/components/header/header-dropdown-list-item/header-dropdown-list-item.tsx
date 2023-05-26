import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'tds-header-dropdown-list-item',
  styleUrl: 'header-dropdown-list-item.scss',
  shadow: true,
})
export class TdsHeaderDropdownListItem {
  @Element() host: HTMLElement;

  /** If the link should appear selected. */
  @Prop() selected: boolean = false;

  /** The type of the list. */
  @Prop({ reflect: true }) type: 'md' | 'lg' = 'md';

  render() {
    return (
      <Host>
        <div
          class={{
            'component': true,
            'component-selected': this.selected,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
