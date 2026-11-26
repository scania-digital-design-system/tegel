export default {
  title: 'Patterns/Table/Table with Side Panel',
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        state: 'closed',
      },
    },
    // design: [
    //   {
    //     name: 'Figma',
    //     type: 'figma',
    //     url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=4398%3A181325&t=Ne6myqwca5m00de7-1',
    //   },
    //   {
    //     name: 'Link',
    //     type: 'link',
    //     url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=4398%3A181325&t=Ne6myqwca5m00de7-1',
    //   },
    // ],
  },
  argTypes: {},
  args: {},
};

const data = [
  { firstname: 'John', lastname: 'Doe', id: '1', country: 'Sweden', age: '38' },
  { firstname: 'Jane', lastname: 'Doe', id: '2', country: 'Sweden', age: '35' },
  { firstname: 'Miles', lastname: 'Smith', id: '3', country: 'Poland', age: '26' },
  { firstname: 'Natalie', lastname: 'Davis', id: '4', country: 'Croatia', age: '48' },
  { firstname: 'David', lastname: 'Fields', id: '5', country: 'France', age: '29' },
  { firstname: 'Rose', lastname: 'Daisy', id: '6', country: 'Spain', age: '32' },
  { firstname: 'Robert', lastname: 'Taylor', id: '7', country: 'Portugal', age: '34' },
  { firstname: 'Olivia', lastname: 'Wood', id: '8', country: 'Germany', age: '43' },
  //   { firstname: 'Noah', lastname: 'Harris', id: '9', country: 'Albania', age: '56' },
  //   { firstname: 'Lily', lastname: 'Fletcher', id: '10', country: 'Norway', age: '28' },
];
const Template = () =>
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
    <div style="padding: 64px 32px; position: relative;">
    <p>This table is interactive and will open a side panel when clicking on a row. Give it a try!</p>
    <tds-table
      vertical-dividers="true"
      responsive
        >
        <tds-table-header >
          
          <tds-header-cell cell-key='firstname' cell-value='First Name'></tds-header-cell>
          <tds-header-cell cell-key='lastname' cell-value='Last Name'></tds-header-cell>
          <tds-header-cell cell-key='id' cell-value='Identification'></tds-header-cell>
          <tds-header-cell cell-key='country' cell-value='Country'></tds-header-cell>
          <tds-header-cell cell-key='age' cell-value='Age'></tds-header-cell>
        </tds-table-header>
        <tds-table-body>
          ${data
            .map(
              (cell) => `
            <tds-table-body-row clickable>
              
              <tds-body-cell cell-value="${cell.firstname}" cell-key="firstname"></tds-body-cell>
              <tds-body-cell cell-value="${cell.lastname}" cell-key="lastname"></tds-body-cell>
              <tds-body-cell cell-value="${cell.id}" cell-key="id"></tds-body-cell>
              <tds-body-cell cell-value="${cell.country}" cell-key="country"></tds-body-cell>
              <tds-body-cell cell-value="${cell.age}" cell-key="age"></tds-body-cell>
            </tds-table-body-row>
          `,
            )
            .join('')}
        </tds-table-body>
    </tds-table>    
    <tds-side-panel
        collapsed
        header="Table Side Panel"
        subheader="Edit the data related to the table row clicked"
        top="64"
        bottom="646"
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
    document.addEventListener('tdsClick', (event) => { 
        console.log(event) 
        const sidePanel = document.querySelector('tds-side-panel');
        sidePanel.openSidePanel();
    })
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

export const Default = Template.bind({});
