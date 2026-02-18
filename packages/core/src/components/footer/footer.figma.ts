/**
 * Figma Code Connect for tds-footer.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=38359-2881&m=dev',
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
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-footer mode-variant="${props.modeVariant}">
          <tds-footer-group slot="top" title-text="Resources">
            <tds-footer-item slot="top"><a href="#">Link</a></tds-footer-item>
          </tds-footer-group>
        </tds-footer>
      </div>
    `,
  },
);
