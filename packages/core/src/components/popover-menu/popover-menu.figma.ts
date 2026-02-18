/**
 * Figma Code Connect for tds-popover-menu.
 * TODO: Ersätt Figma-URL med korrekt node-id från Figma-designfilen.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=TODO&m=dev',
  {
    props: {
      placement: figma.string('Placement'),
      animation: figma.enum('Animation', {
        None: 'none',
        Fade: 'fade',
      }),
      fluidWidth: figma.boolean('Fluid width'),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
    },
    example: (props) => html`
      <tds-popover-menu
        placement="${props.placement}"
        animation="${props.animation}"
        fluid-width=${props.fluidWidth}
        mode-variant="${props.modeVariant}"
      >
        <button class="tds-popover-menu__item">Edit</button>
        <button class="tds-popover-menu__item">Delete</button>
      </tds-popover-menu>
    `,
  },
);
