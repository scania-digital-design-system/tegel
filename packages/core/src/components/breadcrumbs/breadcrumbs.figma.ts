/**
 * Figma Code Connect for tds-breadcrumbs.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2703-7&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      tdsAriaLabel: figma.string('Aria label'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-breadcrumbs tds-aria-label="${props.tdsAriaLabel}">
          <tds-breadcrumb><a href="/">Home</a></tds-breadcrumb>
          <tds-breadcrumb><a href="/products">Products</a></tds-breadcrumb>
          <tds-breadcrumb current>Current</tds-breadcrumb>
        </tds-breadcrumbs>
      </div>
    `,
  },
);
