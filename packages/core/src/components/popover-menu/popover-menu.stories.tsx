import formatHtmlPreview from '../../stories/formatHtmlPreview';
import popoverMenuReadme from './readme.md';
import popoverMenuItemReadme from './popover-menu-item/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Popover Menu`,
  parameters: {
    layout: 'centered',
    notes: { 'Popover Menu': popoverMenuReadme, 'Popover Menu Item': popoverMenuItemReadme },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=16794%3A59241&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=16794%3A59241&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    menuPosition: {
      name: 'Menu position',
      description: 'Sets the position of the Popover Menu.',
      control: {
        type: 'select',
      },
      options: [
        'Bottom',
        'Bottom start',
        'Bottom end',
        'Top',
        'Top start',
        'Top end',
        'Left',
        'Left start',
        'Left end',
        'Right',
        'Right start',
        'Right end',
        'Auto',
      ],
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    icons: {
      name: 'Icons',
      description: 'Shows the Popover Menu with/without icons.',
      control: {
        type: 'boolean',
      },
    },
    fluidWidth: {
      name: 'Fluid width',
      description: 'Unsets the width of the Popover Menu.',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    menuPosition: 'Auto',
    icons: false,
    fluidWidth: false,
  },
};

const Template = ({ menuPosition, icons, fluidWidth }) => {
  const menuPosLookup = {
    'Bottom': 'bottom',
    'Bottom start': 'bottom-start',
    'Bottom end': 'bottom-end',
    'Top': 'top',
    'Top start': 'top-start',
    'Top end': 'top-end',
    'Left': 'left',
    'Left start': 'left-start',
    'Left end': 'left-end',
    'Right': 'right',
    'Right start': 'right-start',
    'Right end': 'right-end',
    'Auto': 'auto',
  };

  return formatHtmlPreview(
    `
    <style>
      /* demo-wrapper styles is for demonstration purposes only */
      .demo-wrapper {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 200px;
      }
    </style>

    <tds-popover-menu
      id="my-popover-menu"
      placement="${menuPosLookup[menuPosition]}"
      ${fluidWidth ? 'fluid-width' : ''}
      selector="#my-popover-button"
      >
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-divider></tds-divider>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} ${
      fluidWidth ? 'The menu width adjusts to the widest word' : 'Action'
    } </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item disabled>
          <button> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </button>
        </tds-popover-menu-item>
        <tds-divider></tds-divider>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-divider></tds-divider>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <button> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </button>
        </tds-popover-menu-item>
    </tds-popover-menu>

    <tds-popover-menu
      id="my-popover-menu2"
      placement="${menuPosLookup[menuPosition]}"
      ${fluidWidth ? 'fluid-width' : ''}
      selector="#my-popover-button2"
      >
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-divider></tds-divider>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} ${
      fluidWidth ? 'The menu width adjusts to the widest word' : 'Action'
    } </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item disabled>
          <button> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </button>
        </tds-popover-menu-item>
        <tds-divider></tds-divider>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-divider></tds-divider>
        <tds-popover-menu-item>
          <a href="#"> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </a>
        </tds-popover-menu-item>
        <tds-popover-menu-item>
          <button> ${icons ? '<tds-icon name="share"></tds-icon>' : ''} Action </button>
        </tds-popover-menu-item>
    </tds-popover-menu>

    <!-- demo-wrapper code below is for demonstration purposes only -->
    <div class="demo-wrapper">
      <span class="tds-u-mr2">Click icon for Popover Menu</span>
      
      <tds-button aria-label="menu" only-icon id="my-popover-button" type="ghost" size="sm">
        <tds-icon slot="icon" size="16px" name="kebab"></tds-icon>
      </tds-button>

         <tds-button aria-label="menu" only-icon id="my-popover-button2" type="ghost" size="sm">
        <tds-icon slot="icon" size="16px" name="kebab"></tds-icon>
      </tds-button>
    </div>
    
    
    `,
  );
};

export const Default = Template.bind({});
