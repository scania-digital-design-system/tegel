import { Component, Host, h, Prop, Element } from '@stencil/core';
import { getPrefixedTagNames } from '../../utils/tagName';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the extended message. Not visible on minimal messages.
 */

@Component({
  tag: 'tds-message',
  styleUrl: 'message.scss',
  shadow: true,
})
export class TdsMessage {
  @Element() host: HTMLElement;

  /** Header text for the component. */
  @Prop() header: string;

  /** Variant of the component, based on current mode. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Variant of Message. */
  @Prop() variant: 'information' | 'error' | 'warning' | 'success' = 'information';

  /** Removes the icon in the Message. */
  @Prop() noIcon: boolean = false;

  /** Minimal Message styling. */
  @Prop() minimal: boolean = false;

  getIconName = () => {
    switch (this.variant) {
      case 'information':
        return 'info';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'success':
        return 'tick';
      default:
        return 'info';
    }
  };

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host>
        <div
          class={`
        wrapper ${this.variant}
        ${this.minimal ? 'minimal' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}`}
        >
          {!this.noIcon && (
            <prefixedTagNames.tdsIcon
              name={this.getIconName()}
              size="20px"
            ></prefixedTagNames.tdsIcon>
          )}
          <div class={`content`}>
            {this.header && <div class="header">{this.header}</div>}
            {!this.minimal && (
              <div class="extended-message">
                <slot></slot>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
