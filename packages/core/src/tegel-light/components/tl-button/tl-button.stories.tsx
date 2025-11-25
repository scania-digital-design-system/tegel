import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';
// import readme from './readme.md';

export default {
  title: 'Tegel Light (CSS)/Button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    fullwidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onlyIcon: {
      control: { type: 'boolean' },
      description: 'Button with only an icon (no text) - not available for xs size',
      if: { arg: 'size', neq: 'xs' },
    },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed on the Button.',
      control: { type: 'select' },
      options: iconsNames,
      table: {
        defaultValue: { summary: 'placeholder' },
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    fullwidth: false,
    disabled: false,
    onlyIcon: false,
    icon: 'none',
  },
};

const Template = ({ variant, size, fullwidth, disabled, onlyIcon, icon }) => {
  // Disable icon functionality for xs size
  const isXs = size === 'xs';
  const iconClass = !isXs && icon !== 'none' ? `tl-button--icon` : '';
  const iconSize = size === 'lg' || size === 'md' ? 20 : 16;
  const onlyIconClass = !isXs && onlyIcon ? 'tl-button--only-icon' : '';
  const iconElement =
    !isXs && icon !== 'none'
      ? `<span class="tl-icon tl-icon--${icon} tl-icon--${iconSize}" aria-hidden="true"></span>`
      : '';
  const labelElement = !onlyIcon || isXs ? '<span class="tl-button__label">Button</span>' : '';
  const ariaLabel = !isXs && onlyIcon ? ' aria-label="Button"' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-button.css";
      "@scania/tegel-light/tl-icon.css";
    -->
      <button class="tl-button ${onlyIconClass} tl-button--${variant} tl-button--${size} 
        ${fullwidth ? 'tl-button--fullwidth' : ''} 
        ${disabled ? 'tl-button--disabled' : ''}
        ${iconClass}"
        ${disabled ? 'disabled' : ''}${ariaLabel}>
        ${labelElement}
        ${iconElement}
      </button>
    `);
};

export const Default = Template.bind({});
