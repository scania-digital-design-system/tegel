import formatHtmlPreview from '../../../stories/formatHtmlPreview';

const positionLookup: Record<string, string> = {
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

let tooltipAC: AbortController | null = null;

export default {
  title: 'Tegel Lite (Beta)/Tooltip',
  parameters: { layout: 'centered' },
  argTypes: {
    position: {
      name: 'Position',
      control: { type: 'select' },
      options: Object.keys(positionLookup),
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
    offsetDistance: 8,
    offsetSkidding: 0,
  },
  decorators: [
    (story: () => unknown, { args }: { args: Record<string, unknown> }) => {
      tooltipAC?.abort();
      tooltipAC = new AbortController();
      const { signal } = tooltipAC;

      // story() returns the HTML string — build DOM element ourselves so we
      // have a stable reference to query after Storybook mounts it.
      const html = story() as string;
      const el = document.createElement('div');
      el.innerHTML = html;

      setTimeout(() => {
        const triggerEl = el.querySelector<HTMLElement>('.tl-tooltip-trigger');
        const tooltip = el.querySelector<HTMLElement>('#tooltip-id');
        if (!triggerEl || !tooltip) return;

        const position = positionLookup[args.position as string] ?? 'top-start';
        const offset = (args.offsetDistance as number) ?? 8;
        const skidding = (args.offsetSkidding as number) ?? 0;

        const positionTooltip = () => {
          const tr = triggerEl.getBoundingClientRect();
          const tt = tooltip.getBoundingClientRect();
          let top = 0;
          let left = 0;

          if (position.startsWith('top')) {
            top = tr.top - tt.height - offset;
            if (position === 'top') left = tr.left + tr.width / 2 - tt.width / 2;
            else if (position === 'top-start') left = tr.left + skidding;
            else if (position === 'top-end') left = tr.right - tt.width + skidding;
          } else if (position.startsWith('bottom')) {
            top = tr.bottom + offset;
            if (position === 'bottom') left = tr.left + tr.width / 2 - tt.width / 2;
            else if (position === 'bottom-start') left = tr.left + skidding;
            else if (position === 'bottom-end') left = tr.right - tt.width + skidding;
          } else if (position.startsWith('left')) {
            left = tr.left - tt.width - offset;
            if (position === 'left') top = tr.top + tr.height / 2 - tt.height / 2;
            else if (position === 'left-start') top = tr.top + skidding;
            else if (position === 'left-end') top = tr.bottom - tt.height + skidding;
          } else if (position.startsWith('right')) {
            left = tr.right + offset;
            if (position === 'right') top = tr.top + tr.height / 2 - tt.height / 2;
            else if (position === 'right-start') top = tr.top + skidding;
            else if (position === 'right-end') top = tr.bottom - tt.height + skidding;
          }

          tooltip.style.top = `${top}px`;
          tooltip.style.left = `${left}px`;
        };

        const show = () => {
          positionTooltip();
          tooltip.classList.add('tl-tooltip--visible');
        };
        const hide = () => tooltip.classList.remove('tl-tooltip--visible');

        if ((args.trigger as string).toLowerCase() === 'click') {
          let open = false;
          triggerEl.addEventListener(
            'click',
            (e) => {
              e.preventDefault();
              open = !open;
              if (open) show();
              else hide();
            },
            { signal },
          );
          document.addEventListener(
            'click',
            (e) => {
              if (!triggerEl.contains(e.target as Node) && !tooltip.contains(e.target as Node)) {
                open = false;
                hide();
              }
            },
            { signal },
          );
        } else {
          triggerEl.addEventListener('mouseenter', show, { signal });
          triggerEl.addEventListener('mouseleave', hide, { signal });
          triggerEl.addEventListener('focus', show, { signal });
          triggerEl.addEventListener('blur', hide, { signal });
        }

        window.addEventListener(
          'scroll',
          () => {
            if (tooltip.classList.contains('tl-tooltip--visible')) positionTooltip();
          },
          { signal },
        );
        window.addEventListener(
          'resize',
          () => {
            if (tooltip.classList.contains('tl-tooltip--visible')) positionTooltip();
          },
          { signal },
        );
      }, 0);

      return el;
    },
  ],
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
