import { Component, h, Prop, Host } from '@stencil/core';
import { IconNames } from '../../types/Icons';

@Component({
  tag: 'tds-tag',
  styleUrl: 'tag.scss',
  shadow: false,
  scoped: true,
})
export class TdsTag {
  /** The title text to display in the tag */
  @Prop() text: string = '';

  /** Sets the size of the tag */
  @Prop() size: 'Large' | 'Small' = 'Large';

  /** Sets the variant mode of the tag */
  @Prop() modeVariant: 'Success' | 'Warning' | 'New' | 'Neutral' | 'Information' | 'Error' =
    'Neutral';

  /** The icon name to display */
  @Prop() icon?: IconNames;

  render() {
    return (
      <Host
        class={{
          'tds-tag': true,
          [`tds-tag-${this.size.toLowerCase()}`]: true,
          [`tds-tag-${this.modeVariant.toLowerCase()}`]: true,
        }}
      >
        <div class="tds-tag-content">
          {this.icon && (
            <tds-icon name={this.icon} size="16px" class="tds-tag-icon tds-tag-icon-prefix" />
          )}
          <span class="tds-tag-title">{this.text}</span>
        </div>
      </Host>
    );
  }
}
