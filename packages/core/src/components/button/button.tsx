import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot label - Slot for the text injection. Serves as alternative to text prop.
 * @slot icon - Slot used to display an Icon in the Button.
 */
@Component({
  tag: 'tds-button',
  styleUrl: 'button.scss',
  shadow: false,
  scoped: true,
})
export class TdsButton {
  @Element() host!: HTMLElement;

  /** Text displayed inside the Button */
  @Prop({ reflect: true }) text?: string;

  /** Button's type */
  @Prop({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  /** Variation of Button's design */
  @Prop({ reflect: true }) variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  /** Size of a Button */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Control for disabled state of a component */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** When enabled, the Button takes 100% width */
  @Prop({ reflect: true }) fullbleed: boolean = false;

  /** Set the mode variant of the Button. */
  @Prop({ reflect: true }) modeVariant: 'primary' | 'secondary' | null = null;

  /** Determines if and how the button should animate. */
  @Prop({ reflect: true }) animation: 'none' | 'fade' = 'none';

  /** The value to be used for the aria-label attribute if onlyIcon is set to true */
  @Prop({ reflect: true }) tdsAriaLabel?: string;

  /** The name attribute allows for different ways of accessing the button element */
  @Prop({ reflect: true }) name?: string;

  /** The value attribute can be used when handling a form submission */
  @Prop({ reflect: true }) value?: string;

  @State() onlyIcon: boolean = false;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.disabled) {
      this.host.querySelector('button')?.classList.add('active');
    }
  }

  @Listen('keyup')
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.disabled) {
      this.host.querySelector('button')?.classList.remove('active');
    }
  }

  render() {
    const hasLabelSlot = hasSlot('label', this.host);
    const hasIconSlot = hasSlot('icon', this.host);

    if (!this.text && !hasLabelSlot) {
      this.onlyIcon = true;
    }

    return (
      <Host
        class={{
          [`tds-mode-variant-${this.modeVariant}`]: Boolean(this.modeVariant),
          disabled: Boolean(this.disabled),
          fullbleed: Boolean(this.fullbleed),
        }}
        disabled={this.disabled}
      >
        <button
          type={this.type}
          name={this.name ? this.name : undefined}
          value={this.value ? this.value : undefined}
          disabled={this.disabled}
          class={{
            'primary': this.variant === 'primary',
            'secondary': this.variant === 'secondary',
            'ghost': this.variant === 'ghost',
            'danger': this.variant === 'danger',
            'lg': this.size === 'lg',
            'md': this.size === 'md',
            'sm': this.size === 'sm',
            'xs': this.size === 'xs',
            'disabled': this.disabled,
            'fullbleed': this.fullbleed,
            'icon': hasIconSlot,
            'only-icon': this.onlyIcon,
            [`animation-${this.animation}`]: this.animation !== 'none',
          }}
          {...(this.onlyIcon && this.tdsAriaLabel && { 'aria-label': this.tdsAriaLabel })}
        >
          {this.text}
          {hasLabelSlot && !this.onlyIcon && <slot name="label" />}
          {hasIconSlot && <slot name="icon" />}
        </button>
      </Host>
    );
  }
}
