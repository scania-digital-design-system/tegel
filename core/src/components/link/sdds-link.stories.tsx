import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: readme,
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
      description: 'Adds an underline under the link text.',
      controls: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the link.',
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

const Template = ({ underline, disabled }) =>
  formatHtmlPreview(
    `
    <sdds-link
        ${disabled ? 'disabled' : ''}
        ${underline ? '' : 'underline="false"'}
        >
        <a href="#">This is a link.</a>
    </sdds-link>
  `,
  );
export const Link = Template.bind({});
