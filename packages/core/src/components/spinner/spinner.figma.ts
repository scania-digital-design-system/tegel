/**
 * Figma Code Connect for tds-spinner.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=10259-29263&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      size: figma.enum('Size', {
        'Extra Small': 'xs',
        'Small': 'sm',
        'Medium': 'md',
        'Large': 'lg',
      }),
      variant: figma.enum('Variant', {
        Standard: 'standard',
        Inverted: 'inverted',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-spinner size="${props.size}" variant="${props.variant}"></tds-spinner>
      </div>
    `,
  },
);
