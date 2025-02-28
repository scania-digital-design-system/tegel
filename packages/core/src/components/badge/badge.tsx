import { Component, h, Prop } from '@stencil/core';

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

  private computeBadgeData() {
    const valueAsNumber = parseInt(this.value);
    let shape = '';
    let text = '';
    let ariaLabel = '';

    if (!Number.isNaN(valueAsNumber) && this.size !== 'sm') {
      shape = this.value.length >= 2 ? 'pill' : '';
      text = valueAsNumber.toString().length >= 3 ? '99+' : valueAsNumber.toString();
      ariaLabel = `Notification badge with ${text} new notifications`;
    } else {
      ariaLabel =
        this.value.trim() === ''
          ? 'Notification badge with no new notifications'
          : 'The provided value is either empty or a string, please provide a number.';
      text = this.value;
    }

    return { shape, text, ariaLabel };
  }

  render() {
    const { shape, text, ariaLabel } = this.computeBadgeData();

    return (
      <host
        role="alert"
        class={`tds-badge tds-badge-${this.size} ${shape === 'pill' ? 'tds-badge-pill' : ''} ${
          this.hidden ? 'tds-badge-hidden' : ''
        }`}
        aria-live="assertive"
        aria-label={ariaLabel}
      >
        <div class="tds-badge-text" aria-hidden="true">
          {text}
        </div>
      </host>
    );
  }
}
