import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';
// import readme from './readme.md';

export default {
  title: 'Tegel Lite (Beta)/Button',
  argTypes: {
    variant: {
      name: 'Variant',
      description:
        'Four different Button variants to help the user to distinguish the level of importance of the task they represent.',
      control: {
        type: 'radio',
      },
      options: ['Primary', 'Secondary', 'Ghost', 'Danger'],
      table: {
        defaultValue: { summary: 'Primary' },
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
        defaultValue: { summary: 'Medium' },
      },
    },
    fullWidth: {
      name: 'Full width',
      description: 'Sets a fluid width on the Button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
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
  },
  args: {
    variant: 'Primary',
    size: 'Medium',
    fullWidth: false,
    disabled: false,
    onlyIcon: false,
    icon: 'none',
  },
};

const Template = ({ variant, size, fullWidth, disabled, onlyIcon, icon }) => {
  // Convert display values to CSS values
  const sizeMap = {
    'Large': 'lg',
    'Medium': 'md',
    'Small': 'sm',
    'Extra small': 'xs',
  };
  const variantMap = {
    Primary: 'primary',
    Secondary: 'secondary',
    Ghost: 'ghost',
    Danger: 'danger',
  };

  const sizeValue = sizeMap[size];
  const variantValue = variantMap[variant];
  const isXs = sizeValue === 'xs';
  const iconClass = !isXs && icon !== 'none' ? `tl-button--icon` : '';
  const iconSize = sizeValue === 'lg' || sizeValue === 'md' ? 20 : 16;
  const onlyIconClass = !isXs && onlyIcon ? 'tl-button--only-icon' : '';
  const iconElement =
    !isXs && icon !== 'none'
      ? `<span class="tl-icon tl-icon--${icon} tl-icon--${iconSize}" aria-hidden="true"></span>`
      : '';
  const buttonText = !onlyIcon || isXs ? 'Button' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-button.css";
      "@scania/tegel-lite/tl-icon.css";
    -->
      <button class="tl-button ${onlyIconClass} tl-button--${variantValue} tl-button--${sizeValue} 
        ${fullWidth ? 'tl-button--full-width' : ''} 
        ${iconClass}"
        ${disabled ? 'disabled' : ''}>
        ${buttonText}
        ${iconElement}
      </button>
    `);
};

export const Default = Template.bind({});
