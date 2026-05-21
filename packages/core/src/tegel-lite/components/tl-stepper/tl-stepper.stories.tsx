import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Stepper',
  parameters: {
    backgrounds: {
      default: 'white',
    },
    layout: 'centered',
  },
  argTypes: {
    size: {
      name: 'Size',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: {
          summary: 'Large',
        },
      },
    },
    orientation: {
      name: 'Orientation',
      control: {
        type: 'radio',
      },
      options: ['Horizontal', 'Vertical'],
      table: {
        defaultValue: {
          summary: 'Horizontal',
        },
      },
    },
    labelPosition: {
      name: 'Text position',
      description: 'Only for Horizontal',
      control: {
        type: 'radio',
      },
      options: ['Below', 'Aside'],
      if: {
        arg: 'orientation',
        neq: 'Vertical',
      },
      table: {
        defaultValue: {
          summary: 'Below',
        },
      },
    },
    hideLabels: {
      name: 'Hide labels',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  args: {
    size: 'Large',
    orientation: 'Horizontal',
    labelPosition: 'Below',
    hideLabels: false,
  },
};

const Template = ({ size, orientation, labelPosition, hideLabels }) => {
  const containerClasses = [
    'tl-stepper',
    orientation === 'Vertical' ? 'tl-stepper--vertical' : 'tl-stepper--horizontal',
    orientation === 'Horizontal' ? `tl-stepper--label-${labelPosition.toLowerCase()}` : '',
    hideLabels ? 'tl-stepper--hide-labels' : '',
    size === 'Large' ? 'tl-stepper--lg' : 'tl-stepper--sm',
  ]
    .filter(Boolean)
    .join(' ');

  const steps = [
    {
      label: 'Success step',
      state: 'tl-stepper__step--success',
      index: 1,
    },
    {
      label: 'Error step',
      state: 'tl-stepper__step--error',
      index: 2,
    },
    {
      label: 'Current step',
      state: 'tl-stepper__step--current',
      index: 3,
    },
    {
      label: 'Upcoming step',
      state: 'tl-stepper__step--upcoming',
      index: 4,
    },
  ];

  const items = steps
    .map(({ label, state, index }) => {
      const nodeContent =
        state === 'tl-stepper__step--success' || state === 'tl-stepper__step--error'
          ? '' // Icons are rendered via ::after pseudo-element
          : String(index);

      return `
        <li class="tl-stepper__step ${state || ''}" data-step-index="${index}" data-step-label="${label}">
          <div class="tl-stepper__node" role="button" tabindex="0" aria-label="${label}" style="cursor: pointer;">${nodeContent}</div>
          <div class="tl-stepper__label">${label}</div>
        </li>
      `;
    })
    .join('');

  return formatHtmlPreview(`
    <!-- Required stylesheets
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/scania-variables.css" (or traton-variables.css)
      "@scania/tegel-lite/tl-stepper.css";
    -->

    <div class="${containerClasses}">
      <ol class="tl-stepper__list">
        ${items}
      </ol>
    </div>

    <!-- Script tag for demo purposes -->
    <script>
      (function setupStepper() {
        try {
          const list = document.querySelector('.tl-stepper');
          if (!list) return;

          const states = ['success', 'current', 'upcoming'];

          const applyStates = (currentIndex) => {
            list.querySelectorAll('.tl-stepper__step').forEach((step) => {
              const idx = parseInt(step.dataset.stepIndex, 10);
              states.forEach((s) => step.classList.remove('tl-stepper__step--' + s));
              step.classList.remove('tl-stepper__step--error');
              const node = step.querySelector('.tl-stepper__node');

              if (idx < currentIndex) {
                step.classList.add('tl-stepper__step--success');
                if (node) node.textContent = '';
              } else if (idx === currentIndex) {
                step.classList.add('tl-stepper__step--current');
                if (node) node.textContent = String(idx);
              } else {
                step.classList.add('tl-stepper__step--upcoming');
                if (node) node.textContent = String(idx);
              }
            });
          };

          list.querySelectorAll('.tl-stepper__step').forEach((step) => {
            const node = step.querySelector('.tl-stepper__node');
            if (!node) return;
            const activate = () => applyStates(parseInt(step.dataset.stepIndex, 10));
            if (node._stepHandler) {
              node.removeEventListener('click', node._stepHandler);
              node.removeEventListener('keydown', node._stepKeyHandler);
            }
            node._stepHandler = (e) => { e.preventDefault(); activate(); };
            node._stepKeyHandler = (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
              }
            };
            node.addEventListener('click', node._stepHandler);
            node.addEventListener('keydown', node._stepKeyHandler);
          });
        } catch (error) {
          console.error('Error setting up stepper:', error);
        }
      })();
    </script>
  `);
};

export const Default = Template.bind({});
