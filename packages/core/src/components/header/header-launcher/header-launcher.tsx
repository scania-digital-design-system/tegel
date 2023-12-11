import { Component, Host, h, Element, State, Prop, Listen } from '@stencil/core';
import { Attributes } from '../../../types/Attributes';
import generateUniqueId from '../../../utils/generateUniqueId';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a launcher list (or grid) element.
 */
@Component({
  tag: 'tds-header-launcher',
  styleUrl: 'header-launcher.scss',
  shadow: true,
})
export class TdsHeaderLauncher {
  @Element() host: HTMLElement;

  @Prop() open?: boolean;

  @State() internalOpen: boolean = false;

  @State() buttonEl?: HTMLTdsHeaderLauncherButtonElement;

  @State() hasListTypeMenu = false;

  @Listen('tdsShow')
  handleTdsShow() {
    this.internalOpen = true;
  }

  @Listen('tdsHide')
  handleTdsHide() {
    this.internalOpen = false;
  }

  private uuid: string = generateUniqueId();

  private ariaAttributes: Attributes;

  componentDidLoad() {
    const slotElement = this.host.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
    const slottedElements = slotElement.assignedElements();
    const hasListTypeMenu = slottedElements.some(
      (element) => element.tagName.toLowerCase() === 'tds-header-launcher-list',
    );

    if (hasListTypeMenu) {
      this.hasListTypeMenu = true;
    }
  }

  render() {
    this.ariaAttributes = { ...this.ariaAttributes, ...inheritAriaAttributes(this.host, ['role']) };

    const buttonAttributes = {
      ...this.ariaAttributes,
      'aria-expanded': `${this.internalOpen}`,
      'aria-controls': `launcher-${this.uuid}`,
      'class': 'button',
      'active': this.internalOpen,
      'ref': (el: HTMLTdsHeaderLauncherButtonElement) => {
        this.buttonEl = el;
      },
    };

    return (
      <Host>
        <div
          class={{
            'wrapper': true,
            'state-open': this.internalOpen,
            'state-list-type-menu': this.hasListTypeMenu,
          }}
        >
          <tds-header-launcher-button {...buttonAttributes}></tds-header-launcher-button>

          {this.buttonEl && (
            <tds-popover-canvas
              id={`tds-launcher-${this.uuid}`}
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
