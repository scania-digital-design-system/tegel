import { Component, Element, h, Host, Listen, State, Event, EventEmitter } from '@stencil/core';
import { CollapseEvent } from '../side-menu';

/**
 * @slot <default>  - <b>Unnamed slot.</b> For the text label of the button.
 * */

@Component({
  tag: 'tds-side-menu-collapse-button',
  styleUrl: 'side-menu-collapse-button.scss',
  shadow: true,
})
export class TdsSideMenuCollapseButton {
  @Element() host!: HTMLElement;

  @State() collapsed: boolean = false;

  private sideMenuEl!: HTMLTdsSideMenuElement | null;

  /** Event that is broadcast when the collapse button is clicked.
   * Prevent it from disabling automatic collapsing, and set the collapsed prop on the Side Menu yourself. */
  @Event({
    eventName: 'tdsCollapse',
    bubbles: false,
    cancelable: true,
    composed: true,
  })
  tdsCollapse!: EventEmitter<CollapseEvent>;

  /** @internal Event that is broadcast when the internal collapse state changes. Contains the future of the collapse state. */
  @Event({
    eventName: 'internalTdsCollapse',
    bubbles: true,
    cancelable: false,
    composed: true,
  })
  internalTdsCollapse!: EventEmitter<CollapseEvent>;

  private handleClick = () => {
    /** Emit a public event that the user can prevent. */
    const tdsCollapseEvent = this.tdsCollapse.emit({
      collapsed: !this.collapsed,
    });

    /** If the public event was not prevented. */
    if (!tdsCollapseEvent.defaultPrevented) {
      /** Emit internal event that is listened to by other side-menu components */
      this.collapsed = !this.collapsed;
      this.internalTdsCollapse.emit({
        collapsed: this.collapsed,
      });
    }
  };

  @Listen('internalTdsSideMenuPropChange', { target: 'body' })
  collapseSideMenuEventHandler(event: CustomEvent<CollapseEvent>) {
    this.collapsed = event.detail.collapsed;
  }

  componentWillLoad() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
    this.collapsed = !!this.sideMenuEl?.collapsed;
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'wrapper': true,
            'state-collapsed': this.collapsed,
          }}
        >
          <tds-side-menu-item class={{ button: true }}>
            <button
              type="button"
              aria-expanded={!this.collapsed ? 'true' : 'false'}
              onClick={() => {
                this.handleClick();
              }}
            >
              <tds-icon
                class="icon"
                slot="icon"
                size="20px"
                name="arrow_left"
                svgTitle="arrow to open or close side menu"
              />
              {!this.collapsed && <slot></slot>}
            </button>
          </tds-side-menu-item>
        </div>
      </Host>
    );
  }
}
