import { Component, Element, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

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

  @Event() closeDropdownFromListItem: EventEmitter<void>;

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
          onClick={() => this.closeDropdownFromListItem.emit()}
          onKeyDown={(e) => e.key === 'Enter' && this.closeDropdownFromListItem.emit()}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
