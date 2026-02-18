/**
 * Figma Code Connect for tds-tooltip.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2620-4152&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      text: figma.string('Text'),
      placement: figma.string('Placement'),
      trigger: figma.enum('Trigger', {
        Click: 'click',
        Hover: 'hover',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-tooltip text="${props.text}" placement="${props.placement}" trigger="${props.trigger}">
          Tooltip content
        </tds-tooltip>
      </div>
    `,
  },
);
