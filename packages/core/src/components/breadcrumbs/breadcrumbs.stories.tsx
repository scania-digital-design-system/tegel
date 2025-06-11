import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Breadcrumbs',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2703%3A4725&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2703%3A4725&t=rVXuTOgTmXPauyHd-1',
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
