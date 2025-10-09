import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Stepper',
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

  const sizeFlag = size === 'Large' ? 'tl-stepper__content--lg' : 'tl-stepper__content--sm';
  const sizeFlagLabel = size === 'Large' ? 'tl-stepper__label--lg' : 'tl-stepper__label--sm';
  const orientFlag =
    orientation === 'Vertical'
      ? 'tl-stepper__content--vertical'
      : 'tl-stepper__content--horizontal';

  const getTextFlag = () => {
    if (orientation !== 'Horizontal') {
      return '';
    }
    if (labelPosition === 'Aside') {
      return 'tl-stepper__content--text-aside';
    }
    return 'tl-stepper__content--text-below';
  };
  const textFlag = getTextFlag();

  const hideFlag = hideLabels ? 'tl-stepper__content--hide-labels' : '';

  const steps = [
    {
      label: 'Success step',
      state: 'tl-stepper__node--success',
      index: 1,
    },
    {
      label: 'Error step',
      state: 'tl-stepper__node--error',
      index: 2,
    },
    {
      label: 'Current step',
      state: 'tl-stepper__node--current',
      index: 3,
    },
    {
      label: 'Upcoming step',
      state: 'tl-stepper__node--upcoming',
      index: 4,
    },
  ];

  const iconSizeClass = size === 'Large' ? 'tl-icon--20' : 'tl-icon--16';

  const items = steps
    .map(({ label, state, index }) => {
      const contentFlags = [sizeFlag, orientFlag, textFlag, hideFlag].filter(Boolean).join(' ');
      const labelSizeClass = sizeFlagLabel;
      const labelUpcoming =
        state === 'tl-stepper__node--upcoming' ? 'tl-stepper__label--upcoming' : '';

      const nodeInner =
        state === 'tl-stepper__node--success' || state === 'tl-stepper__node--error'
          ? `<span class="tl-icon tl-icon--${
              state === 'tl-stepper__node--success' ? 'tick' : 'warning'
            } ${iconSizeClass}"></span>`
          : String(index);

      return `
        <li class="tl-stepper__step">
          <div class="tl-stepper__content ${contentFlags}">
            <div class="tl-stepper__node ${state || ''}">${nodeInner}</div>
            <div class="tl-stepper__label ${labelSizeClass} ${labelUpcoming}">${label}</div>
          </div>
        </li>
      `;
    })
    .join('');

  return formatHtmlPreview(`
    <!-- Required stylesheets
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-step.css";
      "@scania/tegel-light/tl-stepper.css";
    -->

    <!-- Optional stylesheet
      "@scania/tegel-light/tl-icon.css"
    -->

    <div class="${containerClasses}">
      <ol class="tl-stepper__list">
        ${items}
      </ol>
    </div>
  `);
};

export const Default = Template.bind({});
