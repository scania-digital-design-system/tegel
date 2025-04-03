import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Radio Button`,
  parameters: {
    notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17335&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17335&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    label: {
      name: 'Label text',
      description: 'Sets the label for the Radio Button.',
      controls: {
        type: 'text',
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Radio Button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    label: 'Label text',
    disabled: false,
  },
};

const Template = ({ label, disabled }) =>
  formatHtmlPreview(`
  <style>
  .demo-fieldset {
    margin-bottom: 20px;
    min-width: 0;
    padding: 10px;
  }
</style>

  <div role="radiogroup" class="demo-fieldset">
  <label>Group 1</label>
  <tds-radio-button 
    name="rb-example"
    value="option1group1"
    radio-id="option-1-group-1"
    required=false
    ${disabled ? 'disabled' : ''}
    checked="true"
    tds-tab-index="0"
  >
    <div slot="label">
      ${label} 1
    </div>
  </tds-radio-button>

  <tds-radio-button
    name="rb-example"
    value="option2group1"
    radio-id="option-2-group-1"
    required=false
    ${disabled ? 'disabled' : ''}
    tds-tab-index="-1"
  >
    <div slot="label">
      ${label} 2
    </div>
  </tds-radio-button>
  </div>

  <div role="radiogroup" class="demo-fieldset">
  <label>Group 2</label>
  <tds-radio-button 
    name="rb-example"
    value="option1-group-2"
    radio-id="option-1-group-2"
    required=false
    ${disabled ? 'disabled' : ''}
    tds-tab-index="0"
  >
    <div slot="label">
      ${label} 1
    </div>
  </tds-radio-button>

  <tds-radio-button
    name="rb-example"
    value="option2group2"
    radio-id="option-2-group-2"
    required=false
    ${disabled ? 'disabled' : ''}
    tds-tab-index="-1"
  >
    <div slot="label">
      ${label} 2
    </div>
  </tds-radio-button>
    
  </div>

  <!-- Script tag with eventlistener for demo purposes. -->
  <script>
  document.addEventListener('tdsChange', (event) => {
    console.log(event)
  })
  </script>
  `);

export const Default = Template.bind({});
