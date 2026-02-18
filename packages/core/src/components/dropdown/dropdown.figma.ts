/**
 * Figma Code Connect for tds-dropdown.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=33822-144727&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      label: figma.string('Label'),
      labelPosition: figma.enum('Label position', {
        Inside: 'inside',
        Outside: 'outside',
      }),
      size: figma.enum('Size', {
        'Extra Small': 'xs',
        'Small': 'sm',
        'Medium': 'md',
        'Large': 'lg',
      }),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
      disabled: figma.boolean('Disabled'),
      error: figma.boolean('Error'),
      multiselect: figma.boolean('Multiselect'),
      filter: figma.boolean('Filter'),
      placeholder: figma.string('Placeholder'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-dropdown
          label="${props.label}"
          label-position="${props.labelPosition}"
          size="${props.size}"
          mode-variant="${props.modeVariant}"
          disabled=${props.disabled}
          error=${props.error}
          multiselect=${props.multiselect}
          filter=${props.filter}
          placeholder="${props.placeholder}"
        >
          <tds-dropdown-option value="1">Option 1</tds-dropdown-option>
          <tds-dropdown-option value="2">Option 2</tds-dropdown-option>
        </tds-dropdown>
      </div>
    `,
  },
);
