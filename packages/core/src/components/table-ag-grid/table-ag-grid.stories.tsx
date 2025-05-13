import { ComponentsFolder } from '../../utils/constants';
import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: `${ComponentsFolder}/Table Ag Grid`,
  parameters: {
    // notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2147%3A99321&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2147%3A99321&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    underline: {
      name: 'Underline',
      description: 'Adds an underline under the Link text.',
      controls: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Link.',
      controls: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    underline: true,
    disabled: false,
  },
};

const Template = () =>
  formatHtmlPreview(`
    <div>
        <tds-table-ag-grid></tds-table-ag-grid>
    </div>
`);

export const Default = Template.bind({});
