/**
 * Figma Code Connect for tds-accordion.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=37498-4517&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
      hideLastBorder: figma.boolean('Hide last border'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-accordion mode-variant="${props.modeVariant}" hide-last-border=${props.hideLastBorder}>
          <tds-accordion-item header="Section 1">Content 1</tds-accordion-item>
        </tds-accordion>
      </div>
    `,
  },
);
