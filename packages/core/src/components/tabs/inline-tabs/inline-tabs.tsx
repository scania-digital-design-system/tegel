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
  tag: 'tds-inline-tabs',
  styleUrl: 'inline-tabs.scss',
  shadow: true,
})
export class TdsInlineTabs {
  @Element() host!: HTMLElement;

  /** Variant of the Tabs, primary= on white, secondary= on grey50 */
  @Prop() modeVariant: 'primary' | 'secondary' = 'primary';

  /** Sets the default selected Tab. */
  @Prop() defaultSelectedIndex: number = 0;

  /** Sets the selected Tab.
   * If this is set, all Tab changes need to be handled by the user. */
  @Prop({ reflect: true }) selectedIndex?: number;

  /** Defines aria-label on left scroll button */
  @Prop() tdsScrollLeftAriaLabel: string = 'Scroll left';

  /** Defines aria-label on right scroll button */
  @Prop() tdsScrollRightAriaLabel: string = 'Scroll right';

  /** Custom left padding value for the wrapper element. */
  @Prop({ reflect: true }) leftPadding: number = 32;

  @State() showLeftScroll: boolean = false;

  @State() showRightScroll: boolean = false;

  private navWrapperElement: HTMLElement | null = null; // reference to container with nav buttons

  private componentWidth: number = 0; // visible width of this component

  private buttonsWidth: number = 0; // total width of all nav items combined

  private scrollableWidth: number = 0; // total amount that is possible to scroll in the nav wrapper

  private tabElements: Array<HTMLTdsInlineTabElement> = [];

  private clickHandlers = new WeakMap<HTMLElement, EventListener>();

  /** Event emitted when the selected Tab is changed. */
  @Event({
    eventName: 'tdsChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  tdsChange!: EventEmitter<{
    selectedTabIndex: number;
  }>;

  /** Selects a Tab based on tabindex, will not select a disabled Tab. */
  @Method()
  async selectTab(tabIndex: number): Promise<{ selectedTabIndex: number | undefined }> {
    if (tabIndex < 0 || tabIndex >= this.tabElements.length) {
      throw new Error('Tab index out of bounds');
    }

    this.tabElements = Array.from(this.host.children) as Array<HTMLTdsInlineTabElement>;

    if (!this.tabElements[tabIndex].disabled) {
      this.tabElements.forEach((element) => element.setSelected(false));
      this.tabElements = this.tabElements.map((element, index) => {
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
    this.tabElements = Array.from(this.host.children).map((tabElement: HTMLTdsInlineTabElement) => {
      tabElement.setSelected(false);
      return tabElement;
    });

    if (this.selectedIndex) {
      this.tabElements[this.selectedIndex].setSelected(true);
    }
  }

  private scrollRight(): void {
    if (!this.navWrapperElement) return;

    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll + this.buttonsWidth;
    this.evaluateScrollButtons();
  }

  private scrollLeft(): void {
    if (!this.navWrapperElement) return;

    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll - this.buttonsWidth;
    this.evaluateScrollButtons();
  }

  private evaluateScrollButtons(): void {
    if (!this.navWrapperElement) return;

    const scroll = this.navWrapperElement.scrollLeft;
    this.showRightScroll = scroll <= this.scrollableWidth;
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
        this.scrollableWidth = buttonsWidth - componentWidth;

        this.updateScrollButtons();
      });
    });

    if (this.navWrapperElement) resizeObserver.observe(this.navWrapperElement);
  };

  private addEventListenerToTabs = (): void => {
    this.tabElements = Array.from(this.host.children) as Array<HTMLTdsInlineTabElement>;
    this.tabElements.map((item, index) => {
      const clickHandler = () => {
        if (!item.disabled) {
          const tdsChangeEvent = this.tdsChange.emit({
            selectedTabIndex: this.tabElements.indexOf(item),
          });
          if (!tdsChangeEvent.defaultPrevented) {
            this.tabElements.forEach((element) => element.setSelected(false));
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
    this.tabElements.forEach((item) => {
      const clickHandler = this.clickHandlers.get(item);
      if (clickHandler) {
        item.removeEventListener('click', clickHandler);
        this.clickHandlers.delete(item);
      }
    });
  };

  private initializeTabs(): void {
    this.tabElements = Array.from(this.host.children) as Array<HTMLTdsInlineTabElement>;
    // remove first and last class from other tabs in case of initialization
    this.tabElements.forEach((child) => {
      child.classList.remove('last');
      child.classList.remove('first');
    });
    this.tabElements[0].classList.add('first');
    this.tabElements[this.tabElements.length - 1].classList.add('last');
  }

  private initializeSelectedTab(): void {
    if (this.selectedIndex === undefined) {
      this.addEventListenerToTabs();
      this.tabElements[this.defaultSelectedIndex].setSelected(true);
      this.selectedIndex = this.defaultSelectedIndex;
    } else {
      this.tabElements[this.selectedIndex].setSelected(true);
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
        class={`${this.modeVariant ? `tds-mode-variant-${this.modeVariant}` : ''}`}
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
            class={`scroll-left-button ${this.showLeftScroll ? 'show' : ''}`}
            onClick={() => this.scrollLeft()}
            disabled={!this.showLeftScroll}
          >
            <tds-icon name="chevron_left" size="20px"></tds-icon>
          </button>
          <slot onSlotchange={() => this.handleSlotChange()} />
          <button
            aria-label={this.tdsScrollRightAriaLabel}
            class={`scroll-right-button ${this.showRightScroll ? 'show' : ''}`}
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
