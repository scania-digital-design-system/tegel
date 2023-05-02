import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'sdds-breadcrumb-item',
  styleUrl: 'sdds-breadcrumb-item.scss',
  shadow: true,
})
export class SddsBreadcrumbItem {
  /** Boolean for the current link */
  @Prop() current: boolean = false;

  /** Toggle the disabled state for the breadcrumb */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <div
        role="listitem"
        class={`${this.current ? 'current' : ''} 
        ${this.disabled ? 'disabled' : ''}`}
      >
        <slot />
      </div>
    );
  }
}
