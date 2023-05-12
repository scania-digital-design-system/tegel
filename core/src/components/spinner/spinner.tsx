import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-spinner',
  styleUrl: 'spinner.scss',
  shadow: false,
})
export class Spinner {
  /** Size of Spinner */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Variant of Spinner */
  @Prop() variant: 'standard' | 'inverted' = 'standard';

  render() {
    return (
      <div aria-live="assertive" role="status" aria-label="loading">
        <svg class={`sdds-spinner-svg sdds-spinner-svg-${this.size}`} aria-hidden="true">
          <circle class={`sdds-spinner-circle sdds-spinner-circle-${this.variant}`} />
        </svg>
      </div>
    );
  }
}
