import {
  Component,
  Host,
  State,
  Element,
  h,
  Prop,
  Event,
  EventEmitter,
  Method,
  Watch,
} from '@stencil/core';

/**
 * @slot <default> - <b>Unnamed slot.</b> For the tab elements.
 */
@Component({
  tag: 'tds-navigation-tabs',
  styleUrl: 'navigation-tabs.scss',
  shadow: true,
})
export class TdsNavigationTabs {
  @Element() host: HTMLElement;

  /** Variant of the Tabs, primary= on white, secondary= on grey50 */
  @Prop() modeVariant: 'primary' | 'secondary' = 'primary';

  /** Sets the default selected Tab. */
  @Prop() defaultSelectedIndex: number = 0;

  /** Sets the selected Tab.
   * If this is set, all Tab changes need to be handled by the user. */
  @Prop({ reflect: true }) selectedIndex: number;

  /** Custom left padding value for the wrapper element. */
  @Prop({ reflect: true }) leftPadding: number = 32;

  /** Defines aria-label on left scroll button */
  @Prop() tdsScrollLeftAriaLabel: string = 'Scroll left';

  /** Defines aria-label on right scroll button */
  @Prop() tdsScrollRightAriaLabel: string = 'Scroll right';

  @State() showLeftScroll: boolean = false;

  @State() showRightScroll: boolean = false;

  private navWrapperElement: HTMLElement = null; // reference to container with nav buttons

  private componentWidth: number = 0; // visible width of this component

  private buttonsWidth: number = 0; // total width of all nav items combined

  private scrollWidth: number = 0; // total amount that is possible to scroll in the nav wrapper

  private children: Array<HTMLTdsNavigationTabElement>;

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
  async selectTab(tabIndex: number) {
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
    return {
      selectedTabIndex: this.selectedIndex,
    };
  }

  /** Reinitializes the component. */
  @Method()
  async reinitialize(): Promise<void> {
    this.handleSlotChange();
  }

  @Watch('selectedIndex')
  handleSelectedIndexUpdate() {
    this.children = Array.from(this.host.children).map(
      (tabElement: HTMLTdsNavigationTabElement) => {
        tabElement.setSelected(false);
        return tabElement;
      },
    );
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
    this.children = Array.from(this.host.children) as Array<HTMLTdsNavigationTabElement>;
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
    this.children = Array.from(this.host.children) as Array<HTMLTdsNavigationTabElement>;
    // remove first and last class from other tabs in case of initialization
    this.children.forEach((child) => {
      child.classList.remove('last');
      child.classList.remove('first');
    });

    if (this.children.length > 0) {
      this.children[0].classList.add('first');
      this.children[this.children.length - 1].classList.add('last');
    }
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

  private applyCustomLeftPadding(): void {
    if (this.navWrapperElement) {
      this.navWrapperElement.style.paddingLeft = `${this.leftPadding}px`;
    }
  }

  private handleSlotChange(): void {
    this.initializeTabs();
    this.addEventListenerToTabs();
    this.initializeSelectedTab();
    this.updateScrollButtons();
    this.addResizeObserver();
    this.applyCustomLeftPadding(); // Apply custom left padding to the wrapper
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
      <Host
        role="tablist"
        class={{ [`tds-mode-variant-${this.modeVariant}`]: this.modeVariant !== null }}
      >
        <div
          class="wrapper"
          ref={(el) => {
            this.navWrapperElement = el as HTMLElement;
          }}
          style={{ paddingLeft: `${this.leftPadding}px` }} // Set left padding directly here
        >
          <button
            aria-label={this.tdsScrollLeftAriaLabel}
            class={{
              'scroll-left-button': true,
              'show': this.showLeftScroll,
            }}
            onClick={() => this.scrollLeft()}
            disabled={!this.showLeftScroll}
          >
            <tds-icon name="chevron_left" size="20px"></tds-icon>
          </button>
          <slot onSlotchange={() => this.handleSlotChange()} />
          <button
            aria-label={this.tdsScrollRightAriaLabel}
            class={{
              'scroll-right-button': true,
              'show': this.showRightScroll,
            }}
            onClick={() => this.scrollRight()}
            disabled={!this.showRightScroll}
          >
            <tds-icon name="chevron_right" size="20px"></tds-icon>
          </button>
        </div>
      </Host>
    );
  }
}
