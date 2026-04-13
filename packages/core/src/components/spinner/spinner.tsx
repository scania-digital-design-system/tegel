import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'tds-spinner',
  styleUrl: 'spinner.scss',
  shadow: false,
})
export class TdsSpinner {
  /** Size of the Spinner */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Variant of the Spinner */
  @Prop({ reflect: true }) variant: 'standard' | 'inverted' = 'standard';

  render() {
    return (
      <div aria-live="assertive" role="status" aria-label="loading">
        <svg class={`tds-spinner-svg tds-spinner-svg-${this.size}`} aria-hidden="true">
          <circle class={`tds-spinner-circle tds-spinner-circle-${this.variant}`} />
        </svg>
      </div>
    );
  }
}
