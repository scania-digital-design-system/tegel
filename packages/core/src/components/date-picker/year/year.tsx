import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'date-picker-year',
  styleUrl: 'year.scss',
  shadow: true,
})
export class DatepickerYear {
  @Prop() year: string = '';

  @Prop() selected: boolean = false;

  render() {
    return (
      <Host>
        <button
          class={{
            selected: this.selected,
          }}
        >
          <time>{this.year}</time>
        </button>
      </Host>
    );
  }
}
