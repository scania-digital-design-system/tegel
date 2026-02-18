/**
 * Figma Code Connect for tds-accordion-item.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      header: figma.string('Header'),
      expandIconPosition: figma.enum('Expand icon position', {
        Start: 'start',
        End: 'end',
      }),
      disabled: figma.boolean('Disabled'),
      expanded: figma.boolean('Expanded'),
    },
    example: (props) => html`
      <tds-accordion-item
        header="${props.header}"
        expand-icon-position="${props.expandIconPosition}"
        disabled=${props.disabled}
        expanded=${props.expanded}
      >
        Panel content
      </tds-accordion-item>
    `,
  },
);
