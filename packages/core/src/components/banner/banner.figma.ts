/**
 * Figma Code Connect for tds-banner.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=38356-1239&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      header: figma.string('Header'),
      subheader: figma.string('Subheader'),
      variant: figma.enum('Variant', {
        Default: 'default',
        Information: 'information',
        Error: 'error',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-banner
          header="${props.header}"
          subheader="${props.subheader}"
          variant="${props.variant}"
        ></tds-banner>
      </div>
    `,
  },
);
