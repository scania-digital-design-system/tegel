/**
 * Figma Code Connect for tds-popover-core.
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
      trigger: figma.enum('Trigger', {
        'Click': 'click',
        'Hover': 'hover',
        'Hover popover': 'hover-popover',
      }),
    },
    example: (props) => html`
      <tds-popover-core
        placement="${props.placement}"
        animation="${props.animation}"
        trigger="${props.trigger}"
      >
        Popover content
      </tds-popover-core>
    `,
  },
);
