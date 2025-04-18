import { Component, Host, h, Element, Listen, State, Prop } from '@stencil/core';
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

  @State() open: boolean = false;

  @State() buttonEl?: HTMLTdsHeaderLauncherButtonElement;

  @State() hasListTypeMenu = false;

  /** Value to be used by the aria-label attribute of the launcher button */
  @Prop() tdsAriaLabel: string;

  private uuid: string = generateUniqueId();

  private ariaAttributes: Attributes;

  @Listen('click', { target: 'window' })
  onAnyClick(event: MouseEvent) {
    // Source: https://lamplightdev.com/blog/2021/04/10/how-to-detect-clicks-outside-of-a-web-component/
    const isClickOutside = !event.composedPath().includes(this.host as any);
    if (isClickOutside) {
      this.open = false;
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open) {
      this.open = false;
      this.buttonEl.shadowRoot.querySelector('button').focus();
    }
  }

  componentDidLoad() {
    const hasListTypeMenu = !!this.host.querySelector('tds-header-launcher-list');
    this.hasListTypeMenu = hasListTypeMenu;
  }

  toggleLauncher() {
    this.open = !this.open;

    if (this.open) {
      requestAnimationFrame(() => {
        const selectors = "a, [tabindex='0']";

        const firstFocusableElement =
          this.host.shadowRoot.querySelector(selectors) || this.host.querySelector(selectors);

        if (firstFocusableElement instanceof HTMLElement) {
          firstFocusableElement.focus();
        }
      });
    }
  }

  connectedCallback() {
    if (!this.tdsAriaLabel) {
      console.warn('Tegel Header Launcher component: missing tdsAriaLabel prop');
    }
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
          <tds-header-launcher-button
            {...buttonAttributes}
            tds-aria-label={this.tdsAriaLabel}
          ></tds-header-launcher-button>

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
