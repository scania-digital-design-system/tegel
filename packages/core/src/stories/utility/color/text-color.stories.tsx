import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Utilities/Text Color',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text color utilities allow you to apply colors from our color system to text elements. These utilities use the same color tokens defined in our color system.',
      },
    },
  },
  argTypes: {
    color: {
      name: 'Color',
      description: 'The color family to use (blue, red, or grey)',
      control: {
        type: 'radio',
      },
      options: { Red: 'red', Blue: 'blue', Grey: 'grey' },
    },
    greyScale: {
      name: 'Grey Scale',
      description: 'The grey color scale value to use',
      control: {
        type: 'radio',
      },
      options: [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '846',
        '868',
        '900',
        '958',
      ],
      if: { arg: 'color', eq: 'grey' },
    },
    redScale: {
      name: 'Red Scale',
      description: 'The red color scale value to use',
      control: {
        type: 'radio',
      },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      if: { arg: 'color', eq: 'red' },
    },
    blueScale: {
      name: 'Blue Scale',
      description: 'The blue color scale value to use',
      control: {
        type: 'radio',
      },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      if: { arg: 'color', eq: 'blue' },
    },
  },
  args: {
    color: 'blue',
    blueScale: '500',
    redScale: '500',
    greyScale: '958',
  },
};

const Template = ({ color, greyScale, blueScale, redScale }) => {
  let scale = 100;
  switch (color) {
    case 'blue':
      scale = blueScale;
      break;
    case 'grey':
      scale = greyScale;
      break;
    case 'red':
      scale = redScale;
      break;
    default:
      scale = blueScale;
      break;
  }
  return formatHtmlPreview(
    `
    <!-- Style tag for demo purposes -->
  <style>
    .demo-wrapper h1 {
      margin: 0;
      width: 300px;
    }
  </style>

  <!-- Demo code -->
  <div class="demo-wrapper">
    <h1 class="tds-text-${color}-${scale}">A text ${color} heading</h1>
    <p class="tds-text-${color}-${scale}">A text ${color} paragraph</p>
  </div>
  `,
  );
};

export const Default = Template.bind({});
