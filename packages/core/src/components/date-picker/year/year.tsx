import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'date-picker-year',
  styleUrl: 'year.scss',
  shadow: true,
})
export class DatepickerYear {
  @Prop() year: string = '';

  @Prop() selected: boolean = false;

  @Prop() disabled: boolean = false;

  @Prop() onSelect: (event: MouseEvent) => void;

  render() {
    return (
      <Host>
        <button
          onClick={this.onSelect}
          disabled={this.disabled}
          class={{
            selected: this.selected,
            disabled: this.disabled,
          }}
        >
          <time>{this.year}</time>
        </button>
      </Host>
    );
  }
}
