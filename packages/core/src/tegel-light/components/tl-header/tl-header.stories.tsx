import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Header',
  argTypes: {
    showTitle: { control: 'boolean' },
  },
  args: {
    showTitle: true,
  },
};

const Template = ({ showTitle }) =>
  formatHtmlPreview(`
    <header class="tl-header">
     ${
       showTitle
         ? `<h4 class="tl-header-title"><span class="tl-header-title__title">Example: default</span></h4>`
         : ''
     }
      <nav class="tl-header__nav">
        <ul class="tl-header__list">
        </ul>
      </nav>
    </header>
  `);

export const Default = Template.bind({});
