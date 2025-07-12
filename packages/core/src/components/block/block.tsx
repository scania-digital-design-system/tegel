import { Component, h, Prop, Element, State } from '@stencil/core';

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

  @State() usedModeVariant: 'primary' | 'secondary' = null;

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

    // level++;

    if (parent && parent.tagName.toLowerCase() === 'tds-block') {
      level++;
    }

    while (parent) {
      if (parent.parentElement && parent.parentElement.tagName.toLowerCase() === 'tds-modal') {
        level++;
      } else {
        if (parent.getAttribute('used-mode-variant') !== parent.getAttribute('mode-variant')) {
          level++;
        }
        break;
      }

      parent = parent.parentElement;
    }
    return level;
  }

  connectedCallback() {
    this.usedModeVariant = this.modeVariant;

    const nestingLevel = this.getNestingLevel();
    const insideModal = this.host.closest('tds-modal') !== null;

    if (nestingLevel === 0 && insideModal) {
      const colorModeStatusElement =
        document.querySelector('.tds-mode-light') || document.querySelector('.tds-mode-dark');

      if (!colorModeStatusElement) {
        console.warn(
          "Tegel Block component: Could not find color mode status element. Make sure that a parent element that isn't a shadow root has the class 'tds-mode-light' or 'tds-mode-dark', to ensure correct styling when using nested blocks inside a modal",
        );
      } else {
        const observer = new MutationObserver(() => {
          const isDarkmode = colorModeStatusElement.classList.contains('tds-mode-dark');

          if (isDarkmode) {
            this.usedModeVariant = this.modeVariant === 'secondary' ? 'primary' : 'secondary';
          } else {
            this.usedModeVariant = this.modeVariant;
          }
        });

        observer.observe(colorModeStatusElement, {
          attributes: true,
          attributeFilter: ['class'],
        });
      }
    }
  }

  // componentDidLoad() {
  // const nestingLevel = this.getNestingLevel();
  // const insideModal = this.host.closest('tds-modal') !== null;
  // if (nestingLevel === 0 && insideModal) {
  //   const colorModeStatusElement =
  //     document.querySelector('.tds-mode-light') || document.querySelector('.tds-mode-dark');
  //   if (!colorModeStatusElement) {
  //     console.warn(
  //       "Tegel Block component: Could not find color mode status element. Make sure that a parent element that isn't a shadow root has the class 'tds-mode-light' or 'tds-mode-dark', to ensure correct styling when using nested blocks inside a modal",
  //     );
  //   } else {
  //     const observer = new MutationObserver(() => {
  //       // alert('MutationObserver triggered!');
  //       const isDarkmode = colorModeStatusElement.classList.contains('tds-mode-dark');
  //       // alert(isDarkmode ? 'Dark mode is active!' : 'Light mode is active!');
  //       if (isDarkmode) {
  //         // alert('yes');
  //         this.usedModeVariant = this.modeVariant === 'secondary' ? 'primary' : 'secondary';
  //         console.log('aaa', this.usedModeVariant);
  //       }
  //     });
  //     observer.observe(colorModeStatusElement, {
  //       attributes: true,
  //       attributeFilter: ['class'],
  //     });
  //   }
  // }
  // }

  render() {
    // alert('render');
    const TagType = this.componentTag as keyof HTMLElementTagNameMap;
    const nestingLevel = this.getNestingLevel();

    // const differentModeVariant = this.usedModeVariant !== this.modeVariant;

    let evenOddClass = '';
    if (this.usedModeVariant === null) {
      if (nestingLevel % 2 === 0) {
        evenOddClass = 'tds-block-even';
      } else {
        evenOddClass = 'tds-block-odd';
      }
    }

    console.log(evenOddClass);
    console.log(this.usedModeVariant);

    return (
      <TagType
        class={`tds-block ${evenOddClass} 








         ${this.usedModeVariant !== null ? `tds-mode-variant-${this.usedModeVariant}` : ''}      








         
        `}
      >
        <slot></slot>

        {/* {nestingLevel === 0 && (
          <div class="context-check" aria-hidden="true">
            IN DARKMODE AND MODAL?
          </div>
        )} */}
      </TagType>
    );
  }
}
