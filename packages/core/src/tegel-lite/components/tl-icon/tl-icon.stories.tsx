import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';

const iconSizes = [
  12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58,
  60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96,
];

const iconSizeOptions = Object.fromEntries(iconSizes.map((s) => [`${s}px`, `${s}`]));
export default {
  title: 'Tegel Lite (CSS)/Icon',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      name: 'Icon name',
      control: { type: 'select' },
      options: iconsNames,
    },
    size: {
      name: 'Size',
      control: { type: 'select' },
      options: iconSizeOptions,
    },
  },
  args: {
    icon: 'info',
    size: '24',
  },
};

const Template = ({ icon, size }) =>
  formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-icon.css"
  -->
    <span class="tl-icon tl-icon--${icon} tl-icon--${size}" aria-hidden="true"></span>
  `);

export const Default = Template.bind({});
