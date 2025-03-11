import { Component, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'tds-badge',
  styleUrl: 'badge.scss',
  shadow: true,
})
export class TdsBadge {
  /** Value shown in Badge */
  @Prop() value: string = '';

  /** Changes visibility of Badge */
  @Prop({ reflect: true }) hidden: boolean = false;

  /** Sets component size. */
  @Prop() size: 'lg' | 'sm' = 'lg';

  /** Defines aria-live attribute */
  @Prop() tdsAriaLive: 'off' | 'polite' | 'assertive' = 'polite';

  @State() ariaLabelValue: string = '';

  @State() shape: string = '';

  @State() text: string = '';

  @Watch('value')
  @Watch('size')
  watchProps() {
    this.checkProps();
  }

  componentWillLoad() {
    this.checkProps();
  }

  checkProps() {
    const valueAsNumber = parseInt(this.value);
    if (!Number.isNaN(valueAsNumber) && this.size !== 'sm') {
      this.shape = this.value.length >= 2 ? 'pill' : '';
      this.size = 'lg';
      this.text = valueAsNumber.toString().length >= 3 ? '99+' : valueAsNumber.toString();
    }
  }

  render() {
    return (
      <host
        role="status"
        class={{
          'tds-badge': true,
          [`tds-badge-${this.size}`]: true,
          'tds-badge-pill': this.shape === 'pill',
          'tds-badge-hidden': this.hidden,
        }}
        aria-label={this.ariaLabelValue}
        aria-live={this.tdsAriaLive}
      >
        <div class="tds-badge-text" aria-hidden="true">
          {this.text}
        </div>
      </host>
    );
  }
}
