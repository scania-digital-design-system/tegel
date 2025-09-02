import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Toggle',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2479%3A108951&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2479%3A108951&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Sets the size of the Toggle.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    headline: {
      name: 'Headline',
      description: 'Sets the headline, displayed above the Toggle.',
      control: {
        type: 'text',
      },
    },
    label: {
      name: 'Label text',
      description: "Sets the label for the toggle's input element.",
      control: {
        type: 'text',
      },
    },
    checked: {
      name: 'Checked',
      description: 'Sets the Toggle as checked.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Toggle.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    size: 'Large',
    headline: 'Headline',
    label: 'Label',
    checked: false,
    disabled: false,
  },
};

const Template = ({ size, headline, label, checked, disabled }) =>
  formatHtmlPreview(`
      <div class="tl-toggle">
        <div class="toggle-headline">
             ${headline}
          </div>
        <input
          type="checkbox"
          class="${size === 'Large' ? 'lg' : 'sm'}"
          ${checked ? 'checked' : ''}
          ${disabled ? 'disabled' : ''}
        />
        <label class="tl-toggle__label">${label}</label>
    </div>

    <!-- Script tag with eventlistener for demo purposes. -->
    <script>
      toggleElement = document.querySelector('tds-toggle')

      toggleElement.addEventListener('tdsToggle', (event)=> {
        console.log(event)
      })
    </script>
  `);
export const Default = Template.bind({});