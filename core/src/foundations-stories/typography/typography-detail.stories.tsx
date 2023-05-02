import { formatHtmlPreview } from '../../utils/utils';

export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = () =>
  formatHtmlPreview(
    `
  <p class='sdds-detail-01'>This text style is used in components, such as the cookie component.</p>
  <p class='sdds-detail-02'>This text style is used in components, such as data tables and buttons.</p>
  <p class='sdds-detail-03'>This text style is used for longer detailed text exceeding 3 lines within Functional applications.</p>
  <p class='sdds-detail-04'>THIS TEXT STYLE IS USED FOR LABELS AND POTENTIALLY COMPONENTS.</p>
  <p class='sdds-detail-05'>This text style is used in components, such as the tooltip and as a label for the text field component.</p>
  <p class='sdds-detail-06'>THIS TEXT STYLE IS USED FOR LABELS AND POTENTIALLY COMPONENTS.</p>
  <p class='sdds-detail-07'>This text style should only be used for very small instances, for instance as a label inside a text field.</p>
  `,
  );

export const Detail = Template.bind({});
