import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Tooltip`,
  parameters: {
    layout: 'centered',
    notes: readme,
    docs: {
      source: {
        state: 'closed',
      },
    },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2620%3A4152&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2620%3A4152&t=Ne6myqwca5m00de7-1',
      },
    ],
  },

  argTypes: {
    tooltipPosition: {
      name: 'Tooltip position',
      description: 'Sets the position of the Tooltip.',
      control: {
        type: 'select',
      },
      options: [
        'Bottom-start',
        'Bottom',
        'Bottom-end',
        'Top-start',
        'Top',
        'Top-end',
        'Left-start',
        'Left',
        'Left-end',
        'Right-start',
        'Right',
        'Right-end',
      ],
      table: {
        defaultValue: {
          summary: 'bottom',
        },
      },
    },
    text: {
      name: 'Tooltip text',
      description: 'Sets the text that will be displayed inside Tooltip.',
      control: {
        type: 'text',
      },
    },
    slot: {
      name: 'Tooltip html content',
      description: 'A slot for the Tooltip to pass in html.',
      control: {
        type: 'text',
      },
    },
    mouseOverTooltip: {
      name: 'Open while hovering over Tooltip',
      description: 'Keeps the Tooltip visible as long as the mouse hovers over it.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  args: {
    tooltipPosition: 'Bottom',
    text: 'Text inside Tooltip',
    slot: '<p class="tds-detail-05 tds-u-m0"> Paragraph tag inside Tooltip with <b>bold</b> and <i>italic</i> tags too. </p>',
    mouseOverTooltip: true,
  },
};

const positionLookup = {
  'Bottom-start': 'bottom-start',
  'Bottom': 'bottom',
  'Bottom-end': 'bottom-end',
  'Top-start': 'top-start',
  'Top': 'top',
  'Top-end': 'top-end',
  'Left-start': 'left-start',
  'Left': 'left',
  'Left-end': 'left-end',
  'Right-start': 'right-start',
  'Right': 'right',
  'Right-end': 'right-end',
};

const ComponentTooltip = ({ tooltipPosition, mouseOverTooltip, text, slot }) =>
  formatHtmlPreview(
    `
    <style>
    /* demo-wrapper is for demonstration purposes only*/
     .demo-wrapper{
       height: 300px;
       display: flex;
       justify-content: center;
       align-items: center;
     }
    </style>

   <div class="demo-wrapper">
   <!-- The 'referenceEl' prop can be used instead of 'selector',
    which might be preferable in frameworks like React -->
   <tds-tooltip
      id="tooltip-1"
      placement="${positionLookup[tooltipPosition]}"
      text="${text}"
      mouse-over-tooltip="${mouseOverTooltip}">
      ${slot}
    </tds-tooltip>

    <!-- Demo button for presentation purposes -->
    <tds-button size= 'sm' id="button-1" text='Hover me'></tds-button>
   </div>
   <script>
   (() => {
     const tooltip = document.getElementById('tooltip-1');
     const button = document.getElementById('button-1');

     tooltip.referenceEl = button;
    })();
   </script>
  `,
  );

export const Default = ComponentTooltip.bind({});
