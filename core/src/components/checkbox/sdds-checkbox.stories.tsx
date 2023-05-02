import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  argTypes: {
    label: {
      name: 'Label text',
      description: 'Sets the label of the component.',
      control: {
        type: 'text',
      },
    },
    checked: {
      name: 'Checked',
      description: 'Checks the checkbox.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the checkbox.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
  },
};

const Template = ({ label, checked, disabled }) =>
  formatHtmlPreview(`
    <sdds-checkbox
        ${checked ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        value="checkbox-value"
        >
        <div slot="label">${label}</div>
    </sdds-checkbox>
    
    <!-- Script tag with event listener for demo purposes. -->
    <script>
        checkboxElement = document.querySelector('sdds-checkbox')
        checkboxElement.addEventListener('sddsChange', (event) => {
            console.log('Checkbox with id: ', event.detail.checkboxId, ' is ', event.detail.checked)
        })
        checkboxElement.addEventListener('sddsFocus',(event) => {
          console.log(event)
        })
        checkboxElement.addEventListener('sddsBlur',(event) => {
          console.log(event)
        })
    </script>
  `);

export const Checkbox = Template.bind({});
