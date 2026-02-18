/**
 * Figma Code Connect for tds-breadcrumb.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      current: figma.boolean('Current'),
    },
    example: (props) => html`
      <tds-breadcrumb current=${props.current}>
        <a href="/">Link text</a>
      </tds-breadcrumb>
    `,
  },
);
