import readme from './readme.md';
import { formatHtmlPreview } from '../../../utils/utils';
import readmeSideMenuCloseButton from './side-menu-close-button/readme.md';
import readmeSideMenuOverlay from './side-menu-overlay/readme.md';
import readmeSideMenuUser from './side-menu-user/readme.md';
import readmeSideMenuCollapseButton from './side-menu-collapse-button/readme.md';
import readmeSideMenuDropdown from './side-menu-dropdown/readme.md';
import { ComponentsFolder } from '../../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: {
      'Side Menu': readme,
      'Side Menu Close Button': readmeSideMenuCloseButton,
      'Side Menu Overlay': readmeSideMenuOverlay,
      'Side Menu User': readmeSideMenuUser,
      'Side Menu Collapse Button': readmeSideMenuCollapseButton,
      'Side Menu Dropdown': readmeSideMenuDropdown,
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
  argTypes: {
    persistent: {
      name: 'Persistent',
      description:
        'Set the side menu to always show. This should be used if there are more navigation items to show than can always fit in the header, more than three header items is a good rule of thumb.',
      control: {
        type: 'boolean',
      },
    },
    collapsible: {
      name: 'Collapsible',
      description: 'Make the side menu collapsible',
      control: {
        type: 'boolean',
      },
      if: { arg: 'persistent', truthy: true },
    },
  },
  args: {
    persistent: true,
    collapsible: false,
  },
};

const Template = ({ persistent, collapsible }) =>
  formatHtmlPreview(
    `
    <script>
    /* For demonstration purposes only. Do this in the preferred way of your framework instead. */
    window.demoSideMenu = document.querySelector('#demo-side-menu');
  </script>
  <style>
    :root {
      --app-bar-height: 64px;
    }

    /* Note: to make the layout fill the entire viewport height you'll need to set the */
    /* height of the parent element and all of its ancestors to 100%. */
    /* Please note that using 'vh' for this can cause issues on some mobile browsers. */
    .demo-layout {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }
    .demo-header {
      position: sticky;
      top: 0;
    }
    .demo-wrap-side-menu-and-main {
      display: flex;
      flex-grow: 1;
    }
    ${
      persistent
        ? `
        /* the lg breakpoint is used here to match the breakpoint used in the header */
    @media (min-width: 992px) {
      #demo-side-menu {
        /* We suggest you attach the persistent side menu to your layout like this: */
        height: calc(100vh - var(--app-bar-height));
        position: sticky;
        top: var(--app-bar-height);
        left: 0px;
      }
    }`
        : ''
    }
    /* If an extra button in the header is required except on */
    /* very narrow screens, you can use classes like these: */
    .demo-hide {
      display: none;
    }

    // https://tegel.scania.com/components/header#:~:text=breakpoints%20larger%20than-,%24small%2D375.,-On%20smaller%20breakpoints
    @media (min-width: 375px) {
      .demo-xs-hide {
        display: none;
      }
      .demo-xs-show {
        display: block;
      }
    }
  </style>

  <div class="demo-layout">
    <sdds-header class="demo-header">
      <sdds-header-hamburger onclick="demoSideMenu.open = true;" aria-expanded="false" aria-label="Open application drawer" aria-haspopup="true"></sdds-header-hamburger>

      <sdds-header-title>
        My Application
      </sdds-header-title>

      <i style="color:white">Header items omitted for brevity. See patterns/navigation</i>

      <sdds-header-brand-symbol slot="end" link-href="https://scania.com" aria-label="Scania - red gryphon on blue shield">
      </sdds-header-brand-symbol>
    </sdds-header>

    <div class="demo-wrap-side-menu-and-main">
      <!-- Note: the "persistent" property keeps the menu open on desktop -->
      <sdds-side-menu aria-label="Side menu" id="demo-side-menu" ${persistent ? 'persistent' : ''}>
        <sdds-side-menu-overlay slot="overlay" onclick="demoSideMenu.open = false;"></sdds-side-menu-overlay>

        <sdds-side-menu-close-button slot="close-button" aria-label="Close drawer menu" onclick="demoSideMenu.open = false;"></sdds-side-menu-close-button>

        <sdds-side-menu-item>
          <button>
            <tds-icon name="timer" size="24"></tds-icon>
            About us
          </button>
        </sdds-side-menu-item>

        <sdds-side-menu-item>
          <button>
            <tds-icon name="truck" size="24"></tds-icon>
            Trucks
          </button>
        </sdds-side-menu-item>

        <sdds-side-menu-dropdown default-open selected>
          <tds-icon slot="button-icon" name="profile" size="24"></tds-icon>
          <span slot="button-label">
            Wheel types
          </span>
          <sdds-side-menu-dropdown-list>
            <sdds-side-menu-dropdown-list-item>
              <a href="https://www.scania.com">
                Hub-centric wheel
              </a>
            </sdds-side-menu-dropdown-list-item>
            <sdds-side-menu-dropdown-list-item selected>
              <a href="https://www.scania.com" aria-current="page">
                Rim wheel
              </a>
            </sdds-side-menu-dropdown-list-item>
          </sdds-side-menu-dropdown-list>
        </sdds-side-menu-dropdown>

        <sdds-side-menu-item>
          <button>
            <tds-icon name="star" size="24"></tds-icon>
            Values
          </button>
        </sdds-side-menu-item>

        ${
          collapsible
            ? `<sdds-side-menu-collapse-button slot="sticky-end">
          Collapse  
        </sdds-side-menu-collapse-button>`
            : ''
        }

      </sdds-side-menu>

      <main class="sdds-u-h-100 sdds-u-p3" style="box-sizing: border-box;">
        <p>If there are more than a few buttons and/or links in the header, they might not fit on medium size screens. 
        <br/>In that case they should be placed in a persistent side menu — which is always visible on large screens.</p>

        <p><i>Note: The side menu is sticky, and should not scroll with the main content of the page.</i></p>

        <p><i>Note: The collapse button is optional.</i></p>
        <button id="test">Toggle the collapsed state programatically</button>
      </main>
    </div>
  </div>
  <script>
    sideMenu = document.querySelector('sdds-side-menu')
    document.querySelector('#test').addEventListener('click', ()=> {
      sideMenu.collapsed = !sideMenu.collapsed;
    })

    document.querySelector('sdds-side-menu-collapse-button').addEventListener('sddsCollapse', (event) => {
      console.log(event)
    })
  </script>
  `,
  );

export const SideMenu = Template.bind({});
