/**
 * Figma Code Connect for tds-message.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=37329-254&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      header: figma.string('Header'),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
      variant: figma.enum('Variant', {
        Information: 'information',
        Error: 'error',
        Warning: 'warning',
        Success: 'success',
      }),
      noIcon: figma.boolean('No icon'),
      minimal: figma.boolean('Minimal'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-message
          header="${props.header}"
          mode-variant="${props.modeVariant}"
          variant="${props.variant}"
          no-icon=${props.noIcon}
          minimal=${props.minimal}
        >
          Extended message content
        </tds-message>
      </div>
    `,
  },
);
