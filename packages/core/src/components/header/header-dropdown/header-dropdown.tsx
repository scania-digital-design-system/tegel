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

  /** This controls whether the Dropdown is open or not. If this is set, the hiding and showing
   * of the dropdown will be decided by this prop and will need to be controlled externally. This
   * also implies that clicking outside of the popover won't automatically close it.
   */
  @Prop() open?: boolean = null;

  @Prop() closeWhenClicked?: boolean = false;

  @State() internalOpen: boolean = false;

  @State() buttonEl?: HTMLButtonElement;

  @Listen('tdsShow')
  handleTdsShow() {
    this.internalOpen = true;
  }

  @Listen('tdsHide')
  handleTdsHide() {
    this.internalOpen = false;
  }

  private uuid: string = generateUniqueId();

  render() {
    return (
      <Host>
        <div
          class={{
            'state-open': this.internalOpen,
          }}
        >
          <tds-header-item class="button" active={this.internalOpen} selected={this.selected}>
            <button
              ref={(el) => {
                this.buttonEl = el;
              }}
              aria-expanded={`${this.internalOpen}`}
              aria-controls={`launcher-${this.uuid}`}
              aria-current={this.selected ? 'location' : 'false'}
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
              show={this.open}
              placement="bottom-start"
              closeWhenClicked={this.closeWhenClicked}
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
