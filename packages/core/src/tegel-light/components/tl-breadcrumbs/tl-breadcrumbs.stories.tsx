import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Breadcrumbs',
  parameters: {
    layout: 'centered',
  },
};

const Template = () =>
  formatHtmlPreview(
    `   
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-breadcrumbs.css"
    -->
    <nav class="tl-breadcrumbs">
      <ol class="tl-breadcrumbs__list">
        <li class="tl-breadcrumbs__item">
          <a class="tl-breadcrumbs__item-link" href="#">Home</a>
        </li>
        <li class="tl-breadcrumbs__item">
          <a class="tl-breadcrumbs__item-link" href="#">Products</a>
        </li>
        <li class="tl-breadcrumbs__item tl-breadcrumbs__item--current">
          <a class="tl-breadcrumbs__item-link" href="#" aria-current="page">Current Page</a>
        </li>
      </ol>
    </nav>
      `,
  );

export const Default = Template.bind({});
