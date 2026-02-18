/**
 * Figma Code Connect for tds-side-menu-item.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      selected: figma.boolean('Selected'),
      active: figma.boolean('Active'),
    },
    example: (props) => html`
      <tds-side-menu-item selected=${props.selected} active=${props.active}>
        <a href="/">Menu item</a>
      </tds-side-menu-item>
    `,
  },
);
