import { Component, Element, Prop, h } from '@stencil/core';
import { isToday, format } from 'date-fns';

@Component({
  tag: 'date-picker-day',
  styleUrl: 'day.scss',
  shadow: true,
})
export class DatepickerDate {
  @Element() host: HTMLDatePickerDayElement;

  @Prop() isCurrentMonth: boolean = true;

  @Prop() date: Date;

  @Prop() selected: boolean = false;

  @Prop() disabled: boolean = false;

  render() {
    return (
      <button
        disabled={this.disabled}
        class={{
          'selected': this.selected,
          'today': isToday(this.date),
          'not-current-month': !this.isCurrentMonth,
          'disabled': this.disabled,
        }}
      >
        <time>{format(this.date, 'd')}</time>
      </button>
    );
  }
}
