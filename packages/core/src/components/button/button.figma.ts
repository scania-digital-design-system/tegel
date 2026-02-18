/**
 * Figma Code Connect for tds-button.
 * Only Variant, Size, and Disabled exist on the Figma Button component.
 * Fullbleed, Label, and Icon are not component properties in Figma; add them in code as needed.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=30033-78562&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      variant: figma.enum('Variant', {
        Primary: 'primary',
        Secondary: 'secondary',
        Ghost: 'ghost',
        Danger: 'danger',
      }),
      size: figma.enum('Size', {
        'Extra Small': 'xs',
        'Small': 'sm',
        'Medium': 'md',
        'Large': 'lg',
      }),
      disabled: figma.boolean('Disabled'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-button variant="${props.variant}" size="${props.size}" disabled=${props.disabled}>
          Button
        </tds-button>
      </div>
    `,
  },
);
