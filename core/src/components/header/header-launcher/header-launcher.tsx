import { Component, Host, h, Element, Listen, State } from '@stencil/core';
import { Attributes, inheritAriaAttributes } from '../../../utils/utils';

@Component({
  tag: 'tds-header-launcher',
  styleUrl: 'header-launcher.scss',
  shadow: true,
})
export class TdsHeaderLauncher {
  @Element() host: HTMLElement;

  @State() open: boolean = false;

  @State() buttonEl?: HTMLTdsHeaderLauncherButtonElement;

  @State() hasListTypeMenu = false;

  private uuid: string = crypto.randomUUID();

  private ariaAttributes: Attributes;

  @Listen('click', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
    const isClickOutside = !event.composedPath().includes(this.host as any);
    if (isClickOutside) {
      this.open = false;
    }
  }

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

  toggleLauncher() {
    this.open = !this.open;
  }

  render() {
    this.ariaAttributes = { ...this.ariaAttributes, ...inheritAriaAttributes(this.host, ['role']) };

    const buttonAttributes = {
      ...this.ariaAttributes,
      'aria-expanded': `${this.open}`,
      'aria-controls': `launcher-${this.uuid}`,
      'class': 'button',
      'active': this.open,
      'onClick': () => {
        this.toggleLauncher();
      },
      'ref': (el: HTMLTdsHeaderLauncherButtonElement) => {
        this.buttonEl = el;
      },
    };

    return (
      <Host>
        <div
          class={{
            'wrapper': true,
            'state-open': this.open,
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
              <slot></slot>
            </tds-popover-canvas>
          )}
        </div>
      </Host>
    );
  }
}
