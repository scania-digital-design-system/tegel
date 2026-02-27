import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { iconsNames } from '../icon/iconsArray';

export default {
  title: 'Components/Tag',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7477%3A297479&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'The text content to display in the tag.',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'Tag Label' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of the tag.',
      control: {
        type: 'radio',
      },
      options: {
        Large: 'lg',
        Small: 'sm',
      },
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    variant: {
      name: 'Variant',
      description:
        'Variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['neutral', 'success', 'warning', 'new', 'information', 'error'],
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    prefix: {
      name: 'Prefix',
      description:
        'Sets icon or other content to be displayed before the tag text. Choose "none" to exclude the prefix content.',
      control: {
        type: 'select',
      },
      options: ['none', ...iconsNames],
    },
  },
  args: {
    text: 'Tag Label',
    size: 'lg',
    variant: 'neutral',
  },
};

const Template = ({ text, size, variant, prefix }) =>
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
        variant="${variant}">
        ${
          prefix && prefix !== 'none'
            ? `<tds-icon slot="prefix" name="${prefix}" size="16px"></tds-icon>`
            : ''
        }
      </tds-tag>
    </div>
    `,
  );

export const Default = Template.bind({});
Default.args = {
  text: 'Default',
  size: 'lg',
  variant: 'Neutral',
  prefix: 'placeholder',
};
Default.parameters = {
  docs: {
    description: {
      story:
        'The default neutral tag variant. Text and icon will automatically update when you change the variant.',
    },
  },
};
