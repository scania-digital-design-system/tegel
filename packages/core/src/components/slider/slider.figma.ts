/**
 * Figma Code Connect for tds-slider.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=39307-11034&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      label: figma.string('Label'),
      min: figma.string('Min'),
      max: figma.string('Max'),
      disabled: figma.boolean('Disabled'),
      readOnly: figma.boolean('Read only'),
      controls: figma.boolean('Controls'),
      input: figma.boolean('Input'),
      tooltip: figma.boolean('Tooltip'),
      ticks: figma.string('Ticks'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-slider
          label="${props.label}"
          min="${props.min}"
          max="${props.max}"
          disabled=${props.disabled}
          read-only=${props.readOnly}
          controls=${props.controls}
          input=${props.input}
          tooltip=${props.tooltip}
          ticks="${props.ticks}"
        ></tds-slider>
      </div>
    `,
  },
);
