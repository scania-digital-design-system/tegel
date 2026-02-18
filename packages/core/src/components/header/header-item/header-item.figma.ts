/**
 * Figma Code Connect for tds-header-item.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      active: figma.boolean('Active'),
      selected: figma.boolean('Selected'),
    },
    example: (props) => html`
      <tds-header-item active=${props.active} selected=${props.selected}>
        <a href="#">Link</a>
      </tds-header-item>
    `,
  },
);
