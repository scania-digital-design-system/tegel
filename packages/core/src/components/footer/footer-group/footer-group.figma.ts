/**
 * Figma Code Connect for tds-footer-group.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      titleText: figma.string('Title text'),
    },
    example: (props) => html`
      <tds-footer-group title-text="${props.titleText}">
        <tds-footer-item><a href="#">Link</a></tds-footer-item>
      </tds-footer-group>
    `,
  },
);
