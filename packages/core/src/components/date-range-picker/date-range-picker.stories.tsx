import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';

export default {
  title: `Beta/Date Range Picker`,
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
    startDate: {
      name: 'Use a custom start date.',
      control: {
        type: 'boolean',
      },
    },
    endDate: {
      name: 'Use a custom end date.',
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
    startDateHelper: {
      name: 'Helper text - Start Date',
      description: 'Sets the helper text for the Start Date.',
      control: {
        type: 'text',
      },
    },
    endDateHelper: {
      name: 'Helper text - End Date',
      description: 'Sets the helper text for the End Date.',
      control: {
        type: 'text',
      },
    },
    startDateLabel: {
      name: 'Label text - Start Date',
      description: 'Sets the label text for the Start Date.',
      control: {
        type: 'text',
      },
    },
    endDateLabel: {
      name: 'Label text - End Date',
      description: 'Sets the label text for the End Date.',
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
    state: 'Default',
    startDate: false,
    endDate: false,
    startDateLabel: null,
    endDateLabel: null,
    labelPosition: 'No label',
    min: false,
    max: false,
    startDateHelper: '',
    endDateHelper: '',
    lang: 'en',
  },
};

const datePickerTemplate = ({
  modeVariant,
  state,
  startDateHelper,
  endDateHelper,
  startDateLabel,
  endDateLabel,
  labelPosition,
  min,
  max,
  startDate,
  endDate,
  lang,
}) => {
  const getLabelPosition = () => {
    if (labelPosition === 'No label') {
      return 'no-label';
    }
    return labelPosition.toLowerCase();
  };

  return formatHtmlPreview(
    `
    <tds-date-range-picker
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      ${startDate ? 'start-value="2023-10-01"' : ''}
      ${endDate ? 'end-value="2023-10-07"' : ''}
      state="${state.toLowerCase()}"
      ${startDateLabel ? `start-date-label="${startDateLabel}"` : ''}
      ${endDateLabel ? `end-date-label="${endDateLabel}"` : ''}
      label-position="${getLabelPosition()}"
      ${startDateHelper ? `start-date-helper="${startDateHelper}"` : ''}
      ${endDateHelper ? `end-date-helper="${endDateHelper}"` : ''}
      placement="bottom"
      locale="${lang}"
      ${min ? `min="2023-10-01"` : ''}
      ${max ? `max="2023-11-29"` : ''}
    >
    </tds-date-range-picker>
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
