import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { getPrefixedTagNames } from '../../../utils/tagName';

/**
 * @slot <default> - <b>Unnamed slot.</b> For footer items.
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

  /** In mobile, this indicates when the group (if it's in the top part) is opened/closed. */
  @State() open: boolean = false;

  /** If the group is placed in the main part of the Footer,
   * it can have either start or end as a slot position otherwise undefined. */
  private slotPosition: 'start' | 'end' = null;

  /** Indicates if a group is part of the top part of the Footer. */
  private topPartGroup: boolean = false;

  connectedCallback() {
    this.topPartGroup = this.host.parentElement.slot === 'top';
    if (!this.topPartGroup) {
      this.slotPosition = this.host.parentElement.slot === 'end' ? 'end' : 'start';
    }
  }

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        {this.titleText && this.topPartGroup && (
          <div class="footer-top-title">{this.titleText}</div>
        )}

        {this.titleText && this.topPartGroup && (
          <button
            onClick={() => {
              this.open = !this.open;
            }}
            class={`footer-top-title-button  ${this.open ? 'expanded' : 'closed'}`}
          >
            {this.titleText}
            <prefixedTagNames.tdsIcon name="chevron_down" size="20px"></prefixedTagNames.tdsIcon>
          </button>
        )}
        <div
          role="list"
          class={`${this.slotPosition ? this.slotPosition : ''}
            ${this.topPartGroup ? 'top-part-child' : ''}
            ${this.open ? 'expanded' : 'closed'}`}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
