import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Radio Button',
  parameters: {
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
  .demo-fieldset-reset { 
    border: 0;
    margin: 0;
    min-width: 0;
    padding: 0; 
  }
</style>

  <fieldset class="demo-fieldset-reset">
  <tds-radio-button 
    name="rb-example"
    value="option1"
    radio-id="option-1"
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
    value="option2"
    radio-id="option-2"
    required=false
    ${disabled ? 'disabled' : ''} 
  >
    <div slot="label">
      ${label} 2
    </div>
  </tds-radio-button>
    
  </fieldset>

  <!-- Script tag with eventlistener for demo purposes. -->
  <script>
  document.addEventListener('tdsChange', (event) => {
    console.log(event)
  })
  </script>
  `);

export const Default = Template.bind({});
