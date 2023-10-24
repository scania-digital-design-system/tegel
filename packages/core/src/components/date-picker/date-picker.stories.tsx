import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { ComponentsFolder } from '../../utils/constants';
import readme from './readme.md';

export default {
  title: `${ComponentsFolder}/Date Picker`,
  parameters: {
    notes: readme,
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background. ',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    variant: {
      name: 'Variant',
      control: {
        type: 'radio',
      },
      options: ['Day', 'Month', 'Year'],
    },
    customDate: {
      name: 'Use a custom selected date.',
      control: {
        type: 'boolean',
      },
    },
    state: {
      name: 'State',
      description: 'Switches between success and error state.',
      control: {
        type: 'radio',
      },
      options: ['Default', 'Success', 'Error'],
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    helper: {
      name: 'Helper text',
      description: 'Sets the helper text.',
      control: {
        type: 'text',
      },
    },
    label: {
      name: 'Label text',
      description: 'Sets the label text.',
      control: {
        type: 'text',
      },
    },
    labelPosition: {
      name: 'Label position',
      description: 'Sets the label text position.',
      control: {
        type: 'radio',
      },
      options: ['No label', 'Inside', 'Outside'],
      table: {
        defaultValue: { summary: 'no-label' },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    variant: 'Day',
    state: 'Default',
    label: null,
    labelPosition: 'No label',
    helper: '',
    customDate: true,
  },
};

const customDateLookUp = {
  Day: '2023-12-24',
  Month: '2023-12',
  Year: '2023',
};
const datePickerTemplate = ({
  variant,
  modeVariant,
  customDate,
  state,
  helper,
  label,
  labelPosition,
}) => {
  const getLabelPosition = () => {
    if (labelPosition === 'No label') {
      return 'no-label';
    }
    return labelPosition.toLowerCase();
  };
  return formatHtmlPreview(
    `
    <tds-date-picker
      variant="${variant.toLowerCase()}"
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      ${customDate ? `selected-date="${customDateLookUp[variant]}"` : ''}
      state="${state.toLowerCase()}"
      ${label ? `label="${label}"` : ''}
      label-position="${getLabelPosition()}"
      ${helper ? `helper="${helper}"` : ''}
      placement="bottom"
    >
    </tds-date-picker>
    <!-- Script tag for demo purposes -->
    <script>
      datePicker = document.querySelector('tds-date-picker')
      datePicker.addEventListener('tdsSelect', (event) => {
        console.log(event.detail)
      })
    </script>
    `,
  );
};

export const Default = datePickerTemplate.bind({});
