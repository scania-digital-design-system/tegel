import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { iconsNames } from '../icon/iconsArray';

export default {
  title: 'Components/Tag',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Tag component is used to categorize, organize, or label content. It provides visual indicators for different types of information and can include icons for enhanced visual communication.',
      },
    },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7477%3A297479&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Sets the size of the tag.',
      control: {
        type: 'radio',
      },
      options: {
        Large: 'Large',
        Small: 'Small',
      },
      table: {
        defaultValue: { summary: 'Large' },
      },
    },
    variantMode: {
      name: 'Variant Mode',
      description: 'Sets the variant mode of the tag.',
      control: {
        type: 'select',
      },
      options: ['Success', 'Warning', 'New', 'Neutral', 'Information', 'Error'],
      table: {
        defaultValue: { summary: 'Neutral' },
      },
    },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed on the Button. Choose "none" to exclude the icon.',
      control: {
        type: 'select',
      },
      options: ['none', ...iconsNames],
      if: { arg: 'size', neq: 'Extra small' },
    },
    iconPrefix: {
      name: 'Icon Prefix',
      description: 'Whether to show the icon as a prefix (left side).',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    text: 'Tag Label',
    size: 'Large',
    variantMode: 'Neutral',
    icon: undefined,
    iconPrefix: false,
  },
};

const Template = ({ text, size, variantMode, icon, iconPrefix }) =>
  formatHtmlPreview(
    `
    <style>
      /* demo-wrapper is for demonstration purposes only*/
      .demo-wrapper {
      max-width: 200px;
      height: 150px;
      }
    </style>
    
    <div class="demo-wrapper">
      <tds-tag
        text="${text}"
        size="${size}"
        variant-mode="${variantMode}"
        ${icon ? `icon="${icon}"` : ''}
        ${iconPrefix ? 'icon-prefix' : ''}>
      </tds-tag>
    </div>
    `,
  );

export const Default = Template.bind({});
Default.args = {
  text: 'Label',
  size: 'Large',
  variantMode: 'Neutral',
  icon: undefined,
  iconPrefix: false,
};
