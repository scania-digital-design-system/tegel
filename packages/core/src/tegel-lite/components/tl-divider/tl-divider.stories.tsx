import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Divider',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Choose Divider color variant.',
      control: {
        type: 'radio',
      },
      options: ['Discrete Light', 'Discrete Dark', 'Expressive'],
      table: {
        defaultValue: { summary: 'Discrete Light' },
      },
    },
    orientation: {
      name: 'Orientation',
      description: 'Choose Divider orientation.',
      control: {
        type: 'radio',
      },
      options: ['Horizontal', 'Vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    width: {
      name: 'Width',
      description: 'Sets the Divider width.',
      control: {
        type: 'number',
      },
      if: { arg: 'orientation', eq: 'Horizontal' },
    },
    height: {
      name: 'Height',
      description: 'Sets the Divider height.',
      control: {
        type: 'number',
      },
      if: { arg: 'orientation', eq: 'Vertical' },
    },
  },
  args: {
    variant: 'Discrete Light',
    orientation: 'Horizontal',
    width: 150,
    height: 150,
  },
};

const Template = ({ orientation, variant, width, height }) => {
  const orientationClass = orientation === 'Horizontal' ? 'horizontal' : 'vertical';
  let variantClass = 'discrete-light';
  if (variant === 'Expressive') {
    variantClass = 'expressive';
  } else if (variant === 'Discrete Dark') {
    variantClass = 'discrete-dark';
  }
  const style = orientation === 'Horizontal' ? `width: ${width}px;` : `height: ${height}px;`;

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-divider.css"
    -->
        <div style="${style}">
          <div class="tl-divider tl-divider--${variantClass} tl-divider--${orientationClass}"/>
        </div>
  `);
};

export const Default = Template.bind({});
