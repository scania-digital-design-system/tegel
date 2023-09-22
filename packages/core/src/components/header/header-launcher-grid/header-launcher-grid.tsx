import { Component, Element, h, Host, State } from '@stencil/core';
import getPreviousNestedChildOfSiblingsMatching from '../../../utils/getPreviousNestedChildOfSiblingsMatching';
import isHeadingElement from '../../../utils/isHeadingElement';

/**
 * @slot <default> - <b>Unnamed slot.</b> For a grid item element.
 */
@Component({
  tag: 'tds-header-launcher-grid',
  styleUrl: 'header-launcher-grid.scss',
  shadow: false,
})
export class TdsHeaderLauncherGrid {
  @Element() host: HTMLElement;

  @State() headingElement: HTMLElement;

  componentWillLoad() {
    const listRoot = this.host;

    const headingEl = getPreviousNestedChildOfSiblingsMatching(listRoot, (el) => {
      const e = el;
      return isHeadingElement(e);
    });

    if (headingEl) {
      this.headingElement = headingEl;
    } else {
      console.warn('Heading element for list not found');
    }
  }

  render() {
    const listAttributes = {
      'class': 'tds-header-launcher-grid',
      'role': 'list',
      'aria-labelledby': this.headingElement?.id,
    };
    return (
      <Host>
        <div {...listAttributes}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
