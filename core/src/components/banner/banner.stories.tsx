import { formatHtmlPreview } from '../../utils/utils';
import { iconsNames } from '../icon/iconsArray';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

// FIXME: CMS: Change state to type in Code tab of component

export default {
  title: ComponentsFolder,
  parameters: {
    notes: readme,
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=5927%3A497&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=5927%3A497&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  argTypes: {
    type: {
      name: 'Type',
      description: 'Changes the type of the component.',
      options: ['Default', 'Error', 'Information'],
      control: {
        type: 'radio',
      },
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    header: {
      name: 'Header',
      description: 'Sets text to be displayed in the header section.',
      control: {
        type: 'text',
      },
    },
    subheader: {
      name: 'Subheader',
      description: 'Sets text to be displayed in the subheader section.',
      control: {
        type: 'text',
      },
    },
    link: {
      name: 'Link',
      description: 'Sets a link to be displayed in the link section.',
      control: {
        type: 'text',
      },
    },

    icon: {
      name: 'Icon',
      description: 'Name of icon to display, choose `none` to remove the icon.',
      control: {
        type: 'select',
      },
      options: [...iconsNames, 'none'],
      if: { arg: 'type', eq: 'Default' },
    },
    persistent: {
      name: 'Disable closing',
      description: `Removes the 'close button' in the Banner.`,
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    type: 'Default',
    header: 'This is a header text area',
    subheader: 'This is the subheader text area',
    link: '<tds-link slot="bottom" ><a href="/">Link example</a></tds-link>',
    icon: 'truck',
    persistent: false,
  },
};

const Template = ({ type, icon, header, subheader, persistent, link }) =>
  formatHtmlPreview(`
      <tds-banner
          ${type !== 'Default' ? `type="${type.toLowerCase()}"` : ''}
          ${icon !== 'none' ? `icon="${icon}"` : ''}
          ${header !== '' ? `header="${header}"` : ''}
          ${subheader ? `subheader="${subheader}"` : ''}
          ${persistent ? `persistent` : ''}
          >
          ${link ? `${link}` : ''}
      </tds-banner>

      <!-- Script tag with eventlistener for demo purposes. -->
      <script>
        document.addEventListener('tdsClose', (event) => {
          console.log(event)
        })
        document.addEventListener('tdsShow', (event) => {
          console.log(event)
        })
      </script>
    `);
export const Banner = Template.bind({});
