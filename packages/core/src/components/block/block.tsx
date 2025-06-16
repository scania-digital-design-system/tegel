import { Component, h, Prop, Element, State } from '@stencil/core';
import { getAdjustedModeVariant } from '../../utils/modeVariantOverride';

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

  private mutationObserver: MutationObserver;

  private insideModal: boolean = false;

  @State() swapModeVariant: boolean = false;

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

  private checkIfDarkmode() {
    const darkmode = document.body.classList.contains('tds-mode-dark');
    this.swapModeVariant = this.insideModal && darkmode;
  }

  private observeClassChanges() {
    this.mutationObserver = new MutationObserver(() => {
      this.checkIfDarkmode();
    });

    this.mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  componentDidLoad() {
    this.insideModal = !!this.host.closest('tds-modal');

    if (this.insideModal) {
      this.observeClassChanges();
      this.checkIfDarkmode();
    }
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
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
        class={`tds-block ${evenOddClass} ${getAdjustedModeVariant(
          this.modeVariant,
          this.swapModeVariant,
        )}`}
      >
        <slot></slot>
      </TagType>
    );
  }
}
