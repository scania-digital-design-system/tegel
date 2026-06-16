import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'tds-divider',
  styleUrl: 'divider.scss',
  shadow: true,
})
export class Divider {
  /** Orientation of the Divider, horizontal if not specified. */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Variant of the Divider, subtle if not specified. `dark-blue` is a deprecated alias for `expressive`. */
  @Prop({ reflect: true }) variant:
    | 'discrete'
    | 'subtle'
    | 'soft'
    | 'defined'
    | 'strong'
    | 'expressive'
    | 'dark-blue' = 'subtle';

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
            'strong': this.variant === 'strong',
            // `expressive` is the canonical name; `dark-blue` is kept as a deprecated alias.
            'expressive': this.variant === 'expressive' || this.variant === 'dark-blue',
          }}
        />
      </Host>
    );
  }
}
