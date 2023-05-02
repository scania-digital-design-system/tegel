import { formatHtmlPreview } from '../../../utils/utils';

export default {
  title: 'Utilities/Colors',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      name: 'Color',
      description: 'The color of the text',
      control: {
        type: 'select',
      },
      options: { Red: 'red', Blue: 'blue', Grey: 'grey' },
    },
    greyScale: {
      name: 'Scale',
      description: 'The color scale used.',
      control: {
        type: 'select',
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
      name: 'Scale',
      description: 'The color scale used.',
      control: {
        type: 'select',
      },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      if: { arg: 'color', eq: 'red' },
    },
    blueScale: {
      name: 'Scale',
      description: 'The color scale used.',
      control: {
        type: 'select',
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
  <style>
    .demo-wrapper h1 {
      margin: 0;
      width: 300px;
    }
  </style>
  <div class="demo-wrapper">
  <h1 class="sdds-text-${color}-${scale}">A text ${color} heading</h1>
  <p class="sdds-text-${color}-${scale}">A text ${color} paragraph</p>
  </div>
  `,
  );
};

export const TextColor = Template.bind({});
