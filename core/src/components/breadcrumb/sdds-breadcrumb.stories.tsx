import itemReadme from './sdds-breadcrumb-item/readme.md';
import readme from './readme.md';
import { formatHtmlPreview } from '../../utils/utils';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: { 'Breadcumb': readme, 'Breadcumb Item': itemReadme },
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
};

const Template = () =>
  formatHtmlPreview(
    `   
      <sdds-breadcrumb>
        <sdds-breadcrumb-item>
          <a href="#">Page 1</a>
        </sdds-breadcrumb-item>
        <sdds-breadcrumb-item>
          <a href="#">Page 2</a>
        </sdds-breadcrumb-item>
        <sdds-breadcrumb-item current>
          <a href="#">Page 3</a>
        </sdds-breadcrumb-item>
      </sdds-breadcrumb>
      `,
  );

export const Breadcumb = Template.bind({});
