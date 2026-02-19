import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Spinner',
  parameters: {
    layout: 'centered', // Center the component horizontally and vertically in the Canvas
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=10259-29263&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=10259-29263&m=dev',
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
