export default {
  title: 'Patterns/Modal/Stepper Modal',
  parameters: {
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=4398%3A181325&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=4398%3A181325&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {},
  args: {},
};

const sizeLookUp = {
  'Large': 'lg',
  'Medium': 'md',
  'Small': 'sm',
  'Extra small': 'xs',
};

const StepperModalTemplate = () =>
  `
    <!-- The button below is just for demo purposes -->
    <tds-button id="my-modal-button" text="Open Modal"></tds-button>
    
    <tds-modal 
      header="Stepper Modal"
      selector="#my-modal-button"
      show
      id="my-modal" size="lg" 
      actions-position="sticky"
      prevent
      closable="true"
      tds-alert-dialog="dialog"
    >
      <span slot="subheader">This is a subheader.</span>
      <span slot="body">
        <div style="padding-bottom: 20px;">
          <tds-stepper size="sm" orientation="horizontal" label-position="aside" tds-aria-label="Progress">
            <tds-step state="success" index="1">
              <div slot="label">First step</div>
            </tds-step>
            <tds-step state="current" index="2" tds-aria-current="step">
              <div slot="label">Current step</div>
            </tds-step>
            <tds-step index="3" >
              <div slot="label">Third step</div>
            </tds-step>
            <tds-step index="4">
              <div slot="label">Fourth step</div>
            </tds-step>
            <tds-step index="5">
              <div slot="label">Fifth step</div>
            </tds-step>
          </tds-stepper>
        </div>
        <form id="testForm" onsubmit="handleFormSubmit(event)" style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
          <section>
            <span>This is the second step of this stepper! Let's go?</span>
            <tds-checkbox name="tds-checkbox" value="checkbox-1" checkbox-id="checkbox-1" required>
              <div slot="label">Yes</div>
            </tds-checkbox>
            <tds-checkbox name="tds-checkbox" value="checkbox-1" checkbox-id="checkbox-1" required>
              <div slot="label">No</div>
            </tds-checkbox>
          </section>

          <section style="display: flex; flex-direction: column; gap: 8px;">
            <span>Choose only one color:</span>
            <div>
              <tds-chip name="tds-chip-radio" type="radio" value="chip-radio-1">
              <span slot="label">Blue</span>
            </tds-chip>
            <tds-chip name="tds-chip-radio" type="radio" value="chip-radio-2">
              <span slot="label">Green</span>
            </tds-chip>
            <tds-chip name="tds-chip-radio" type="radio" value="chip-radio-3">
              <span slot="label">Yellow</span>
            </tds-chip>
            </div>
          </section>

          <section style="display: flex; flex-direction: column; gap: 8px;">
          <span>Choose one or more options: </span>
            <div>
              <tds-chip name="tds-chip-checkbox" type="checkbox" value="chip-checkbox-1">
              <span slot="label">Option 1</span>
            </tds-chip>
            <tds-chip name="tds-chip-checkbox" type="checkbox" value="chip-checkbox-2">
              <span slot="label">Option 2</span>
            </tds-chip>
            <tds-chip name="tds-chip-checkbox" type="checkbox" value="chip-checkbox-3">
              <span slot="label">Option 3</span>
            </tds-chip>
            </div>
          </section>
        </form>
      </span>
      <span slot='actions'>      
        <tds-button data-dismiss-modal size="sm" text="Previous step" variant="secondary"></tds-button>
      </span>
      <span slot='actions-right' class='tds-u-flex tds-u-gap2'>
        <tds-button data-dismiss-modal size="sm" text="Next step" variant="primary"></tds-button>
      </span>      
  </tds-modal>
  
  <!-- The script below is just for demo purposes -->
  <script>
    (function() {
      const modal = document.querySelector('tds-modal');
      const previousButton = modal.querySelector('[aria-label="Previous step"]');

      console.log(modal);
      console.log(previousButton);
      if (modal) {
        modal.addEventListener('tdsOpen', (event) => {
          console.log(event)
        })
        modal.addEventListener('tdsClose', (event) => {
          console.log(event)
        })
      }
    })();
  </script>
  `;

export const Default = StepperModalTemplate.bind({});
