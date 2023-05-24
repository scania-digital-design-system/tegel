import { Component, h, Prop, Event, Element, EventEmitter, Method } from '@stencil/core';
@Component({
  tag: 'tds-toggle',
  styleUrl: 'toggle.scss',
  shadow: false,
  scoped: true,
})
export class TdsToggle {
  @Element() host: HTMLElement;

  /** Sets the Toggle as checked */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Make the Toggle required */
  @Prop() required: boolean = false;

  /** Size of the Toggle */
  @Prop() size: 'sm' | 'lg' = 'lg';

  /** Name of the toggles input element */
  @Prop() name: string;

  /** Headline for the Toggle */
  @Prop() headline: string;

  /** Sets the Toggle in a disabled state */
  @Prop() disabled: boolean = false;

  /** ID of the Toggle's input element, if not specified it's randomly generated */
  @Prop() toggleId: string = crypto.randomUUID();

  /** Toggles the Toggle. */
  @Method()
  async toggle() {
    this.checked = !this.checked;
    return {
      toggleId: this.toggleId,
      checked: this.checked,
    };
  }

  /** Sends unique Toggle identifier and status when it is toggled. */
  @Event({
    eventName: 'tdsToggle',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsToggle: EventEmitter<{
    toggleId: string;
    checked: boolean;
  }>;

  handleToggle = () => {
    this.checked = !this.checked;
    this.tdsToggle.emit({
      toggleId: this.toggleId,
      checked: this.checked,
    });
  };

  render() {
    return (
      <div class="tds-toggle">
        {this.headline && (
          <div class={`toggle-headline ${this.disabled ? 'disabled' : ''}`}>{this.headline}</div>
        )}
        <input
          aria-describedby={this.host.getAttribute('aria-describedby')}
          aria-labelledby={this.host.getAttribute('aria-labelledby')}
          aria-checked={this.checked}
          aria-required={this.required}
          onChange={() => this.handleToggle()}
          class={`${this.size}`}
          checked={this.checked}
          disabled={this.disabled}
          required={this.required}
          type="checkbox"
          name={this.name}
          id={this.toggleId}
          role="switch"
        />
        <label class={`${this.disabled ? 'disabled' : ''}`} htmlFor={this.toggleId}>
          <slot name="label"></slot>
        </label>
      </div>
    );
  }
}
