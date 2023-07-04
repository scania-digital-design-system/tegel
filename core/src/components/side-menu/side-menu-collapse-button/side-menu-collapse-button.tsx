import { Component, Element, h, Host, Listen, State, Event, EventEmitter } from '@stencil/core';
import { CollapseEvent } from '../side-menu';

/**
 * @slot <default>  - <b>Unnamed slot.</b> Used for injecting text presented in collapse button
 * */

@Component({
  tag: 'tds-side-menu-collapse-button',
  styleUrl: 'side-menu-collapse-button.scss',
  shadow: true,
})
export class TdsSideMenuCollapseButton {
  @Element() host: HTMLElement;

  @State() collapsed: boolean = false;

  private sideMenuEl: HTMLTdsSideMenuElement;

  /** Event that is broadcast when the collapse button is clicked.
   * Prevent it from disabling automatic collapsing, and set the collapsed prop on the Side Menu yourself. */
  @Event({
    eventName: 'tdsCollapse',
    bubbles: false,
    cancelable: true,
    composed: true,
  })
  tdsCollapse: EventEmitter<CollapseEvent>;

  /** @internal Event that is broadcast when the internal collapse state changes. Contains the future of the collapse state. */
  @Event({
    eventName: 'internalTdsCollapse',
    bubbles: true,
    cancelable: false,
    composed: true,
  })
  internalTdsCollapse: EventEmitter<CollapseEvent>;

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

  connectedCallback() {
    this.sideMenuEl = this.host.closest('tds-side-menu');
    this.collapsed = this.sideMenuEl.collapsed;
  }

  render() {
    return (
      <Host
        role="button"
        tabindex="0"
        onClick={() => {
          this.handleClick();
        }}
      >
        <div
          class={{
            'wrapper': true,
            'state-collapsed': this.collapsed,
          }}
        >
          <tds-side-menu-item
            class={{
              button: true,
            }}
          >
            <a>
              <svg
                class="icon"
                slot="icon"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 1.975a1 1 0 0 1 1 1v20.3l9.311-9.312a1 1 0 0 1 1.415 1.414l-9.887 9.887a2.6 2.6 0 0 1-3.677 0l-9.887-9.887a1 1 0 1 1 1.414-1.414L15 23.274V2.975a1 1 0 0 1 1-1ZM5.188 28.001a1 1 0 0 0 0 2h21.62a1 1 0 1 0 0-2H5.188Z"
                  fill="currentColor"
                />
              </svg>
              <slot></slot>
            </a>
          </tds-side-menu-item>
        </div>
      </Host>
    );
  }
}
