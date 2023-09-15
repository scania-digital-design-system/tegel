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
  argTypes: {
    siteName: {
      name: 'Site name',
      description: 'Set a custom title for the Header.',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    siteName: 'Application',
  },
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
      /* If an extra button in the Header is required except on 
      very narrow screens, you can use classes like these: */
      .demo-hide {
        display: none;
      }

      @media (min-width: 992px) {
        .demo-xs-hide {
          display: none;
        }
        .demo-xs-show {
          display: block;
        }
      }
    </style>


    <div class="demo-layout">
      <tds-header>
        <tds-header-hamburger class="demo-xs-hide" onclick="demoSideMenu.open = true;demoHamburger.setAttribute('aria-expanded', true);" aria-label="Open application drawer" aria-haspopup="true" aria-expanded="false"></tds-header-hamburger>

        <tds-header-title>
          Example: User menu
        </tds-header-title>

        <tds-header-launcher slot="end">
          <tds-header-launcher-list-title>Sustainable tools</tds-header-launcher-list-title>
          <tds-header-launcher-list>
            <tds-header-launcher-list-item>
              <a href="https://tegel.scania.com">Button</a>
            </tds-header-launcher-list-item>
            <tds-header-launcher-list-item>
              <a href="https://tegel.scania.com">Button</a>
            </tds-header-launcher-list-item>
          </tds-header-launcher-list>
        </tds-header-launcher>
        
        <tds-header-dropdown slot="end" class="demo-hide demo-xs-show" no-dropdown-icon selected>
          <img slot="icon" src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" alt="User menu."/>
          <tds-header-dropdown-list size="lg">
            <tds-header-dropdown-list-user
              header="Name Nameson"
              subheader="Company name">
            </tds-header-dropdown-list-user>
            <tds-header-dropdown-list-item selected>
              <a href="https://www.scania.com">My Instructions</a>
            </tds-header-dropdown-list-item>
            <tds-header-dropdown-list-item>
              <a href="https://www.scania.com">Task List</a>
            </tds-header-dropdown-list-item>
          </tds-header-dropdown-list>
        </tds-header-dropdown>

        <tds-header-brand-symbol slot="end">
          <a aria-label="Scania - red gryphon on blue shield" href="https://scania.com"></a>
        </tds-header-brand-symbol>

      </tds-header>

      <tds-side-menu id="demo-side-menu" aria-label="Side menu">
        <tds-side-menu-overlay slot="overlay" onclick="demoSideMenu.open = false;demoHamburger.setAttribute('aria-expanded', false);"></tds-side-menu-overlay>

        <tds-side-menu-close-button slot="close-button" onclick="demoSideMenu.open = false;demoHamburger.setAttribute('aria-expanded', false);"></tds-side-menu-close-button>

        <tds-side-menu-dropdown slot="end" class="demo-xs-hide" selected default-open>
          <tds-side-menu-user 
            slot="label" 
            heading="Name Namesson" 
            subheading="Company name" 
            img-src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" 
            img-alt="">
          </tds-side-menu-user>
          <tds-side-menu-dropdown-list type="lg">
            <tds-side-menu-dropdown-list-item selected>
              <a href="https://www.scania.com">My Instructions</a>
            </tds-side-menu-dropdown-list-item>
            <tds-side-menu-dropdown-list-item>
              <a href="https://www.scania.com">Task List</a>
            </tds-side-menu-dropdown-list-item>
          </tds-side-menu-dropdown-list>
        </tds-side-menu-dropdown>


      </tds-side-menu>

      <main class="demo-main tds-u-p3" style="box-sizing: border-box;">
        <p>If you display a user menu, a side menu is needed to show it on extra small screens.</p>
        <br/>
        <p><i>Tip: Resize the window to see the user menu move in to a side menu drawer.</i></p>
      </main>
    </div>
  `,
  );

export const UserMenu = Template.bind({});
