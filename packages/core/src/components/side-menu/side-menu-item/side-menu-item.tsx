import { Component, h, Host, Element, Listen, Prop, State } from '@stencil/core';
import { CollapseEvent } from '../side-menu';
import dfs from '../../../utils/dfs';

/**
 * @slot <default> - <b>Unnamed slot.</b> For injecting a native <code>&lt;button</code> and <code>&lt;a></code> element.
 * */
@Component({
  tag: 'tds-side-menu-item',
  styleUrl: 'side-menu-item.scss',
  shadow: true,
})
export class TdsSideMenuItem {
  @Element() host!: HTMLTdsSideMenuItemElement;

  /** If the item should appear selected. */
  @Prop() selected: boolean = false;

  /** If the item should appear active. Can be used when the item is
   * triggering a dropdown, and the dropdown is open, for example. */
  @Prop() active: boolean = false;

  @State() collapsed: boolean = false;

  @State() hasUserComponent: boolean = false;

  private sideMenuEl!: HTMLTdsSideMenuElement | null;

  private slotEl!: HTMLSlotElement | null;

  findSlottedAndExecute(
    searchPredicate: (element: HTMLElement) => boolean,
    callback: (element: HTMLElement) => void,
  ) {
    const assignedElements = this.slotEl?.assignedElements({ flatten: true });
    if (!assignedElements?.length) return;

    const firstSlottedElement = assignedElements[0] as HTMLElement;
    if (firstSlottedElement) {
      const foundElement = dfs(firstSlottedElement, searchPredicate);
      if (foundElement) {
        callback(foundElement);
      }
    }
  }

  /**
   * This function is needed because we can't use CSS selectors to style something in the light dom
   */
  updateSlottedElements() {
    if (this.slotEl) {
      const isIconOrSvg = (element: HTMLElement) =>
        element.tagName.toLowerCase() === 'tds-icon' || element.tagName.toLowerCase() === 'svg';

      const addIconClass = (element: HTMLElement) => {
        element.classList.add('__tds-side-menu-item-icon');
        if (this.collapsed) {
          element.classList.add('__tds-side-menu-item-icon-collapsed');
        } else {
          element.classList.remove('__tds-side-menu-item-icon-collapsed');
        }
      };
      this.findSlottedAndExecute(isIconOrSvg, addIconClass);
    }
  }

  updateHasUserComponent() {
    if (this.slotEl) {
      const isUserComponent = (element: HTMLElement) =>
        element.tagName.toLowerCase() === 'tds-side-menu-user';

      this.hasUserComponent = false;
      this.findSlottedAndExecute(isUserComponent, () => {
        this.hasUserComponent = true;
      });
    }
  }

  connectedCallback() {
    // closest() will return null if side-menu-item is inside a shadowRoot that
    // does not contain a side-menu. This is the case for the side-menu-dropdown.
    this.sideMenuEl = this.host.closest('tds-side-menu');
    this.collapsed = !!this.sideMenuEl?.collapsed;
  }

  componentDidLoad() {
    this.slotEl = this.host.shadowRoot?.querySelector('slot') ?? null;
    this.updateSlottedElements();
    this.updateHasUserComponent();

    if (this.slotEl) {
      this.slotEl.addEventListener('slotchange', () => {
        this.updateSlottedElements();
        this.updateHasUserComponent();
      });
    }
  }

  @Listen('internalTdsSideMenuPropChange', { target: 'body' })
  collapseSideMenuEventHandler(event: CustomEvent<CollapseEvent>) {
    this.collapsed = event.detail.collapsed;
    this.updateSlottedElements();
    this.updateHasUserComponent();
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'component': true,
            'component-selected': this.selected,
            'component-active': this.active,
            'component-collapsed': this.collapsed,
            'component-has-user': this.hasUserComponent,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
