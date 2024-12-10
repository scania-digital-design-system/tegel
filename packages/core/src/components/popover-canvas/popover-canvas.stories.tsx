import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Popover Canvas`,
  parameters: {
    layout: 'centered',
    notes: readme,
  },
  argTypes: {
    canvasPosition: {
      name: 'Canvas position',
      description: 'Sets the position of the Popover Canvas.',
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
    animation: {
      name: 'Animation',
      description: 'Sets the animation of the Popover Canvas.',
      control: {
        type: 'select',
      },
      options: ['none', 'fade'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
  },
  args: {
    canvasPosition: 'Auto',
  },
};

const ComponentPopoverCanvas = ({ canvasPosition, animation }) => {
  const canvasPosLookup = {
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
        /* demo-wrapper and demo-styles is for demonstration purposes only */
        .demo-wrapper {
          display: flex;
          flex-wrap; nowrap;
          align-items: center;
        }
        .actions-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      </style>

      <!-- The 'referenceEl' prop can be used instead of 'selector', 
      which might be preferable in frameworks like React -->
      <tds-popover-canvas
        id="my-popover-canvas"
        placement="${canvasPosLookup[canvasPosition]}"
        animation="${animation}"
        selector="#trigger"
        class="tds-u-p2">
        <h2 class="tds-headline-02 tds-u-mt0">A Popover Canvas!</h2>
        <p class="tds-body-01">
          Where you can put anything you want!
        </p> 
        <div class="actions-container"> 
        <tds-link>
          <a target="_blank" rel="noopener noreferrer" href="https://tegel.scania.com">Even links!</a>
        </tds-link>
         <button id="action-button"> Close </button>
        </div>
      </tds-popover-canvas>

      <!-- demo-wrapper code below is for demonstration purposes only -->
      <div class="demo-wrapper">
        <span class="tds-u-mr2">Click icon for Popover Canvas</span>
        
        <tds-button aria-label="menu" only-icon id="trigger" type="secondary" size="sm">
          <tds-icon slot="icon" size="16px" name="kebab"></tds-icon>
        </tds-button>
      </div>

      <script>
        const actionButton = document.getElementById('action-button');
        const popoverCanvas = document.getElementById('my-popover-canvas');
        actionButton.addEventListener('click', () => {
          popoverCanvas.close();
        });
      </script>
    `,
  );
};
export const Default = ComponentPopoverCanvas.bind({});
