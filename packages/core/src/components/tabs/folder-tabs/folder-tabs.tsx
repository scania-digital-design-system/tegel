import {
  Component,
  Host,
  State,
  Element,
  Prop,
  h,
  Event,
  EventEmitter,
  Method,
  Watch,
} from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the tab elements.
 */
@Component({
  tag: 'tds-folder-tabs',
  styleUrl: 'folder-tabs.scss',
  shadow: true,
})
export class TdsFolderTabs {
  @Element() host: HTMLElement;

  /** Variant of the Tabs, primary= on white, secondary= on grey50 */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Sets the default selected Tab. */
  @Prop() defaultSelectedIndex: number = 0;

  /** Sets the selected Tab.
   * If this is set, all Tab changes need to be handled by the user. */
  @Prop({ reflect: true }) selectedIndex: number;

  @State() buttonWidth: number = 0;

  @State() showLeftScroll: boolean = false;

  @State() showRightScroll: boolean = false;

  private navWrapperElement: HTMLElement = null; // reference to container with nav buttons

  private componentWidth: number = 0; // visible width of this component

  private buttonsWidth: number = 0; // total width of all nav items combined

  private scrollWidth: number = 0; // total amount that is possible to scroll in the nav wrapper

  private children: Array<HTMLTdsFolderTabElement>;

  private clickHandlers = new WeakMap<HTMLElement, EventListener>();

  /** Event emitted when the selected Tab is changed. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsChange: EventEmitter<{
    selectedTabIndex: number;
  }>;

  /** Sets the passed tabindex as the selected Tab. */
  @Method()
  async selectTab(tabIndex: number): Promise<{ selectedTabIndex: number }> {
    if (tabIndex < 0 || tabIndex >= this.children.length) {
      throw new Error('Tab index out of bounds');
    }

    if (!this.children[tabIndex].disabled) {
      this.children.forEach((element) => element.setSelected(false));
      this.children = this.children.map((element, index) => {
        if (index === tabIndex) {
          element.setSelected(true);
          this.selectedIndex = tabIndex;
        }
        return element;
      });
    }
    return { selectedTabIndex: this.selectedIndex };
  }

  /** Reinitializes the component. */
  @Method()
  async reinitialize(): Promise<void> {
    this.handleSlotChange();
  }

  @Watch('selectedIndex')
  handleSelectedIndexUpdate(): void {
    this.children = Array.from(this.host.children).map((tabElement: HTMLTdsFolderTabElement) => {
      tabElement.setSelected(false);
      return tabElement;
    });
    this.children[this.selectedIndex].setSelected(true);
  }

  private scrollRight(): void {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll + this.buttonsWidth;
    this.evaluateScrollButtons();
  }

  private scrollLeft(): void {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll - this.buttonsWidth;
    this.evaluateScrollButtons();
  }

  private evaluateScrollButtons(): void {
    const scroll = this.navWrapperElement.scrollLeft;

    this.showRightScroll = scroll <= this.scrollWidth;
    this.showLeftScroll = scroll > 0;
  }

  private addResizeObserver = (): void => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const componentWidth = entry.contentRect.width;
        let buttonsWidth = 0;

        const navButtons = Array.from(this.host.children);
        navButtons.forEach((navButton: HTMLElement) => {
          const style = window.getComputedStyle(navButton);
          buttonsWidth +=
            navButton.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        });

        this.componentWidth = componentWidth;
        this.buttonsWidth = buttonsWidth;
        this.scrollWidth = buttonsWidth - componentWidth;

        this.updateScrollButtons();
      });
    });

    resizeObserver.observe(this.navWrapperElement);
  };

  private addEventListenerToTabs = (): void => {
    this.children = Array.from(this.host.children) as Array<HTMLTdsFolderTabElement>;
    this.children.map((item, index) => {
      const clickHandler = () => {
        if (!item.disabled) {
          const tdsChangeEvent = this.tdsChange.emit({
            selectedTabIndex: this.children.indexOf(item),
          });
          if (!tdsChangeEvent.defaultPrevented) {
            this.children.forEach((element) => element.setSelected(false));
            item.setSelected(true);
            this.selectedIndex = index;
          }
        }
      };
      item.addEventListener('click', clickHandler);
      this.clickHandlers.set(item, clickHandler); // Store the handler in WeakMap
      return item;
    });
  };

  private removeEventListenerFromTabs = (): void => {
    this.children.forEach((item) => {
      const clickHandler = this.clickHandlers.get(item);
      if (clickHandler) {
        item.removeEventListener('click', clickHandler);
        this.clickHandlers.delete(item);
      }
    });
  };

  private initializeTabs(): void {
    this.children = Array.from(this.host.children) as Array<HTMLTdsFolderTabElement>;
    // remove first and last class from other tabs in case of initialization
    this.children.forEach((child) => {
      child.classList.remove('last');
      child.classList.remove('first');
    });
    this.children[0].classList.add('first');
    this.children[this.children.length - 1].classList.add('last');
  }

  private initializeSelectedTab(): void {
    if (this.selectedIndex === undefined) {
      this.addEventListenerToTabs();
      this.children[this.defaultSelectedIndex].setSelected(true);
      this.selectedIndex = this.defaultSelectedIndex;
    } else {
      this.children[this.selectedIndex].setSelected(true);
    }
    this.tdsChange.emit({
      selectedTabIndex: this.selectedIndex,
    });
  }

  private updateScrollButtons(): void {
    if (this.buttonsWidth > this.componentWidth) {
      this.evaluateScrollButtons();
    } else {
      this.showLeftScroll = false;
      this.showRightScroll = false;
    }
  }

  private handleSlotChange(): void {
    this.initializeTabs();
    this.addEventListenerToTabs();
    this.initializeSelectedTab();
    this.updateScrollButtons();
    this.addResizeObserver();
  }

  connectedCallback(): void {
    this.initializeTabs();
  }

  componentDidLoad(): void {
    this.initializeSelectedTab();
  }

  componentDidRender(): void {
    this.updateScrollButtons();
    this.addResizeObserver();
  }

  disconnectedCallback(): void {
    this.removeEventListenerFromTabs();
  }

  render() {
    return (
      <Host role="list" class={`${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}`}>
        <div
          class="wrapper"
          ref={(el) => {
            this.navWrapperElement = el as HTMLDivElement;
          }}
        >
          <button
            class={`scroll-left-button ${this.showLeftScroll ? 'show' : ''}`}
            disabled={!this.showLeftScroll}
            onClick={() => this.scrollLeft()}
          >
            <tds-icon name="chevron_left" size="20px"></tds-icon>
          </button>
          <slot onSlotchange={() => this.handleSlotChange()} />
          <button
            class={`scroll-right-button ${this.showRightScroll ? 'show' : ''}`}
            disabled={!this.showRightScroll}
            onClick={() => this.scrollRight()}
          >
            <tds-icon name="chevron_right" size="20px"></tds-icon>
          </button>
        </div>
      </Host>
    );
  }
}
