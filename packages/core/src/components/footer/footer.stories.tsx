import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Footer',
  parameters: {
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7568%3A298118&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7568%3A298118&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    topSlot: {
      name: 'Top slot',
      description: 'Adds content to the top slot of the Footer (page links).',
      control: {
        type: 'boolean',
      },
    },
    startSlot: {
      name: 'Start slot',
      description: 'Adds content to the start slot of the Footer (legal links).',
      control: {
        type: 'boolean',
      },
    },
    endSlot: {
      name: 'End slot',
      description: 'Adds content to the end slot of the Footer (social media links).',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    topSlot: true,
    startSlot: true,
    endSlot: true,
  },
};

const Template = ({ topSlot, startSlot, endSlot, modeVariant }) =>
  formatHtmlPreview(
    `
    <main>
      <div class="tds-u-p3 ">
        <div class="tds-body-01">
          Resize the window to see how the Footer behaves on smaller/bigger screens.
        </div>
      </div>
    </main>
    <tds-footer 
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    >
      ${
        topSlot
          ? `
      <div slot="top">
        <tds-footer-group tds-list-aria-label="Links 1">
          <h6 slot="title">Title 1</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group tds-list-aria-label="Links 2">
          <h6 slot="title">Title 2</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group tds-list-aria-label="Links 3">
          <h6 slot="title">Title 3</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group tds-list-aria-label="Links 4">
          <h6 slot="title">Title 4</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>
      </div>
      `
          : ''
      }
      ${
        startSlot
          ? `
      <div slot="start">
        <tds-footer-group tds-list-aria-label="Start slot links">
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          </tds-footer-group>
        </div>
      `
          : ''
      } 
      ${
        endSlot
          ? `
      <div slot="end">
        <tds-footer-group tds-list-aria-label="End slot links">
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
          </tds-footer-item>
        </tds-footer-group>
      </div>
        `
          : ''
      }
    </tds-footer>
  `,
  );

export const Default = Template.bind({});
