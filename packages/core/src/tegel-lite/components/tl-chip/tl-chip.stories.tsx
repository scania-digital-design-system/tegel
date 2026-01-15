import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';

export default {
  title: 'Tegel Lite (CSS)/Chip',
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Large', 'Small'],
      table: { defaultValue: { summary: 'Large' } },
    },
    label: { name: 'Label text', control: { type: 'text' } },

    showIcon: {
      name: 'Show icon',
      description: 'Enable to show an icon inside the Chip (demo only).',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed inside the Chip.',
      control: { type: 'select' },
      options: ['none', ...iconsNames],
      table: { defaultValue: { summary: 'none' } },
      if: { arg: 'showIcon', eq: true },
    },
    iconPosition: {
      name: 'Icon position',
      control: { type: 'radio' },
      options: ['Prefix', 'Suffix'],
      table: { defaultValue: { summary: 'Prefix' } },
      if: { arg: 'showIcon', eq: true },
    },

    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    selected: {
      name: 'Selected',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: true } },
    },
  },
  args: {
    size: 'Large',
    label: 'Label',
    showIcon: false,
    icon: 'none',
    iconPosition: 'Prefix',
    disabled: false,
    selected: true,
  },
};

const Template = ({ size, label, showIcon, icon, iconPosition, disabled, selected }) => {
  const sizeClass = size === 'Small' ? 'tl-chip--sm' : 'tl-chip--lg';
  const selectedClass = selected ? ' tl-chip--selected' : '';

  const hasIcon = Boolean(showIcon && icon && icon !== 'none');
  const prefixMod = hasIcon && iconPosition === 'Prefix' ? ' tl-chip--prefix' : '';
  const suffixMod = hasIcon && iconPosition === 'Suffix' ? ' tl-chip--suffix' : '';

  const iconHtml = hasIcon ? `<span class="tl-icon tl-icon--${icon} tl-icon--16"></span>` : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-chip.css"
    -->

    <!-- Optional stylesheet (only if you showcase icons)
      "@scania/tegel-lite/tl-icon.css"
    -->

    <div class="demo-wrapper" style="display: flex; gap: 8px; flex-wrap: wrap;">
      <button class="tl-chip ${sizeClass}${selectedClass}${prefixMod}${suffixMod}" ${
    disabled ? 'disabled' : ''
  }>
        ${hasIcon && iconPosition === 'Prefix' ? iconHtml : ''}${label} 1${
    hasIcon && iconPosition === 'Suffix' ? iconHtml : ''
  }
      </button>
      <button class="tl-chip ${sizeClass}${prefixMod}${suffixMod}" ${disabled ? 'disabled' : ''}>
        ${hasIcon && iconPosition === 'Prefix' ? iconHtml : ''}${label} 2${
    hasIcon && iconPosition === 'Suffix' ? iconHtml : ''
  }
      </button>
      <button class="tl-chip ${sizeClass}${prefixMod}${suffixMod}" ${disabled ? 'disabled' : ''}>
        ${hasIcon && iconPosition === 'Prefix' ? iconHtml : ''}${label} 3${
    hasIcon && iconPosition === 'Suffix' ? iconHtml : ''
  }
      </button>
    </div>

    <!-- The script below is just for demo purposes -->
    <script>
      (function () {
        const wrapper = document.querySelector('.demo-wrapper');
        if (!wrapper) return;

        const chips = wrapper.querySelectorAll(".tl-chip");
        chips.forEach((chip) => {
          chip.addEventListener("click", () => {
            if (chip.disabled) return;
            chips.forEach((c) => {
              c.classList.remove("tl-chip--selected");
            });
            chip.classList.add("tl-chip--selected");
          });
        });
      })();
    </script>
  `);
};

export const Default = Template.bind({});
