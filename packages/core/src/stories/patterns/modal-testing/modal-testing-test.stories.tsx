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
      <div style="width: 800px">
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

        <br/><br/>

        <p>
          Here is some text behind the modal to see how the overlay/backdrop for modal looks:

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum nisi ut eleifend
          ultrices. Nunc venenatis maximus sapien, ac bibendum nisl aliquam in. Morbi ac velit et
          ligula consectetur interdum. Vestibulum condimentum, augue vitae lobortis rhoncus, mi est
          ultricies mi, sed tincidunt magna nibh in lectus. Pellentesque vel vulputate orci, vel
          lacinia orci. Sed suscipit leo at diam ullamcorper, vitae volutpat neque dapibus. Maecenas
          sit amet rhoncus arcu. Sed sed molestie elit. Nullam in interdum est, vitae aliquam ipsum.
          Nunc rutrum nibh ut arcu egestas egestas.
        </p>

      </div>

    

    </div>
  
  `,
  );

export const Test = Template.bind({});
