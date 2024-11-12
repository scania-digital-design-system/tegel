import { Component, Host, h, Element, Listen, State } from '@stencil/core';
import { Attributes } from '../../../types/Attributes';
import generateUniqueId from '../../../utils/generateUniqueId';
import inheritAriaAttributes from '../../../utils/inheritAriaAttributes';
import { getPrefixedTagNames } from '../../../utils/tagName';
import { getDirectChildHTMLElementOfKind } from '../../../utils/getDirectChildHTMLElementOfKind';

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

  componentDidLoad() {
    const hasListTypeMenu =
      getDirectChildHTMLElementOfKind(this.host, 'tds-header-launcher-list').length >= 1;
    this.hasListTypeMenu = hasListTypeMenu;
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

    const prefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div
          class={{
            'wrapper': true,
            'state-open': this.open,
            'state-list-type-menu': this.hasListTypeMenu,
          }}
        >
          <prefixedTagNames.tdsHeaderLauncherButton {...buttonAttributes} />

          {this.buttonEl && (
            <prefixedTagNames.tdsPopoverCanvas
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
            </prefixedTagNames.tdsPopoverCanvas>
          )}
        </div>
      </Host>
    );
  }
}
