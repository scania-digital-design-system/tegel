import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = () =>
  formatHtmlPreview(
    `
  <p class='tds-body-01'>
  Our larger text style used for body text. We usually use it for paragraphs exceeding 3 lines. The size works well on both larger and smaller breakpoints for reading.
  </p>
  <p class='tds-body-02'>
  Our smaller text style used for body text. We usually use it for paragraphs with less than 3 lines. The size works well on both larger and smaller breakpoints for reading. It could also be used within certain components.
  </p>
  `,
  );

export const Body = Template.bind({});
