import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Patterns/Navigation/Basic',
  parameters: {
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
    <tds-header-launcher slot="end" tds-aria-label="Example launcher menu">
      <tds-header-launcher-list-title>Cool apps</tds-header-launcher-list-title>
      <tds-header-launcher-list>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
      </tds-header-launcher-list>
      <tds-header-launcher-list-title>Lame apps</tds-header-launcher-list-title>
      <tds-header-launcher-list>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Button</a>
        </tds-header-launcher-list-item>
      </tds-header-launcher-list>
    </tds-header-launcher>
  
    <tds-header-brand-symbol slot="end">
      <a href="https://scania.com" aria-label="Scania website"></a>
    </tds-header-brand-symbol>

  </tds-header>
  
  <main class="tds-u-w-100 tds-u-p3" style="box-sizing: border-box;">
    <p>If the Header only contains a title, launcher, and logo, no side menu is needed.</p>
  </main>
  `,
  );

export const Basic = Template.bind({});
