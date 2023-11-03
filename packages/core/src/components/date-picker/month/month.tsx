/* eslint-disable import/no-duplicates */
import { Component, Host, Prop, h } from '@stencil/core';
import { Locale, format } from 'date-fns';
import { enGB, sv, de } from 'date-fns/locale';

@Component({
  tag: 'date-picker-month',
  styleUrl: 'month.scss',
  shadow: true,
})
export class DatepickerMonth {
  /** The Month that should be displayed. */
  @Prop() month: Date;

  /** Marks the Month as selected. */
  @Prop() selected: boolean = false;

  /** Marks the Month as disabled. */
  @Prop() disabled: boolean = false;

  /** Locale for displaying months in a differnet language than enlish. Currently available: English, Swedish, German. */
  @Prop() locale: 'en' | 'sv' | 'de' = 'en';

  /** Returns a Locale object based on this.locale. */
  private getLocale = (): Locale => {
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

  render() {
    const date = format(this.month, 'MMM', {
      locale: this.getLocale(),
    });

    return (
      <Host>
        <button
          disabled={this.disabled}
          class={{
            selected: this.selected,
            disabled: this.disabled,
          }}
        >
          <time dateTime={date}>{date}</time>
        </button>
      </Host>
    );
  }
}
