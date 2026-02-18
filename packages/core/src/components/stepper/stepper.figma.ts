/**
 * Figma Code Connect for tds-stepper.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=37351-1648&m=dev',
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
      labelPosition: figma.enum('Label position', {
        Aside: 'aside',
        Below: 'below',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Large: 'lg',
      }),
      hideLabels: figma.boolean('Hide labels'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-stepper
          orientation="${props.orientation}"
          label-position="${props.labelPosition}"
          size="${props.size}"
          hide-labels=${props.hideLabels}
        >
          <tds-step index="1" state="success">Step 1</tds-step>
          <tds-step index="2" state="current">Step 2</tds-step>
          <tds-step index="3" state="upcoming">Step 3</tds-step>
        </tds-stepper>
      </div>
    `,
  },
);
