import { Component, Element, Fragment, h, Host, Listen, Prop, State } from '@stencil/core';
import { CollapseEvent } from '../side-menu';

/**
 * @slot icon - Used for injecting the icon that compliments the dropdown title
 * @slot label - Used for injecting the text, aka dropdown title
 * @slot <default> - <b>Unnamed slot.</b> For injection of the <code>tds-side-menu-dropdown-list</code> subcomponent.
 * */
@Component({
  tag: 'tds-side-menu-dropdown',
  styleUrl: 'side-menu-dropdown.scss',
  shadow: true,
})
export class TdsSideMenuDropdown {
  @Element() host: HTMLElement;

  /** If the dropdown should be open from the start. */
  @Prop() defaultOpen: boolean = false;

  /** The label of the button that opens the dropdown.
   * This is an alternative to the label slot. */
  @Prop() buttonLabel: string;

  /** If the button that opens the dropdown should appear selected. */
  @Prop() selected: boolean = false;

  @Prop() open: boolean = false;

  @State() hoverState: { isHovered: boolean; updatedAt: number };

  @State() collapsed: boolean = false;

  private sideMenuEl: HTMLTdsSideMenuElement;

  @Listen('internalTdsSideMenuPropChange', { target: 'body' })
  collapsedSideMenuEventHandler(event: CustomEvent<CollapseEvent>) {
    this.collapsed = event.detail.collapsed;
  }

  @Listen('pointerenter')
  onEventPointerEnter() {
    this.setHoverStateOpen();
  }

  @Listen('focusin')
  onEventFocus() {
    this.setHoverStateOpen();
  }

  @Listen('pointerleave')
  onEventPointerLeave() {
    this.setHoverStateClosed();
  }

  @Listen('focusout')
  onEventBlur() {
    this.setHoverStateClosed();
  }

  setHoverStateOpen() {
    this.hoverState = { isHovered: true, updatedAt: Date.now() };
  }

  setHoverStateClosed() {
    const leftAt = Date.now();
    const toleranceInMilliseconds = 150;
    setTimeout(() => {
      if (this.hoverState.isHovered && this.hoverState.updatedAt < leftAt) {
        this.hoverState = { isHovered: false, updatedAt: Date.now() };
      }
    }, toleranceInMilliseconds);
  }

  getIsOpenState() {
    return this.collapsed ? this.hoverState?.isHovered : this.open;
  }

  connectedCallback() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
    this.collapsed = this.sideMenuEl.collapsed;
    this.open = this.defaultOpen;
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'wrapper': true,
            'state-open': this.getIsOpenState(),
            'state-collapsed': this.collapsed,
          }}
        >
          <tds-side-menu-item
            class="button"
            active={this.getIsOpenState()}
            selected={this.selected}
            onClick={() => {
              this.open = !this.open;
            }}
          >
            <button>
              <slot name="icon"></slot>
              {!this.collapsed && (
                <Fragment>
                  {this.buttonLabel}
                  <slot name="label"></slot>
                  <tds-icon class="dropdown-icon" name="chevron_down" size="16px"></tds-icon>
                </Fragment>
              )}
            </button>
          </tds-side-menu-item>
          <div class="menu">
            {this.collapsed && (
              <h3 class="heading-collapsed">
                {this.buttonLabel}
                <slot name="label"></slot>
              </h3>
            )}
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
