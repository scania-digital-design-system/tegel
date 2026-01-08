import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Spinner',
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
      options: ['Standard', 'Inverted'],
      table: {
        defaultValue: { summary: 'Standard' },
      },
    },
  },
  args: {
    size: 'Large',
    variant: 'Standard',
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
    Standard: 'standard',
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
      <div class="tl-spinner ${sizeClass} ${variantClass}">
        <svg class="tl-spinner__svg">
          <circle class="tl-spinner__circle"/>
        </svg>
      </div>
    </div>
  `);
};

export const Default = Template.bind({});
