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
    } else {
      // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
      if (this.value !== '' && this.size !== 'sm') {
        console.warn(
          'The provided value is either empty or string, please provide value as number.',
        );
      }
    }
  }

  render() {
    return (
      <host
        class={`tds-badge tds-badge-${this.size} ${this.shape === 'pill' ? 'tds-badge-pill' : ''} ${
          this.hidden ? 'tds-badge-hidden' : ''
        }`}
      >
        <div class="tds-badge-text">{this.text}</div>
      </host>
    );
  }
}
