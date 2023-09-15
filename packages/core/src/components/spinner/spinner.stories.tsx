import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Spinner`,
  parameters: {
    layout: 'centered', // Center the component horizontally and vertically in the Canvas
    notes: readme,
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10259%3A29263&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10259%3A29263&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Switches the variant of the Spinner.',
      control: {
        type: 'radio',
      },
      options: ['Standard', 'Inverted'],
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the Spinner.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Medium', 'Small', 'Extra small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
  },
  args: {
    variant: 'Standard',
    size: 'Large',
  },
};

const Template = ({ size, variant }) => {
  const sizeLookup = { 'Large': 'lg', 'Medium': 'md', 'Small': 'sm', 'Extra small': 'xs' };
  const variantLookup = { Standard: 'standard', Inverted: 'inverted' };

  return formatHtmlPreview(
    `
  <tds-spinner 
    size="${sizeLookup[size]}"  
    variant="${variantLookup[variant]}">
  </tds-spinner>
  `,
  );
};

export const Default = Template.bind({});
