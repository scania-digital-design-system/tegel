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
} from '@stencil/core';

@Component({
  tag: 'sdds-navigation-tabs',
  styleUrl: 'navigation-tabs.scss',
  shadow: true,
})
export class NavigationTabs {
  /** Variant of the tabs, primary= on white, secondary= on grey50 */
  @Prop() modeVariant: 'primary' | 'secondary' = 'primary';

  /** Sets the default selected tab. */
  @Prop() defaultSelectedIndex: number = 0;

  /** Sets the selected tab.
   * If this is set all tab changes needs to be handled by the user. */
  @Prop({ reflect: true }) selectedIndex: number;

  @Element() host: HTMLElement;

  @State() showLeftScroll: boolean = false;

  @State() showRightScroll: boolean = false;

  private navWrapperElement: HTMLElement = null; // reference to container with nav buttons

  private componentWidth: number = 0; // visible width of this component

  private buttonsWidth: number = 0; // total width of all nav items combined

  private scrollWidth: number = 0; // total amount that is possible to scroll in the nav wrapper

  private children: Array<HTMLSddsNavigationTabElement>;

  /** Sets the passed tabindex as the selected tab. */
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

  /** Event emitted when the selected tab is changed. */
  @Event({
    eventName: 'sddsChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  sddsChange: EventEmitter<{
    selectedTabIndex: number;
  }>;

  scrollRight() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll + this.buttonsWidth;

    this.evaluateScrollButtons();
  }

  scrollLeft() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll - this.buttonsWidth;

    this.evaluateScrollButtons();
  }

  evaluateScrollButtons() {
    const scroll = this.navWrapperElement.scrollLeft;

    if (scroll >= this.scrollWidth) {
      this.showRightScroll = false;
    } else {
      this.showRightScroll = true;
    }

    if (scroll <= 0) {
      this.showLeftScroll = false;
    } else {
      this.showLeftScroll = true;
    }
  }

  addResizeObserver = () => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const componentWidth = entry.contentRect.width;
        let buttonsWidth = 0;

        const navButtons = Array.from(this.host.children);
        navButtons.forEach((navButton: HTMLElement) => {
          const style = window.getComputedStyle(navButton);
          buttonsWidth +=
            navButton.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);

          navButton.classList.add('sdds-navigation-tabs-tab');
        });

        this.componentWidth = componentWidth;
        this.buttonsWidth = buttonsWidth;
        this.scrollWidth = buttonsWidth - componentWidth;

        if (this.buttonsWidth > this.componentWidth) {
          this.evaluateScrollButtons();
        } else {
          this.showLeftScroll = false;
          this.showRightScroll = false;
        }
      });
    });
    resizeObserver.observe(this.navWrapperElement);
  };

  addEventListenerToTabs = () => {
    this.children = Array.from(this.host.children) as Array<HTMLSddsNavigationTabElement>;
    this.children = this.children.map((item, index) => {
      item.addEventListener('click', () => {
        const sddsChangeEvent = this.sddsChange.emit({
          selectedTabIndex: this.children.indexOf(item),
        });
        if (!sddsChangeEvent.defaultPrevented) {
          if (!item.disabled) {
            this.children.forEach((element) => element.setSelected(false));
            item.setSelected(true);
            this.selectedIndex = index;
            this.sddsChange.emit({
              selectedTabIndex: this.selectedIndex,
            });
          }
        }
      });
      return item;
    });
  };

  connectedCallback() {
    this.children = Array.from(this.host.children) as Array<any>;
    this.children[0].classList.add('first');
    this.children[this.children.length - 1].classList.add('last');
  }

  componentDidLoad = () => {
    if (this.selectedIndex === undefined) {
      this.addEventListenerToTabs();
      this.children[this.defaultSelectedIndex].setSelected(true);
      this.selectedIndex = this.defaultSelectedIndex;
      this.sddsChange.emit({
        selectedTabIndex: this.selectedIndex,
      });
    } else {
      this.children[this.selectedIndex].setSelected(true);
      this.sddsChange.emit({
        selectedTabIndex: this.selectedIndex,
      });
    }
  };

  componentDidRender() {
    this.addResizeObserver();
  }

  render() {
    return (
      <Host
        role="list"
        class={`${this.modeVariant ? `sdds-mode-variant-${this.modeVariant}` : ''}`}
      >
        <div
          class="wrapper"
          ref={(el) => {
            this.navWrapperElement = el as HTMLElement;
          }}
        >
          <button
            class={`scroll-left-button ${this.showLeftScroll ? 'show' : ''}`}
            onClick={() => this.scrollLeft()}
            disabled={!this.showLeftScroll}
          >
            <tds-icon name="chevron_left" size="20px"></tds-icon>
          </button>
          <slot />
          <button
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
