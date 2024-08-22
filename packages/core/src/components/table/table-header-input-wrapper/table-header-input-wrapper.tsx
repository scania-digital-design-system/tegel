import { Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'tds-table-header-input-wrapper',
  styleUrl: 'table-header-input-wrapper.scss',
  shadow: true,
})
export class TdsTableHeaderInputWrapper {
  @Element() host: HTMLElement;

  /** Controls if the search icon is shown */
  @Prop() showIcon: boolean = true;

  @State() renderSlot: boolean = true;

  @State() inputFocused: boolean = false;

  private handleSlotChange() {
    this.validateSlot();
  }

  private validateSlot() {
    const children = Array.from(this.host.children).filter(
      (element) => element.tagName === 'INPUT',
    ) as HTMLInputElement[];

    if (children.length !== 1) {
      console.warn('TABLE-HEADER-INPUT-WRAPPER: Wrapper only accepts input as children.');
      this.renderSlot = false;
    } else {
      if (!this.renderSlot) this.renderSlot = true;

      const input = children[0];
      input.addEventListener('focus', () => {
        this.inputFocused = true;
      });
      input.addEventListener('blur', () => {
        this.inputFocused = false;
      });
    }
  }

  render() {
    return (
      <Host
        class={{
          'focused-input-wrapper': this.inputFocused,
          'show-icon': this.showIcon,
        }}
      >
        {this.renderSlot ? <slot onSlotchange={() => this.handleSlotChange()} /> : null}
        {this.showIcon ? (
          <tds-icon class="search-icon" slot="icon" size="16px" name="search"></tds-icon>
        ) : null}
      </Host>
    );
  }
}
