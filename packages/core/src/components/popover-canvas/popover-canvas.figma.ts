/**
 * Figma Code Connect for tds-popover-canvas.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=16794-59241&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      placement: figma.string('Placement'),
      animation: figma.enum('Animation', {
        None: 'none',
        Fade: 'fade',
      }),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-popover-canvas
          placement="${props.placement}"
          animation="${props.animation}"
          mode-variant="${props.modeVariant}"
        >
          Popover content
        </tds-popover-canvas>
      </div>
    `,
  },
);
