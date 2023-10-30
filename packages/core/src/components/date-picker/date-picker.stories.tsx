import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';

export default {
  title: `Beta/Date Picker`,
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
    range: {
      name: 'Range',
      control: {
        type: 'boolean',
      },
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
    min: {
      name: 'Min date',
      description: 'Sets a minimum selectable date.',
      control: {
        type: 'boolean',
      },
    },
    max: {
      name: 'Max date',
      description: 'Sets a maximum selectable date.',
      control: {
        type: 'boolean',
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
    lang: {
      name: 'Language',
      description: 'Language used in the Date Picker',
      control: {
        type: 'radio',
      },
      options: ['en', 'sv', 'de'],
      table: {
        defaultValue: { summary: 'en' },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    variant: 'Day',
    range: true,
    state: 'Default',
    label: null,
    labelPosition: 'No label',
    min: false,
    max: false,
    helper: '',
    customDate: false,
    lang: 'en',
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
  min,
  max,
  lang,
  range,
}) => {
  const getLabelPosition = () => {
    if (labelPosition === 'No label') {
      return 'no-label';
    }
    return labelPosition.toLowerCase();
  };

  const minLookUp = {
    Day: '2023-10-01',
    Month: '2023-10',
    Year: '2023',
  };

  const maxLookUp = {
    Day: '2023-11-29',
    Month: '2023-11',
    Year: '2030',
  };

  return formatHtmlPreview(
    `
    <tds-date-picker
      variant="${variant.toLowerCase()}"
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      ${customDate ? `value="${customDateLookUp[variant]}"` : ''}
      ${range ? 'range' : ''}
      state="${state.toLowerCase()}"
      ${label ? `label="${label}"` : ''}
      label-position="${getLabelPosition()}"
      ${helper ? `helper="${helper}"` : ''}
      placement="bottom"
      locale="${lang}"
      ${min ? `min="${minLookUp[variant]}"` : ''}
      ${max ? `max="${maxLookUp[variant]}"` : ''}

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
