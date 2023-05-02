
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
  `
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

  <div class="demo-wrapper" style="background-color: var(--sdds-positive)">
    <span>--sdds-positive</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--sdds-warning)">
    <span>--sdds-warning</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--sdds-negative)">
    <span>--sdds-negative</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--sdds-information)">
    <span>--sdds-information</span>
  </div>`;

export const Sematic = Template.bind({});
