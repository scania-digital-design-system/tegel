import { Component, Element, h, Host, Listen, State, Event, EventEmitter } from '@stencil/core';
import { CollapseEvent } from '../side-menu';

@Component({
  tag: 'sdds-side-menu-collapse-button',
  styleUrl: 'side-menu-collapse-button.scss',
  shadow: true,
})
export class SideMenuCollapseButton {
  @Element() host: HTMLElement;

  @State() collapsed: boolean = false;

  private sideMenuEl: HTMLSddsSideMenuElement;

  /** Event that is broadcasted when the collapse button is clicked.
   * Prevent it to disable automatic collapsing, and set the collapsed prop on the side menu yourself. */
  @Event({
    eventName: 'sddsCollapse',
    bubbles: false,
    cancelable: true,
    composed: true,
  })
  sddsCollapse: EventEmitter<CollapseEvent>;

  /** @internal Event that is broadcasted when the internal collapse state changes. Contains the future of the collapse state. */
  @Event({
    eventName: 'internalSddsCollapse',
    bubbles: true,
    cancelable: false,
    composed: true,
  })
  internalSddsCollapse: EventEmitter<CollapseEvent>;

  private handleClick = () => {
    /** Emit public event that the user can prevent. */
    const sddsCollapseEvent = this.sddsCollapse.emit({
      collapsed: !this.collapsed,
    });

    /** If the public event was not prevented. */
    if (!sddsCollapseEvent.defaultPrevented) {
      /** Emit internal event that is listened to by other side-menu components */
      this.collapsed = !this.collapsed;
      this.internalSddsCollapse.emit({
        collapsed: this.collapsed,
      });
    }
  };

  @Listen('internalSddsSideMenuPropChange', { target: 'body' })
  collapseSideMenuEventHandler(event: CustomEvent<CollapseEvent>) {
    this.collapsed = event.detail.collapsed;
  }

  connectedCallback() {
    this.sideMenuEl = this.host.closest('sdds-side-menu');
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
          <sdds-side-menu-item
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
          </sdds-side-menu-item>
        </div>
      </Host>
    );
  }
}
