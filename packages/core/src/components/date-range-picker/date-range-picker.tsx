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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { enGB, sv, de } from 'date-fns/locale';
import { TdsTextFieldCustomEvent } from '../..';
import generateUniqueId from '../../utils/generateUniqueId';

@Component({
  tag: 'tds-date-range-picker',
  styleUrl: 'date-range-picker.scss',
  shadow: false,
})
export class TdsDatePicker {
  @Element() host: HTMLTdsDatePickerElement;

  private getFormat = (): string => {
    switch (this.variant) {
      case 'day':
        return 'yyyy-MM-dd';
      case 'month':
        return 'yyyy-MM';
      case 'year':
        return 'yyyy';
      default:
        return 'yyyy-MM-dd';
    }
  };

  /** Set the variant of the Datepicker. */
  @Prop() modeVariant: 'primary' | 'secondary';

  @Prop({ mutable: true }) startDate: string = format(startOfToday(), this.getFormat());

  @Prop({ mutable: true }) endDate: string;

  @Prop() range: boolean;

  /** Minimum selectable date. */
  @Prop() min: string;

  /** Maximim selectable date. */
  @Prop() max: string;

  /** The variant of the Datepicker */
  @Prop() variant: 'day' | 'month' | 'year' = 'day';

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

  private getLocale = () => {
    switch (this.locale) {
      case 'en':
        return enGB;
      case 'sv':
        return sv;
      case 'de':
        return de;
      default:
        return enGB;
    }
  };

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
    if (this.variant === 'day') {
      this.updateDays(1);
    } else if (this.variant === 'month') {
      this.updateYear(1);
    } else {
      this.updateYearSpan(11);
    }
  };

  private getPrevious = () => {
    if (this.variant === 'day') {
      this.updateDays(-1);
    } else if (this.variant === 'month') {
      this.updateYear(-1);
    } else {
      this.updateYearSpan(-11);
    }
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

  private updateYear = (yearsToJumpTo: number) => {
    const firstMonthNextYear = add(this.firstMonthCurrentYear, {
      years: yearsToJumpTo,
    });
    this.firstMonthCurrentYear = firstMonthNextYear;

    this.months = eachMonthOfInterval({
      start: startOfYear(this.firstMonthCurrentYear),
      end: endOfYear(this.firstMonthCurrentYear),
    });
  };

  private updateYearSpan = (yearsToJumpTo: number) => {
    const firstYearNextSpan = add(this.firstYearCurrentSpan, { years: yearsToJumpTo });
    this.firstYearCurrentSpan = firstYearNextSpan;
    if (yearsToJumpTo < 0) {
      this.years = eachYearOfInterval({
        start: startOfYear(this.firstYearCurrentSpan),
        end: endOfYear(add(this.firstYearCurrentSpan, { years: Math.abs(yearsToJumpTo) })),
      });
    } else {
      this.years = eachYearOfInterval({
        start: startOfYear(this.firstYearCurrentSpan),
        end: endOfYear(add(this.firstYearCurrentSpan, { years: yearsToJumpTo })),
      });
    }
  };

  private getControlsDisplayText() {
    switch (this.variant) {
      case 'day':
        return format(this.firstDayCurrentMonth, 'MMM yyy');
      case 'month':
        return format(this.firstMonthCurrentYear, 'Y');
      case 'year':
        return `${format(this.firstYearCurrentSpan, 'Y')} - ${format(
          add(this.firstYearCurrentSpan, { years: 11 }),
          'Y',
        )}`;
      default:
        return format(this.firstDayCurrentMonth, this.getFormat());
    }
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

  private getDayHTML() {
    return this.days.map((day: Date) => (
      <date-picker-day
        key={day.getDate()}
        onClick={() => {
          this.handleSelection(day);
        }}
        isCurrentMonth={isSameMonth(day, this.firstDayCurrentMonth)}
        date={format(day, 'd')}
        fullDate={day}
        selected={
          format(day, this.getFormat()) === this.startDate ||
          format(day, this.getFormat()) === this.endDate
        }
        disabled={this.isDateDisabled(day)}
        fallsInRange={this.isInRange(day)}
        onMouseOver={() => {
          if (this.startDate && !this.endDate) {
            this.handleMouseOver(day);
          }
        }}
        onFocus={() => {
          if (this.startDate && !this.endDate) {
            this.handleFocus(day);
          }
        }}
        firstDate={isSameDay(day, parse(this.startDate, this.getFormat(), new Date()))}
        lastDate={isSameDay(day, parse(this.endDate, this.getFormat(), new Date()))}
      ></date-picker-day>
    ));
  }

  private getMonthHTML() {
    return this.months.map((month: Date) => (
      <date-picker-month
        key={month.getDate()}
        /*         onClick={() => {
          this.handleSelection(month);
        }} */
        month={format(month, 'MMM', {
          locale: this.getLocale(),
        })}
        /*         selected={format(month, this.getFormat()) === this.selectedDate} */
        disabled={this.isDateDisabled(month)}
      ></date-picker-month>
    ));
  }

  private getYearHTML() {
    return this.years.map((year: Date) => (
      <date-picker-year
        key={year.getDate()}
        /*         onClick={() => {
          this.handleSelection(year);
        }} */
        year={format(year, this.getFormat())}
        /*         selected={format(year, this.getFormat()) === this.selectedDate} */
        disabled={this.isDateDisabled(year)}
      ></date-picker-year>
    ));
  }

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
              [this.variant]: true,
            }}
          >
            {this.variant === 'day' &&
              [...this.weekDayLabels].map((label) => (
                <div key={label} class="day-indicator">
                  {label}
                </div>
              ))}
            {this.variant === 'day' && this.getDayHTML()}
            {this.variant === 'month' && this.getMonthHTML()}
            {this.variant === 'year' && this.getYearHTML()}
          </div>
        </tds-popover-core>
      </div>
    );
  }
}
