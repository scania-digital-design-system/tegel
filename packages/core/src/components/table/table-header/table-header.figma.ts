/**
 * Figma Code Connect for tds-table-header.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      selected: figma.boolean('Selected'),
      disabled: figma.boolean('Disabled'),
      indeterminate: figma.boolean('Indeterminate'),
    },
    example: (props) => html`
      <tds-table-header
        selected=${props.selected}
        disabled=${props.disabled}
        indeterminate=${props.indeterminate}
      >
        <tds-header-cell cell-value="Column 1">Column 1</tds-header-cell>
      </tds-table-header>
    `,
  },
);
