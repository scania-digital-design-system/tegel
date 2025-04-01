import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';

export type CollapseEvent = {
  collapsed: boolean;
};

type Props = {
  collapsed: boolean;
};

export type InternalTdsSideMenuPropChange = {
  changed: Array<keyof Props>;
} & Partial<Props>;

const GRID_LG_BREAKPOINT: number = 992;
/**
 * @slot overlay - Used of injection of tds-side-menu-overlay
 * @slot close-button - Used for injection of tds-side-menu-close-button that is show when in mobile view
 * @slot <default> - <b>Unnamed slot.</b> For primary content of the side menu - like buttons.
 * Used for nesting main content of Side Menu, e.g. <code><tds-side-menu-item></code> and <code><tds-side-menu-dropdown></code> components
 * @slot end - Used for items that are presented at the bottom of the Side Menu, e.g. profile settings
 * @slot sticky-end - Used for tds-side-menu-collapse-button component
 * */

@Component({
  tag: 'tds-side-menu',
  styleUrl: 'side-menu.scss',
  shadow: true,
})
export class TdsSideMenu {
  @Element() host: HTMLTdsSideMenuElement;

  /** Applicable only for mobile. If the Side Menu is open or not. */
  @Prop({ mutable: true }) open: boolean = false;

  /** Applicable only for desktop. If the Side Menu should always be shown. */
  @Prop() persistent: boolean = false;

  /** If the Side Menu is collapsed. Only a persistent desktop menu can be collapsed.
   * NOTE: Only use this if you have prevented the automatic collapsing with preventDefault on the tdsCollapse event. */
  @Prop({ mutable: true }) collapsed: boolean = false;

  @State() isUpperSlotEmpty: boolean = false;

  @State() isCollapsed: boolean = false;

  /* To preserved initial state of collapsed prop as it is changed in runtime */
  @State() initialCollapsedState: boolean = false;

  private matchesLgBreakpointMq: MediaQueryList;

  handleMatchesLgBreakpointChange: (e: MediaQueryListEvent) => void = (e) => {
    const isBelowLg = !e.matches;
    if (isBelowLg) {
      this.collapsed = false;
    } else {
      this.collapsed = this.initialCollapsedState;
    }
  };

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open) {
      this.open = false;
    }
  }

  connectedCallback() {
    this.matchesLgBreakpointMq = window.matchMedia(`(min-width: ${GRID_LG_BREAKPOINT}px)`);
    this.matchesLgBreakpointMq.addEventListener('change', this.handleMatchesLgBreakpointChange);
    this.isCollapsed = this.collapsed;
    this.initialCollapsedState = this.collapsed;
  }

  componentDidLoad() {
    const upperSlot = this.host.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
    const upperSlotElements = upperSlot.assignedElements();
    const hasUpperSlotElements = upperSlotElements?.length > 0;

    if (!hasUpperSlotElements) {
      this.isUpperSlotEmpty = true;
    }
    if (window.innerWidth < GRID_LG_BREAKPOINT) {
      this.collapsed = false;
    }
  }

  disconnectedCallback() {
    this.matchesLgBreakpointMq.removeEventListener('change', this.handleMatchesLgBreakpointChange);
  }

  @Watch('collapsed')
  onCollapsedChange(newVal: boolean) {
    /** Emits the internal collapse event when the prop has changed. */
    this.internalTdsSideMenuPropChange.emit({
      changed: ['collapsed'],
      collapsed: newVal,
    });

    this.isCollapsed = newVal;
  }

  @Watch('open')
  onOpenChange(newVal: boolean) {
    if (newVal) {
      // When menu opens, focus the first interactive element
      setTimeout(() => {
        const firstInteractiveElement =
          this.host.shadowRoot.querySelector('a, button, [tabindex="0"]') ||
          this.host.querySelector('a, button, [tabindex="0"]');

        if (firstInteractiveElement instanceof HTMLElement) {
          firstInteractiveElement.focus();
        }
      }, 100);
    }
  }

  /** Event that is emitted when the Side Menu is collapsed. */
  @Event({
    eventName: 'tdsCollapse',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  tdsCollapse: EventEmitter<CollapseEvent>;

  /** @internal Broadcasts collapsed state to child components. */
  @Event({
    eventName: 'internalTdsCollapse',
    bubbles: true,
    cancelable: false,
    composed: true,
  })
  internalTdsCollapse: EventEmitter<CollapseEvent>;

  /** @internal Broadcasts collapsed state to child components. */
  @Event({
    eventName: 'internalTdsSideMenuPropChange',
    bubbles: true,
    cancelable: false,
    composed: true,
  })
  internalTdsSideMenuPropChange: EventEmitter<InternalTdsSideMenuPropChange>;

  @Listen('internalTdsCollapse', { target: 'body' })
  collapsedSideMenuEventHandler(event: CustomEvent<CollapseEvent>) {
    this.collapsed = event.detail.collapsed;
  }

  render() {
    return (
      <Host
        class={{
          'menu-opened': this.open,
          'menu-persistent': this.persistent,
          'menu-collapsed': this.collapsed,
        }}
        aria-expanded={this.open ? 'true' : 'false'}
      >
        <div
          class={{
            'wrapper': true,
            'state-upper-slot-empty': this.isUpperSlotEmpty,
            'state-open': this.open,
            'state-closed': !this.open,
          }}
        >
          <slot name="overlay"></slot>
          <aside class={`menu`}>
            <div role="navigation">
              <slot name="close-button"></slot>
              <div class="tds-side-menu-wrapper">
                <ul class={`tds-side-menu-list tds-side-menu-list-upper`}>
                  <li>
                    <slot></slot>
                  </li>
                </ul>
                <ul class={`tds-side-menu-list tds-side-menu-list-end`}>
                  <li>
                    <slot name="end"></slot>
                  </li>
                </ul>
              </div>
              <slot name="sticky-end"></slot>
            </div>
          </aside>
        </div>
      </Host>
    );
  }
}
