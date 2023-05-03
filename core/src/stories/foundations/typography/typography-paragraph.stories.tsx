import { formatHtmlPreview } from "../../../utils/utils";

export default {
  title: "Foundations/Typography",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () =>
  formatHtmlPreview(
    `
        <p class='sdds-paragraph-01'>Our large paragraph, which should be used for introduction texts on page layouts.</p>
        <p class='sdds-paragraph-02'>Our smaller paragraph, mainly present on mobile breakpoints, which should be used for introduction texts on page layouts.</p>
  `
  );

export const Paragraph = Template.bind({});
