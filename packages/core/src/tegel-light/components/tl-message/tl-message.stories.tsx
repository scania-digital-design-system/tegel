import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Message',
  parameters: {
    layout: 'centered',
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
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    messageVariant: 'Information',
    minimal: false,
    noIcon: false,
  },
};

const Template = ({ modeVariant, messageVariant, minimal, noIcon }) => {
  const modeClass =
    modeVariant !== 'Inherit from parent'
      ? `tl-message--mode-variant-${modeVariant.toLowerCase()}`
      : '';

  const variantClass = `tl-message__wrapper--${messageVariant.toLowerCase()}`;
  const minimalClass = minimal ? 'tl-message__wrapper--minimal' : '';
  const noIconClass = noIcon ? 'tl-message__wrapper--no-icon' : '';

  return formatHtmlPreview(`
    <style>
      .demo-wrapper {
        max-width: 380px;
      }
    </style>
    <div class="demo-wrapper">
      <div class="tl-message ${modeClass}">
        <div class="tl-message__wrapper ${variantClass} ${minimalClass} ${noIconClass}">
          <div class="tl-message__content">
            <div class="tl-message__header">Message header</div>
            ${
              !minimal
                ? `<div class="tl-message__extended-message">Longer Message text can be placed here. Longer Message text can be placed here.</div>`
                : ''
            }
          </div>
        </div>
      </div>
    </div>
  `);
};
export const Default = Template.bind({});
