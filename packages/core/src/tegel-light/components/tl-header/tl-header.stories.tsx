import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Header',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    includeTitle: { control: 'boolean', name: 'Include title?' },
  },
  args: {
    includeTitle: true,
  },
};

const Template = ({ includeTitle }) =>
  formatHtmlPreview(`
    <script>
        import "@scania/tegel-light/tl-header";
        ${includeTitle ? 'import "@scania/tegel-light/tl-header-title";' : ''}
    </script>
    
    <header class="tl-header">
    <nav class="tl-header__nav">
        <ul class="tl-header__component-list">
        ${
          includeTitle
            ? `<div class="tl-header-title">
                        <h4 class="tl-header-title__text"> Example: default </h4>
                   </div>`
            : ''
        }
            <li class="tl-header__middle-spacer">
            </li>
        </ul>
      </nav>
    </header>
  `);

export const Default = Template.bind({});
