import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Divider',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
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
    orientation: 'Horizontal',
    width: 150,
    height: 150,
  },
};

const Template = ({ orientation, width, height }) => {
  const orientationClass = orientation === 'Horizontal' ? 'horizontal' : 'vertical';
  const style = orientation === 'Horizontal' ? `width: ${width}px;` : `height: ${height}px;`;

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-divider.css"
    -->
        <div style="${style}"->
          <div class="tl-divider tl-divider--${orientationClass}"/>
        </div>
  `);
};

export const Default = Template.bind({});
