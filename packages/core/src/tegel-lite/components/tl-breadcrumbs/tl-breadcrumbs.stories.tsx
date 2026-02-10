import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Breadcrumbs',
  parameters: {
    layout: 'centered',
  },
};

const Template = () =>
  formatHtmlPreview(
    `   
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-breadcrumbs.css"
    -->
    <nav class="tl-breadcrumbs">
      <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#" aria-current="page">Current Page</a></li>
      </ol>
    </nav>
      `,
  );

export const Default = Template.bind({});
