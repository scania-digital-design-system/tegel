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

  @State() shape: string = '';

  @State() text: string = '';

  @State() ariaLabel: string = 'Notification badge';

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
      this.shape = this.value.toString().length >= 2 ? 'pill' : '';
      this.size = 'lg';
      this.text = valueAsNumber.toString().length >= 3 ? '99+' : valueAsNumber.toString();
      this.ariaLabel = `Notification badge with ${this.text} new notifications`;
    } else {
      if (this.value.trim() === '') {
        this.ariaLabel = 'Notification badge with no new notifications';
      } else {
        console.warn(
          'The provided value is either empty or string, please provide value as number.',
        );
      }
      this.text = this.value;
    }
  }

  render() {
    return (
      <host
        role="status"
        class={`tds-badge tds-badge-${this.size} ${this.shape === 'pill' ? 'tds-badge-pill' : ''} ${
          this.hidden ? 'tds-badge-hidden' : ''
        }`}
        aria-live="assertive"
        aria-label={this.ariaLabel}
      >
        <div class="tds-badge-text" aria-hidden="true">
          {this.text}
        </div>
      </host>
    );
  }
}
