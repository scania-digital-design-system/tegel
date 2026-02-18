/**
 * Figma Code Connect for tds-body-cell (table body cell).
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      cellValue: figma.string('Cell value'),
      cellKey: figma.string('Cell key'),
      disablePadding: figma.boolean('Disable padding'),
      textAlign: figma.enum('Text align', {
        Left: 'left',
        Start: 'start',
        Right: 'right',
        End: 'end',
        Center: 'center',
      }),
    },
    example: (props) => html`
      <tds-body-cell
        cell-value="${props.cellValue}"
        cell-key="${props.cellKey}"
        disable-padding=${props.disablePadding}
        text-align="${props.textAlign}"
      >
        ${props.cellValue}
      </tds-body-cell>
    `,
  },
);
