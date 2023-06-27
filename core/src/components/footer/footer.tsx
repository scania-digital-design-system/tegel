import { Component, h, Element } from '@stencil/core';
import { Host, Prop } from '@stencil/core/internal';
import { hasSlot } from '../../utils/utils';

/**
 * @slot top - Slot for the top part of the Footer.
 * @slot left - Slot for left side of the Footers main part.
 * @slot right - Slot for right side of the Footers main part.
 */
@Component({
  tag: 'tds-footer',
  styleUrl: 'footer.scss',
  shadow: true,
})
export class TdsFooter {
  @Element() host: HTMLElement;

  /** Mode variant of the component, based on current mode. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  render() {
    const usesTopSlot = hasSlot('top', this.host);
    const usesStartSlot = hasSlot('start', this.host);
    const usesEndSlot = hasSlot('end', this.host);
    return (
      <Host class={`${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}`}>
        <footer>
          {usesTopSlot && <slot name="top"></slot>}
          <div class="footer-main">
            <div class="footer-main-top">
              {usesStartSlot && <slot name="start"></slot>}
              {usesEndSlot && <slot name="end"></slot>}
            </div>
            <div class="footer-main-bottom">
              <small class="copyright">Copyright &#169; {new Date().getFullYear()} Scania</small>
              <div class="brand">
                <p>Scania</p>
              </div>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
