/**
 * Figma Code Connect for tds-toast.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=39027-356&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      header: figma.string('Header'),
      subheader: figma.string('Subheader'),
      variant: figma.enum('Variant', {
        Information: 'information',
        Error: 'error',
        Warning: 'warning',
        Success: 'success',
      }),
      closable: figma.boolean('Closable'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-toast
          header="${props.header}"
          subheader="${props.subheader}"
          variant="${props.variant}"
          closable=${props.closable}
        ></tds-toast>
      </div>
    `,
  },
);
