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
    // Start at 0 for the outermost block
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

    // Check if this block has any tds-block children
    const hasNestedBlocks = Array.from(this.host.querySelectorAll('tds-block')).length > 0;

    // Only apply even/odd classes if this block has nested blocks or is itself nested
    if (this.modeVariant === null && (nestingLevel > 0 || hasNestedBlocks)) {
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
