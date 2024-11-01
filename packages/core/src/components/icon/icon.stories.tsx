import formatHtmlPreview from '../../stories/formatHtmlPreview';
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
      description: 'Set the size of the Icon',
      control: {
        type: 'select',
      },
      options: [16, 20, 24, 32],
    },
    svgTitle: {
      name: 'SVG title',
      description: 'Text that displays while hovering on icon.',
      control: {
        type: 'text',
      },
    },
    svgDescription: {
      name: 'SVG description',
      description: 'Optional long-text description of SVG icon.',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    size: 32,
    icon: 'truck',
    svgTitle: '',
    svgDescription: '',
  },
};

const IconTemplate = (args) =>
  formatHtmlPreview(`
  <tds-icon 
    name="${args.icon}" 
    size="${`${args.size.toString()}px`}" 
    ${args.svgTitle ? `svg-title='${args.svgTitle}'` : ''}
    ${args.svgDescription ? `svg-description='${args.svgDescription}'` : ''}
    >   
  </tds-icon> 
  `);

export const Component = IconTemplate.bind({});
