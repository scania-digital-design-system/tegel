import formatHtmlPreview from '../../formatHtmlPreview';

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

  <div class="demo-wrapper" style="background-color: var(--tds-black)">
    <span>--tds-black</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--tds-white)">
    <span>--tds-white</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--tds-blue)">
    <span>--tds-blue</span>
  </div>
  `);

export const Brand = Template.bind({});
