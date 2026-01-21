import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Stepper',
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

  const iconSizeClass = size === 'Large' ? 'tl-icon--20' : 'tl-icon--16';

  const items = steps
    .map(({ label, state, index }) => {
      const nodeInner =
        state === 'tl-stepper__step--success' || state === 'tl-stepper__step--error'
          ? `<span class="tl-icon tl-icon--${
              state === 'tl-stepper__step--success' ? 'tick' : 'warning'
            } ${iconSizeClass}"></span>`
          : String(index);

      return `
        <li class="tl-stepper__step ${state || ''}">
          <div class="tl-stepper__content">
            <div class="tl-stepper__node">${nodeInner}</div>
            <div class="tl-stepper__label">${label}</div>
          </div>
        </li>
      `;
    })
    .join('');

  return formatHtmlPreview(`
    <!-- Required stylesheets
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-step.css";
      "@scania/tegel-lite/tl-stepper.css";
    -->

    <!-- Optional stylesheet
      "@scania/tegel-lite/tl-icon.css"
    -->

    <div class="${containerClasses}">
      <ol class="tl-stepper__list">
        ${items}
      </ol>
    </div>
  `);
};

export const Default = Template.bind({});
