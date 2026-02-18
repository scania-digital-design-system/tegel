/**
 * Figma Code Connect for tds-folder-tabs.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=72791-46597&m=dev',
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
        <tds-folder-tabs
          mode-variant="${props.modeVariant}"
          default-selected-index="${props.defaultSelectedIndex}"
        >
          <tds-folder-tab>Tab 1</tds-folder-tab>
          <tds-folder-tab>Tab 2</tds-folder-tab>
        </tds-folder-tabs>
      </div>
    `,
  },
);
