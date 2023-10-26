import { Component, Element, Host, Listen, Prop, State, h } from '@stencil/core';
import { isBefore, isSameDay, isWithinInterval, isToday, format } from 'date-fns';

@Component({
  tag: 'date-range-picker-day',
  styleUrl: 'range-day.scss',
  shadow: true,
})
export class DatepickerDate {
  @Element() host: HTMLDatePickerDayElement;

  @Prop() isCurrentMonth: boolean = true;

  @Prop() date: Date;

  @Prop() selected: boolean = false;

  @Prop() disabled: boolean = false;

  @Prop({ mutable: true }) inRange: boolean = false;

  @Prop({ mutable: true }) lastInRange: boolean = false;

  @Prop({ mutable: true }) firstInRange: boolean = false;

  @State() reverse: boolean = false;

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

  @Listen('internalTdsInRange', { target: 'window' })
  handleInternalTdsInRange(
    event: CustomEvent<{
      datePickerId: string;
      startDate: Date;
      endDate: Date;
    }>,
  ) {
    const { startDate, endDate, datePickerId } = event.detail;
    if (this.host.closest('tds-date-range-picker').datePickerId === datePickerId) {
      if (isBefore(endDate, startDate)) {
        this.inRange = isWithinInterval(this.date, { start: endDate, end: startDate });
        this.lastInRange = false;
        this.reverse = true;
      } else {
        this.inRange = isWithinInterval(this.date, { start: startDate, end: endDate });
        this.lastInRange = false;
        this.reverse = false;
      }

      // If date is end date
      if (isSameDay(this.date, endDate)) {
        this.lastInRange = true;
        this.firstInRange = false;
      }
      // If date is start date
      if (isSameDay(this.date, startDate)) {
        this.firstInRange = true;
        this.lastInRange = false;
      }
    }
  }

  render() {
    return (
      <Host>
        <button
          disabled={this.disabled}
          class={{
            'selected': this.selected,
            'today': isToday(this.date),
            'not-current-month': !this.isCurrentMonth,
            'disabled': this.disabled,
            'falls-in-range': this.inRange,
            'last-date': this.lastInRange && !this.firstInRange,
            'first-date': this.firstInRange,
            'reverse': this.reverse,
          }}
        >
          <time>{format(this.date, 'd')}</time>
        </button>
      </Host>
    );
  }
}
