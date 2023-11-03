import { Component, Element, Host, Listen, Prop, State, h } from '@stencil/core';
import { isBefore, isSameDay, isWithinInterval, isToday, format } from 'date-fns';

@Component({
  tag: 'date-range-picker-day',
  styleUrl: 'range-day.scss',
  shadow: true,
})
export class DatepickerDate {
  @Element() host: HTMLDatePickerDayElement;

  /** Marks the date as not part of the currently displayed month. */
  @Prop() notCurrentMonth: boolean;

  /** The Date. */
  @Prop() date: Date;

  /** Marks the Date as selected. */
  @Prop() selected: boolean = false;

  /** Marks the Date as disabled. */
  @Prop() disabled: boolean = false;

  /** Marks the Date as in range. */
  @Prop({ mutable: true }) inRange: boolean = false;

  /** Marks the Date as the last date in range. */
  @Prop({ mutable: true }) lastInRange: boolean = false;

  /** Marks the Date as the first date in range. */
  @Prop({ mutable: true }) firstInRange: boolean = false;

  /** If the Start Date is after the End Date reversed is true. */
  @State() reverse: boolean = false;

  /** Listens for a internal tdsSelection event to know when a selection is made. */
  @Listen('internalTdsSelection', { target: 'window' })
  handleInternalTdsSelection(
    event: CustomEvent<{
      datePickerId: string;
      selectionIsMade: boolean;
    }>,
  ) {
    const { selectionIsMade, datePickerId } = event.detail;
    if (this.host.closest('tds-date-range-picker').datePickerId === datePickerId) {
      this.reverse = !selectionIsMade;
    }
  }

  /** Listens for a internal tdsRange event to highlight which dates are in range. */
  @Listen('internalTdsInRange', { target: 'window' })
  handleInternalTdsInRange(
    event: CustomEvent<{
      datePickerId: string;
      startValue: Date;
      endValue: Date;
    }>,
  ) {
    const { startValue, endValue, datePickerId } = event.detail;
    if (this.host.closest('tds-date-range-picker').datePickerId === datePickerId) {
      /** If the End Date is before the Start Date  */
      if (isBefore(endValue, startValue)) {
        this.inRange = isWithinInterval(this.date, { start: endValue, end: startValue });
        this.lastInRange = false;
        this.reverse = true;
        /** If the Start Date is before the End Date  */
      } else {
        this.inRange = isWithinInterval(this.date, { start: startValue, end: endValue });
        this.lastInRange = false;
        this.reverse = false;
      }

      /** If the hovered Date is the same as the selected End Date  */
      if (isSameDay(this.date, endValue)) {
        this.lastInRange = true;
        this.firstInRange = false;
      }
      /** If the hovered Date is the same as the selected Start Date  */
      if (isSameDay(this.date, startValue)) {
        this.firstInRange = true;
        this.lastInRange = false;
      }
    }
  }

  render() {
    const date = format(this.date, 'd');
    return (
      <Host>
        <button
          disabled={this.disabled}
          class={{
            'selected': this.selected,
            'today': isToday(this.date),
            'not-current-month': this.notCurrentMonth,
            'disabled': this.disabled,
            'falls-in-range': this.inRange,
            'last-date': this.lastInRange && !this.firstInRange,
            'first-date': this.firstInRange,
            'reverse': this.reverse,
          }}
        >
          <time dateTime={date}>{date}</time>
        </button>
      </Host>
    );
  }
}
