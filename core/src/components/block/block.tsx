import { Component, h, Prop, Element } from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the content.
 */
@Component({
  tag: 'tds-block',
  styleUrl: 'block.scss',
  shadow: true,
})
export class TdsBlock {
  @Element() host: HTMLElement;

  /** Mode variant of the component, based on current mode. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  children: Array<HTMLTdsBlockElement>;

  connectedCallback() {
    this.children = Array.from(this.host.children).filter(
      (item) => item.tagName === 'TDS-BLOCK',
    ) as HTMLTdsBlockElement[];
    this.children.forEach((item) => {
      if (!this.modeVariant) {
        item.setAttribute('mode-variant', 'secondary');
      } else {
        item.setAttribute('mode-variant', this.modeVariant === 'primary' ? 'secondary' : 'primary');
      }
    });
  }

  render() {
    return (
      <div
        class={`tds-block ${
          this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''
        }`}
      >
        <slot></slot>
      </div>
    );
  }
}
