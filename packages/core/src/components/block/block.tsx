import { Component, h, Prop, Element } from '@stencil/core';

/**
 * @slot - Default slot for content inside the block.
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

  /** Specifies the HTML tag to be used for the component wrapper.
   *
   *  @default 'div'. */
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

  private ensureKeyboardAccessibility() {
    const childElements = Array.from(this.host.children);

    childElements.forEach((child) => {
      const isInteractive =
        child instanceof HTMLButtonElement ||
        child instanceof HTMLAnchorElement ||
        child instanceof HTMLInputElement ||
        child instanceof HTMLSelectElement ||
        child instanceof HTMLTextAreaElement ||
        child.getAttribute('tabindex') !== null ||
        child.getAttribute('role') === 'button' ||
        child.getAttribute('role') === 'link';

      if (!isInteractive) {
        child.setAttribute('tabindex', '-1');
      }
    });
  }

  componentDidLoad() {
    this.ensureKeyboardAccessibility();
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
