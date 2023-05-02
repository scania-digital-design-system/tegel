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
} from '@stencil/core';

@Component({
  tag: 'sdds-folder-tabs',
  styleUrl: 'folder-tabs.scss',
  shadow: true,
})
export class InlineTabs {
  @Element() host: HTMLElement;

  /** Variant of the tabs, primary= on white, secondary= on grey50 */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Sets the default selected tab. */
  @Prop() defaultSelectedIndex: number = 0;

  /** Sets the selected tab.
   * If this is set all tab changes needs to be handled by the user. */
  @Prop({ reflect: true }) selectedIndex: number;

  @State() buttonWidth: number = 0;

  @State() showLeftScroll: boolean = false;

  @State() showRightScroll: boolean = false;

  private navWrapperElement: HTMLElement = null; // reference to container with nav buttons

  private componentWidth: number = 0; // visible width of this component

  private buttonsWidth: number = 0; // total width of all nav items combined

  private scrollWidth: number = 0; // total amount that is possible to scroll in the nav wrapper

  private children: Array<HTMLSddsFolderTabElement>;

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

  calculateButtonWidth() {
    this.children = this.children.map((tab: HTMLSddsFolderTabElement) => {
      if (tab.offsetWidth > this.buttonWidth) {
        this.buttonWidth = tab.offsetWidth;
      }
      return tab;
    });
    this.children.forEach((tab) => {
      tab.setTabWidth(this.buttonWidth);
    });
  }

  scrollRight() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll + this.buttonWidth;
    this.evaluateScrollButtons();
  }

  scrollLeft() {
    const scroll = this.navWrapperElement.scrollLeft;
    this.navWrapperElement.scrollLeft = scroll - this.buttonWidth;
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
      this.children = Array.from(this.host.children) as Array<HTMLSddsFolderTabElement>;
      this.children = this.children.map((item, index) => {
        item.addEventListener('click', () => {
          const sddsChangeEvent = this.sddsChange.emit({
            selectedTabIndex: this.children.indexOf(item)
          });

          if(!sddsChangeEvent.defaultPrevented) {
            if (!item.disabled) {
              this.children.forEach((element) => element.setSelected(false));
              item.setSelected(true);
              this.selectedIndex = index;
            }
          }
        });
        return item;
      });
    
  };

  connectedCallback() {
    this.children = Array.from(this.host.children) as Array<HTMLSddsFolderTabElement>;
    this.children[0].classList.add('first');
    this.children[this.children.length - 1].classList.add('last');
  }

  componentDidLoad() {
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
    this.calculateButtonWidth();
  }

  componentDidUpdate() {
    this.calculateButtonWidth();
  }

  componentDidRender() {
    if (this.buttonsWidth > this.componentWidth) {
      this.evaluateScrollButtons();
    } else {
      this.showLeftScroll = false;
      this.showRightScroll = false;
    }
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
            this.navWrapperElement = el as HTMLDivElement;
          }}
        >
          <button
            class={`scroll-left-button ${this.showLeftScroll ? 'show' : ''}`}
            disabled={!this.showLeftScroll}
            onClick={() => this.scrollLeft()}
          >
            <sdds-icon name="chevron_left" size="20px"></sdds-icon>
          </button>
          <slot></slot>
          <button
            class={`scroll-right-button ${this.showRightScroll ? 'show' : ''}`}
            disabled={!this.showRightScroll}
            onClick={() => this.scrollRight()}
          >
            <sdds-icon name="chevron_right" size="20px"></sdds-icon>
          </button>
        </div>
      </Host>
    );
  }
}
