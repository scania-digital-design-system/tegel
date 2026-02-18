/**
 * Figma Code Connect for tds-navigation-tabs.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=39520-6900&m=dev',
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
        <tds-navigation-tabs
          mode-variant="${props.modeVariant}"
          default-selected-index="${props.defaultSelectedIndex}"
        >
          <tds-navigation-tab href="/tab1">Tab 1</tds-navigation-tab>
          <tds-navigation-tab href="/tab2">Tab 2</tds-navigation-tab>
        </tds-navigation-tabs>
      </div>
    `,
  },
);
