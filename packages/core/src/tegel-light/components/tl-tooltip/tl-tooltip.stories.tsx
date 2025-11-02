import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Tooltip',
  parameters: { layout: 'centered' },
  argTypes: {
    position: {
      name: 'Position',
      description: 'Tooltip position (relative to the trigger)',
      control: { type: 'select' },
      options: ['top-start', 'top-end', 'bottom-start', 'bottom-end', 'center'],
      table: { defaultValue: { summary: 'top-start' } },
    },
    label: {
      name: 'Tooltip text',
      description: 'Text displayed inside the tooltip',
      control: 'text',
      table: { defaultValue: { summary: 'Tooltip text' } },
    },
  },
  args: { position: 'top-start', label: 'Tooltip text' },
};

const Template = ({ position, label }) =>
  formatHtmlPreview(`
    <!-- Required styles:
      "@scania/tegel-light/tl-button.css"
      "@scania/tegel-light/tl-tooltip.css"
    -->
    <div style="height:240px;display:flex;align-items:center;justify-content:center;">
      <span id="tl-tooltip" class="tl-tooltip tl-tooltip--${position}">
        <button id="tl-tooltip-btn" class="tl-button tl-button--primary tl-button--sm" type="button">
          Hover me
        </button>
        <span class="tl-tooltip__inner" role="tooltip">${label}</span>
      </span>
    </div>

    <script>
      (function () {
        const wrap = document.getElementById('tl-tooltip');
        const btn = document.getElementById('tl-tooltip-btn');
        if (!wrap || !btn) return;
        const show = () => wrap.classList.add('tl-tooltip--visible');
        const hide = () => wrap.classList.remove('tl-tooltip--visible');
        btn.addEventListener('mouseenter', show);
        btn.addEventListener('mouseleave', hide);
        btn.addEventListener('focus', show);
        btn.addEventListener('blur', hide);
      })();
    </script>
  `);

export const Default = Template.bind({});
