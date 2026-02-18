/**
 * Figma Code Connect for tds-dropdown-option.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      value: figma.string('Value'),
      disabled: figma.boolean('Disabled'),
    },
    example: (props) => html`
      <tds-dropdown-option value="${props.value}" disabled=${props.disabled}>
        Option label
      </tds-dropdown-option>
    `,
  },
);
