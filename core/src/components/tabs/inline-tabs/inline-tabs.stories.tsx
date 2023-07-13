import { formatHtmlPreview } from '../../../utils/utils';
import readme from './readme.md';
import readmeTab from './inline-tab/readme.md';
import { ComponentsFolder } from '../../../utils/constants';

export default {
  title: `${ComponentsFolder}/Tabs`,
  parameters: {
    notes: {
      'Inline tabs': readme,
      'Inline tab': readmeTab,
    },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10544%3A32834&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10544%3A32834&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variation adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    defaultSelectedIndex: {
      name: 'Default selected index',
      description:
        'Sets the default selected Tab, if this is used the Tab changes will be done automatically.',
      control: {
        type: 'radio',
      },
      options: ['None', 0, 1, 2, 3],
      table: {
        defaultValue: { summary: '0' },
      },
    },
    selectedIndex: {
      name: 'Selected index',
      description:
        'Sets the selected Tab, if this is used the Tab changes has to be handled by the user.',
      control: {
        type: 'radio',
      },
      options: ['None', 0, 1, 2, 3],
      if: { arg: 'defaultSelectedIndex', eq: 'None' },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    defaultSelectedIndex: 'None',
    selectedIndex: 'None',
  },
};

const Template = ({ modeVariant, selectedIndex, defaultSelectedIndex }) =>
  formatHtmlPreview(`
  <tds-inline-tabs
    ${defaultSelectedIndex !== 'None' ? `default-selected-index="${defaultSelectedIndex}"` : ''}
    ${selectedIndex && selectedIndex !== 'None' ? `selected-index="${selectedIndex}"` : ''}
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}>
      <tds-inline-tab>
        <button>First tab</button>
      </tds-inline-tab>
      <tds-inline-tab>
        <button>Second tab is much longer</button>
      </tds-inline-tab>
      <tds-inline-tab>
        <button>Third tab</button>
      </tds-inline-tab>
      <tds-inline-tab disabled>
        <button>Fourth tab</button>
      </tds-inline-tab>
   </tds-inline-tabs>

   <!-- Demo container. -->
   <div class="demo-container">
     <h4 class="tds-headline-04">Selected tabindex: <span class="selectedTabIndex"></span></h4>
   </div>

   <!-- Script tag with eventlistener for demo purposes. -->
   <script>
   selectedTabIndex = document.getElementsByClassName('selectedTabIndex')[0]
   tabs = document.querySelector('tds-inline-tabs');
   
   tabs.addEventListener('tdsChange', (event) => {
     selectedTabIndex.innerHTML = event.detail.selectedTabIndex
     console.log(event)
    })
   </script>
`);

export const InlineTabs = Template.bind({});
