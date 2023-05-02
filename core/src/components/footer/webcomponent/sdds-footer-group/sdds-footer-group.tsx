import { Component, Host, h, Prop, Element } from '@stencil/core';
import { HostElement, State } from '@stencil/core/internal';

@Component({
  tag: 'sdds-footer-group',
  styleUrl: 'sdds-footer-group.scss',
  shadow: true,
})
export class SddsFooterGroup {
  @Element() host: HostElement;

  /** Title text for the link group, only valid on top part of footer. */
  @Prop() titleText: string;

  /** In mobile, this indicates when the group (if it's in the top part) is opened/closed. */
  @State() open: boolean = false;

  /** If the group is placed in the main part of the footer it can have either left or right as a slot position otherwise undefined. */
  private slotPostion: 'left' | 'right' = null;

  /** Indicates the if group is part of the top part of the footer. */
  private topPartGroup: boolean = false;

  connectedCallback() {
    this.topPartGroup = this.host.parentElement.slot === 'top';
    if (!this.topPartGroup) {
      this.slotPostion = this.host.parentElement.slot === 'main-right' ? 'right' : 'left';
    }
  }

  render() {
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
            <sdds-icon name="chevron_down" size="20px"></sdds-icon>
          </button>
        )}
        <div
          role="list"
          class={`${this.slotPostion ? this.slotPostion : ''}
            ${this.topPartGroup ? 'top-part-child' : ''}
            ${this.open ? 'expanded' : 'closed'}`}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
