/**
 * Figma Code Connect for tds-header.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=38845-183926&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-header>
          <tds-header-hamburger slot="hamburger"></tds-header-hamburger>
          <tds-header-title slot="title">Application</tds-header-title>
          <tds-header-item slot="end"><a href="#">Link</a></tds-header-item>
        </tds-header>
      </div>
    `,
  },
);
