import formatHtmlPreview from '../formatHtmlPreview';
import { iconsNames } from '../../components/icon/iconsArray';

export default {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

const icons = iconsNames.map(
  (icon) => `
        <tds-block>  
            <tds-icon name="${icon}" size="48"></tds-icon>  
            <p class="tds-detail-05">${icon}</p>  
        </tds-block>
 `,
);

const Template = () =>
  formatHtmlPreview(
    `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(144px, 1fr)); gap: 16px; padding: 16px;">
        ${icons.join('')} 
    </div>
  `,
  );

export const Gallery = Template.bind({});
