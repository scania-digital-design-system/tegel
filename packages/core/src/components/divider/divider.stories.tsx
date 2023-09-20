import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Divider`,
  parameters: {
    layout: 'centered',
    notes: { Divider: readme },
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
        options: ['Horizontal', 'Vertical'],
      },
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

const Template = ({ orientation, width, height }) =>
  formatHtmlPreview(`
  <div style="${orientation === 'Horizontal' ? `width: ${width}px;` : `height: ${height}px;`}">
    <tds-divider orientation="${orientation.toLowerCase()}"></tds-divider>
  </div>
`);

export const Default = Template.bind({});
