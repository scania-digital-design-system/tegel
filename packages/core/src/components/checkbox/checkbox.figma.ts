/**
 * Figma Code Connect for tds-checkbox.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=30515-78521&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      disabled: figma.boolean('Disabled'),
      checked: figma.boolean('Checked'),
      indeterminate: figma.boolean('Indeterminate'),
      required: figma.boolean('Required'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-checkbox
          disabled=${props.disabled}
          checked=${props.checked}
          indeterminate=${props.indeterminate}
          required=${props.required}
        >
          <span slot="label">Label text</span>
        </tds-checkbox>
      </div>
    `,
  },
);
