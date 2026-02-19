import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { iconsNames } from '../icon/iconsArray';

export default {
  title: 'Components/Button',
  parameters: {
    layout: 'padded',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=30033-78562&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=30033-78562&m=dev',
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
    variant: {
      name: 'Variant',
      description:
        'Four different Button variants to help the user to distinguish the level of importance of the task they represent.',
      control: {
        type: 'radio',
      },
      options: ['Primary', 'Secondary', 'Ghost', 'Danger'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    type: {
      name: 'Type',
      description: 'Native types of button',
      control: {
        type: 'radio',
      },
      options: ['Button', 'Submit', 'Reset'],
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the Button.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Medium', 'Small', 'Extra small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    text: {
      name: 'Text',
      description: 'Sets the text to be displayed on the Button.',
      control: {
        type: 'text',
      },
      if: { arg: 'onlyIcon', truthy: false },
    },
    fullbleed: {
      name: 'Fullbleed',
      description: 'Sets a fluid width on the Button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
      if: { arg: 'onlyIcon', truthy: false },
    },
    onlyIcon: {
      name: 'Only Icon',
      description: 'Displays only the icon and excludes any text from the Button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
      if: { arg: 'size', neq: 'Extra small' },
    },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed on the Button. Choose "none" to exclude the icon.',
      control: {
        type: 'select',
      },
      options: ['none', ...iconsNames],
      if: { arg: 'size', neq: 'Extra small' },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    animation: {
      name: 'Animation',
      description: 'Sets the animation for the Button.',
      control: {
        type: 'radio',
      },
      options: ['none', 'fade'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    tdsAriaLabel: {
      name: 'Aria Label',
      description: 'Value to be used for the aria-label attribute',
      control: {
        type: 'text',
      },
      if: { arg: 'onlyIcon', truthy: true },
    },
    name: {
      name: 'Name',
      description: 'The name attribute allows for different ways of accessing the button element.',
      control: {
        type: 'text',
      },
    },
    value: {
      name: 'Value',
      description: 'The value attribute can be used when handling a form submission.',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    type: 'Button',
    variant: 'Primary',
    size: 'Large',
    text: 'Button',
    fullbleed: false,
    icon: 'none',
    disabled: false,
    animation: 'none',
    onlyIcon: false,
    tdsAriaLabel: 'A button component',
    name: '',
    value: '',
  },
};

const WebComponentTemplate = ({
  modeVariant,
  type,
  variant,
  size,
  text = 'Button',
  fullbleed,
  onlyIcon,
  icon,
  disabled,
  animation,
  tdsAriaLabel,
  name,
  value,
}) => {
  const variantLookUp = {
    Primary: 'primary',
    Secondary: 'secondary',
    Ghost: 'ghost',
    Danger: 'danger',
  };
  const sizeLookUp = {
    'Large': 'lg',
    'Medium': 'md',
    'Small': 'sm',
    'Extra small': 'xs',
  };

  const modeVariantLookup = {
    Primary: 'primary',
    Secondary: 'secondary',
  };

  const typeLookup = {
    Button: 'button',
    Submit: 'submit',
    Reset: 'reset',
  };

  return formatHtmlPreview(
    `
    <style>
    /* demo-wrapper is for demonstration purposes only*/
    .demo-wrapper{
      width: 100%;
    }
  </style>

  <div class="demo-wrapper">
    <tds-button
      type='${typeLookup[type]}'
      variant="${variantLookUp[variant]}"
      size="${sizeLookUp[size]}" ${disabled ? 'disabled' : ''} ${fullbleed ? 'fullbleed' : ''}
      ${!onlyIcon ? `text="${text}"` : ''}
      ${
        modeVariant !== 'Inherit from parent'
          ? `mode-variant="${modeVariantLookup[modeVariant]}"`
          : ''
      }
      animation="${animation}"
      tds-aria-label="${tdsAriaLabel}"
      name="${name}"
      value="${value}"
    >
        ${
          onlyIcon || (icon && icon !== 'none')
            ? `
            <tds-icon slot="icon" size='${
              sizeLookUp[size] === 'sm' ? '16px' : '20px'
            }' name='${icon}'></tds-icon>
            `
            : ''
        }        
    </tds-button>
  </div>
  <script>
        document.querySelector('tds-button').addEventListener('click', (event) => {
          console.log(event)
        })
  </script>
  `,
  );
};

/** Button as a web component */
export const Default = WebComponentTemplate.bind({});
