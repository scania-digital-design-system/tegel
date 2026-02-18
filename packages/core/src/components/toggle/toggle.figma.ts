/**
 * Figma Code Connect for tds-toggle.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=35264-124887&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      checked: figma.boolean('Checked'),
      size: figma.enum('Size', {
        Small: 'sm',
        Large: 'lg',
      }),
      disabled: figma.boolean('Disabled'),
      headline: figma.string('Headline'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-toggle
          checked=${props.checked}
          size="${props.size}"
          disabled=${props.disabled}
          headline="${props.headline}"
        >
          <span slot="label">Toggle label</span>
        </tds-toggle>
      </div>
    `,
  },
);
