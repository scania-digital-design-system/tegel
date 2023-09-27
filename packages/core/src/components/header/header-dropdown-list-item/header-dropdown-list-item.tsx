import { Component, Element, h, Host, Prop } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a link or button element.
 */
@Component({
  tag: 'tds-header-dropdown-list-item',
  styleUrl: 'header-dropdown-list-item.scss',
  shadow: true,
})
export class TdsHeaderDropdownListItem {
  @Element() host: HTMLElement;

  /** If the link should appear selected. */
  @Prop() selected: boolean = false;

  /** The size of the component. */
  @Prop({ reflect: true }) size: 'md' | 'lg' = 'md';

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
