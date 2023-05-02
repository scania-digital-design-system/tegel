import { formatHtmlPreview } from '../../../utils/utils';
import readme from './readme.md';
import readmeHamburger from './header-hamburger/readme.md';
import readmeTitle from './header-title/readme.md';
import readmeItem from './header-item/readme.md';
import readmeDropdown from './header-dropdown/readme.md';
import readmeDropdownList from './header-dropdown-list/readme.md';
import readmeDropdownListItem from './header-dropdown-list-item/readme.md';
import readmeDropdownListUser from './header-dropdown-list-user/readme.md';
import readmeLauncher from './header-launcher/readme.md';
import { ComponentsFolder } from '../../../utils/constants';

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
  <sdds-header>
    <sdds-header-title>
      Example: default
    </sdds-header-title>

    <sdds-header-launcher slot="end">
      <sdds-header-launcher-list-title>Cool apps</sdds-header-launcher-list-title>
      <sdds-header-launcher-list>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Trucklyfe</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">HaulHub</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">WheelWizz</a>
        </sdds-header-launcher-list-item>
      </sdds-header-launcher-list>
    </sdds-header-launcher>


    <sdds-header-brand-symbol slot="end" link-href="https://scania.com" aria-label="Scania - red gryphon on blue shield">
    </sdds-header-brand-symbol>

  </sdds-header>
  
  <main class="sdds-u-w-100 sdds-u-p3" style="box-sizing: border-box;">
    <p>Find complete examples under the <a href="/?path=/story/patterns-navigation--basic">Patterns section</a>.</p>
  </main>
  `,
  );

export const Header = Template.bind({});
