/**
 * Figma Code Connect for tds-navigation-tab.
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
      <tds-navigation-tab disabled=${props.disabled}>
        <a href="/tab" role="tab">Tab</a>
      </tds-navigation-tab>
    `,
  },
);
