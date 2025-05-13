import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Utilities/Background Color',

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Background color utilities allow you to apply colors from our color system to elements. These utilities use the same color tokens defined in our color system.',
      },
    },
  },
  argTypes: {
    backgroundColor: {
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
      if: { arg: 'backgroundColor', eq: 'grey' },
    },
    redScale: {
      name: 'Red Scale',
      description: 'The red color scale value to use',
      control: {
        type: 'radio',
      },
      options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      if: { arg: 'backgroundColor', eq: 'red' },
    },
    blueScale: {
      name: 'Blue Scale',
      description: 'The blue color scale value to use',
      control: {
        type: 'radio',
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
        <!-- Style tag for demo purposes -->
        <style>
            .demo-wrapper{
                height: 400px;
                width: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        </style>

        <!-- Demo code -->
        <div class="tds-background-${backgroundColor}-${scale} demo-wrapper">
            <h5>Background color: ${backgroundColor}-${scale}</h5>
        </div>
          `,
  );
};

export const Default = Template.bind({});
