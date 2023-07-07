import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Slider`,
  argTypes: {
    min: {
      name: 'Min. value',
      description: 'Sets the minimum value for the slider.',
      control: {
        type: 'number',
      },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    max: {
      name: 'Max. value',
      description: 'Sets the maximum value for the slider.',
      control: {
        type: 'number',
      },
      table: {
        defaultValue: { summary: 100 },
      },
    },
    initialValue: {
      name: 'Initial value',
      description: 'Sets the initial value for the slider.',
      control: {
        type: 'number',
      },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    showLabel: {
      name: 'Show label',
      description: 'Toggles if the lable should be shown or hidden.',
      control: {
        type: 'boolean',
      },
    },
    labelText: {
      name: 'Label text',
      description: 'Sets the text for the label.',
      control: {
        type: 'text',
      },
      if: { arg: 'showLabel', eq: true },
    },
    showTicks: {
      name: 'Show ticks',
      description: 'Toggles if ticks should be shown or hidden.',
      control: {
        type: 'boolean',
      },
    },
    numTicks: {
      name: 'Number of ticks',
      description: 'Sets the number of ticks to be displayed.',
      control: {
        type: 'number',
      },
      if: { arg: 'showTicks', eq: true },

      table: {
        defaultValue: { summary: 0 },
      },
    },
    showTickNumbers: {
      name: 'Show tick numbers',
      description: 'Toggles if tick numbers should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'showTicks', eq: true },
      table: {
        defaultValue: { summary: false },
      },
    },
    snapToTicks: {
      name: 'Snap to ticks',
      description: 'Snaps the scrubber to the closest tick when dragging.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'showTicks', eq: true },
      table: {
        defaultValue: { summary: false },
      },
    },
    showTooltip: {
      name: 'Show tooltip',
      description: 'Toggles if the tooltip should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    showControls: {
      name: 'Show controls (not compatible with input field)',
      description: 'Toggles if controls should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    step: {
      name: 'Step value',
      description: 'Sets the value to increment/decrement with when using controls.',
      control: {
        type: 'number',
      },
      if: { arg: 'showControls', eq: true },
      table: {
        defaultValue: { summary: 1 },
      },
    },
    showInput: {
      name: 'Show value input field (not compatible with controls)',
      description: 'Toggles if the values input field should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'showControls', eq: false },
      table: {
        defaultValue: { summary: false },
      },
    },
    scrubberSize: {
      name: 'Scrubber size',
      description: 'Switches between the large and small version of the scrubber.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    readonly: {
      name: 'Read Only',
      description: 'Puts the control in a read-only state.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the slider.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  parameters: {
    notes: readme,
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9649%3A20759&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9649%3A20759&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  args: {
    min: '0',
    max: '100',
    initialValue: '50',
    showLabel: false,
    labelText: 'Label',
    showTicks: false,
    numTicks: '3',
    showTickNumbers: false,
    snapToTicks: false,
    showTooltip: true,
    showControls: false,
    step: '1',
    showInput: false,
    scrubberSize: 'Large',
    readonly: false,
    disabled: false,
  },
};

const sizeLookUp = {
  Large: 'lg',
  Small: 'sm',
};

const Template = ({
  min,
  max,
  initialValue,
  showLabel,
  labelText,
  showTicks,
  numTicks,
  showTickNumbers,
  snapToTicks,
  showTooltip,
  showControls,
  step,
  showInput,
  scrubberSize,
  readonly,
  disabled,
}) =>
  formatHtmlPreview(`
 <!-- Style code below is just for demo purposes -->
    <style>
      .demo-wrapper {
          width: 500px;
          margin-left: 150px;
      }
    </style>

   <div class="demo-wrapper">
     <tds-slider 
        min="${min}"
        max="${max}"
        ${showControls && step ? `step="${step}"` : ''}
        value="${initialValue}"
        ${showTicks ? `ticks="${numTicks}"` : ''}
        ${showTickNumbers ? 'show-tick-numbers' : ''}
        ${snapToTicks ? 'snap' : ''}
        ${showLabel ? `label="${labelText}"` : ''}
        ${showTooltip ? 'tooltip' : ''}
        ${showControls ? 'controls' : ''}
        ${showInput ? 'input' : ''}
        ${disabled ? 'disabled' : ''}
        scrubber-size="${sizeLookUp[scrubberSize]}"
        ${readonly ? 'read-only' : ''}
        >
      </tds-slider>
    </div>

     <!-- Script tag for demo purposes -->
    <script>
      slider = document.querySelector('tds-slider')

      slider.removeEventListener('tdsChange', null)
      slider.addEventListener('tdsChange', (event) => {
        console.log(event);
      });
    </script>
  `);

export const Default = Template.bind({});
