/**
 * Figma Code Connect for tds-popover-menu-item.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      disabled: figma.boolean('Disabled'),
    },
    example: (props) => html`
      <tds-popover-menu-item disabled=${props.disabled}> Menu item </tds-popover-menu-item>
    `,
  },
);
