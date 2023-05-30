import { formatHtmlPreview } from '../../utils/utils';
import { iconsNames } from './iconsArray';
import readme from './readme.md';

export default {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'centered',
    notes: readme,
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9119%3A315952&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9119%3A315952&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    icon: {
      name: 'Icon name',
      description: 'Select icon to display',
      control: {
        type: 'select',
      },
      options: iconsNames,
    },
    size: {
      name: 'Size in pixels',
      description: 'Set the size of the icon',
      control: {
        type: 'select',
      },
      options: [16, 20, 24, 32],
    },
  },
  args: {
    size: 32,
    icon: 'truck',
  },
};

const IconTemplate = (args) =>
  formatHtmlPreview(`
  <sdds-icon name="${args.icon}" size="${`${args.size.toString()}px`}"></sdds-icon> 
  `);

export const WebComponent = IconTemplate.bind({});
