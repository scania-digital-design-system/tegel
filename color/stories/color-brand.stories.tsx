

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

  <div class="demo-wrapper" style="background-color: var(--sdds-black)">
    <span>--sdds-black</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--sdds-white)">
    <span>--sdds-white</span>
  </div>
  <div class="demo-wrapper" style="background-color: var(--sdds-blue)">
    <span>--sdds-blue</span>
  </div>
  `;

export const Brand = Template.bind({});
