import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { iconsNames } from '../icon/iconsArray';

// FIXME: CMS: Change state to type in Code tab of component

export default {
  title: 'Components/Banner',
  parameters: {
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=38356-1239&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=38356-1239&m=dev',
      },
    ],
  },
  argTypes: {
    roleType: {
      name: 'Role Type',
      description: 'Defines the ARIA role of the banner.',
      options: ['banner', 'region', 'alert'],
      control: {
        type: 'radio',
      },
      table: {
        defaultValue: { summary: 'banner' },
      },
    },
    variant: {
      name: 'Variant',
      description: 'Changes the variant of the component.',
      options: ['Default', 'Error', 'Information'],
      control: {
        type: 'radio',
      },
      table: {
        defaultValue: { summary: 'default' },
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
    actions: {
      name: 'Actions slot',
      description: 'Slot for the bottom part of the Banner, used for links.',
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
      if: { arg: 'variant', eq: 'Default' },
    },
  },
  args: {
    roleType: 'banner',
    variant: 'Default',
    header: 'This is a header text area',
    subheader: 'This is the subheader text area',
    actions: '<tds-link slot="actions" ><a href="/">Link example</a></tds-link>',
    icon: 'truck',
  },
};

const Template = ({ roleType, variant, icon, header, subheader, actions }) =>
  formatHtmlPreview(`
      <tds-banner
          role-type="${roleType}"
          ${variant !== 'Default' ? `variant="${variant.toLowerCase()}"` : ''}
          ${icon !== 'none' && variant === 'Default' ? `icon="${icon}"` : ''}
          ${header !== '' ? `header="${header}"` : ''}
          ${subheader ? `subheader="${subheader}"` : ''}       
          >
          ${actions ? `${actions}` : ''}
      </tds-banner>

      <!-- Script tag with eventlistener for demo purposes. -->
      <script>
        document.addEventListener('tdsClose', (event) => {
          console.log(event)
        })
      </script>
    `);

export const Default = Template.bind({});
