import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { ComponentsFolder } from '../../utils/constants';
import { processHtmlForScreenReader } from '../../utils/accessibility';
import readme from './readme.md';

export default {
  title: 'Components/Tooltip',
  parameters: {
    layout: 'centered',
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
    trigger: {
      name: 'Type of trigger event',
      description: 'Set if tooltip should show on click or on hover',
      control: {
        type: 'radio',
      },
      options: ['Hover', 'Click'],
      table: {
        defaultValue: { summary: 'hover' },
      },
    },
    offsetDistance: {
      name: 'Offset Distance',
      description: 'Sets the distance between the wrapped component and Tooltip',
      control: {
        type: 'number',
      },
    },
    offsetSkidding: {
      name: 'Offset Skidding',
      description:
        'Sets offset to Tooltip position, moving Tooltip left-right or top-down - depending on the placement prop.',
      control: {
        type: 'number',
      },
    },
  },
  args: {
    tooltipPosition: 'Bottom',
    text: 'Text inside Tooltip',
    slot: '<p class="tds-detail-05 tds-u-m0"> Paragraph tag inside Tooltip with <b>bold</b> and <i>italic</i> tags too. </p>',
    mouseOverTooltip: true,
    trigger: 'Hover',
    offsetDistance: 8,
    offsetSkidding: 0,
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

const ComponentTooltip = ({
  tooltipPosition,
  mouseOverTooltip,
  trigger,
  text,
  slot,
  offsetDistance,
  offsetSkidding,
}) => {
  const screenReaderText = processHtmlForScreenReader(slot);

  return formatHtmlPreview(
    `
    <style>
    /* demo-wrapper is for demonstration purposes only*/
     .demo-wrapper{
       height: 300px;
       display: flex;
       justify-content: center;
       align-items: center;
     }

    .visually-hidden {
      position: absolute;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    </style>

   <div class="demo-wrapper">
   <tds-tooltip
      placement="${positionLookup[tooltipPosition]}"
      text="${text}"
      selector="#my-tooltip-button"
      ${offsetDistance !== undefined ? `offset-distance="${offsetDistance}"` : ''}
      ${offsetSkidding !== undefined ? `offset-skidding="${offsetSkidding}"` : ''}
      mouse-over-tooltip="${mouseOverTooltip}"
      trigger="${trigger.toLowerCase()}">
      ${slot}
    </tds-tooltip>
    <div id="for-screen-reader-text" class="visually-hidden">
      ${screenReaderText}
    </div>
    <!-- Demo button for presentation purposes -->
    <tds-button 
      aria-labelledby="for-screen-reader-text" 
      size='sm' 
      id="my-tooltip-button" 
      text='Hover me'>
    </tds-button>
   </div>
  `,
  );
};

export const Default = ComponentTooltip.bind({});
