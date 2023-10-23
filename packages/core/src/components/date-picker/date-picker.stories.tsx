import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Date Picker`,
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
    selectedDate: {
      name: 'Selected date',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    variant: 'Day',
  },
};

const datePickerTemplate = ({ variant, modeVariant }) =>
  formatHtmlPreview(
    `
    <tds-date-picker
      variant="${variant.toLowerCase()}"
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      placement="bottom"
    >
    </tds-date-picker>
    `,
  );

export const Default = datePickerTemplate.bind({});
