import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';

export default {
  title: 'Tegel Light (CSS)/Link',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    underline: {
      name: 'Underline',
      description: 'Adds an underline under the Link text.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Link.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    standalone: {
      name: 'Standalone',
      description: 'Makes the link standalone with different typography.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed on the Link.',
      control: {
        type: 'select',
      },
      options: iconsNames,
      table: {
        defaultValue: { summary: 'placeholder' },
      },
    },
  },
  args: {
    underline: false,
    disabled: false,
    standalone: false,
    icon: 'placeholder',
  },
};

const LinkTemplate = ({ underline, disabled, standalone, icon }) => {
  const underlineClass = underline ? 'tl-link--underline' : '';
  const disabledClass = disabled ? 'tl-link--disabled' : '';
  const standaloneClass = standalone ? 'tl-link--standalone' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-light/tl-link.css"
    -->
    <a href="https://tegel.scania.com" target="_blank" class="tl-link ${standaloneClass} ${underlineClass} ${disabledClass}">
      Tegel
      ${
        icon
          ? `<span class="tl-link__icon"><span class="tl-icon tl-icon--${icon} tl-icon--16" aria-hidden="true"></span></span>`
          : ''
      }
    </a>
  `);
};

export const Default = LinkTemplate.bind({});
Default.args = {
  underline: false,
  disabled: false,
  standalone: false,
  icon: 'placeholder',
};
