import { Component, h, Element, Host, Prop } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot top - Slot for the top part of the Footer.
 * @slot start - Slot for start (left side) of the Footers main part.
 * @slot end - Slot for the end (right side) of the Footers main part.
 * @slot copyright - Slot for copyright area (bottom left) of the Footer.
 */
@Component({
  tag: 'tds-footer',
  styleUrl: 'footer.scss',
  shadow: true,
})
export class TdsFooter {
  @Element() host!: HTMLElement;

  /** Mode variant of the component, based on current mode. */
  @Prop({ reflect: true }) modeVariant: 'primary' | 'secondary' | null = null;

  private getBrandName(): string {
    return document.documentElement.classList.contains('traton') ? 'Traton' : 'Scania';
  }

  render() {
    const usesTopSlot = hasSlot('top', this.host);
    const usesStartSlot = hasSlot('start', this.host);
    const usesEndSlot = hasSlot('end', this.host);
    const usesCopyrightSlot = hasSlot('copyright', this.host);
    const brandName = this.getBrandName();
    const copyrightText = `Copyright © ${new Date().getFullYear()} ${brandName}`;
    return (
      <Host
        class={{
          [`tds-mode-variant-${this.modeVariant}`]: this.modeVariant !== null,
        }}
      >
        <footer>
          {usesTopSlot && <slot name="top"></slot>}
          <div class="footer-main">
            {(usesStartSlot || usesEndSlot) && (
              <div class="footer-main-top">
                {usesStartSlot && <slot name="start"></slot>}
                {usesEndSlot && <slot name="end"></slot>}
              </div>
            )}
            <div class="footer-main-bottom">
              <small class="copyright">
                {usesCopyrightSlot ? <slot name="copyright"></slot> : copyrightText}
              </small>
              <div class="brand">
                <p>{brandName}</p>
              </div>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
