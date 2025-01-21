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

  setModeVariantOnChildBlocks() {
    this.children = Array.from(this.host.children).filter(
      (item) => item.tagName === 'TDS-BLOCK',
    ) as HTMLTdsBlockElement[];

    console.log('this.modeVariant', this.modeVariant);
    console.log('this.children', this.children);

    this.children?.forEach((item) => {
      console.log('-----------------');
      console.log('in forEach - item', item);

      if (!this.modeVariant) {
        console.log('IF');
        item.setAttribute('mode-variant', 'secondary');
      } else {
        console.log('ELSE');
        item.setAttribute('mode-variant', this.modeVariant === 'primary' ? 'secondary' : 'primary');
      }
    });
  }

  render() {
    this.setModeVariantOnChildBlocks();
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
