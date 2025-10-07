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
  @Element() host: HTMLElement;

  /** Text displayed inside the Button */
  @Prop() text: string;

  /** Button's type */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Variation of Button's design */
  @Prop() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  /** Size of a Button */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /** Control for disabled state of a component */
  @Prop() disabled: boolean = false;

  /** When enabled, the Button takes 100% width */
  @Prop() fullbleed: boolean = false;

  /** Set the mode variant of the Button. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Determines if and how the button should animate. */
  @Prop() animation: 'none' | 'fade' = 'none';

  /** The value to be used for the aria-label attribute if onlyIcon is set to true */
  @Prop() tdsAriaLabel: string;

  /** The name attribute allows for different ways of accessing the button element */
  @Prop() name: string;

  /** The value attribute can be used when handling a form submission */
  @Prop() value: string;

  /** Whether the button is in a pressed state (for toggle buttons) */
  @Prop() pressed: boolean = false;

  @State() onlyIcon: boolean = false;

  @State() isActive: boolean = false;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.isActive = true;

      if (event.key === 'Enter') {
        this.handleClick();
      }
    }
  }

  @Listen('keyup')
  handleKeyUp(event: KeyboardEvent) {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.isActive = false;

      if (event.key === ' ') {
        this.handleClick();
      }
    }
  }

  @Listen('click')
  handleClick() {
    if (this.disabled) return;

    // Dispatch custom event for form submission or other handlers
    const clickEvent = new CustomEvent('tdsClick', {
      bubbles: true,
      detail: {
        type: this.type,
        name: this.name,
        value: this.value,
      },
    });

    this.host.dispatchEvent(clickEvent);
  }

  @Listen('mousedown')
  handleMouseDown() {
    if (!this.disabled) {
      this.isActive = true;
    }
  }

  @Listen('mouseup')
  handleMouseUp() {
    this.isActive = false;
  }

  @Listen('mouseleave')
  handleMouseLeave() {
    this.isActive = false;
  }

  render() {
    const hasLabelSlot = hasSlot('label', this.host);
    const hasIconSlot = hasSlot('icon', this.host);

    if (!this.text && !hasLabelSlot) {
      this.onlyIcon = true;
    }

    // Build ARIA attributes
    const ariaAttributes: Record<string, string | number | boolean> = {
      'role': 'button',
      'aria-disabled': this.disabled,
      'tabindex': this.disabled ? -1 : 0,
    };

    // Add aria-pressed for toggle buttons
    if (this.pressed !== undefined) {
      ariaAttributes['aria-pressed'] = this.pressed;
    }

    // Add aria-label for icon-only buttons
    if (this.onlyIcon && this.tdsAriaLabel) {
      ariaAttributes['aria-label'] = this.tdsAriaLabel;
    }

    // Add data attributes for styling and form handling
    const dataAttributes: Record<string, string> = {
      'data-type': this.type,
    };

    if (this.name) {
      dataAttributes['data-name'] = this.name;
    }

    if (this.value) {
      dataAttributes['data-value'] = this.value;
    }

    return (
      <Host
        class={{
          [`tds-mode-variant-${this.modeVariant}`]: Boolean(this.modeVariant),
          'disabled': Boolean(this.disabled),
          'fullbleed': Boolean(this.fullbleed),
          'primary': this.variant === 'primary',
          'secondary': this.variant === 'secondary',
          'ghost': this.variant === 'ghost',
          'danger': this.variant === 'danger',
          'lg': this.size === 'lg',
          'md': this.size === 'md',
          'sm': this.size === 'sm',
          'xs': this.size === 'xs',
          'icon': hasIconSlot,
          'only-icon': this.onlyIcon,
          'active': this.isActive,
          [`animation-${this.animation}`]: this.animation !== 'none',
        }}
        {...ariaAttributes}
        {...dataAttributes}
      >
        <button
          role="presentation"
          aria-hidden="true"
          tabindex="-1"
          style={{ display: 'contents' }}
        >
          {this.text}
          {hasLabelSlot && !this.onlyIcon && <slot name="label" />}
          {hasIconSlot && <slot name="icon" />}
        </button>
      </Host>
    );
  }
}
