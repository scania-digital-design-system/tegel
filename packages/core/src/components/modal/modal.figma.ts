/**
 * Figma Code Connect for tds-modal.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=37282-7006&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      header: figma.string('Header'),
      size: figma.enum('Size', {
        'Extra Small': 'xs',
        'Small': 'sm',
        'Medium': 'md',
        'Large': 'lg',
      }),
      actionsPosition: figma.enum('Actions position', {
        Sticky: 'sticky',
        Static: 'static',
      }),
      show: figma.boolean('Show'),
      closable: figma.boolean('Closable'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-modal
          header="${props.header}"
          size="${props.size}"
          actions-position="${props.actionsPosition}"
          show=${props.show}
          closable=${props.closable}
        >
          <span slot="body">Modal body content</span>
          <div slot="actions">
            <tds-button variant="primary">Confirm</tds-button>
          </div>
        </tds-modal>
      </div>
    `,
  },
);
