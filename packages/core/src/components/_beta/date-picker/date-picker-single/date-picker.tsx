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
  isAfter,
  isBefore,
  isSameMonth,
  isValid,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { TdsTextFieldCustomEvent } from '../../../../index';
import generateUniqueId from '../../../../utils/generateUniqueId';

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

  /** The selected date of the Datepicker */
  @Prop({ mutable: true }) value: string = null;

  /** Minimum selectable date. */
  @Prop() min: string;

  /** Maximim selectable date. */
  @Prop() max: string;

  /** The variant of the Datepicker */
  @Prop() variant: 'day' | 'month' | 'year' = 'day';

  /** ID used for internal Date Picker functionality and events, must be unique. */
  @Prop() datePickerId: string = generateUniqueId();

  /** State of the Date Picker */
  @Prop() state: 'error' | 'success' | 'default' = 'default';

  /** Helper text for the Date Picker */
  @Prop() helper: string;

  /** Label text */
  @Prop() label: string;

  /** Position of the label for the Text Field. */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** Locale for displaying Months in a differnet language than enlish. Currently available: English, Swedish, German. */
  @Prop() locale: 'en' | 'sv' | 'de' = 'en';

  /** Sets which day the week starts on,  1 = Monday.
   * If this is used, you will also need to set a custom
   * weekDayLabels prop to correspond with this this
   * update.
   */
  @Prop() weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1;

  /** Labels for the week days, should be a single string containing the first letter of each day of the week. For example: MTWTFSS -> Monday, Thursday, Wednesday, Thursday, Friday, Saturday, Sunday. */
  @Prop() weekDayLabels: string = 'MTWTFSS';

  /** The currently displayed month (used for variant="day"). */
  @State() currentMonth = format(
    parse(this.value ?? format(startOfToday(), this.getFormat()), this.getFormat(), new Date()),
    this.getFormat(),
  );

  /** The first Day of the currently displayed month (used for variant="day"). */
  @State() firstDayCurrentMonth = parse(this.currentMonth, this.getFormat(), new Date());

  /** The first Month of the currently displayed year (used for variant="month"). */
  @State() firstMonthCurrentYear = startOfYear(
    parse(this.value ?? format(startOfToday(), this.getFormat()), this.getFormat(), new Date()),
  );

  /** The first Year of the currently displayed year span (used for variant="year"). */
  @State() firstYearCurrentSpan = startOfYear(
    parse(this.value ?? format(startOfToday(), this.getFormat()), this.getFormat(), new Date()),
  );

  /** The currently displayed Days */
  @State() days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(this.firstDayCurrentMonth), {
      weekStartsOn: this.weekStartsOn,
    }),
    end: endOfWeek(endOfMonth(this.firstDayCurrentMonth), {
      weekStartsOn: this.weekStartsOn,
    }),
  });

  /** The currently displayed Months */
  @State() months = eachMonthOfInterval({
    start: startOfYear(this.firstMonthCurrentYear),
    end: endOfYear(this.firstMonthCurrentYear),
  });

  /** The currently displayed Years */
  @State() years = eachYearOfInterval({
    start: startOfYear(this.firstMonthCurrentYear),
    end: endOfYear(addYears(this.firstMonthCurrentYear, 11)),
  });

  /** Fires when a Date/Month/Year is selected. */
  @Event({
    eventName: 'tdsSelect',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsSelect: EventEmitter<{
    value: string;
    id: string;
  }>;

  /** TODO: Should this be editable by the user? The placement of the Datepicker */
  private placement: Placement = 'auto';

  /** Handle the selection of a Date/Month/Year when pressed. */
  private handleSelection = (date: Date) => {
    const newSelectedDate = date;
    /** The previously selected Date/Month/Year */
    const previouslySelectedDate = parse(this.value, this.getFormat(), new Date());

    /** Sets the selected Date/Month/Year */
    this.value = format(date, this.getFormat());
    /** Emits a tdsSelect event with the new selected date and the ID of the date picker */
    this.tdsSelect.emit({
      value: this.value,
      id: this.datePickerId,
    });

    /** If the selected selected date is not is the currently displayed month
     * we need to update the calendar container to show the month of
     * the new selected date. Only applicable for variant='day'
     * */
    if (this.variant === 'day' && !isSameMonth(newSelectedDate, previouslySelectedDate)) {
      this.updateDisplayedDays();
    }
  };

  /** Handles input from the Text Field, selects a Date/Month/Year based on input. */
  private handleInput(event: TdsTextFieldCustomEvent<InputEvent>) {
    const newSelectedDate = parse(event.target.value, this.getFormat(), new Date());
    const previouslySelectedDate = parse(this.value, this.getFormat(), new Date());

    /** Checks that the input is in a valid Date/Month/Year format */
    if (isValid(newSelectedDate) && isValid(previouslySelectedDate)) {
      /** Sets the selected Date/Month/Year */
      this.value = format(newSelectedDate, this.getFormat());
      /** Emits a tdsSelect event with the new selected date and the ID of the date picker */
      this.tdsSelect.emit({
        value: this.value,
        id: this.datePickerId,
      });

      /** If the selected selected date is not is the currently displayed month
       * we need to update the calendar container to show the month of
       * the new selected date. Only applicale for variant='day'
       * */
      if (this.variant === 'day' && !isSameMonth(previouslySelectedDate, newSelectedDate)) {
        this.updateDisplayedDays();
      }
    }
  }

  /** Updates the days currently displayed in the Date Picker */
  private updateDisplayedDays = () => {
    this.currentMonth = format(parse(this.value, this.getFormat(), new Date()), this.getFormat());
    this.firstDayCurrentMonth = parse(this.currentMonth, this.getFormat(), new Date());
    this.days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(this.firstDayCurrentMonth), {
        weekStartsOn: this.weekStartsOn,
      }),
      end: endOfWeek(endOfMonth(this.firstDayCurrentMonth), {
        weekStartsOn: this.weekStartsOn,
      }),
    });
  };

  /** Gets the next Date/Month/Year - that should be displayed. */
  private getNext = () => {
    if (this.variant === 'day') {
      this.updateDays(1);
    } else if (this.variant === 'month') {
      this.updateYear(1);
    } else {
      this.updateYearSpan(11);
    }
  };

  /** Gets the previous Date/Month/Year - that should be displayed. */
  private getPrevious = () => {
    if (this.variant === 'day') {
      this.updateDays(-1);
    } else if (this.variant === 'month') {
      this.updateYear(-1);
    } else {
      this.updateYearSpan(-11);
    }
  };

  /** Updates the currenly displayed Days basen on an X amount of months to jump
   * forwards/backwards */
  private updateDays = (monthToJumpTo: number) => {
    const firstDayNextMonth = add(this.firstDayCurrentMonth, { months: monthToJumpTo });
    this.currentMonth = format(firstDayNextMonth, 'MMM-yyyy');
    this.firstDayCurrentMonth = parse(this.currentMonth, 'MMM-yyyy', new Date());
    this.days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(this.firstDayCurrentMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(this.firstDayCurrentMonth)),
    });
  };

  /** Updates the currenly displayed Year (used for variant="month") basen on an X
   * amount of months to jump forwards/backwards */
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

  /** Updates the currenly displayed Years basen on an X amount of months to jump
   * forwards/backwards */
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

  /** Returns the text to be displayed in the controls. */
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

  /** Returns the placeholder that should be displayed for whatever variant the Date Picker is. */
  private getPlaceHolder() {
    switch (this.variant) {
      case 'day':
        return 'YYYY-MM-DD';
      case 'month':
        return 'YYYY-MM';
      case 'year':
        return 'YYYY';
      default:
        return 'YYYY-MM-DD';
    }
  }

  /** Util - checks if the Date/Month/Year should be disabled. */
  private shouldDateBeDisabled = (date: Date) =>
    isBefore(date, parse(this.min, this.getFormat(), new Date())) ||
    isAfter(date, parse(this.max, this.getFormat(), new Date()));

  /** Returns the HTML structure for Days */
  private getDayHTML() {
    return this.days.map((day: Date) => (
      <date-picker-day
        key={day.getDate()}
        onClick={() => {
          if (!this.shouldDateBeDisabled(day)) {
            this.handleSelection(day);
          }
        }}
        notCurrentMonth={!isSameMonth(day, this.firstDayCurrentMonth)}
        date={day}
        selected={format(day, this.getFormat()) === this.value}
        disabled={this.shouldDateBeDisabled(day)}
      ></date-picker-day>
    ));
  }

  /** Returns the HTML structure for Months */
  private getMonthHTML() {
    return this.months.map((month: Date) => (
      <date-picker-month
        key={month.getDate()}
        onClick={() => {
          if (!this.shouldDateBeDisabled(month)) {
            this.handleSelection(month);
          }
        }}
        month={month}
        selected={format(month, this.getFormat()) === this.value}
        disabled={this.shouldDateBeDisabled(month)}
        locale={this.locale}
      ></date-picker-month>
    ));
  }

  /** Returns the HTML structure for Years */
  private getYearHTML() {
    return this.years.map((year: Date) => (
      <date-picker-year
        key={year.getDate()}
        onClick={() => {
          if (!this.shouldDateBeDisabled(year)) {
            this.handleSelection(year);
          }
        }}
        year={year}
        selected={format(year, this.getFormat()) === this.value}
        disabled={this.shouldDateBeDisabled(year)}
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
            state={this.state}
            label={this.label}
            labelPosition={this.labelPosition}
            helper={this.helper}
            modeVariant={this.modeVariant}
            onTdsChange={(event) => this.handleInput(event)}
            placeholder={this.getPlaceHolder()}
            value={this.value}
          >
            <tds-icon
              style={{
                color: 'var(--tds-date-picker-input-icon)',
              }}
              name="calendar"
              size="16px"
              slot="suffix"
            ></tds-icon>
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
            <button class="previous" onClick={this.getPrevious}>
              <tds-icon
                onClick={this.getPrevious}
                slot="icon"
                name="chevron_left"
                size="20px"
              ></tds-icon>
            </button>
            <div class="calendar-display">{this.getControlsDisplayText()}</div>
            <button class="next" onClick={this.getNext}>
              <tds-icon slot="icon" name="chevron_right" size="20px"></tds-icon>
            </button>{' '}
          </div>
          <div
            class={{
              'calendar-container': true,
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
