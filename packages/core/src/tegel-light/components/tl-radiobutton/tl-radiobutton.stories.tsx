import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Radio Button',
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
<!-- Required stylesheet 
  "@scania/tegel-light/tl-radiobutton.css";
-->

<style>
  .demo-fieldset-reset { border: 0; margin: 0; padding: 0; }
</style>

<fieldset class="demo-fieldset-reset">
    <label class="tl-radiobutton ${disabled ? 'tl-radiobutton--disabled' : ''}">
      <input
        class="tl-radiobutton__input"
        type="radio"
        name="${name}"
        value="option-1"
        ${checkedIndex === 0 ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      />
      <span class="tl-radiobutton__control"></span>
      <span class="tl-radiobutton__label">${label} 1</span>
    </label>

    <label class="tl-radiobutton ${disabled ? 'tl-radiobutton--disabled' : ''}">
      <input
        class="tl-radiobutton__input"
        type="radio"
        name="${name}"
        value="option-2"
        ${checkedIndex === 1 ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
      />
      <span class="tl-radiobutton__control"></span>
      <span class="tl-radiobutton__label">${label} 2</span>
    </label>
</fieldset>
`);

export const Default = Template.bind({});
