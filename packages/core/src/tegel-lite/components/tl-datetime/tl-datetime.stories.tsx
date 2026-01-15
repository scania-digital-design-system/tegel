import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Datetime',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Primary' },
      },
    },
    state: {
      name: 'State',
      control: { type: 'radio' },
      options: ['None', 'Success', 'Error'],
    },
    type: {
      name: 'Type',
      control: { type: 'radio' },
      options: ['Datetime', 'Date', 'Month', 'Week', 'Time'],
    },
    size: {
      name: 'Size',
      control: { type: 'radio' },
      options: ['Large', 'Medium', 'Small'],
    },
    noMinWidth: {
      name: 'No minimum width',
      control: { type: 'boolean' },
    },
    label: {
      name: 'Label text',
      control: { type: 'text' },
    },
    labelPosition: {
      name: 'Label position',
      control: { type: 'radio' },
      options: ['Outside', 'Inside', 'No label'],
    },
    helper: {
      name: 'Helper text',
      control: { type: 'text' },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
    },
  },
  args: {
    modeVariant: 'Primary',
    state: 'None',
    type: 'Datetime',
    size: 'Large',
    noMinWidth: false,
    label: 'Label text',
    labelPosition: 'Outside',
    helper: 'Helper text',
    disabled: false,
  },
};

const Template = ({
  modeVariant,
  state,
  type,
  size,
  noMinWidth,
  label,
  labelPosition,
  helper,
  disabled,
}) => {
  const typeLookup = {
    Datetime: 'datetime-local',
    Date: 'date',
    Month: 'month',
    Week: 'week',
    Time: 'time',
  };
  const sizeLookup = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  };
  const stateLookup = {
    None: '',
    Success: 'success',
    Error: 'error',
  };

  const classesArray = [
    'tl-datetime',
    `tl-datetime--${modeVariant.toLowerCase()}`,
    `tl-datetime--${sizeLookup[size]}`,
  ];

  if (stateLookup[state]) {
    classesArray.push(`tl-datetime--${stateLookup[state]}`);
  }

  if (noMinWidth) {
    classesArray.push('tl-datetime--no-min-width');
  }

  if (labelPosition === 'Inside') {
    classesArray.push('tl-datetime--label-inside');
  } else if (labelPosition === 'Outside') {
    classesArray.push('tl-datetime--label-outside');
  }

  const classes = classesArray.join(' ');

  let labelOutside = '';
  if (label && labelPosition === 'Outside') {
    labelOutside = `<label class="tl-datetime__label">${label}</label>`;
  }

  let labelInside = '';
  if (label && labelPosition === 'Inside') {
    labelInside = `<label class="tl-datetime__label-inside">${label}</label>`;
  }

  let helperHtml = '';
  if (helper) {
    helperHtml = `<div class="tl-datetime__helper">${helper}</div>`;
  }

  const disabledAttr = disabled ? 'disabled' : '';

  // Show calendar icon for date-related types, clock icon for time
  const iconHtml =
    type === 'Time'
      ? '<span class="tl-datetime__icon tl-datetime__icon--time"><span class="tl-icon tl-icon--clock tl-icon--20"></span></span>'
      : '<span class="tl-datetime__icon tl-datetime__icon--datetime"><span class="tl-icon tl-icon--calendar tl-icon--20"></span></span>';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-datetime.css"
    -->


  <style>
    .demo-wrapper { width: calc(100vw - 40px); max-width: 400px; }
  </style>

  <div class="demo-wrapper">
    <div class="${classes}">
      ${labelOutside}
      <div class="tl-datetime__wrapper">
        <input
          class="tl-datetime__input"
          type="${typeLookup[type]}"
          ${disabledAttr}
        />
        ${iconHtml}
        ${labelInside}
      </div>
      ${helperHtml}
    </div>
    ${helperHtml}
  </div>
  `);
};

export const Default = Template.bind({});
