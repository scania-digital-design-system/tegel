import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Radio Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      name: 'Label text',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'Label text',
        },
      },
    },
    checkedIndex: {
      name: 'Checked index',
      control: {
        type: 'radio',
      },
      options: [0, 1, 'none'],
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    name: {
      name: 'Group name',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'rb-example',
        },
      },
    },
  },
  args: {
    label: 'Label text',
    checkedIndex: 0,
    disabled: false,
    name: 'rb-example',
  },
};

const Template = ({ label, checkedIndex, disabled, name }) =>
  formatHtmlPreview(`
<!-- Required stylesheets:
  "@scania/tegel-lite/global.css"
  "@scania/tegel-lite/tl-radio-button.css"
-->

<style>
  .demo-fieldset-reset { border: 0; margin: 0; padding: 0; }
</style>

<fieldset class="demo-fieldset-reset">
    <div class="tl-radio-button">
      <input
        class="tl-radio-button__input"
        type="radio"
        name="${name}"
        id="${name}-1"
        value="option-1"
        ${checkedIndex === 0 ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      />
      <label class="tl-radio-button__label" for="${name}-1">
        <span class="tl-radio-button__control"></span>
        ${label} 1
      </label>
    </div>

    <div class="tl-radio-button">
      <input
        class="tl-radio-button__input"
        type="radio"
        name="${name}"
        id="${name}-2"
        value="option-2"
        ${checkedIndex === 1 ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      />
      <label class="tl-radio-button__label" for="${name}-2">
        <span class="tl-radio-button__control"></span>
        ${label} 2
      </label>
    </div>
</fieldset>
`);

export const Default = Template.bind({});
