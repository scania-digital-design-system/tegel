import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Spinner',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Sets the size of the Spinner.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Medium', 'Small', 'Extra small'],
      table: {
        defaultValue: { summary: 'Large' },
      },
    },
    variant: {
      name: 'Variant',
      description: 'Switches the variant of the Spinner.',
      control: {
        type: 'radio',
      },
      options: ['Default', 'Inverted'],
      table: {
        defaultValue: { summary: 'Default' },
      },
    },
  },
  args: {
    size: 'Large',
    variant: 'Default',
  },
};

const Template = ({ size, variant }) => {
  const sizeMap = {
    'Large': 'lg',
    'Medium': 'md',
    'Small': 'sm',
    'Extra small': 'xs',
  };
  const variantMap = {
    Default: 'default',
    Inverted: 'inverted',
  };
  const sizeClass = size ? `tl-spinner--${sizeMap[size]}` : '';
  const variantClass = variant ? `tl-spinner--${variantMap[variant]}` : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-spinner.css"
    -->
    <style>
      .demo-wrapper {
        max-width: 380px;
      }
    </style>
    <div class="demo-wrapper">
      <svg class="tl-spinner ${sizeClass} ${variantClass}">
        <circle class="tl-spinner__circle"/>
      </svg>
    </div>
  `);
};

export const Default = Template.bind({});
