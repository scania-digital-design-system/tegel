import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    layout: 'fullscreen',
    notes: readme,
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
  argTypes: {
    actions: {
      name: 'Actions',
      description: 'Defines the behaviour of Modal.',
      control: {
        type: 'radio',
      },
      options: ['Sticky', 'Static'],
      table: {
        defaultValue: { summary: 'static' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of Modal.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Medium', 'Small', 'Extra small'],
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    headline: {
      name: 'Modal headline',
      description: 'Sets the headline of the Modal.',
      control: {
        type: 'text',
      },
    },
    bodyText: {
      name: 'Modal body text',
      description: 'Sets the body text of the Modal.',
      control: {
        type: 'text',
      },
    },
    showModal: {
      name: 'Show Modal',
      description: 'Toggles if the Modal is displayed.',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    actions: 'Static',
    size: 'Large',
    headline: 'The buttons for the Modal only works in the canvas tab',
    bodyText:
      'The steps fell lightly and oddly, with a certain swing, for all they went so slowly; it was different indeed from the heavy creaking tread of Henry Jekyll. Utterson sighed. “Is there never anything else?” he asked.',
    showModal: true,
  },
};

const sizeLookUp = {
  'Large': 'lg',
  'Medium': 'md',
  'Small': 'sm',
  'Extra small': 'xs',
};

const ModalTemplate = ({ actions, size, headline, bodyText, showModal }) =>
  formatHtmlPreview(
    `
  <sdds-button id="my-modal-button" text="Open modal"></sdds-button>
  <sdds-modal selector="#my-modal-button" ${showModal ? 'show' : ''} id="my-modal" size="${
      sizeLookUp[size]
    }" actions="${actions.toLowerCase()}">
      <h5 class="sdds-modal-headline" slot="sdds-modal-headline">${headline}</h5>
      <span slot="sdds-modal-body">
          ${bodyText}
      </span>
      <sdds-button slot="sdds-modal-actions" data-dismiss-modal size="md" text="Delete" type="danger"></sdds-button>
      <sdds-button slot="sdds-modal-actions" data-dismiss-modal size="md" text="Cancel"></sdds-button>
      
  </sdds-modal>
  <script>
    modal = document.querySelector('sdds-modal')
    modal.addEventListener('sddsClose', (event) => {
      console.log(event)
    })
  </script>
  `,
  );

export const Modal = ModalTemplate.bind({});
