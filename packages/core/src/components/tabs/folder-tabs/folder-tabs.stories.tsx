import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Components/Tabs/Folder Tabs',
  parameters: {
    backgrounds: { default: 'white' },
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
    backgrounds: {
      table: {
        disable: true,
      },
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
    <tds-folder-tabs
      ${defaultSelectedIndex !== 'None' ? `default-selected-index="${defaultSelectedIndex}"` : ''}
      ${selectedIndex && selectedIndex !== 'None' ? `selected-index="${selectedIndex}"` : ''}
      ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
      tds-scroll-left-aria-label="Navigate to previous tab"
      tds-scroll-right-aria-label="Navigate to next tab"
      >
      <tds-folder-tab>
        <button role="tab" aria-controls="tab-panel">First tab</button>
      </tds-folder-tab>
      <tds-folder-tab>
        <button role="tab" aria-controls="tab-panel">Second tab is much longer</button>
      </tds-folder-tab>
      <tds-folder-tab>
        <button role="tab" aria-controls="tab-panel">Third tab</button>
      </tds-folder-tab>
      <tds-folder-tab disabled>
        <button role="tab" aria-controls="tab-panel">Fourth tab</button>
      </tds-folder-tab>
    </tds-folder-tabs>

    <!-- Demo container. -->
    <div id="tab-panel" class="demo-container">
      <h4 class="tds-headline-04">Selected tab index: <span class="selectedTabIndex"></span></h4>
    </div>
    
    <!-- Script tag with eventlistener for demo purposes. -->
    <script>
    selectedTabIndex = document.getElementsByClassName('selectedTabIndex')[0]
    tabs = document.querySelector('tds-folder-tabs');
  
    tabs.addEventListener('tdsChange', (event) => {
      selectedTabIndex.innerHTML = event.detail.selectedTabIndex
      console.log(event)
    })
    </script>
`);

export const Default = Template.bind({});
