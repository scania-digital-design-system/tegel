import formatHtmlPreview from '../../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Tabs/Folder Tabs',
  parameters: { backgrounds: { default: 'white' }, layout: 'padded' },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      control: { type: 'radio' },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: { defaultValue: { summary: 'Inherit from parent' } },
    },
    showLeftButton: {
      name: 'Show left scroll button',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    showRightButton: {
      name: 'Show right scroll button',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: false } },
    },
    selectedIndex: {
      name: 'Selected index',
      control: { type: 'radio' },
      options: [0, 1, 2, 3],
      table: { defaultValue: { summary: 0 } },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    showLeftButton: false,
    showRightButton: false,
    selectedIndex: 0,
  },
};

const Template = ({ modeVariant, showLeftButton, showRightButton, selectedIndex }) => {
  const modeClass =
    modeVariant !== 'Inherit from parent' ? `tl-folder-tabs--${modeVariant.toLowerCase()}` : '';

  const labels = ['First tab', 'Second tab is muuuuuuch longer', 'Third tab', 'Fourth tab'];

  const tabsHtml = labels
    .map((label, i) => {
      const isDisabled = i === 3;
      const isSelected = i === Number(selectedIndex) && !isDisabled;

      const classes = [
        'tl-folder-tabs__tab',
        isSelected ? 'tl-folder-tabs__tab--selected' : '',
        isDisabled ? 'tl-folder-tabs__tab--disabled' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return `
        <button class="${classes}">${label}</button>
      `;
    })
    .join('');

  const leftBtn = showLeftButton
    ? `
        <button class="tl-folder-tabs__scroll-btn tl-folder-tabs__scroll-btn--left">
          <span class="tl-icon tl-icon--chevron_left tl-icon--20"></span>
        </button>
      `
    : '';

  const rightBtn = showRightButton
    ? `
        <button class="tl-folder-tabs__scroll-btn tl-folder-tabs__scroll-btn--right">
          <span class="tl-icon tl-icon--chevron_right tl-icon--20"></span>
        </button>
      `
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-folder-tab.css";
      "@scania/tegel-light/tl-folder-tabs.css";
      "@scania/tegel-light/tl-icon.css"
    -->

    <div class="tl-folder-tabs ${modeClass}">
      <div class="tl-folder-tabs__wrapper">
        ${leftBtn}
        ${tabsHtml}
        ${rightBtn}
      </div>
    </div>

    <!-- The script below is just for demo purposes -->
    <script>
      (function () {
        const containers = document.querySelectorAll('.tl-folder-tabs');
        const container = containers[containers.length - 1];
        if (!container) return;

        const tabs = container.querySelectorAll('.tl-folder-tabs__tab');
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            if (tab.classList.contains('tl-folder-tabs__tab--disabled')) return;
            tabs.forEach(t => t.classList.remove('tl-folder-tabs__tab--selected'));
            tab.classList.add('tl-folder-tabs__tab--selected');
          });
        });
      })();
    </script>
  `);
};

export const Default = Template.bind({});
