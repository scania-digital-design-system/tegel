/**
 * Figma Code Connect for tds-tag.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=76129-62240&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      text: figma.string('Text'),
      size: figma.enum('Size', {
        Small: 'sm',
        Large: 'lg',
      }),
      variant: figma.enum('Variant', {
        Success: 'Success',
        Warning: 'Warning',
        New: 'New',
        Neutral: 'Neutral',
        Information: 'Information',
        Error: 'Error',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-tag text="${props.text}" size="${props.size}" variant="${props.variant}"></tds-tag>
      </div>
    `,
  },
);
