import { Component, Host, Prop, h } from '@stencil/core';
import { format } from 'date-fns';

@Component({
  tag: 'date-picker-year',
  styleUrl: 'year.scss',
  shadow: true,
})
export class DatepickerYear {
  /** The Year that should be displayed. */
  @Prop() year: Date;

  /** Marks the Year as selected. */
  @Prop() selected: boolean = false;

  /** Marks the Year as selected. */
  @Prop() disabled: boolean = false;

  render() {
    const date = format(this.year, 'yyyy');
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
