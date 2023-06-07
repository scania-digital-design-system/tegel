import itemReadme from './breadcrumb/readme.md';
import readme from './readme.md';
import { formatHtmlPreview } from '../../utils/utils';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: { Breadcrumbs: readme, Breadcrumb: itemReadme },
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
      <tds-breadcrumbs>
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

export const Breadcrumbs = Template.bind({});
