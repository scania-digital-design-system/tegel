import { Placement } from '@popperjs/core';
import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isBefore,
  isAfter,
  isWithinInterval,
  isSameDay,
  isValid,
  differenceInCalendarMonths,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
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

  private format = 'yyyy-MM-dd';

  /** Set the variant of the Datepicker. */
  @Prop() modeVariant: 'primary' | 'secondary';

  /** The selected start date for the Date Range Picker */
  @Prop({ mutable: true }) startDate: string = format(startOfToday(), this.format);

  /** The selected end date for the Date Range Picker */
  @Prop({ mutable: true }) endDate: string;

  /** Minimum selectable date. */
  @Prop() min: string;

  /** Maximim selectable date. */
  @Prop() max: string;

  /** ID used for internal Date Range Picker functionality and events, must be unique. */
  @Prop() datePickerId: string = generateUniqueId();

  /** Labels for the week days, should be a single string containing the first letter of each day of the week. For example: MTWTFSS -> Monday, Thursday, Wednesday, Thursday, Friday, Saturday, Sunday. */
  @Prop() weekDayLabels: string = 'MTWTFSS';

  /** State of the Date Range Picker */
  @Prop() state: 'error' | 'success' | 'default' = 'default';

  /** Helper text for the Date Range Picker */
  @Prop() helper: string;

  /** Label text */
  @Prop() label: string;

  /** Position of the label for the Text Fields. TODO: Should it be granular enough to chose differnet for each Text Field */
  @Prop() labelPosition: 'inside' | 'outside' | 'no-label' = 'no-label';

  /** The currently displayed month. */
  @State() currentMonth = format(parse(this.startDate, this.format, new Date()), this.format);

  /** The first Day of the currently displayed month. */
  @State() firstDayCurrentMonth = parse(this.currentMonth, this.format, new Date());

  /** The currently displayed Days */
  @State() days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(this.firstDayCurrentMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(this.firstDayCurrentMonth)),
  });

  /** Fires when a Date is selected in the Date Range Picker */
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

  // Referene to the Text Field for the Start Date
  startRangeInput: HTMLTdsTextFieldElement;

  // Referene to the Text Field for the End Date
  endRangeInput: HTMLTdsTextFieldElement;

  /** Handle the selection of a Date when pressed. */
  private handleSelection = (date: Date) => {
    const oldStartDate = parse(this.startDate, this.format, new Date());

    /** If the selected Date is the same as the the Start Date */
    if (isSameDay(date, parse(this.startDate, this.format, new Date()))) {
      this.endDate = null;
      return;
    }

    /** Selecting an End Date */
    if (this.startDate && !this.endDate) {
      if (isBefore(date, parse(this.startDate, this.format, new Date()))) {
        this.setStartAndEndDate(parse(this.startDate, this.format, new Date()), oldStartDate);
      } else {
        this.endDate = format(date, this.format);
      }
      return;
    }
    /** Selecting an Start Date */
    if (!this.startDate) {
      this.setStartDate(date);
      return;
    }
    /** Selecting a new Range (Start & End Date) */
    if (this.startDate && this.endDate) {
      this.setStartDate(date);
    }
  };

  /** Set a new Start Date and emit internalTdsSelection event */
  private setStartDate = (date: Date) => {
    this.startDate = format(date, this.format);
    this.endDate = null;
    this.internalTdsSelection.emit({
      datePickerId: this.datePickerId,
      selectionIsMade: false,
    });
  };

  /** Set a new Start Date and End Date and emit internalTdsSelection event */
  private setStartAndEndDate = (startDate: Date, endDate: Date) => {
    this.startDate = format(startDate, this.format);
    this.endDate = format(endDate, this.format);
    this.internalTdsSelection.emit({
      datePickerId: this.datePickerId,
      selectionIsMade: true,
    });
  };

  /** Gets the next Dates - that should be displayed. */
  private getNext = () => {
    this.updateDays(1);
  };

  /** Gets the previous Dates - that should be displayed. */
  private getPrevious = () => {
    this.updateDays(-1);
  };

  /** Handles input from the Start Date Text Field, selects a Date based on input. */
  private handleStartDateInput(event: TdsTextFieldCustomEvent<InputEvent>) {
    const newSelectedStartDate = parse(event.target.value, this.format, new Date());
    const oldSelecteStartdDate = parse(this.startDate, this.format, new Date());

    if (isValid(newSelectedStartDate) && isValid(oldSelecteStartdDate)) {
      this.startDate = format(newSelectedStartDate, this.format);
      if (!isSameMonth(oldSelecteStartdDate, newSelectedStartDate)) {
        const diff = differenceInCalendarMonths(newSelectedStartDate, oldSelecteStartdDate);
        this.updateDays(diff);
      }
    }
  }

  /** Handles input from the End Date Text Field, selects a Date based on input. */
  private handleEndDateInput(event: TdsTextFieldCustomEvent<InputEvent>) {
    const newSelectedEndDate = parse(event.target.value, this.format, new Date());
    const oldSelecteEndDate = parse(this.endDate, this.format, new Date());

    if (isValid(newSelectedEndDate) && isValid(oldSelecteEndDate)) {
      this.endDate = format(newSelectedEndDate, this.format);
      if (!isSameMonth(oldSelecteEndDate, newSelectedEndDate)) {
        const diff = differenceInCalendarMonths(newSelectedEndDate, oldSelecteEndDate);
        this.updateDays(diff);
      }
    }
  }

  /** Updates the days currently displayed in the Date Range Picker */
  private updateDays = (monthToJumpTo: number) => {
    const firstDayNextMonth = add(this.firstDayCurrentMonth, { months: monthToJumpTo });
    this.currentMonth = format(firstDayNextMonth, 'MMM-yyyy');
    this.firstDayCurrentMonth = parse(this.currentMonth, 'MMM-yyyy', new Date());
    this.days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(this.firstDayCurrentMonth), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(this.firstDayCurrentMonth)),
    });
  };

  /** Returns the text to be displayed in the controls. */
  private getControlsDisplayText() {
    return format(this.firstDayCurrentMonth, 'MMM yyy');
  }

  /** Util - checks if the Date should be disabled. */
  private shouldDateBeDisabled = (date: Date) =>
    isBefore(date, parse(this.min, this.format, new Date())) ||
    isAfter(date, parse(this.max, this.format, new Date()));

  /** Util - checks if the Date is in range. */
  private isInRange(day: Date) {
    return (
      this.startDate &&
      this.endDate &&
      isWithinInterval(day, {
        start: parse(this.startDate, this.format, new Date()),
        end: parse(this.endDate, this.format, new Date()),
      })
    );
  }

  /** Fires a internal event when a Date is being hovered. */
  private handleMouseOver = (day: Date) => {
    this.internalTdsInRange.emit({
      datePickerId: this.datePickerId,
      startDate: parse(this.startDate, this.format, new Date()),
      endDate: day,
    });
  };

  /** Fires a internal event when a Date is being focused. */
  private handleFocus = (day: Date) => {
    this.internalTdsInRange.emit({
      datePickerId: this.datePickerId,
      startDate: parse(this.startDate, this.format, new Date()),
      endDate: day,
    });
  };

  render() {
    return (
      <div
        class={{
          'tds-date-range-picker': true,
          'tds-mode-variant-primary': this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.modeVariant === 'secondary',
        }}
      >
        <div id="haha" class="controls-container">
          <tds-text-field
            ref={(element) => {
              this.startRangeInput = element;
            }}
            noMinWidth
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
            ref={(element) => {
              this.endRangeInput = element;
            }}
            noMinWidth
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
              'range-picker': true,
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
                  format(day, this.format) === this.startDate ||
                  format(day, this.format) === this.endDate
                }
                disabled={this.shouldDateBeDisabled(day)}
                inRange={this.isInRange(day)}
                onMouseOver={() => {
                  if (
                    this.startDate &&
                    !this.endDate &&
                    !isSameDay(day, parse(this.startDate, this.format, new Date()))
                  ) {
                    this.handleMouseOver(day);
                  }
                }}
                onFocus={() => {
                  if (this.startDate && !this.endDate) {
                    this.handleFocus(day);
                  }
                }}
                firstInRange={isSameDay(day, parse(this.startDate, this.format, new Date()))}
                lastInRange={isSameDay(day, parse(this.endDate, this.format, new Date()))}
              ></date-range-picker-day>
            ))}
          </div>
        </tds-popover-core>
      </div>
    );
  }
}
