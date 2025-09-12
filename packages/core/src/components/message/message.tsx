import { Component, Host, h, Prop } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the extended message. Not visible on minimal messages.
 */

@Component({
  tag: 'tds-message',
  styleUrl: 'message.scss',
  shadow: true,
})
export class TdsMessage {
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

  /** Role of the message component. Can be either 'alertdialog' for important messages that require immediate attention, or 'dialog' for regular messages. */
  @Prop() tdsAlertDialog: 'alertdialog' | 'dialog' = 'dialog';

  /** Provides an accessible name for the message component when no header is present. This ensures proper screen reader support for dialog/alertdialog roles. */
  @Prop() tdsAriaLabel: string;

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

  private getAriaLabel(): string | undefined {
    if (this.header) {
      return this.header;
    }
    const variantLabel = `${this.variant} message`;
    return this.tdsAriaLabel || variantLabel;
  }

  render() {
    const headerId = this.header ? `tds-message-header-${generateUniqueId()}` : undefined;
    const contentId = !this.minimal ? `tds-message-content-${generateUniqueId()}` : undefined;

    return (
      <Host
        role={this.tdsAlertDialog}
        aria-describedby={contentId}
        aria-label={this.getAriaLabel()}
        class={{ [`tds-mode-variant-${this.modeVariant}`]: this.modeVariant !== null }}
      >
        <div
          class={{
            wrapper: true,
            [this.variant]: true,
            minimal: this.minimal,
          }}
        >
          {!this.noIcon && (
            <tds-icon
              aria-hidden="true"
              aria-label={`${this.variant}`}
              svgTitle={`${this.variant}`}
              name={this.getIconName()}
              size="20px"
            ></tds-icon>
          )}
          <div class={`content`}>
            {this.header && (
              <div class="header" id={headerId}>
                {this.header}
              </div>
            )}
            {!this.minimal && (
              <div class="extended-message" id={contentId}>
                <slot></slot>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
