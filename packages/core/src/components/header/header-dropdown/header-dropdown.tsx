import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import generateUniqueId from '../../../utils/generateUniqueId';

/**
 * @slot <default> - <b>Unnamed slot.</b> For injecting a dropdown list.
 * @slot icon - Slot for an Icon in the dropdown button.
 * @slot label - Slot for a label text in the dropdown button.
 */
@Component({
  tag: 'tds-header-dropdown',
  styleUrl: 'header-dropdown.scss',
  shadow: true,
})
export class TdsHeaderDropdown {
  @Element() host: HTMLElement;

  /** The label of the button that opens the dropdown.
   * This is an alternative to the label slot. */
  @Prop() label: string;

  /** If the dropdown icon (downwards chevron) should be hidden. */
  @Prop() noDropdownIcon: boolean = false;

  /** If the button that opens the dropdown should appear selected. */
  @Prop() selected: boolean = false;

  @State() open: boolean = false;

  @State() buttonEl?: HTMLButtonElement;

  private uuid: string = generateUniqueId();

  @Listen('click', { target: 'document' })
  onAnyClick(event: MouseEvent) {
    // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
    const isClickOutside = !event.composedPath().includes(this.host as any);
    if (isClickOutside) {
      this.open = false;
    }
  }

  toggleDropdown() {
    this.open = !this.open;
  }

  connectedCallback() {
    // Listen for click events on the default slot's assigned nodes
    this.host.shadowRoot.addEventListener('slotchange', (event) => {
      const slot = event.target as HTMLSlotElement;
      if (slot.name === '') {
        const slottedElements = slot.assignedElements();
        slottedElements.forEach((element) => {
          element.addEventListener('click', this.handleSlottedItemClick);
        });
      }
    });
  }

  disconnectedCallback() {
    // Cleanup: Remove event listeners from slotted elements
    const slot = this.host.shadowRoot.querySelector('slot');
    const slottedElements = slot.assignedElements();
    slottedElements.forEach((element) => {
      element.removeEventListener('click', this.handleSlottedItemClick);
    });
  }

  handleSlottedItemClick = () => {
    // Close the dropdown when a slotted item is clicked
    this.open = false;
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'state-open': this.open,
          }}
        >
          <tds-header-item class="button" active={this.open} selected={this.selected}>
            <button
              ref={(el) => {
                this.buttonEl = el;
              }}
              aria-expanded={`${this.open}`}
              aria-controls={`launcher-${this.uuid}`}
              aria-current={this.selected ? 'location' : 'false'}
              onClick={() => {
                this.toggleDropdown();
              }}
            >
              <slot name="icon"></slot>
              {this.label}
              <slot name="label"></slot>
              {!this.noDropdownIcon && (
                <tds-icon class="dropdown-icon" name="chevron_down" size="16px"></tds-icon>
              )}
            </button>
          </tds-header-item>
          {this.buttonEl && (
            <tds-popover-canvas
              id={`tds-dropdown-${this.uuid}`}
              class="menu"
              referenceEl={this.buttonEl}
              placement="bottom-start"
              show={this.open}
              offsetDistance={0}
              modifiers={[
                {
                  name: 'flip',
                  options: {
                    fallbackPlacements: [],
                  },
                },
              ]}
            >
              {this.open ? <slot></slot> : null}
            </tds-popover-canvas>
          )}
        </div>
      </Host>
    );
  }
}
