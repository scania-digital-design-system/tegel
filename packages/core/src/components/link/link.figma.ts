/**
 * Figma Code Connect for tds-link.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=37969-4&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      disabled: figma.boolean('Disabled'),
      underline: figma.boolean('Underline'),
      standalone: figma.boolean('Standalone'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-link
          disabled=${props.disabled}
          underline=${props.underline}
          standalone=${props.standalone}
        >
          <a href="#">Link text</a>
        </tds-link>
      </div>
    `,
  },
);
