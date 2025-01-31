import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Patterns/Modal-testing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        state: 'closed',
      },
    },
  },
  argTypes: {},
  args: {},
};

const Template = () =>
  formatHtmlPreview(
    `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; ">

      <div>
        <tds-button
          id="my-modal-sm-button"
          text="Open modal"
          size="lg"
        ></tds-button>

            <tds-modal
          header="Modal Header"
          selector="#my-modal-sm-button"
          id="my-modal"
          size="sm"
          actions-position="static"
          prevent
        >
          <span slot="body">

            <br/>
            <tds-text-field mode-variant="primary" placeholder="primary"></tds-text-field>

            <br/><br/>
            <tds-text-field mode-variant="secondary" placeholder="secondary"></tds-text-field>
          </span>
          <div slot="actions">
            <tds-button data-dismiss-modal size="md" text="Cancel"></tds-button>
          </div>
        </tds-modal>
        <br/><br/>


        <br/><br/>



        <tds-text-field mode-variant="primary" placeholder="primary"></tds-text-field>
        <br/><br/>
        <tds-text-field mode-variant="secondary" placeholder="secondary"></tds-text-field>

      </div>

    </div>
  
  `,
  );

export const Test = Template.bind({});
