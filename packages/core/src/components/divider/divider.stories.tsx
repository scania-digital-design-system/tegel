import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Divider',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=993%3A47555&t=8p1W6DsJrzvgWfmp-4',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=993%3A47555&t=8p1W6DsJrzvgWfmp-4',
      },
    ],
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
    variant: {
      name: 'Variant',
      description: 'Choose Divider variant.',
      control: {
        type: 'radio',
      },
      options: ['Discrete', 'Subtle', 'Soft', 'Defined', 'Dark-Blue'],
      table: {
        defaultValue: { summary: 'Subtle' },
      },
    },
  },
  args: {
    variant: 'Subtle',
    orientation: 'Horizontal',

    width: 150,
    height: 150,
  },
};

const Template = ({ orientation, variant, width, height }) =>
  formatHtmlPreview(`
  <div style="${orientation === 'Horizontal' ? `width: ${width}px;` : `height: ${height}px;`}">
    <tds-divider orientation="${orientation.toLowerCase()}" variant="${variant.toLowerCase()}"></tds-divider>
  </div>
`);

export const Default = Template.bind({});
