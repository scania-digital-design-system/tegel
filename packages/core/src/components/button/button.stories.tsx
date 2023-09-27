import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { iconsNames } from '../icon/iconsArray';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Button`,
  parameters: {
    notes: readme,
    layout: 'padded',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=1574%3A72148&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=1574%3A72148&t=rVXuTOgTmXPauyHd-1',
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
  },
  args: {
    modeVariant: 'Inherit from parent',
    type: 'Button',
    variant: 'Primary',
    size: 'Large',
    text: 'Button',
    fullbleed: false,
    onlyIcon: false,
    icon: 'none',
    disabled: false,
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
