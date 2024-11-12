import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import generateUniqueId from '../../../utils/generateUniqueId';
import { getPrefixedTagNames } from '../../../utils/tagName';

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

  handleSlottedItemClick = (event: MouseEvent | KeyboardEvent) => {
    const eventSource = (event.target as HTMLElement).tagName.toLowerCase();
    if (['a', 'button'].includes(eventSource)) {
      this.open = false;
    }
  };

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host class="tds-header__dropdown">
        <div
          class={{
            'state-open': this.open,
          }}
        >
          <prefixedTagNames.tdsHeaderItem
            class="button"
            active={this.open}
            selected={this.selected}
          >
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
                <prefixedTagNames.tdsIcon class="dropdown-icon" name="chevron_down" size="16px" />
              )}
            </button>
          </prefixedTagNames.tdsHeaderItem>
          {this.buttonEl && (
            <prefixedTagNames.tdsPopoverCore
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
              {this.open ? (
                <span
                  onClick={(e) => this.handleSlottedItemClick(e)}
                  onKeyDown={(e) => e.key === 'Enter' && this.handleSlottedItemClick(e)}
                >
                  <slot></slot>
                </span>
              ) : null}
            </prefixedTagNames.tdsPopoverCore>
          )}
        </div>
      </Host>
    );
  }
}
