import { Component, Host, h, Prop, Event, EventEmitter, Method, Element } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';
import hasSlot from '../../utils/hasSlot';
import { IconNames } from '../../types/Icons';
import { getPrefixedTagNames } from '../../utils/tagName';

/**
 * @slot header - Slot for the Header of the Banner
 * @slot subheader - Slot for the Subheader of the Banner
 * @slot actions - Slot for the bottom part of the Banner, used for links.
 */
@Component({
  tag: 'tds-banner',
  styleUrl: 'banner.scss',
  shadow: true,
})
export class TdsBanner {
  @Element() host: HTMLElement;

  /** Name of the icon for the component. For error and information variant, the icon is predefined. */
  @Prop() icon: IconNames;

  /** Header text. */
  @Prop() header: string;

  /** Subheader text. */
  @Prop() subheader: string;

  /** Variant of Banner */
  @Prop() variant: 'error' | 'information' | 'default' = 'default';

  /** ID used for internal table functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for Banner close events, you need to set this ID yourself to identify the Banner,
   * as the default ID is random and will be different every time.
   */
  @Prop() bannerId: string = generateUniqueId();

  /** Hides the Banner */
  @Prop({ reflect: true }) hidden = false;

  /** Sends a unique Banner identifier when the close button is pressed. */
  @Event({
    eventName: 'tdsClose',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsClose: EventEmitter<{
    bannerId: string;
  }>;

  /** Hides the Banner. */
  @Method()
  async hideBanner() {
    this.hidden = true;
  }

  /** Shows the Banner */
  @Method()
  async showBanner() {
    this.hidden = false;
  }

  connectedCallback() {
    if (this.variant === 'error') {
      this.icon = 'error';
    } else if (this.variant === 'information') {
      this.icon = 'info';
    }
  }

  handleClose = () => {
    const tdsCloseEvent = this.tdsClose.emit({
      bannerId: this.bannerId,
    });
    if (!tdsCloseEvent.defaultPrevented) {
      this.hidden = true;
    }
  };

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);

    const usesHeaderSlot = hasSlot('subheader', this.host);
    const usesSubheaderSlot = hasSlot('subheader', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    return (
      <Host
        role="banner"
        aria-hidden={`${this.hidden}`}
        aria-live={
          this.host.getAttribute('aria-live') ? this.host.getAttribute('aria-live') : 'polite'
        }
        aria-atomic={this.host.getAttribute('aria-atomic')}
        class={`${this.variant} ${this.hidden ? 'hide' : 'show'}`}
      >
        {this.icon && (
          <div class={`banner-icon ${this.variant}`}>
            <prefixedTagNames.tdsIcon name={this.icon} size="20px" />
          </div>
        )}

        <div class="content">
          <div class="header-subheader">
            {this.header && <div class="header">{this.header}</div>}
            {usesHeaderSlot && <slot name="header"></slot>}
            {this.subheader && <div class="subheader">{this.subheader}</div>}
            {usesSubheaderSlot && <slot name="subheader"></slot>}
          </div>
          {usesActionsSlot && <slot name="actions"></slot>}
        </div>

        <div class={`banner-close`}>
          <button
            onClick={() => {
              this.handleClose();
            }}
          >
            <prefixedTagNames.tdsIcon class="close-icon" name="cross" size="20px" />
          </button>
        </div>
      </Host>
    );
  }
}
