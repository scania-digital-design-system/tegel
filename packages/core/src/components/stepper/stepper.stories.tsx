import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readmeStepper from './readme.md';
import readmeStep from './step/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Stepper`,
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10508%3A32221&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10508%3A32221&t=Ne6myqwca5m00de7-1',
      },
    ],
    notes: { Stepper: readmeStepper, Step: readmeStep },
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Sets the size of the Stepper.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    orientation: {
      name: 'Orientation',
      description: 'Sets the orientation which the Stepper is displayed.',
      control: {
        type: 'radio',
      },
      options: ['Horizontal', 'Vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    labelPosition: {
      name: 'Text position',
      description:
        'Sets the position of the text, only available when the orientation is horizontal.',
      control: {
        type: 'radio',
      },
      options: ['Below', 'Aside'],
      if: { arg: 'orientation', neq: 'Vertical' },
      table: {
        defaultValue: { summary: 'below' },
      },
    },
    hideLabels: {
      name: 'Hide labels',
      description: 'Hides the labels for all Stepper Items.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    size: 'Large',
    orientation: 'Horizontal',
    labelPosition: 'Below',
    hideLabels: false,
  },
};

const sizeLookUp = {
  Large: 'lg',
  Small: 'sm',
};
const Template = ({ size, orientation, labelPosition, hideLabels }) =>
  formatHtmlPreview(
    `<tds-stepper ${hideLabels ? 'hide-labels' : ''} size="${sizeLookUp[size]}" ${
      orientation === 'Horizontal' ? `label-position="${labelPosition?.toLowerCase()}"` : ''
    } orientation="${orientation.toLowerCase()}">
    <tds-step state="success" index="1">
      <div slot="label">Success step</div>
    </tds-step>
    <tds-step state="error" index="2">
      <div slot="label">Error step</div>
    </tds-step>
    <tds-step state="current" index="3">
      <div slot="label">Current step</div>
    </tds-step>
    <tds-step index="4">
      <div slot="label">Upcoming step</div>
    </tds-step>
  </tds-stepper>
        `,
  );
export const Default = Template.bind({});
