/**
 * Figma Code Connect for tds-badge.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7477-297479&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      value: figma.string('Value'),
      size: figma.enum('Size', {
        Small: 'sm',
        Large: 'lg',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-badge value="${props.value}" size="${props.size}"></tds-badge>
      </div>
    `,
  },
);
