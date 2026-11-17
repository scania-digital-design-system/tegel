export default {
  title: 'Tegel Lite/Stepper',
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
    width: {
      name: 'Width',
      description: 'Width of the container for demonstration purposes',
      control: {
        type: 'radio',
      },
      options: ['600px', '700px', '800px', '900px', 'not defined'],
      if: { arg: 'orientation', eq: 'Horizontal' },
      table: {
        defaultValue: { summary: 'not defined' },
      },
    },
    height: {
      name: 'Height',
      description: 'Height of the container for demonstration purposes',
      control: {
        type: 'radio',
      },
      options: ['300px', '400px', '500px', '600px', 'not defined'],
      if: { arg: 'orientation', eq: 'Vertical' },
      table: {
        defaultValue: { summary: 'not defined' },
      },
    },
  },
  args: {
    size: 'Large',
    orientation: 'Horizontal',
    labelPosition: 'Below',
    hideLabels: false,
    width: 'not defined',
    height: 'not defined',
  },
};

const Template = ({ size, orientation, labelPosition, hideLabels, width, height }) => {
  const widthStyle = width !== 'not defined' ? `width: ${width};` : '';
  const heightStyle = height !== 'not defined' ? `height: ${height};` : '';

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
        <li class="tl-stepper__step ${state || ''}">
          <div class="tl-stepper__node">${nodeContent}</div>
          <div class="tl-stepper__label">${label}</div>
        </li>
      `;
    })
    .join('');

  return `
    <!-- Required stylesheets
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/scania-variables.css" (or traton-variables.css)
      "@scania/tegel-lite/tl-stepper.css";
    -->

    <div style="${widthStyle} ${heightStyle}">
      <div class="${containerClasses}">
        <ol class="tl-stepper__list">
          ${items}
        </ol>
      </div>
    </div>
  `;
};

export const Default = Template.bind({});
