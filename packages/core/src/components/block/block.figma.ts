/**
 * Figma Code Connect for tds-block.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9743-24020&m=dev',
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
      componentTag: figma.enum('Component tag', {
        Section: 'section',
        Div: 'div',
        Article: 'article',
        Aside: 'aside',
        Header: 'header',
        Footer: 'footer',
        Nav: 'nav',
        Main: 'main',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-block mode-variant="${props.modeVariant}" component-tag="${props.componentTag}">
          Block content
        </tds-block>
      </div>
    `,
  },
);
