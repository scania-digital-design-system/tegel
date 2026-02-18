/**
 * Figma Code Connect for tds-chip.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11268-39456&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      type: figma.enum('Type', {
        Button: 'button',
        Radio: 'radio',
        Checkbox: 'checkbox',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Large: 'lg',
      }),
      checked: figma.boolean('Checked'),
      disabled: figma.boolean('Disabled'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-chip
          type="${props.type}"
          size="${props.size}"
          checked=${props.checked}
          disabled=${props.disabled}
        >
          <span slot="label">Chip label</span>
        </tds-chip>
      </div>
    `,
  },
);
