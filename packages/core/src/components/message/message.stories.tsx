import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';

export default {
  title: 'Components/Message',
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
    messageVariant: {
      name: 'Message variant',
      description: 'Changes the variant of the component.',
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
    tdsAlertDialog: {
      name: 'Alert Dialog Role',
      description: 'Sets the ARIA role of the message component.',
      control: {
        type: 'radio',
      },
      options: ['dialog', 'alertdialog'],
      table: {
        defaultValue: { summary: 'dialog' },
      },
    },
    tdsAriaLabel: {
      name: 'ARIA Label',
      description:
        'Provides an accessible name for the message component when no header is present. This ensures proper screen reader support for dialog/alertdialog roles.',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    messageVariant: 'Information',
    header: 'Message header',
    extendedMessage:
      'Longer Message text can be placed here. Longer Message text can be placed here.',
    minimal: false,
    noIcon: false,
    tdsAlertDialog: 'dialog',
    tdsAriaLabel: 'A Message component',
  },
};

const Template = ({
  modeVariant,
  messageVariant,
  header,
  extendedMessage,
  minimal,
  noIcon,
  tdsAlertDialog,
  tdsAriaLabel,
}) =>
  formatHtmlPreview(
    `
    <style>
      .demo-wrapper {
        max-width: 380px;
      }
    </style>
    <div class="demo-wrapper">
      <tds-message
          variant="${messageVariant.toLowerCase()}"
          header="${header}"
          ${noIcon ? 'no-icon' : ''}
          ${minimal ? 'minimal' : ''}
          tds-alert-dialog="${tdsAlertDialog}"
          ${tdsAriaLabel ? `tds-aria-label="${tdsAriaLabel}"` : ''}
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
