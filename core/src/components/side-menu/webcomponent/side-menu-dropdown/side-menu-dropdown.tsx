import { Component, Element, Fragment, h, Host, Listen, Prop, State } from '@stencil/core';
import { CollapseEvent } from '../side-menu';

@Component({
  tag: 'sdds-side-menu-dropdown',
  styleUrl: 'side-menu-dropdown.scss',
  shadow: true,
})
export class SideMenuDropdown {
  @Element() host: HTMLElement;

  /** If the dropdown should be open from the start. */
  @Prop() defaultOpen: boolean = false;

  /** The label of the button that opens the dropdown.
   * This is an alternative to the button-label slot. */
  @Prop() buttonLabel: string;

  /** If the button that opens the dropdown should appear selected. */
  @Prop() selected: boolean = false;

  @State() open: boolean = false;

  @State() hoverState: { isHovered: boolean; updatedAt: number };

  @State() collapsed: boolean = false;

  private sideMenuEl: HTMLSddsSideMenuElement;

  @Listen('internalSddsSideMenuPropChange', { target: 'body' })
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
    this.sideMenuEl = this.host.closest('sdds-side-menu');
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
          <sdds-side-menu-item
            class="button"
            active={this.getIsOpenState()}
            selected={this.selected}
            onClick={() => {
              this.open = !this.open;
            }}
          >
            <button>
              <slot name="button-icon"></slot>
              {!this.collapsed && (
                <Fragment>
                  {this.buttonLabel}
                  <slot name="button-label"></slot>
                  <sdds-icon class="dropdown-icon" name="chevron_down" size="16px"></sdds-icon>
                </Fragment>
              )}
            </button>
          </sdds-side-menu-item>
          <div class="menu">
            {this.collapsed && (
              <h3 class="heading-collapsed">
                {this.buttonLabel}
                <slot name="button-label"></slot>
              </h3>
            )}
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
