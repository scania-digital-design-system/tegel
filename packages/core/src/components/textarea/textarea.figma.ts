/**
 * Figma Code Connect for tds-textarea.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=34279-126066&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      label: figma.string('Label'),
      labelPosition: figma.enum('Label position', {
        'Inside': 'inside',
        'Outside': 'outside',
        'No label': 'no-label',
      }),
      state: figma.enum('State', {
        Default: 'default',
        Error: 'error',
        Success: 'success',
      }),
      disabled: figma.boolean('Disabled'),
      readOnly: figma.boolean('Read only'),
      placeholder: figma.string('Placeholder'),
      helper: figma.string('Helper'),
      maxLength: figma.number('Max length'),
      rows: figma.number('Rows'),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-textarea
          label="${props.label}"
          label-position="${props.labelPosition}"
          state="${props.state}"
          disabled=${props.disabled}
          read-only=${props.readOnly}
          placeholder="${props.placeholder}"
          helper="${props.helper}"
          max-length="${props.maxLength}"
          rows="${props.rows}"
          mode-variant="${props.modeVariant}"
        ></tds-textarea>
      </div>
    `,
  },
);
