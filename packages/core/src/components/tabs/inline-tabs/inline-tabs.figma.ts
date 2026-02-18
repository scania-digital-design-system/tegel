/**
 * Figma Code Connect for tds-inline-tabs.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=72791-47433&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
      defaultSelectedIndex: figma.number('Default selected index'),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-inline-tabs
          mode-variant="${props.modeVariant}"
          default-selected-index="${props.defaultSelectedIndex}"
        >
          <tds-inline-tab>Tab 1</tds-inline-tab>
          <tds-inline-tab>Tab 2</tds-inline-tab>
        </tds-inline-tabs>
      </div>
    `,
  },
);
