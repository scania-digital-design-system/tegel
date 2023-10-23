import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'date-picker-day',
  styleUrl: 'day.scss',
  shadow: true,
})
export class DatepickerDate {
  @Prop() isCurrentMonth: boolean = true;

  @Prop() date: string;

  @Prop() selected: boolean = false;

  render() {
    return (
      <Host>
        <button
          class={{
            'selected': this.selected,
            'not-current-month': !this.isCurrentMonth,
          }}
        >
          <time>{this.date}</time>
        </button>
      </Host>
    );
  }
}
