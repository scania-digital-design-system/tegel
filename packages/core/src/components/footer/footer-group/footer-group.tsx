import { Component, Host, h, Prop, Element, State } from '@stencil/core';

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

  /** Value to be used for the aria-label attribute for the nav element. Should be unique for improved accessibility. */
  @Prop() tdsAriaLabel: string;

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

    if (!this.tdsAriaLabel) {
      console.warn('Tegel Footer Group component: missing tdsAriaLabel prop');
    }
  }

  render() {
    return (
      <Host aria-expanded={this.open}>
        {this.titleText && this.topPartGroup && <h4 class="footer-top-title">{this.titleText}</h4>}

        {this.titleText && this.topPartGroup && (
          <button
            onClick={() => {
              this.open = !this.open;
            }}
            class={`footer-top-title-button  ${this.open ? 'expanded' : 'closed'}`}
          >
            {this.titleText}
            <tds-icon name="chevron_down" size="20px" aria-hidden="true"></tds-icon>
          </button>
        )}

        <nav aria-label={this.tdsAriaLabel}>
          <div
            role="list"
            class={`${this.slotPosition ? this.slotPosition : ''}
            ${this.topPartGroup ? 'top-part-child' : ''}
            ${this.open ? 'expanded' : 'closed'}`}
          >
            <slot></slot>
          </div>
        </nav>
      </Host>
    );
  }
}
