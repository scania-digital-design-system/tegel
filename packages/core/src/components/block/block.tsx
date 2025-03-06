import { Component, h, Prop, Element } from '@stencil/core';

/**
 * @slot - <default> - <b>Default</b> slot for content inside the block.
 *
 * @example
 * <tds-block>
 *   <section>Semantic section content</section>
 * </tds-block>
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

  /** Specifies the HTML tag to be used for the component wrapper. */
  @Prop() componentTag:
    | 'section'
    | 'div'
    | 'article'
    | 'aside'
    | 'header'
    | 'footer'
    | 'nav'
    | 'main' = 'div';

  private getNestingLevel(): number {
    let level = 0;
    let parent = this.host.parentElement;
    while (parent) {
      if (parent.tagName.toLowerCase() === 'tds-block') {
        level++;
      }
      parent = parent.parentElement;
    }
    return level;
  }

  render() {
    const TagType = this.componentTag as keyof HTMLElementTagNameMap;
    const nestingLevel = this.getNestingLevel();

    let evenOddClass = '';
    if (this.modeVariant === null) {
      if (nestingLevel % 2 === 0) {
        evenOddClass = 'tds-block-even';
      } else {
        evenOddClass = 'tds-block-odd';
      }
    }

    return (
      <TagType
        class={`tds-block ${evenOddClass} ${
          this.modeVariant !== null ? `tds-mode-variant-${this.modeVariant}` : ''
        }`}
      >
        <slot></slot>
      </TagType>
    );
  }
}
