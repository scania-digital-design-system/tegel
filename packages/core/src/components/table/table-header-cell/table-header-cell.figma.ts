/**
 * Figma Code Connect for tds-header-cell (table header cell).
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      cellKey: figma.string('Cell key'),
      cellValue: figma.string('Cell value'),
      sortable: figma.boolean('Sortable'),
      textAlign: figma.enum('Text align', {
        Left: 'left',
        Start: 'start',
        Right: 'right',
        End: 'end',
        Center: 'center',
      }),
      disablePadding: figma.boolean('Disable padding'),
    },
    example: (props) => html`
      <tds-header-cell
        cell-key="${props.cellKey}"
        cell-value="${props.cellValue}"
        sortable=${props.sortable}
        text-align="${props.textAlign}"
        disable-padding=${props.disablePadding}
      >
        ${props.cellValue}
      </tds-header-cell>
    `,
  },
);
