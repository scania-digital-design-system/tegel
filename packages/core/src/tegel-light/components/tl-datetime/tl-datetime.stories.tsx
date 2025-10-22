import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Datetime',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      control: { type: 'radio' },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
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
      options: ['No label', 'Inside', 'Outside'],
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
    modeVariant: 'Inherit from parent',
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

  const classesArray = ['tl-datetime'];

  if (modeVariant !== 'Inherit from parent') {
    classesArray.push(`tl-datetime--${modeVariant.toLowerCase()}`);
  }

  classesArray.push(`tl-datetime--${sizeLookup[size]}`);

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
  } else {
    classesArray.push('tl-datetime--label-none');
  }

  if (disabled) {
    classesArray.push('tl-datetime--disabled');
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
    helperHtml = `<div class="tl-datetime__helper"><span class="tl-icon tl-icon--error tl-icon--16"></span>${helper}</div>`;
  }

  const disabledAttr = disabled ? 'disabled' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-datetime.css"
      "@scania/tegel-light/tl-icon.css"
    -->


  <style>
    .demo-wrapper { width: calc(100vw - 40px); max-width: 400px; }
  </style>

  <div class="demo-wrapper">
    <div class="${classes}">
      ${labelOutside}
      <div class="tl-datetime__container">
        <input
          class="tl-datetime__input"
          type="${typeLookup[type]}"
          ${disabledAttr}
        />
        <span class="tl-datetime__icon tl-datetime__icon--datetime"><span class="tl-icon tl-icon--calendar tl-icon--20"></span></span>
        <span class="tl-datetime__icon tl-datetime__icon--time"><span class="tl-icon tl-icon--clock tl-icon--20"></span></span>
        <span class="tl-datetime__bar"></span>
        ${labelInside}
      </div>
      ${helperHtml}
    </div>
  </div>
  `);
};

export const Default = Template.bind({});
