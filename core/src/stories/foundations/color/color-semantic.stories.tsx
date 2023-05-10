import { formatHtmlPreview } from '../../../utils/utils';

export default {
  title: 'Foundations/Color',
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        state: 'closed',
      },
    },
  },
};

const Template = () =>
  formatHtmlPreview(`
  <style>
  /* Demo code for presentation purposes */
  .demo-wrapper {
    height: 90px;
  }
  .demo-wrapper span {
    color: white;
    background-color: black;
    border: 1px solid white;
    padding: 4px;
    position: absolute;
  }
</style>

  <div class="demo-wrapper" style="background-color: var(--tds-positive)">
    <span>--tds-positive</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--tds-warning)">
    <span>--tds-warning</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--tds-negative)">
    <span>--tds-negative</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--tds-information)">
    <span>--tds-information</span>
  </div>`);

export const Sematic = Template.bind({});
