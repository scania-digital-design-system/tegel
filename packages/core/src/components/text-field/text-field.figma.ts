/**
 * Figma Code Connect for tds-text-field.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=35602-172501&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      type: figma.enum('Type', {
        Text: 'text',
        Password: 'password',
        Number: 'number',
        Email: 'email',
        Tel: 'tel',
      }),
      label: figma.string('Label'),
      labelPosition: figma.enum('Label position', {
        'Inside': 'inside',
        'Outside': 'outside',
        'No label': 'no-label',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
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
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-text-field
          type="${props.type}"
          label="${props.label}"
          label-position="${props.labelPosition}"
          size="${props.size}"
          mode-variant="${props.modeVariant}"
          state="${props.state}"
          disabled=${props.disabled}
          read-only=${props.readOnly}
          placeholder="${props.placeholder}"
          helper="${props.helper}"
          max-length="${props.maxLength}"
        ></tds-text-field>
      </div>
    `,
  },
);
