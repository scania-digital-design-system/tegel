import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Tooltip',
  parameters: { layout: 'centered' },
  argTypes: {
    position: {
      name: 'Position',
      control: { type: 'select' },
      options: [
        'Bottom-start',
        'Bottom',
        'Bottom-end',
        'Top-start',
        'Top',
        'Top-end',
        'Left-start',
        'Left',
        'Left-end',
        'Right-start',
        'Right',
        'Right-end',
      ],
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
    offsetSkidding: {
      name: 'Offset Skidding',
      control: { type: 'number', min: -64, max: 64 },
      table: { defaultValue: { summary: 0 } },
    },
    offsetDistance: {
      name: 'Offset Distance',
      control: { type: 'number', min: 0, max: 64 },
      table: { defaultValue: { summary: 8 } },
    },
  },
  args: {
    position: 'Top-start',
    label:
      'Multiple lines of tooltip - This is a tooltip that need a set of words to be able to formulate a sentence, that will be placed on multiple rows.',
    trigger: 'Hover',
    triggerElement: 'tl-button',
    offsetSkidding: 0,
    offsetDistance: 8,
  },
};

const positionLookup = {
  'Bottom-start': 'bottom-start',
  'Bottom': 'bottom',
  'Bottom-end': 'bottom-end',
  'Top-start': 'top-start',
  'Top': 'top',
  'Top-end': 'top-end',
  'Left-start': 'left-start',
  'Left': 'left',
  'Left-end': 'left-end',
  'Right-start': 'right-start',
  'Right': 'right',
  'Right-end': 'right-end',
};

const renderTrigger = (type: string, isClick: boolean) => {
  const label = isClick ? 'Click me' : 'Hover me';
  const normalized = type.toLowerCase();

  switch (normalized) {
    case 'tl-link':
      return `<a href="#" class="tl-link tl-tooltip-trigger" aria-describedby="tooltip-id">${label}</a>`;
    case 'tl-icon':
      return `
        <div class="tl-tooltip-trigger" role="button" tabindex="0" aria-describedby="tooltip-id"> 
          <span class="tl-icon tl-icon--info" ></span>
        </div>`;
    case 'tl-button':
    default:
      return `<button type="button" class="tl-button tl-button--sm tl-button--primary tl-tooltip-trigger" aria-describedby="tooltip-id">${label}</button>`;
  }
};

const Template = ({ position, label, trigger, triggerElement, offsetSkidding, offsetDistance }) =>
  formatHtmlPreview(`
      <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-tooltip.css"
    -->
      <!-- Optional stylesheets:
      "@scania/tegel-lite/tl-icon.css" (if using icon as trigger)
      "@scania/tegel-lite/tl-button.css" (if using button as trigger)
      "@scania/tegel-lite/tl-link.css" (if using link as trigger)
    -->
      
      ${renderTrigger(triggerElement, trigger.toLowerCase() === 'click')}
      
      <div
        id="tooltip-id"
        class="tl-tooltip tl-tooltip--${positionLookup[position]}"
        role="tooltip"
      >
        ${label}
      </div>

    <!-- Example JavaScript for positioning and showing/hiding tooltip -->
    <script>
      setTimeout(function () {
        const trigger = document.querySelector('.tl-tooltip-trigger');
        const tooltip = document.getElementById('tooltip-id');

        if (!trigger || !tooltip) return;

        // Simple positioning function
        const positionTooltip = () => {
          const triggerRect = trigger.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();
          const position = '${positionLookup[position]}';
          const offset = ${offsetDistance};
          const skidding = ${offsetSkidding};
          
          let top = 0;
          let left = 0;

          // Calculate position based on modifier
          if (position.startsWith('top')) {
            top = triggerRect.top - tooltipRect.height - offset;
            if (position === 'top') {
              left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
            } else if (position === 'top-start') {
              left = triggerRect.left + skidding;
            } else if (position === 'top-end') {
              left = triggerRect.right - tooltipRect.width + skidding;
            }
          } else if (position.startsWith('bottom')) {
            top = triggerRect.bottom + offset;
            if (position === 'bottom') {
              left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
            } else if (position === 'bottom-start') {
              left = triggerRect.left + skidding;
            } else if (position === 'bottom-end') {
              left = triggerRect.right - tooltipRect.width + skidding;
            }
          } else if (position.startsWith('left')) {
            left = triggerRect.left - tooltipRect.width - offset;
            if (position === 'left') {
              top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
            } else if (position === 'left-start') {
              top = triggerRect.top + skidding;
            } else if (position === 'left-end') {
              top = triggerRect.bottom - tooltipRect.height + skidding;
            }
          } else if (position.startsWith('right')) {
            left = triggerRect.right + offset;
            if (position === 'right') {
              top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
            } else if (position === 'right-start') {
              top = triggerRect.top + skidding;
            } else if (position === 'right-end') {
              top = triggerRect.bottom - tooltipRect.height + skidding;
            }
          }

          tooltip.style.top = top + 'px';
          tooltip.style.left = left + 'px';
        };

        const show = () => {
          positionTooltip();
          tooltip.classList.add('tl-tooltip--visible');
        };
        const hide = () => tooltip.classList.remove('tl-tooltip--visible');

        const isClick = "${trigger}".toLowerCase() === "click";

        if (isClick) {
          let open = false;
          trigger.addEventListener('click', (e) => {
            e.preventDefault?.();
            open = !open;
            if (open) {
              show();
            } else {
              hide();
            }
          });
          document.addEventListener('click', (e) => {
            if (!trigger.contains(e.target) && !tooltip.contains(e.target)) {
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

        // Reposition on scroll/resize
        window.addEventListener('scroll', () => {
          if (tooltip.classList.contains('tl-tooltip--visible')) {
            positionTooltip();
          }
        });
        window.addEventListener('resize', () => {
          if (tooltip.classList.contains('tl-tooltip--visible')) {
            positionTooltip();
          }
        });
      }, 0);
    </script>
  `);

export const Default = Template.bind({});
