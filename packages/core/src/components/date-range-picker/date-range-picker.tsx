/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-duplicates */
import { Placement } from '@popperjs/core';
import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import {
  add,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameMonth,
  isBefore,
  isAfter,
  isWithinInterval,
  isSameDay,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { TdsTextFieldCustomEvent } from '../..';
import generateUniqueId from '../../utils/generateUniqueId';

@Component({
  tag: 'tds-date-range-picker',
  styleUrl: 'date-range-picker.scss',
  shadow: false,
})
export class TdsDateRangePicker {
  @Element() host: HTMLTdsDatePickerElement;

  private getFormat = (): string => 'yyyy-MM-dd';

  /** Set the variant of the Datepicker. */
  @Prop() modeVariant: 'primary' | 'secondary';

  @Prop({ mutable: true }) startDate: string = format(startOfToday(), this.getFormat());

  @Prop({ mutable: true }) endDate: string;

  @Prop() range: boolean;

  /** Minimum selectable date. */
  @Prop() min: string;

  /** Maximim selectable date. */
  @Prop() max: string;

  /** ID used for internal Date Picker functionality and events, must be unique. */
  @Prop() datePickerId: string = generateUniqueId();

  /** Labels for the week days, should be a single string containing the first letter of each day of the week. For example: MTWTFSS -> Monday, Thursday, Wednesday, Thursday, Friday, Saturday, Sunday. */
  @Prop() weekDayLabels: string = 'MTWTFSS';

  /** State of the Date Picker */
  @Prop() state: 'error' | 'success' | 'default' = 'default';

  /** Helper text for the Date Picker */
  @Prop() helper: string;

  /** Label text */
  @Prop() label: string;

  /** Position of the label for the Text Field. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  @Prop() locale: 'en' | 'sv' | 'de' = 'en';

  @State() currentMonth = format(
    parse(this.startDate, this.getFormat(), new Date()),
    this.getFormat(),
  );

  @State() firstDayCurrentMonth = parse(this.currentMonth, this.getFormat(), new Date());

  @State() firstMonthCurrentYear = startOfYear(parse(this.startDate, this.getFormat(), new Date()));

  @State() firstYearCurrentSpan = startOfYear(parse(this.startDate, this.getFormat(), new Date()));

  @State() days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(this.firstDayCurrentMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(this.firstDayCurrentMonth)),
  });

  @State() months = eachMonthOfInterval({
    start: startOfYear(this.firstMonthCurrentYear),
    end: endOfYear(this.firstMonthCurrentYear),
  });

  @State() years = eachYearOfInterval({
    start: startOfYear(this.firstMonthCurrentYear),
    end: endOfYear(addYears(this.firstMonthCurrentYear, 11)),
  });

  /** Fires when the Accordion Item is clicked, but before it is closed or opened. */
  @Event({
    eventName: 'tdsSelect',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsSelect: EventEmitter<{
    date: string;
    id: string;
  }>;

  /** @internal */
  @Event({
    eventName: 'internalTdsInRange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  internalTdsInRange: EventEmitter<{
    datePickerId: string;
    startDate: Date;
    endDate: Date;
  }>;

  /** @internal */
  @Event({
    eventName: 'internalTdsSelection',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  internalTdsSelection: EventEmitter<{
    datePickerId: string;
    selectionIsMade: boolean;
  }>;

  /** TODO: Should this be editable by the user? The placement of the Datepicker */
  private placement: Placement = 'auto';

  // @ts-ignore This is used in render
  private startRangeInput: HTMLTdsTextFieldElement;

  // @ts-ignore This is used in render
  private endRangeInput: HTMLTdsTextFieldElement;

  private handleSelection = (date: Date) => {
    const oldStartDate = parse(this.startDate, this.getFormat(), new Date());

    // Selecting an end date
    if (this.startDate && !this.endDate) {
      if (isBefore(date, parse(this.startDate, this.getFormat(), new Date()))) {
        this.startDate = format(date, this.getFormat());
        this.endDate = format(oldStartDate, this.getFormat());
        this.internalTdsSelection.emit({
          datePickerId: this.datePickerId,
          selectionIsMade: true,
        });
      } else {
        this.endDate = format(date, this.getFormat());
      }
    }
    // Selecting start date
    else if (!this.startDate) {
      this.startDate = format(date, this.getFormat());
    }
    // Selecting new range (start date)
    else if (this.startDate && this.endDate) {
      this.startDate = format(date, this.getFormat());
      this.endDate = null;
      this.internalTdsSelection.emit({
        datePickerId: this.datePickerId,
        selectionIsMade: false,
      });
    }
  };

  private getNext = () => {
    this.updateDays(1);
  };

  private getPrevious = () => {
    this.updateDays(-1);
  };

  private handleStartDateInput(_event: TdsTextFieldCustomEvent<InputEvent>) {
    /* const newSelectedDate = parse(event.target.value, this.getFormat(), new Date());
    const oldSelectedDate = parse(this.startDate, this.getFormat(), new Date());

    if (isValid(newSelectedDate) && isValid(oldSelectedDate)) {
      if (!isSameMonth(oldSelectedDate, newSelectedDate)) {
        this.endDate = format(newSelectedDate, this.getFormat());
        const diff = differenceInCalendarMonths(newSelectedDate, oldSelectedDate);

        this.updateDays(diff);
      }
    } */
  }

  private handleEndDateInput(_event: TdsTextFieldCustomEvent<InputEvent>) {
    /* const newSelectedDate = parse(event.target.value, this.getFormat(), new Date());
    const oldSelectedDate = parse(this.endDate, this.getFormat(), new Date());

    if (isValid(newSelectedDate) && isValid(oldSelectedDate)) {
      if (!isSameMonth(oldSelectedDate, newSelectedDate)) {
        this.endDate = format(newSelectedDate, this.getFormat());
        const diff = differenceInCalendarMonths(newSelectedDate, oldSelectedDate);

        this.updateDays(diff);
      }
    } */
  }

  private updateDays = (monthToJumpTo: number) => {
    const firstDayNextMonth = add(this.firstDayCurrentMonth, { months: monthToJumpTo });
    this.currentMonth = format(firstDayNextMonth, 'MMM-yyyy');
    this.firstDayCurrentMonth = parse(this.currentMonth, 'MMM-yyyy', new Date());
    this.days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(this.firstDayCurrentMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(this.firstDayCurrentMonth)),
    });
  };

  private getControlsDisplayText() {
    return format(this.firstDayCurrentMonth, 'MMM yyy');
  }

  private isDateDisabled = (date: Date) =>
    isBefore(date, parse(this.min, this.getFormat(), new Date())) ||
    isAfter(date, parse(this.max, this.getFormat(), new Date()));

  private isInRange(day: Date) {
    return (
      this.startDate &&
      this.endDate &&
      isWithinInterval(day, {
        start: parse(this.startDate, this.getFormat(), new Date()),
        end: parse(this.endDate, this.getFormat(), new Date()),
      })
    );
  }

  private handleMouseOver = (day: Date) => {
    // if day that is being hovered is the same as the start date
    if (isSameDay(day, parse(this.startDate, this.getFormat(), new Date()))) {
      console.log(true);
    }
    this.internalTdsInRange.emit({
      datePickerId: this.datePickerId,
      startDate: parse(this.startDate, this.getFormat(), new Date()),
      endDate: day,
    });
  };

  private handleFocus = (day: Date) => {
    this.internalTdsInRange.emit({
      datePickerId: this.datePickerId,
      startDate: parse(this.startDate, this.getFormat(), new Date()),
      endDate: day,
    });
  };

  render() {
    return (
      <div
        class={{
          'tds-date-picker': true,
          'range': this.range,
          'tds-mode-variant-primary': this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.modeVariant === 'secondary',
        }}
      >
        <div
          id="haha"
          class={{
            'tds-u-flex': this.range,
            'range-picker': this.range,
          }}
        >
          <tds-text-field
            ref={(element) => (this.startRangeInput = element)}
            noMinWidth={this.range}
            state={this.state}
            label={this.label}
            labelPosition={this.labelPosition}
            helper={this.helper}
            modeVariant={this.modeVariant}
            onTdsChange={(event) => this.handleStartDateInput(event)}
            placeholder="YYYY/MM/DD"
            value={this.startDate}
          >
            <tds-icon name="calendar" size="16px" slot="suffix"></tds-icon>
          </tds-text-field>
          <tds-text-field
            ref={(element) => (this.endRangeInput = element)}
            noMinWidth={this.range}
            state={this.state}
            label={this.label}
            labelPosition={this.labelPosition}
            helper={this.helper}
            modeVariant={this.modeVariant}
            onTdsChange={(event) => this.handleEndDateInput(event)}
            placeholder="YYYY/MM/DD"
            value={this.endDate}
          >
            <tds-icon name="calendar" size="16px" slot="suffix"></tds-icon>
          </tds-text-field>
        </div>
        <tds-popover-core
          style={{
            backgroundColor: 'var(--tds-date-picker-calendar-bg)',
          }}
          offsetDistance={0}
          placement={this.placement}
          selector="#haha"
        >
          <div class="controls">
            <tds-button size="sm" variant="ghost" class="previous-month" onClick={this.getPrevious}>
              <tds-icon slot="icon" name="chevron_left" size="20px"></tds-icon>
            </tds-button>
            <div class="calendar-display">{this.getControlsDisplayText()}</div>
            <tds-button size="sm" variant="ghost" class="previous-month" onClick={this.getNext}>
              <tds-icon slot="icon" name="chevron_right" size="20px"></tds-icon>
            </tds-button>{' '}
          </div>
          <div
            class={{
              'calendar-container': true,
              'range-picker': this.range,
              'day': true,
            }}
          >
            {[...this.weekDayLabels].map((label) => (
              <div key={label} class="day-indicator">
                {label}
              </div>
            ))}
            {this.days.map((day: Date) => (
              <date-range-picker-day
                key={day.getDate()}
                onClick={() => {
                  this.handleSelection(day);
                }}
                isCurrentMonth={isSameMonth(day, this.firstDayCurrentMonth)}
                date={day}
                selected={
                  format(day, this.getFormat()) === this.startDate ||
                  format(day, this.getFormat()) === this.endDate
                }
                disabled={this.isDateDisabled(day)}
                inRange={this.isInRange(day)}
                onMouseOver={() => {
                  if (
                    this.startDate &&
                    !this.endDate &&
                    !isSameDay(day, parse(this.startDate, this.getFormat(), new Date()))
                  ) {
                    this.handleMouseOver(day);
                  }
                }}
                onFocus={() => {
                  if (this.startDate && !this.endDate) {
                    this.handleFocus(day);
                  }
                }}
                firstInRange={isSameDay(day, parse(this.startDate, this.getFormat(), new Date()))}
                lastInRange={isSameDay(day, parse(this.endDate, this.getFormat(), new Date()))}
              ></date-range-picker-day>
            ))}
          </div>
        </tds-popover-core>
      </div>
    );
  }
}
