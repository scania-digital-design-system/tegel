import formatHtmlPreview from '../../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Tabs/Inline Tabs',
  parameters: { backgrounds: { default: 'white' } },
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
    leftPadding: {
      name: 'Left Padding',
      description: 'Sets the custom left padding for the wrapper element. Accepts a numeric value.',
      control: { type: 'number' },
      table: { defaultValue: { summary: 32 } },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    showLeftButton: false,
    showRightButton: false,
    selectedIndex: 0,
    leftPadding: 32,
  },
};

const Template = ({ modeVariant, selectedIndex, leftPadding, showLeftButton, showRightButton }) => {
  const modeClass =
    modeVariant !== 'Inherit from parent' ? `tds-mode-variant-${modeVariant.toLowerCase()}` : '';

  const labels = ['First tab', 'Second tab is much longer', 'Third tab', 'Fourth tab'];

  const tabsHtml = labels
    .map((label, i) => {
      const isDisabled = i === 3;
      const isSelected = i === Number(selectedIndex) && !isDisabled;

      const buttonClasses = [
        'tl-inline-tabs__tab',
        isSelected ? 'tl-inline-tabs__tab--selected' : '',
        isDisabled ? 'tl-inline-tabs__tab--disabled' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return `
        <button class="${buttonClasses}">${label}</button>
      `;
    })
    .join('');

  const leftButton = showLeftButton
    ? `<button class="tl-inline-tabs__scroll-button tl-inline-tabs__scroll-button--left">
         <span class="tl-icon tl-icon--chevron_left tl-icon--20"></span>
       </button>`
    : '';

  const rightButton = showRightButton
    ? `<button class="tl-inline-tabs__scroll-button tl-inline-tabs__scroll-button--right">
         <span class="tl-icon tl-icon--chevron_right tl-icon--20"></span>
       </button>`
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-inline-tab.css";
      "@scania/tegel-lite/tl-inline-tabs.css";
      "@scania/tegel-lite/tl-icon.css"
    -->

    <div class="tl-inline-tabs ${modeClass}" style="padding-left: ${leftPadding}px;">
      <div class="tl-inline-tabs__wrapper">
        ${leftButton}
        ${tabsHtml}
        ${rightButton}
      </div>
    </div>

    <!-- The script below is just for demo purposes -->
    <script>
      (function () {
        const containers = document.querySelectorAll('.tl-inline-tabs');
        const container = containers[containers.length - 1];
        if (!container) return;

        const tabs = container.querySelectorAll('.tl-inline-tabs__tab');
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            if (tab.classList.contains('tl-inline-tabs__tab--disabled')) return;
            tabs.forEach(t => t.classList.remove('tl-inline-tabs__tab--selected'));
            tab.classList.add('tl-inline-tabs__tab--selected');
          });
        });
      })();
    </script>
  `);
};

export const Default = Template.bind({});
