import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Header',
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
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=38845-183926&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=38845-183926&m=dev',
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


    <tds-header-brand-symbol slot="end">
      <a href="https://scania.com" aria-label="Scania website"></a>
    </tds-header-brand-symbol>

  </tds-header>
  
  <main class="tds-u-w-100 tds-u-p3" style="box-sizing: border-box;">
    <p>Find complete examples under the <a href="/?path=/story/patterns-navigation-basic--basic">Patterns section</a>.</p>
  </main>
  `,
  );

export const Default = Template.bind({});
