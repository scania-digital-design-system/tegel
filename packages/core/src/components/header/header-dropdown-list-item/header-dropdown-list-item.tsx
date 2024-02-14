import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

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

  /** If the link should appear selected. */
  @Prop() clicked: boolean = false;

  @Event({
    eventName: 'closeDropdown',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  closeDropdown: EventEmitter<void>;

  handleClick() {
    this.closeDropdown.emit();
  }

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
          onClick={() => this.handleClick()}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
