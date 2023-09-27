import readme from './readme.md';
import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Datetime`,
  parameters: {
    layout: 'centered',
    notes: readme,
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10241%3A40193&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10241%3A40193&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    state: {
      name: 'State',
      description: 'Switches between success and error state.',
      control: {
        type: 'radio',
      },
      options: ['None', 'Success', 'Error'],
    },
    type: {
      name: 'Type',
      description: 'Sets the field to display date, time or both.',
      control: {
        type: 'radio',
      },
      options: ['Datetime', 'Date', 'Time'],
      table: {
        defaultValue: { summary: 'datetime-local' },
      },
    },
    size: {
      name: 'Size',
      description: 'Switches between different sizes.',
      control: {
        type: 'radio',
        // todo: make consistent with other sizes, for example 'xs', 'sm', etc
      },
      options: ['Large', 'Medium', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    defaultValue: {
      name: 'Default value',
      description:
        'Sets max value. Default value of the component. Format for time: HH-MM. Format for date: YY-MM-DD. Format for date-time: YY-MM-DDTHH-MM.',
      control: {
        type: 'radio',
      },
      options: ['None', 'Custom'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    minValue: {
      description:
        'Sets min value. Example for different types: datetime="2023-01-31T00:00" date="2023-01-01" time="15:00"',
      name: 'Min value',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: undefined },
      },
    },
    maxValue: {
      description:
        'Example for different types: datetime="2023-01-31T00:00" date="2023-01-01" time="15:00"',
      name: 'Max value',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: undefined },
      },
    },
    noMinWidth: {
      name: 'No minimum width',
      description: 'Enables component to shrink below 208px which is the default width.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    label: {
      name: 'Label text',
      description: 'Sets the label text.',
      control: {
        type: 'text',
      },
    },
    helper: {
      name: 'Helper text',
      description: 'Sets the helper text.',
      control: {
        type: 'text',
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the component.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    state: 'None',
    type: 'Datetime',
    size: 'Large',
    defaultValue: 'None',
    minValue: '',
    maxValue: '',
    noMinWidth: false,
    label: 'Label text',
    helper: 'Helper text',
    disabled: false,
  },
};

const datetimeTemplate = ({
  modeVariant,
  state,
  type,
  size,
  defaultValue,
  minValue,
  maxValue,
  noMinWidth,
  label,
  helper,
  disabled,
}) => {
  const typeLookup = {
    Datetime: 'datetime-local',
    Date: 'date',
    Time: 'time',
  };
  const sizeLookup = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  };
  const stateLookup = {
    None: 'none',
    Success: 'success',
    Error: 'error',
  };

  const getDefaultValue = (value: string, componentType: string) => {
    if (value === 'Custom') {
      switch (componentType) {
        case 'Datetime':
          return '1891-01-01T12:30';
        case 'Date':
          return '1891-01-01';
        case 'Time':
          return '12:30';
        default:
          return 'Invalid type';
      }
    } else return false;
  };

  return formatHtmlPreview(
    `
    <style>
        /* Note: Demo classes used here are just for demo purposes in Storybook */
        .demo-wrapper {
            width: 180px;
        }
    </style>

  <div class="demo-wrapper">

    <tds-datetime
      id="datetime"
      ${defaultValue !== 'None' ? `default-value="${getDefaultValue(defaultValue, type)}"` : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      type="${typeLookup[type]}"      
      ${minValue ? `min=${minValue}` : ''}
      ${maxValue ? `min=${maxValue}` : ''}
      size="${sizeLookup[size]}"
      state="${stateLookup[state]}"
      ${disabled ? 'disabled' : ''}
      ${noMinWidth ? 'no-min-width' : ''}
      ${label ? `label="${label}" ` : ''}
      ${helper ? `helper="${helper}" ` : ''}
      >
    </tds-datetime>
  </div>

    <script>
    /* DEMO Code: Used only for Storybook demo purposes */
      datetimeElement = document.querySelector('tds-datetime');
      datetimeElement.addEventListener('tdsChange', (event) => {
        console.log(event);
      });
      datetimeElement.addEventListener('tdsFocus', (event) => {
        console.log(event);
      });
      datetimeElement.addEventListener('tdsBlur', (event) => {
        console.log(event);
      });
    </script>
`,
  );
};

export const Default = datetimeTemplate.bind({});
