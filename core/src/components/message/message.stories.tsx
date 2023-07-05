import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Message`,
  parameters: {
    layout: 'centered',
    notes: readme,
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11884%3A47370&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11884%3A47370&t=Ne6myqwca5m00de7-1',
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
    messageType: {
      name: 'Message type',
      description: 'Changes the type of the component.',
      control: {
        type: 'radio',
      },
      options: ['Information', 'Error', 'Warning', 'Success'],
      table: {
        defaultValue: { summary: 'information' },
      },
    },
    header: {
      name: 'Header',
      description: 'Sets the header for the Message.',
      control: {
        type: 'text',
      },
    },
    extendedMessage: {
      name: 'Extended Message content',
      description: 'Sets the content of an extended Message.',
      control: {
        type: 'text',
      },
    },
    minimal: {
      name: 'Minimal',
      description: 'Applies minimal Message styling.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    noIcon: {
      name: 'No icon',
      description: 'Hides the icon.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    messageType: 'Information',
    header: 'Message header',
    extendedMessage:
      'Longer Message text can be placed here. Longer Message text can be placed here.',
    minimal: false,
    noIcon: false,
  },
};

const Template = ({ modeVariant, messageType, header, extendedMessage, minimal, noIcon }) =>
  formatHtmlPreview(
    `
    <style>
      .demo-wrapper {
        width: 380px;
      }
    </style>
    <div class="demo-wrapper">
      <tds-message
          type="${messageType.toLowerCase()}"
          header="${header}"
          ${noIcon ? 'no-icon' : ''}
          ${minimal ? 'minimal' : ''}
          mode-variant="${modeVariant.toLowerCase()}"
          ${
            modeVariant !== 'Inherit from parent'
              ? `mode-variant="${modeVariant.toLowerCase()}"`
              : ''
          }
      >
      ${extendedMessage}
      </tds-message>
    </div>
    `,
  );

export const Default = Template.bind({});
