/**
 * Figma Code Connect for tds-icon.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      name: figma.string('Name'),
      size: figma.string('Size'),
      tdsAriaHidden: figma.boolean('Aria hidden'),
    },
    example: (props) => html`
      <tds-icon
        name="${props.name}"
        size="${props.size}"
        tds-aria-hidden=${props.tdsAriaHidden}
      ></tds-icon>
    `,
  },
);
