import { Component, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'tds-spinner',
  styleUrl: 'spinner.scss',
  shadow: true,
})
export class TdsSpinner {
  /** Size of the Spinner */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Variant of the Spinner */
  @Prop() variant: 'standard' | 'inverted' = 'standard';

  render() {
    return (
      <Host aria-live="assertive" role="status" aria-label="loading">
        <svg class={`tds-spinner-svg tds-spinner-svg-${this.size}`} aria-hidden="true">
          <circle class={`tds-spinner-circle tds-spinner-circle-${this.variant}`} />
        </svg>
      </Host>
    );
  }
}
