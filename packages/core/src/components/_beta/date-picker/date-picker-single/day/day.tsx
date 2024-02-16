import { Component, Prop, h } from '@stencil/core';
import { isToday, format } from 'date-fns';

@Component({
  tag: 'date-picker-day',
  styleUrl: 'day.scss',
  shadow: true,
})
export class DatepickerDate {
  /** Marks the date as not part of the currently displayed month. */
  @Prop() notCurrentMonth: boolean;

  /** The Date. */
  @Prop() date: Date;

  /** Marks the Date as selected. */
  @Prop() selected: boolean = false;

  /** Marks the Date as disabled. */
  @Prop() disabled: boolean = false;

  render() {
    const date = format(this.date, 'd');
    return (
      <button
        disabled={this.disabled}
        class={{
          'selected': this.selected,
          'today': isToday(this.date),
          'not-current-month': this.notCurrentMonth,
          'disabled': this.disabled,
        }}
      >
        <time dateTime={date}>{date}</time>
      </button>
    );
  }
}
