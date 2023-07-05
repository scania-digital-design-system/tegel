import { formatHtmlPreview } from '../../utils/utils';

import readme from './readme.md';
import readmeSideMenuUser from './side-menu-user/readme.md';
import readmeSideMenuOverlay from './side-menu-overlay/readme.md';
import readmeSideMenuCloseButton from './side-menu-close-button/readme.md';
import readmeSideMenuCollapseButton from './side-menu-collapse-button/readme.md';
import readmeSideMenuDropdown from './side-menu-dropdown/readme.md';
import readmeSideMenuItem from './side-menu-item/readme.md';
import readmeSideMenuDropdownList from './side-menu-dropdown-list/readme.md';
import readmeSideMenuDropdownListItem from './side-menu-dropdown-list-item/readme.md';

import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: {
      'Side Menu': readme,
      'Side Menu Item': readmeSideMenuItem,
      'Side Menu Dropdown': readmeSideMenuDropdown,
      'Side Menu Dropdown List': readmeSideMenuDropdownList,
      'Side Menu Dropdown List Item': readmeSideMenuDropdownListItem,
      'Side Menu User': readmeSideMenuUser,
      'Side Menu Collapse Button': readmeSideMenuCollapseButton,
      'Side Menu Close Button': readmeSideMenuCloseButton,
      'Side Menu Overlay': readmeSideMenuOverlay,
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
        'Set the Side Menu to always show. This should be used if there are more navigation items to show than can always fit in the Header, more than three Header items is a good rule of thumb.',
      control: {
        type: 'boolean',
      },
    },
    collapsible: {
      name: 'Collapsible',
      description: 'Make the Side Menu collapsible',
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
        /* the lg breakpoint is used here to match the breakpoint used in the Header */
    @media (min-width: 992px) {
      #demo-side-menu {
        /* We suggest you attach the persistent Side Menu to your layout like this: */
        height: calc(100vh - var(--app-bar-height));
        position: sticky;
        top: var(--app-bar-height);
        left: 0px;
      }
    }`
        : ''
    }
    /* If an extra button in the Header is required except on */
    /* very narrow screens, you can use classes like these: */
    .demo-hide {
      display: none;
    }

    /* https://tegel.scania.com/components/header#:~:text=breakpoints%20larger%20than-,%24small%2D375.,-On%20smaller%20breakpoints */
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
    <tds-header class="demo-header">
      <tds-header-hamburger onclick="demoSideMenu.open = true;" aria-expanded="false" aria-label="Open application drawer" aria-haspopup="true"></tds-header-hamburger>

      <tds-header-title>
        My Application
      </tds-header-title>

      <i style="color:white">Header items omitted for brevity. See patterns/navigation</i>

      <tds-header-brand-symbol slot="end">
        <a aria-label="Scania - red gryphon on blue shield" href="https://scania.com"></a>
      </tds-header-brand-symbol>
    </tds-header>

    <div class="demo-wrap-side-menu-and-main">
      <!-- Note: the "persistent" property keeps the menu open on desktop -->
      <tds-side-menu aria-label="Side menu" id="demo-side-menu" ${persistent ? 'persistent' : ''}>
        <tds-side-menu-overlay slot="overlay" onclick="demoSideMenu.open = false;"></tds-side-menu-overlay>

        <tds-side-menu-close-button slot="close-button" aria-label="Close drawer menu" onclick="demoSideMenu.open = false;"></tds-side-menu-close-button>

        <tds-side-menu-item>
          <button>
            <tds-icon name="timer" size="24"></tds-icon>
            About us
          </button>
        </tds-side-menu-item>

        <tds-side-menu-item>
          <button>
            <tds-icon name="truck" size="24"></tds-icon>
            Trucks
          </button>
        </tds-side-menu-item>

        <tds-side-menu-dropdown default-open selected>
          <tds-icon slot="button-icon" name="profile" size="24"></tds-icon>
          <span slot="button-label">
            Wheel types
          </span>
          <tds-side-menu-dropdown-list>
            <tds-side-menu-dropdown-list-item>
              <a href="https://www.scania.com">
                Hub-centric wheel
              </a>
            </tds-side-menu-dropdown-list-item>
            <tds-side-menu-dropdown-list-item selected>
              <a href="https://www.scania.com" aria-current="page">
                Rim wheel
              </a>
            </tds-side-menu-dropdown-list-item>
          </tds-side-menu-dropdown-list>
        </tds-side-menu-dropdown>

        <tds-side-menu-item>
          <button>
            <tds-icon name="star" size="24"></tds-icon>
            Values
          </button>
        </tds-side-menu-item>

        ${
          collapsible
            ? `<tds-side-menu-collapse-button slot="sticky-end">
          Collapse  
        </tds-side-menu-collapse-button>`
            : ''
        }

      </tds-side-menu>

      <main class="tds-u-h-100 tds-u-p3" style="box-sizing: border-box;">
        <p>If there are more than a few buttons and/or links in the Header, they might not fit on medium size screens. 
        <br/>In that case they should be placed in a persistent Side Menu — which is always visible on large screens.</p>

        <p><i>Note: The Side Menu is sticky, and should not scroll with the main content of the page.</i></p>

        <p><i>Note: The collapse button is optional.</i></p>
        <button id="test">Toggle the collapsed state programatically</button>
      </main>
    </div>
  </div>
  <script>
    sideMenu = document.querySelector('tds-side-menu')
    document.querySelector('#test').addEventListener('click', ()=> {
      sideMenu.collapsed = !sideMenu.collapsed;
    })

    document.querySelector('tds-side-menu-collapse-button').addEventListener('tdsCollapse', (event) => {
      console.log(event)
    })
  </script>
  `,
  );

export const SideMenu = Template.bind({});
