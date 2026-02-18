/**
 * Figma Code Connect for tds-radio-button.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=30173-78607&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      name: figma.string('Name'),
      value: figma.string('Value'),
      checked: figma.boolean('Checked'),
      disabled: figma.boolean('Disabled'),
      required: figma.boolean('Required'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-radio-button
          name="${props.name}"
          value="${props.value}"
          checked=${props.checked}
          disabled=${props.disabled}
          required=${props.required}
        >
          <span slot="label">Label text</span>
        </tds-radio-button>
      </div>
    `,
  },
);
