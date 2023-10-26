import { Component, Element, Host, Listen, Prop, State, h } from '@stencil/core';
import { isBefore, isSameDay, isWithinInterval, isToday, format } from 'date-fns';

@Component({
  tag: 'date-picker-day',
  styleUrl: 'day.scss',
  shadow: true,
})
export class DatepickerDate {
  @Element() host: HTMLDatePickerDayElement;

  @Prop() isCurrentMonth: boolean = true;

  @Prop() date: Date;

  @Prop() fullDate: Date;

  @Prop() selected: boolean = false;

  @Prop() disabled: boolean = false;

  @Prop({ mutable: true }) fallsInRange: boolean = false;

  @Prop({ mutable: true }) lastDate: boolean = false;

  @Prop({ mutable: true }) firstDate: boolean = false;

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
        this.fallsInRange = isWithinInterval(this.fullDate, { start: endDate, end: startDate });
        this.lastDate = false;
        this.reverse = true;
      } else {
        this.fallsInRange = isWithinInterval(this.fullDate, { start: startDate, end: endDate });
        this.lastDate = false;
        this.reverse = false;
      }

      if (isSameDay(this.fullDate, endDate)) {
        this.lastDate = true;
        this.firstDate = false;
      }
      if (isSameDay(this.fullDate, startDate)) {
        this.lastDate = false;
        this.firstDate = true;
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
            'falls-in-range': this.fallsInRange,
            'last-date': this.lastDate && !this.firstDate,
            'first-date': this.firstDate,
            'reverse': this.reverse,
          }}
        >
          <time>{format(this.date, 'd')}</time>
        </button>
      </Host>
    );
  }
}
