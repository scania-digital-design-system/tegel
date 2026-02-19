import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Breadcrumbs',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=2703-7&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=2703-7&m=dev',
      },
    ],
  },

  argTypes: {
    tdsAriaLabel: {
      name: 'Aria Label',
      description: 'Value to be used for the aria-label attribute',
      control: {
        type: 'text',
      },
    },
  },

  args: {
    tdsAriaLabel: 'A breadcrumbs component',
  },
};

const Template = ({ tdsAriaLabel }) =>
  formatHtmlPreview(
    `   
      <tds-breadcrumbs tds-aria-label="${tdsAriaLabel}">
        <tds-breadcrumb>
          <a href="#">Page 1</a>
        </tds-breadcrumb>
        <tds-breadcrumb>
          <a href="#">Page 2</a>
        </tds-breadcrumb>
        <tds-breadcrumb current>
          <a href="#">Page 3</a>
        </tds-breadcrumb>
      </tds-breadcrumbs>
      `,
  );

export const Default = Template.bind({});
