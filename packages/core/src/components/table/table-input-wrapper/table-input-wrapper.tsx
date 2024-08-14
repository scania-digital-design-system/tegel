import { Component, Element, h, Host, State } from '@stencil/core';

@Component({
  tag: 'tds-table-input-wrapper',
  styleUrl: 'table-input-wrapper.scss',
  shadow: true,
})
export class TdsTableInputWrapper {
  @Element() host: HTMLElement;

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
      console.warn('INPUT-WRAPPER: Wrapper only accepts input as children.');
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
        }}
      >
        {this.renderSlot ? <slot onSlotchange={() => this.handleSlotChange()} /> : null}
        <tds-icon
          class="edit-icon"
          slot="icon"
          size="16px"
          name="edit"
          data-testid="tds-button-testid"
        ></tds-icon>
      </Host>
    );
  }
}
