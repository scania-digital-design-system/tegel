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
  <sdds-header>
    <sdds-header-title>
      Example: default
    </sdds-header-title>
    <sdds-header-launcher slot="end" aria-label="Application launcher">
      <sdds-header-launcher-list-title>Cool apps</sdds-header-launcher-list-title>
      <sdds-header-launcher-list>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
      </sdds-header-launcher-list>
      <sdds-header-launcher-list-title>Lame apps</sdds-header-launcher-list-title>
      <sdds-header-launcher-list>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
        <sdds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </sdds-header-launcher-list-item>
      </sdds-header-launcher-list>
    </sdds-header-launcher>
  
    <sdds-header-brand-symbol slot="end" link-href="https://design.scania.com" aria-label="Scania - red gryphon on blue shield">
    </sdds-header-brand-symbol>

  </sdds-header>
  
  <main class="sdds-u-w-100 sdds-u-p3" style="box-sizing: border-box;">
    <p>If the Header only contains a title, launcher, and logo, no side menu is needed.</p>
  </main>
  `,
  );

export const Basic = Template.bind({});
