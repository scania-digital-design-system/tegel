import { Meta } from '@storybook/html';

const meta: Meta = {
  title: `Utilities/Form Associated Components`,
  parameters: {
    layout: 'centered',
    options: {
      showPanel: false,
      showToolbar: false,
    },
  },
};

export default meta;
export const FormResetCallback = {
  render: () =>
    `<form id="form">

      <tds-dropdown id="dropdown" label="dropdown" placeholder="dropdown" form-reset-callback="name">
        <tds-dropdown-option value="1">Option 1</tds-dropdown-option>
        <tds-dropdown-option value="2">Option 2</tds-dropdown-option>
      </tds-dropdown>

      <tds-text-field id="text-field" label="text-field" type="text" placeholder="text-field" form-reset-callback="name"></tds-text-field>
      <tds-button id=submit type="submit">Submit</tds-button>
      <tds-button type="reset">Reset</tds-button> 

    </form>
    
     <script>
      document.getElementById("form").addEventListener("submit", function(event){
        event.preventDefault();


        
        const dropDown = document.getElementById("dropdown");
        console.log(dropDown);
        const formData = new FormData(event.target);

      
        const formDataObj = {};
        formData.forEach((value, key) => {
          formDataObj[key] = value;
        });


      });
    </script>
    `,
};
