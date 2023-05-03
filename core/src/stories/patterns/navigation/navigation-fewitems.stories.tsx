import { formatHtmlPreview } from "../../../utils/utils";
import readme from "./readme.md";

export default {
  title: "Patterns/Navigation",
  parameters: {
    notes: {
      Readme: readme,
    },
    layout: "fullscreen",
    docs: {
      source: {
        state: "closed",
      },
    },
    design: [
      {
        name: "Figma",
        type: "figma",
        url: "https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1",
      },
      {
        name: "Link",
        type: "link",
        url: "https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1",
      },
    ],
  },
  argTypes: {},
  args: {},
};

const Template = () =>
  formatHtmlPreview(
    `
    <script>
      /* For demonstration purposes only. Do this in the preferred way of your framework instead. */
      window.demoSideMenu = document.querySelector('#demo-side-menu');
      window.demoHamburger = document.querySelector('#demo-hamburger');
    </script>
    <style>

      /* Note: to make the layout fill the entire viewport height you'll need to set the */
      /* height of the parent element and all of its ancestors to 100%. */
      /* Please note that using 'vh' for this can cause issues on some mobile browsers. */
      .demo-layout {
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }

      .demo-main {
        flex-grow: 1;
      }
    
      /* If an extra button in the header is required except on 
      very narrow screens, you can use classes like these: */
      .demo-hide {
        display: none;
      }

      @media (min-width: 375px) {
        .demo-xs-hide {
          display: none;
        }
        .demo-xs-show {
          display: block;
        }
      }
      @media (min-width: 992px) {
        .demo-lg-show {
          display: block;
        }
      }
    </style>


    <div class="demo-layout">
      <sdds-header>
        <!-- TODO setting aria-expanded="true" on the hamburger button does not work, as it is not
          copied to the button element -->
        <sdds-header-hamburger id="demo-hamburger" onclick="demoSideMenu.open = true;demoHamburger.setAttribute('aria-expanded', true);" aria-label="Open application drawer" aria-haspopup="true" aria-expanded="false"></sdds-header-hamburger>

        <sdds-header-title>
          Example: Few items
        </sdds-header-title>

        <sdds-header-item selected>
          <button onclick="alert('About us clicked');">
            About us
          </button>
        </sdds-header-item>

        <sdds-header-item>
          <a href="https://www.google.se">
            Truck types
          </a>
        </sdds-header-item>

        <sdds-header-dropdown>
          <span slot="button-label">Wheel types</span>
          <sdds-header-dropdown-list>
            <sdds-header-dropdown-list-item>
              <a href="https://tegel.scania.com">Hub-centric wheel</a>
            </sdds-header-dropdown-list-item>
            <sdds-header-dropdown-list-item>
              <a href="https://tegel.scania.com">Rim wheel</a>
            </sdds-header-dropdown-list-item>
          </sdds-header-dropdown-list>
        </sdds-header-dropdown>

        <sdds-header-item slot="end">
          <button onclick="alert('Calendar button clicked')">
            <sdds-icon name="calendar" size="20px"></sdds-icon>
          </button>
        </sdds-header-item>

        <sdds-header-launcher slot="end" aria-label="Application launcher">
          <sdds-header-launcher-grid-title>Operations and Logistics</sdds-header-launcher-grid-title>
          <sdds-header-launcher-grid>
            <sdds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <sdds-icon name="star" size="32"></sdds-icon>
                ScaniaCare
              </a>
            </sdds-header-launcher-grid-item>
            <sdds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <sdds-icon name="truck" size="32"></sdds-icon>
                ScaniaInsight
              </a>
            </sdds-header-launcher-grid-item>
            <sdds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <sdds-icon name="fuel_gauge" size="32"></sdds-icon>
                ScaniaConnect
              </a>
            </sdds-header-launcher-grid-item>
            <sdds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <sdds-icon name="star" size="32"></sdds-icon>
                ScaniaPlan
              </a>
            </sdds-header-launcher-grid-item>
            <sdds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <sdds-icon name="truck" size="32"></sdds-icon>
                ScaniaTrack
              </a>
            </sdds-header-launcher-grid-item>
          </sdds-header-launcher-grid>
          <sdds-header-launcher-grid-title>Customer Service</sdds-header-launcher-grid-title>
          <sdds-header-launcher-grid>
            <sdds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <sdds-icon name="star" size="32"></sdds-icon>
                ScaniaNet
              </a>
            </sdds-header-launcher-grid-item>
            <sdds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <sdds-icon name="truck" size="32"></sdds-icon>
                ScaniaRisk
              </a>
            </sdds-header-launcher-grid-item>
          </sdds-header-launcher-grid>

        </sdds-header-launcher>

        <sdds-header-dropdown slot="end" placement="end" no-dropdown-icon class="demo-hide demo-lg-show" selected>
          <img slot="button-icon" src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" alt="User menu."/>
          <sdds-header-dropdown-list type="lg">
            <sdds-header-dropdown-list-user
              heading="Name Nameson"
              subheading="Company name">
            </sdds-header-dropdown-list-user>
            <sdds-header-dropdown-list-item selected>
              <a href="https://www.scania.com">My Instructions</a>
            </sdds-header-dropdown-list-item>
            <sdds-header-dropdown-list-item>
              <a href="https://www.scania.com">Task List</a>
            </sdds-header-dropdown-list-item>
          </sdds-header-dropdown-list>
        </sdds-header-dropdown>

        <sdds-header-brand-symbol slot="end" href="https://design.scania.com" aria-label="Scania - red gryphon on blue shield">
        </sdds-header-brand-symbol>

      </sdds-header>


      <sdds-side-menu id="demo-side-menu" aria-label="Side menu">
        <sdds-side-menu-overlay slot="overlay" onclick="demoSideMenu.open = false;demoHamburger.setAttribute('aria-expanded', false);"></sdds-side-menu-overlay>

        <sdds-side-menu-close-button slot="close-button" onclick="demoSideMenu.open = false;demoHamburger.setAttribute('aria-expanded', false);"></sdds-side-menu-close-button>

        <sdds-side-menu-item>
          <button>
            <sdds-icon name="info" size="24"></sdds-icon>
            About
          </button>
        </sdds-side-menu-item>

        <sdds-side-menu-item>
          <a href="https://www.scania.com">
            <sdds-icon name="truck" size="24"></sdds-icon>
            Truck types
          </a>
        </sdds-side-menu-item>

        <sdds-side-menu-dropdown>
          <sdds-icon slot="button-icon" name="tool" size="24"></sdds-icon>
          <span slot="button-label">
            Wheel types
          </span>
          <sdds-side-menu-dropdown-list>
            <sdds-side-menu-dropdown-list-item>
              <a href="https://design.scania.com">Hub-centric wheel</a>
            </sdds-side-menu-dropdown-list-item>
            <sdds-side-menu-dropdown-list-item>
              <a href="https://design.scania.com">Rim wheel</a>
            </sdds-side-menu-dropdown-list-item>
          </sdds-side-menu-dropdown-list>
        </sdds-side-menu-dropdown>

        <sdds-side-menu-item slot="end" onclick="alert('Calendar button clicked')">
          <button>
            <sdds-icon name="calendar" size="24px"></sdds-icon>
            Calendar
          </button>
        </sdds-side-menu-item>
        
        <sdds-side-menu-dropdown slot="end" class="demo-lg-hide" selected>
          <sdds-side-menu-user 
            slot="button-label" 
            heading="Name Namesson" 
            subheading="Company name" 
            img-src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" 
            img-alt="">
          </sdds-side-menu-user>
          <sdds-side-menu-dropdown-list>
            <sdds-side-menu-dropdown-list-item selected>
              <a href="https://design.scania.com">My Instructions</a>
            </sdds-side-menu-dropdown-list-item>
            <sdds-side-menu-dropdown-list-item>
              <a href="https://design.scania.com">Task List</a>
            </sdds-side-menu-dropdown-list-item>
          </sdds-side-menu-dropdown-list>
        </sdds-side-menu-dropdown>
      

      </sdds-side-menu>

      <main class="demo-main sdds-u-p3" style="box-sizing: border-box;">
        <p>If the header contains navigational items like links or buttons, a side menu is needed for small screens.</p>
        <br/>
        <p><i>Tip: Resize the window to see the buttons move in to the side menu drawer.</i></p>
        <p><i>Note: This example has an alterate launcher menu with a grid layout.</i></p>
      </main>
    </div>
  `
  );

export const FewNavigationItems = Template.bind({});
