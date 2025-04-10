import { Component, Host, h, Prop, Element, State, Listen } from '@stencil/core';
import hasSlot from '../../../utils/hasSlot';

/**
 * @slot <default> - <b>Unnamed slot.</b> For footer items.
 * @slot title - Slot for the title of the group. Should contain a heading element adjusted to the rest of the website in terms of heading nesting, for accessibility.
 */
@Component({
  tag: 'tds-footer-group',
  styleUrl: 'footer-group.scss',
  shadow: true,
})
export class TdsFooterGroup {
  @Element() host: HTMLElement;

  /** Title text for the link group, only valid on top part of Footer. */
  @Prop() titleText: string;

  /** Value to be used for the aria-label attribute for the nav element wrapping the list. Should be unique for accessibility. */
  @Prop() tdsListAriaLabel: string;

  /** In mobile, this indicates when the group (if it's in the top part) is opened/closed. */
  @State() open: boolean = false;

  /** Indicates if the component is in mobile view. */
  @State() isMobile: boolean;

  /** If the group is placed in the main part of the Footer,
   * it can have either start or end as a slot position otherwise undefined. */
  private slotPosition: 'start' | 'end' = null;

  /** Indicates if a group is part of the top part of the Footer. */
  private topPartGroup: boolean = false;

  private updateIsMobile() {
    this.isMobile = window.innerWidth <= 992;
  }

  connectedCallback() {
    this.updateIsMobile();

    this.topPartGroup = this.host.parentElement.slot === 'top';
    if (!this.topPartGroup) {
      this.slotPosition = this.host.parentElement.slot === 'end' ? 'end' : 'start';
    }

    if (!this.tdsListAriaLabel) {
      console.warn('Tegel Footer Group component: missing tdsListAriaLabel prop');
    }

    if (this.titleText) {
      console.warn(
        'Tegel Footer Group component: to ensure accessibility, please use the title slot instead of the titleText prop. titleText will be deprecated in the future.',
      );
    }

    const hasTitleSlot = hasSlot('title', this.host);
    if (hasTitleSlot && this.titleText) {
      console.warn(
        'Tegel Footer Group component: titleText prop is set but title slot is used. The titleText prop will be ignored.',
      );
    }
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.updateIsMobile();
  }

  render() {
    const hasTitleSlot = hasSlot('title', this.host);

    return (
      <Host aria-expanded={this.open ? 'true' : 'false'}>
        <div class={this.isMobile ? 'mobile-view' : ''}>
          {this.topPartGroup &&
            (this.isMobile ? (
              <button
                onClick={() => {
                  this.open = !this.open;
                }}
                class={`footer-top-title-button ${this.open ? 'expanded' : 'closed'}`}
              >
                {hasTitleSlot ? <slot name="title" /> : this.titleText}
                <tds-icon name="chevron_down" size="20px" aria-hidden="true"></tds-icon>
              </button>
            ) : (
              <div class="footer-top-title">
                {hasTitleSlot ? <slot name="title" /> : this.titleText}
              </div>
            ))}

          <nav aria-label={this.tdsListAriaLabel}>
            <div
              role="list"
              class={`${this.slotPosition ? this.slotPosition : ''}
            ${this.topPartGroup ? 'top-part-child' : ''}
            ${this.open ? 'expanded' : 'closed'}`}
            >
              <slot></slot>
            </div>
          </nav>
        </div>
      </Host>
    );
  }
}
