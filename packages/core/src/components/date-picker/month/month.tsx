import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'date-picker-month',
  styleUrl: 'month.scss',
  shadow: true,
})
export class DatepickerMonth {
  @Prop() month: string = '';

  @Prop() selected: boolean = false;

  render() {
    return (
      <Host>
        <button
          class={{
            selected: this.selected,
          }}
        >
          <time>{this.month}</time>
        </button>
      </Host>
    );
  }
}
