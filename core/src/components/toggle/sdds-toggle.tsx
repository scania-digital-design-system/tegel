import { Component, h, Prop, Event, Element, EventEmitter, Method } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';

@Component({
  tag: 'sdds-toggle',
  styleUrl: 'sdds-toggle.scss',
  shadow: false,
  scoped: true,
})
export class SddsToggle {
  /** Sets the toggle as checked */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Make the toggle required */
  @Prop() required: boolean = false;

  /** Size of the toggle */
  @Prop() size: 'sm' | 'lg' = 'lg';

  /** Name of the toggles input element */
  @Prop() name: string;

  /** Headline for the toggle */
  @Prop() headline: string;

  /** Sets the toggle in a disabled state */
  @Prop() disabled: boolean = false;

  /** ID of the toggles input element, if not specifed it's randomly generated */
  @Prop() toggleId: string = crypto.randomUUID();

  @Element() host: HostElement;

  /** Toggles the toggle. */
  @Method()
  async toggle() {
    this.checked = !this.checked;
    return {
      toggleId: this.toggleId,
      checked: this.checked,
    };
  }

  /** Sends unique toggle identifier and status when it is toggled. */
  @Event({
    eventName: 'sddsToggle',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  sddsToggle: EventEmitter<{
    toggleId: string;
    checked: boolean;
  }>;

  handleToggle = () => {
    this.checked = !this.checked;
    this.sddsToggle.emit({
      toggleId: this.toggleId,
      checked: this.checked,
    });
  };

  render() {
    return (
      <div class="sdds-toggle-webcomponent">
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
