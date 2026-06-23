import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite/Radio Button',
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
      options: [0, 1, 2, 'none'],
      table: {
        defaultValue: {
          summary: 0,
        },
      },
    },
    disabledIndex: {
      name: 'Disabled index',
      control: {
        type: 'radio',
      },
      options: [0, 1, 2, 'none', 'all'],
      table: {
        defaultValue: {
          summary: 'none',
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
    disabledIndex: 'none',
    checkedIndex: 0,
    name: 'rb-example',
  },
};

const Template = ({ label, checkedIndex, disabledIndex, name }) =>
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
        ${disabledIndex === 0 || disabledIndex === 'all' ? 'disabled' : ''}
      />
      <label class="tl-radio-button__label" for="${name}-1">${label} 1</label>
    </div>

    <div class="tl-radio-button">
      <input
        class="tl-radio-button__input"
        type="radio"
        name="${name}"
        id="${name}-2"
        value="option-2"
        ${checkedIndex === 1 ? 'checked' : ''}
        ${disabledIndex === 1 || disabledIndex === 'all' ? 'disabled' : ''}
      />
      <label class="tl-radio-button__label" for="${name}-2">${label} 2</label>
    </div>

    <div class="tl-radio-button">
      <input
        class="tl-radio-button__input"
        type="radio"
        name="${name}"
        id="${name}-3"
        value="option-3"
        ${checkedIndex === 2 ? 'checked' : ''}
        ${disabledIndex === 2 || disabledIndex === 'all' ? 'disabled' : ''}
      />
      <label class="tl-radio-button__label" for="${name}-3">${label} 3</label>
    </div>
</fieldset>
`);

export const Default = Template.bind({});
