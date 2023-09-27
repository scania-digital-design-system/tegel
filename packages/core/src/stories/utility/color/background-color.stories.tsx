import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Utilities/Colors',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: {
      name: 'Background color',
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
      if: { arg: 'backgroundColor', eq: 'grey' },
    },
    redScale: {
      name: 'Scale',
      description: 'The color scale used.',
      control: {
        type: 'select',
      },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      if: { arg: 'backgroundColor', eq: 'red' },
    },
    blueScale: {
      name: 'Scale',
      description: 'The color scale used.',
      control: {
        type: 'select',
      },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      if: { arg: 'backgroundColor', eq: 'blue' },
    },
  },
  args: {
    backgroundColor: 'blue',
    blueScale: '500',
    redScale: '500',
    greyScale: '958',
  },
};

const Template = ({ backgroundColor, greyScale, blueScale, redScale }) => {
  let scale = 100;
  switch (backgroundColor) {
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
            .demo-wrapper{
                height: 400px;
                width: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        </style>
        <div class="tds-background-${backgroundColor}-${scale} demo-wrapper">
            <h1>background-color:${backgroundColor}</h1>
        </div>
          `,
  );
};

export const BackgroundColor = Template.bind({});
