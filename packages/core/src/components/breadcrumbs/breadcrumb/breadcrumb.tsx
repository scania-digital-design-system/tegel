import { Component, h, Prop } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a native <code>&lt;a></code> element.
 */
@Component({
  tag: 'tds-breadcrumb',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class TdsBreadcrumb {
  /** Boolean for the current link */
  @Prop() current: boolean = false;

  render() {
    return (
      <div role="listitem" class={`${this.current ? 'current' : ''}`}>
        <slot />
      </div>
    );
  }
}
