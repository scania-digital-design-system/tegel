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
  },
  args: {
    modeVariant: 'Inherit from parent',
    variant: 'Day',
    customDate: true,
  },
};

const customDateLookUp = {
  Day: '2023-12-24',
  Month: '2023-12',
  Year: '2023',
};
const datePickerTemplate = ({ variant, modeVariant, customDate }) =>
  formatHtmlPreview(
    `
    <tds-date-picker
      variant="${variant.toLowerCase()}"
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      ${customDate ? `selected-date="${customDateLookUp[variant]}"` : ''}
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

export const Default = datePickerTemplate.bind({});
