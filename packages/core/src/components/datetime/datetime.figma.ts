/**
 * Figma Code Connect for tds-datetime.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      type: figma.enum('Type', {
        'Datetime local': 'datetime-local',
        'Date': 'date',
        'Month': 'month',
        'Week': 'week',
        'Time': 'time',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      label: figma.string('Label'),
      labelPosition: figma.enum('Label position', {
        'Inside': 'inside',
        'Outside': 'outside',
        'No label': 'no-label',
      }),
      state: figma.string('State'),
      disabled: figma.boolean('Disabled'),
      helper: figma.string('Helper'),
    },
    example: (props) => html`
      <tds-datetime
        type="${props.type}"
        size="${props.size}"
        label="${props.label}"
        label-position="${props.labelPosition}"
        state="${props.state}"
        disabled=${props.disabled}
        helper="${props.helper}"
      ></tds-datetime>
    `,
  },
);
