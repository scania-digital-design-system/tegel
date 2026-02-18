/**
 * Figma Code Connect for tds-divider.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=34149-125001&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      orientation: figma.enum('Orientation', {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      }),
      variant: figma.enum('Variant', {
        'Discrete': 'discrete',
        'Subtle': 'subtle',
        'Soft': 'soft',
        'Defined': 'defined',
        'Dark blue': 'dark-blue',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-divider orientation="${props.orientation}" variant="${props.variant}"></tds-divider>
      </div>
    `,
  },
);
