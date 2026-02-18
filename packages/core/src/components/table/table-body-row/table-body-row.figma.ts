/**
 * Figma Code Connect for tds-table-body-row.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      selected: figma.boolean('Selected'),
      disabled: figma.boolean('Disabled'),
      clickable: figma.boolean('Clickable'),
    },
    example: (props) => html`
      <tds-table-body-row
        selected=${props.selected}
        disabled=${props.disabled}
        clickable=${props.clickable}
      >
        <tds-body-cell cell-value="Cell">Cell</tds-body-cell>
      </tds-table-body-row>
    `,
  },
);
