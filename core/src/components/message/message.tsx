import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @slot <default> - Default slot for the extended message section.
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

  /** Type of Message. */
  @Prop() type: 'information' | 'error' | 'warning' | 'success' = 'information';

  /** Removes the icon in the Message. */
  @Prop() noIcon: boolean = false;

  /** Minimal Message styling. */
  @Prop() minimal: boolean = false;

  getIconName = () => {
    switch (this.type) {
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
    return (
      <Host>
        <div
          class={`
        wrapper ${this.type}
        ${this.minimal ? 'minimal' : ''}
        ${this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''}`}
        >
          {!this.noIcon && <tds-icon name={this.getIconName()} size="20px"></tds-icon>}
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
