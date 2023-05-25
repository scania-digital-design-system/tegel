import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import readmeHamburger from './header-hamburger/readme.md';
import readmeTitle from './header-title/readme.md';
import readmeItem from './header-item/readme.md';
import readmeDropdown from './header-dropdown/readme.md';
import readmeDropdownList from './header-dropdown-list/readme.md';
import readmeDropdownListItem from './header-dropdown-list-item/readme.md';
import readmeDropdownListUser from './header-dropdown-list-user/readme.md';
import readmeLauncher from './header-launcher/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: {
      'Header': readme,
      'Header hamburger': readmeHamburger,
      'Header title': readmeTitle,
      'Header item': readmeItem,
      'Header dropdown': readmeDropdown,
      'Header dropdown list': readmeDropdownList,
      'Header dropdown list item': readmeDropdownListItem,
      'Header dropdown list user': readmeDropdownListUser,
      'Header launcher': readmeLauncher,
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
  <tds-header>
    <tds-header-title>
      Example: default
    </tds-header-title>

    <tds-header-launcher slot="end">
      <tds-header-launcher-list-title>Cool apps</tds-header-launcher-list-title>
      <tds-header-launcher-list>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Trucklyfe</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">HaulHub</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">WheelWizz</a>
        </tds-header-launcher-list-item>
      </tds-header-launcher-list>
    </tds-header-launcher>


    <tds-header-brand-symbol slot="end" link-href="https://scania.com" aria-label="Scania - red gryphon on blue shield">
    </tds-header-brand-symbol>

  </tds-header>
  
  <main class="tds-u-w-100 tds-u-p3" style="box-sizing: border-box;">
    <p>Find complete examples under the <a href="/?path=/story/patterns-navigation--basic">Patterns section</a>.</p>
  </main>
  `,
  );

export const Header = Template.bind({});
