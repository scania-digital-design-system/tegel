/**
 * Figma Code Connect for tds-side-menu.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=40121-14320&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      open: figma.boolean('Open'),
      persistent: figma.boolean('Persistent'),
      collapsed: figma.boolean('Collapsed'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-side-menu
          open=${props.open}
          persistent=${props.persistent}
          collapsed=${props.collapsed}
        >
          <tds-side-menu-item href="/">Item</tds-side-menu-item>
        </tds-side-menu>
      </div>
    `,
  },
);
