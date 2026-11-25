export default {
  title: 'Components/Side Panel',
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
  argTypes: {
    collapsed: {
      name: 'Side panel is collapsed',
      description:
        'Allows the consumer of Tegel to control the open/close interaction or set the side panel visibility. If it is not set, then the modal has a fallback state for that interaction, defaulting to false.',
      control: {
        type: 'boolean',
      },
    },
    overlay: {
      name: 'Overlay',
      description: 'Controls whether overlay is active or not.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'top', exists: false },
    },
    prevent: {
      name: 'Prevent',
      description: 'Disables closing Side Panel on clicking on overlay area.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'overlay', eq: true },
    },
    header: {
      name: 'Header',
      description: 'Sets the header of the side panel.',
      control: {
        type: 'text',
      },
      default: { summary: 'Side panel header' },
    },
    subheader: {
      name: 'Sub Header',
      description: 'Sets the sub header of the side panel.',
      control: {
        type: 'text',
      },
      default: { summary: 'This is a small subheader.' },
    },
    top: {
      name: 'Top position in px',
      description: 'Sets the top position to display the side panel.',
      control: {
        type: 'number',
      },
    },
    bottom: {
      name: 'Bottom position in px',
      description: 'Sets the bottom position to display the side panel.',
      control: {
        type: 'number',
      },
    },
  },
  args: {
    collapsed: false,
    overlay: false,
    prevent: false,
    header: 'Side panel header',
    subheader: 'This is a small subheader.',
    top: undefined,
    bottom: undefined,
  },
};

const SidePanelTemplate = ({ collapsed, overlay, prevent, header, subheader, top, bottom }) =>
  `
    <tds-header>
    <tds-header-title>
      Example: default
    </tds-header-title>

    <tds-header-launcher slot="end" tds-aria-label="Example launcher menu">
      <tds-header-launcher-list-title>Cool apps</tds-header-launcher-list-title>
      <tds-header-launcher-list>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">Trucklyfe</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">HaulHub</a>
        </tds-header-launcher-list-item>
        <tds-header-launcher-list-item>
          <a href="https://tegel.scania.com">WheelWizz</a>
        </tds-header-launcher-list-item>
      </tds-header-launcher-list>
    </tds-header-launcher>


    <tds-header-brand-symbol slot="end">
      <a href="https://scania.com" aria-label="Scania website"></a>
    </tds-header-brand-symbol>

  </tds-header>
    <div style="padding: 200px;">
    <tds-button id="my-side-panel-button" text="Side panel"></tds-button> 
    
    <tds-side-panel 
        collapsed="${collapsed}"
        ${overlay ? `overlay="${overlay}"` : ''}
        prevent="${prevent}"
        header="${header}"
        subheader="${subheader}"
        ${top ? `top="${top}"` : ''}
        ${bottom ? `bottom="${bottom}"` : ''}
        selector="#my-side-panel-button"
        >
        <div style="display: flex; flex-direction: column; gap: 12px;" slot="content">
            <div>
                <tds-button size="xs" text="Button text"></tds-button>
                <tds-button size="xs" text="Button text" variant="secondary"></tds-button>
                <tds-button size="xs" text="Button text" variant="ghost"></tds-button>
            </div>
            <tds-card>
                <div slot="header">Card</div>
                <div slot="subheader">Card subheader</div>
                <div slot="body">This is a card inside the side panel</div>
            </tds-card>
            <tds-text-field placeholder="Type something..." label="This is a text field" size="md" label-position="outside"></tds-text-field>
        </div>
    </tds-side-panel>
    </div>
    <tds-footer></tds-footer>

     <!-- The script below is just for demo purposes -->
  <script>
    (function() {
      const sidePanel = document.querySelector('tds-side-panel');
      if (sidePanel) {
        sidePanel.addEventListener('tdsOpen', (event) => {
          console.log(event)
        })
        sidePanel.addEventListener('tdsClose', (event) => {
          console.log(event)
        })
      }
    })();
  </script>
  `;

export const Default = SidePanelTemplate.bind({});
