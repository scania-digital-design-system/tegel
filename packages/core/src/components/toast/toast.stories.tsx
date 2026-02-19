import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=39027-356&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=39027-356&m=dev',
      },
    ],
  },
  argTypes: {
    variant: {
      name: 'Message variant',
      description: 'Changes the variant of Toast.',
      control: {
        type: 'radio',
      },
      options: ['Information', 'Success', 'Warning', 'Error'],
      table: {
        defaultValue: {
          summary: 'information',
        },
      },
    },
    header: {
      name: 'Header',
      description: 'Adds a header text.',
      control: {
        type: 'text',
      },
    },
    subheader: {
      name: 'Subheader',
      description: 'Adds a subheader text.',
      control: {
        type: 'text',
      },
    },
    actions: {
      name: 'Actions slot',
      description: 'Slot for the bottom part of the Toast, used for links.',
      control: {
        type: 'text',
      },
    },
    hidden: {
      name: 'Hidden',
      description: 'Hides the Toast.',
      control: {
        type: 'boolean',
      },
    },
    closable: {
      name: 'Closable',
      description: 'Controls visibility of the close button.',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    variant: 'Information',
    header: 'Message header',
    subheader: 'Short subheader',
    actions: `<tds-link slot="actions">
          <a href="https://tegel.scania.com/home" target="_blank">Link example</a>
      </tds-link>`,
    hidden: false,
    closable: true,
  },
};

const Template = ({ variant, header, subheader, actions, hidden, closable }) =>
  formatHtmlPreview(
    `<tds-toast
        variant="${variant.toLowerCase()}"
        header="${header}"
        ${subheader ? `subheader="${subheader}"` : ''}
        ${hidden ? 'hidden' : ''}
        closable="${closable ? 'true' : 'false'}"
        tds-close-aria-label="Toast close button"
    >
    ${actions || ''}
    </tds-toast>
    <script>
        document.addEventListener('tdsClose', (event) => {
            console.log(event)
        })
    </script>
    `,
  );
export const Default = Template.bind({});
