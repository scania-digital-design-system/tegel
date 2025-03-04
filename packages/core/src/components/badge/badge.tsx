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
  @Prop() ariaLive: 'off' | 'polite' | 'assertive' = 'polite';

  /** Defines the template for aria-label, allowing localization */
  @Prop() ariaLabelTemplate: string = 'Notification badge with {value} new notifications';

  @State() shape: string = '';

  @State() text: string = '';

  @State() ariaLabel: string = '';

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
      this.ariaLabel = this.ariaLabelTemplate.replace('{value}', this.text);
    } else {
      this.ariaLabel =
        this.value.trim() === ''
          ? this.ariaLabelTemplate.replace('{value}', 'no')
          : 'The provided value is either empty or a string, please provide a number.';
    }
  }

  render() {
    return (
      <host
        class={{
          'tds-badge': true,
          [`tds-badge-${this.size}`]: true,
          'tds-badge-pill': this.shape === 'pill',
          'tds-badge-hidden': this.hidden,
        }}
        aria-label={this.ariaLabel}
        aria-live={this.ariaLive}
      >
        <div class="tds-badge-text" aria-hidden="true">
          {this.text}
        </div>
      </host>
    );
  }
}
