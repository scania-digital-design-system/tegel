import { Placement } from '@popperjs/core';
import { Component, Element, Fragment, Prop, State, h } from '@stencil/core';
import {
  add,
  addYears,
  differenceInCalendarMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameMonth,
  isValid,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { TdsTextFieldCustomEvent } from '../..';

@Component({
  tag: 'tds-date-picker',
  styleUrl: 'date-picker.scss',
  shadow: false,
})
export class TdsDatePicker {
  @Element() host: HTMLTdsDatePickerElement;

  private getFormat = (): string => {
    switch (this.variant) {
      case 'day':
        return 'yyy-MM-dd';
      case 'month':
        return 'yyyy-MM';
      case 'year':
        return 'yyy';
      default:
        return 'yyy-MM-dd';
    }
  };

  /** The selected date of the Datepicker */
  @Prop({ mutable: true }) selectedDate: string = format(startOfToday(), this.getFormat());

  /** The variant of the Datepicker */
  @Prop() variant: 'day' | 'month' | 'year' = 'year';

  /** Set the variant of the Datepicker. */
  @Prop() modeVariant: 'primary' | 'secondary';

  @State() currentMonth = format(startOfToday(), 'MMM-yyyy');

  @State() firstDayCurrentMonth = parse(this.currentMonth, 'MMM-yyyy', new Date());

  @State() firstMonthCurrentYear = startOfYear(startOfToday());

  @State() firstYearCurrentSpan = startOfYear(startOfToday());

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

  /** The placement of the Datepicker */
  private placement: Placement = 'auto';

  private handleSelection = (day: any) => {
    this.selectedDate = format(day, this.getFormat());
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

  handleInput(event: TdsTextFieldCustomEvent<InputEvent>) {
    const newSelectedDate = parse(event.target.value, 'yyyy-MM-dd', new Date());
    const oldSelectedDate = parse(this.selectedDate, 'yyyy-MM-dd', new Date());

    if (isValid(newSelectedDate) && isValid(oldSelectedDate)) {
      this.selectedDate = format(newSelectedDate, 'yyyy-MM-dd');
      const diff = differenceInCalendarMonths(newSelectedDate, oldSelectedDate);

      this.updateDays(diff);
    }
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

  private getDayHTML() {
    return this.days.map((day: any) => (
      <date-picker-day
        onClick={() => {
          this.handleSelection(day);
        }}
        isCurrentMonth={isSameMonth(day, parse(this.currentMonth, 'MMM-yyyy', new Date()))}
        date={format(day, 'd')}
        selected={format(day, this.getFormat()) === this.selectedDate}
      ></date-picker-day>
    ));
  }

  private getMonthHTML() {
    return this.months.map((month: any) => (
      <date-picker-month
        onClick={() => {
          console.log(month);
          this.handleSelection(month);
        }}
        month={format(month, 'MMM')}
        selected={format(month, this.getFormat()) === this.selectedDate}
      ></date-picker-month>
    ));
  }

  private getYearHTML() {
    return this.years.map((year: any) => (
      <date-picker-year
        onClick={() => {
          this.handleSelection(year);
        }}
        year={format(year, this.getFormat())}
        selected={format(year, this.getFormat()) === this.selectedDate}
      ></date-picker-year>
    ));
  }

  render() {
    return (
      <div
        class={{
          'tds-date-picker': true,
          'tds-mode-variant-primary': this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.modeVariant === 'secondary',
        }}
      >
        <div id="haha">
          <tds-text-field
            modeVariant={this.modeVariant}
            onTdsChange={(event) => this.handleInput(event)}
            placeholder="YYYY/MM/DD"
            value={this.selectedDate}
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
              [this.variant]: true,
            }}
          >
            {this.variant === 'day' && (
              <Fragment>
                <div class="day-indicator">M</div>
                <div class="day-indicator">T</div>
                <div class="day-indicator">O</div>
                <div class="day-indicator">T</div>
                <div class="day-indicator">F</div>
                <div class="day-indicator">S</div>
                <div class="day-indicator">S</div>
              </Fragment>
            )}
            {this.variant === 'day' && this.getDayHTML()}
            {this.variant === 'month' && this.getMonthHTML()}
            {this.variant === 'year' && this.getYearHTML()}
          </div>
        </tds-popover-core>
      </div>
    );
  }
}
