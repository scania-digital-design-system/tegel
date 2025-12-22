import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Breadcrumbs',
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
      <ol class="tl-breadcrumbs__list">
        <li class="tl-breadcrumbs__breadcrumb">
          <a class="tl-breadcrumbs__breadcrumb-link" href="#">Home</a>
        </li>
        <li class="tl-breadcrumbs__breadcrumb">
          <a class="tl-breadcrumbs__breadcrumb-link" href="#">Products</a>
        </li>
        <li class="tl-breadcrumbs__breadcrumb tl-breadcrumbs__breadcrumb--current">
          <a class="tl-breadcrumbs__breadcrumb-link" href="#" aria-current="page">Current Page</a>
        </li>
      </ol>
    </nav>
      `,
  );

export const Default = Template.bind({});
