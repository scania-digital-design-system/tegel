import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'sdds-divider',
  styleUrl: 'divider-component.scss',
  shadow: true,
})
export class Divider {
  /** Orientation of the Divider, horizontal if not specified. */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    return (
      <Host
        role="separator"
        aria-orientation={this.orientation === 'vertical' ? 'vertical' : undefined}
      >
        <div class={`divider ${this.orientation}`} />
      </Host>
    );
  }
}
