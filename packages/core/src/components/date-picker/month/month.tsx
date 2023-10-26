import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'date-picker-month',
  styleUrl: 'month.scss',
  shadow: true,
})
export class DatepickerMonth {
  @Prop() month: string = '';

  @Prop() selected: boolean = false;

  @Prop() disabled: boolean = false;

  render() {
    return (
      <Host>
        <button
          disabled={this.disabled}
          class={{
            selected: this.selected,
            disabled: this.disabled,
          }}
        >
          <time>{this.month}</time>
        </button>
      </Host>
    );
  }
}
