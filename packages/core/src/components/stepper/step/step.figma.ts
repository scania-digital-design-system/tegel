/**
 * Figma Code Connect for tds-step.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      index: figma.string('Index'),
      state: figma.enum('State', {
        Current: 'current',
        Error: 'error',
        Success: 'success',
        Upcoming: 'upcoming',
      }),
    },
    example: (props) => html`
      <tds-step index="${props.index}" state="${props.state}">
        <span slot="label">Step label</span>
      </tds-step>
    `,
  },
);
