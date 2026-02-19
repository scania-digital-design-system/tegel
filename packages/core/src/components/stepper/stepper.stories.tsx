import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Stepper',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=37351-1648&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=37351-1648&m=dev',
      },
    ],
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
    <tds-step state="current" index="3" tds-aria-current="step">
      <div slot="label">Current step</div>
    </tds-step>
    <tds-step index="4">
      <div slot="label">Upcoming step</div>
    </tds-step>
  </tds-stepper>
        `,
  );
export const Default = Template.bind({});
