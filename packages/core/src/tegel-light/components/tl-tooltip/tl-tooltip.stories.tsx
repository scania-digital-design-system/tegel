import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Tooltip',
  parameters: { layout: 'centered' },
  argTypes: {
    position: {
      name: 'Position',
      control: { type: 'radio' },
      options: ['Top-start', 'Top-end', 'Bottom-start', 'Bottom-end', 'Center'],
      table: { defaultValue: { summary: 'Top-start' } },
    },
    label: {
      name: 'Tooltip Text',
      control: 'text',
      table: { defaultValue: { summary: 'Tooltip content' } },
    },
    trigger: {
      name: 'Trigger Type',
      control: { type: 'radio' },
      options: ['Hover', 'Click'],
      table: { defaultValue: { summary: 'Hover' } },
    },
    triggerElement: {
      name: 'Trigger Element',
      control: { type: 'radio' },
      options: ['tl-button', 'tl-link', 'tl-icon'],
      table: { defaultValue: { summary: 'tl-button' } },
    },
    offsetX: {
      name: 'Offset X',
      control: { type: 'number', min: -64, max: 64 },
      table: { defaultValue: { summary: 0 } },
    },
    offsetY: {
      name: 'Offset Y',
      control: { type: 'number', min: 0, max: 64 },
      table: { defaultValue: { summary: 8 } },
    },
  },
  args: {
    position: 'Top-start',
    label: 'Tooltip content',
    trigger: 'Hover',
    triggerElement: 'tl-button',
    offsetX: 0,
    offsetY: 8,
  },
};

const positionLookup = {
  'Bottom-start': 'bottom-start',
  'Bottom-end': 'bottom-end',
  'Top-start': 'top-start',
  'Top-end': 'top-end',
  'Center': 'center',
};

const renderTrigger = (type: string, isClick: boolean) => {
  const label = isClick ? 'Click me' : 'Hover me';
  const normalized = type.toLowerCase();

  switch (normalized) {
    case 'tl-link':
      return `<a href="#" class="tl-link tl-tooltip-trigger" aria-describedby="tooltip-id">${label}</a>`;
    case 'tl-icon':
      return `
        <div class="tl-tooltip-trigger" role="button" tabindex="0" aria-describedby="tooltip-id" style="display:inline-flex;align-items:center;">
          <span class="tl-icon tl-icon--info" ></span>
        </div>`;
    case 'tl-button':
    default:
      return `<button type="button" class="tl-button tl-button--sm tl-button--primary tl-tooltip-trigger" aria-describedby="tooltip-id">${label}</button>`;
  }
};

const Template = ({ position, label, trigger, triggerElement, offsetX, offsetY }) =>
  formatHtmlPreview(`
    <div style="height:240px;display:flex;align-items:center;justify-content:center;">
      <div class="tl-tooltip">
        ${renderTrigger(triggerElement, trigger.toLowerCase() === 'click')}
        <div
          id="tooltip-id"
          class="tl-tooltip__popup tl-tooltip__popup--${positionLookup[position]}"
          role="tooltip"
        >
          ${label}
        </div>
      </div>
    </div>

    <style>
      .tl-tooltip__popup {
        --tl-tooltip-offset-x: ${offsetX}px;
        --tl-tooltip-offset-y: ${offsetY}px;
      }
    </style>

    <script>
      setTimeout(function () {
        const wrapper = document.querySelector('.tl-tooltip');
        const trigger = wrapper?.querySelector('.tl-tooltip-trigger');
        const tooltip = wrapper?.querySelector('.tl-tooltip__popup');

        if (!wrapper || !trigger || !tooltip) return;

        const show = () => tooltip.classList.add('tl-tooltip__popup--visible');
        const hide = () => tooltip.classList.remove('tl-tooltip__popup--visible');

        const isClick = "${trigger}".toLowerCase() === "click";

        if (isClick) {
          let open = false;
          trigger.addEventListener('click', (e) => {
            e.preventDefault?.();
            open = !open;
            tooltip.classList.toggle('tl-tooltip__popup--visible', open);
          });
          document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
              open = false;
              hide();
            }
          });
        } else {
          trigger.addEventListener('mouseenter', show);
          trigger.addEventListener('mouseleave', hide);
          trigger.addEventListener('focus', show);
          trigger.addEventListener('blur', hide);
        }
      }, 0);
    </script>
  `);

export const Default = Template.bind({});
