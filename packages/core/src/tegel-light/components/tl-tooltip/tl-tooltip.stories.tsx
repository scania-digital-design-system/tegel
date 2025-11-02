import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Tooltip',
  parameters: { layout: 'centered' },
  argTypes: {
    position: {
      name: 'Position',
      description: 'Tooltip position (relative to the trigger)',
      control: { type: 'radio' },
      options: ['Top-start', 'Top-end', 'Bottom-start', 'Bottom-end', 'Center'],
      table: { defaultValue: { summary: 'Top-start' } },
    },
    label: {
      name: 'Tooltip text',
      description: 'Text displayed inside the tooltip',
      control: 'text',
      table: { defaultValue: { summary: 'Tooltip text' } },
    },
    trigger: {
      name: 'Type of trigger event',
      description: 'How the tooltip should open',
      control: { type: 'radio' },
      options: ['Hover', 'Click'],
      table: { defaultValue: { summary: 'Hover' } },
    },
    offsetX: {
      name: 'Offset X',
      description: 'Horizontal offset (px)',
      control: { type: 'number', min: -64, max: 64, step: 1 },
      table: { defaultValue: { summary: 0 } },
    },
    offsetY: {
      name: 'Offset Y',
      description: 'Vertical offset (px)',
      control: { type: 'number', min: 0, max: 64, step: 1 },
      table: { defaultValue: { summary: 8 } },
    },
  },
  args: { position: 'Top-start', label: 'Tooltip text', trigger: 'hover', offsetX: 0, offsetY: 8 },
};
const positionLookup = {
  'Bottom-start': 'bottom-start',
  'Bottom-end': 'bottom-end',
  'Top-start': 'top-start',
  'Top-end': 'top-end',
  'Center': 'center',
};

const Template = ({ position, label, trigger, offsetX, offsetY }) =>
  formatHtmlPreview(`
    <div style="height:240px;display:flex;align-items:center;justify-content:center;">
      <span id="tl-tooltip" class="tl-tooltip tl-tooltip--${positionLookup[position]}">
        <button id="tl-tooltip-btn" class="tl-button tl-button--primary tl-button--sm" type="button">
          ${trigger.toLowerCase() === 'hover' ? 'Hover me' : 'Click me'}
        </button>
        <span class="tl-tooltip__inner" role="tooltip">${label}</span>
      </span>
    </div>
    <style>
      .tl-tooltip {
        --tl-tooltip-offset-x: ${offsetX}px;
        --tl-tooltip-offset-y: ${offsetY}px;
      }
    </style>
    <script>
      (function () {
        const wrap = document.getElementById('tl-tooltip');
        const btn = document.getElementById('tl-tooltip-btn');
        if (!wrap || !btn) return;

        const show = () => wrap.classList.add('tl-tooltip--visible');
        const hide = () => wrap.classList.remove('tl-tooltip--visible');

        if ("${trigger}".toLowerCase() === "hover") {
          btn.addEventListener('mouseenter', show);
          btn.addEventListener('mouseleave', hide);
          btn.addEventListener('focus', show);
          btn.addEventListener('blur', hide);
        } else {
          let open = false;
          btn.addEventListener('click', () => {
            open = !open;
            wrap.classList.toggle('tl-tooltip--visible', open);
          });
          document.addEventListener('click', (e) => {
            if (!btn.contains(e.target) && !wrap.contains(e.target)) {
              open = false;
              hide();
            }
          });
        }
      })();
    </script>
  `);

export const Default = Template.bind({});
