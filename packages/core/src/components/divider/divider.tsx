import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'tds-divider',
  styleUrl: 'divider.scss',
  shadow: true,
})
export class Divider {
  /** Orientation of the Divider, horizontal if not specified. */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Variant of the Divider, subtle if not specified. */
  @Prop() variant: 'discrete' | 'subtle' | 'soft' | 'defined' | 'dark-blue' = 'subtle';

  render() {
    return (
      <Host
        role="separator"
        aria-orientation={this.orientation === 'vertical' ? 'vertical' : undefined}
      >
        <div
          class={{
            'divider': true,
            'vertical': this.orientation === 'vertical',
            'horizontal': this.orientation === 'horizontal',
            'discrete': this.variant === 'discrete',
            'subtle': this.variant === 'subtle',
            'soft': this.variant === 'soft',
            'defined': this.variant === 'defined',
            'dark-blue': this.variant === 'dark-blue',
          }}
        />
      </Host>
    );
  }
}
