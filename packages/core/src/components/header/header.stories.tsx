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

const Template = () => {
  const isTraton =
    typeof document !== 'undefined' && document.documentElement.classList.contains('traton');
  const url = isTraton ? 'https://traton.com/en.html' : 'https://www.scania.com/';
  const brand = isTraton ? 'Traton' : 'Scania';

  return formatHtmlPreview(
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
      <a href="${url}" aria-label="${brand} website"></a>
    </tds-header-brand-symbol>

  </tds-header>
  
  <main class="tds-u-w-100 tds-u-p3" style="box-sizing: border-box;">
    <p>Find complete examples under the <a href="/?path=/story/patterns-navigation--basic">Patterns section</a>.</p>
  </main>
  `,
  );
};

export const Default = Template.bind({});
