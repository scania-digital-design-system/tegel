import { formatHtmlPreview } from '../../../utils/utils';
import readme from './readme.md';

export default {
  title: 'Patterns/Navigation',
  parameters: {
    notes: {
      Readme: readme,
    },
    layout: 'fullscreen',
    docs: {
      source: {
        state: 'closed',
      },
    },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1',
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
    
      /* If an extra button in the Header is required except on 
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
      <tds-header>
        <!-- TODO setting aria-expanded="true" on the hamburger button does not work, as it is not
          copied to the button element -->
        <tds-header-hamburger id="demo-hamburger" onclick="demoSideMenu.open = true;demoHamburger.setAttribute('aria-expanded', true);" aria-label="Open application drawer" aria-haspopup="true" aria-expanded="false"></tds-header-hamburger>

        <tds-header-title>
          Example: Few items
        </tds-header-title>

        <tds-header-item selected>
          <button onclick="alert('About us clicked');">
            About us
          </button>
        </tds-header-item>

        <tds-header-item>
          <a href="https://www.google.se">
            Truck types
          </a>
        </tds-header-item>

        <tds-header-dropdown>
          <span slot="button-label">Wheel types</span>
          <tds-header-dropdown-list>
            <tds-header-dropdown-list-item>
              <a href="https://tegel.scania.com">Hub-centric wheel</a>
            </tds-header-dropdown-list-item>
            <tds-header-dropdown-list-item>
              <a href="https://tegel.scania.com">Rim wheel</a>
            </tds-header-dropdown-list-item>
          </tds-header-dropdown-list>
        </tds-header-dropdown>

        <tds-header-item slot="end">
          <button onclick="alert('Calendar button clicked')">
            <tds-icon name="calendar" size="20px"></tds-icon>
          </button>
        </tds-header-item>

        <tds-header-launcher slot="end" aria-label="Application launcher">
          <tds-header-launcher-grid-title>Operations and Logistics</tds-header-launcher-grid-title>
          <tds-header-launcher-grid>
            <tds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <tds-icon name="star" size="32"></tds-icon>
                ScaniaCare
              </a>
            </tds-header-launcher-grid-item>
            <tds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <tds-icon name="truck" size="32"></tds-icon>
                ScaniaInsight
              </a>
            </tds-header-launcher-grid-item>
            <tds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <tds-icon name="fuel_gauge" size="32"></tds-icon>
                ScaniaConnect
              </a>
            </tds-header-launcher-grid-item>
            <tds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <tds-icon name="star" size="32"></tds-icon>
                ScaniaPlan
              </a>
            </tds-header-launcher-grid-item>
            <tds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <tds-icon name="truck" size="32"></tds-icon>
                ScaniaTrack
              </a>
            </tds-header-launcher-grid-item>
          </tds-header-launcher-grid>
          <tds-header-launcher-grid-title>Customer Service</tds-header-launcher-grid-title>
          <tds-header-launcher-grid>
            <tds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <tds-icon name="star" size="32"></tds-icon>
                ScaniaNet
              </a>
            </tds-header-launcher-grid-item>
            <tds-header-launcher-grid-item>
              <a href="https://tegel.scania.com">
                <tds-icon name="truck" size="32"></tds-icon>
                ScaniaRisk
              </a>
            </tds-header-launcher-grid-item>
          </tds-header-launcher-grid>

        </tds-header-launcher>

        <tds-header-dropdown slot="end" placement="end" no-dropdown-icon class="demo-hide demo-lg-show" selected>
          <img slot="button-icon" src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" alt="User menu."/>
          <tds-header-dropdown-list type="lg">
            <tds-header-dropdown-list-user
              heading="Name Nameson"
              subheading="Company name">
            </tds-header-dropdown-list-user>
            <tds-header-dropdown-list-item selected>
              <a href="https://www.scania.com">My Instructions</a>
            </tds-header-dropdown-list-item>
            <tds-header-dropdown-list-item>
              <a href="https://www.scania.com">Task List</a>
            </tds-header-dropdown-list-item>
          </tds-header-dropdown-list>
        </tds-header-dropdown>

        <tds-header-brand-symbol slot="end" href="https://design.scania.com" aria-label="Scania - red gryphon on blue shield">
        </tds-header-brand-symbol>

      </tds-header>


      <sdds-side-menu id="demo-side-menu" aria-label="Side menu">
        <sdds-side-menu-overlay slot="overlay" onclick="demoSideMenu.open = false;demoHamburger.setAttribute('aria-expanded', false);"></sdds-side-menu-overlay>

        <sdds-side-menu-close-button slot="close-button" onclick="demoSideMenu.open = false;demoHamburger.setAttribute('aria-expanded', false);"></sdds-side-menu-close-button>

        <sdds-side-menu-item>
          <button>
            <tds-icon name="info" size="24"></tds-icon>
            About
          </button>
        </sdds-side-menu-item>

        <sdds-side-menu-item>
          <a href="https://www.scania.com">
            <tds-icon name="truck" size="24"></tds-icon>
            Truck types
          </a>
        </sdds-side-menu-item>

        <sdds-side-menu-dropdown>
          <tds-icon slot="button-icon" name="tool" size="24"></tds-icon>
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
            <tds-icon name="calendar" size="24px"></tds-icon>
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
        <p>If the Header contains navigational items like links or buttons, a side menu is needed for small screens.</p>
        <br/>
        <p><i>Tip: Resize the window to see the buttons move in to the side menu drawer.</i></p>
        <p><i>Note: This example has an alterate launcher menu with a grid layout.</i></p>
      </main>
    </div>
  `,
  );

export const FewNavigationItems = Template.bind({});
