/**
 * Figma Code Connect for tds-card.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=38190-1602&m=dev',
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
      header: figma.string('Header'),
      subheader: figma.string('Subheader'),
      clickable: figma.boolean('Clickable'),
      stretch: figma.boolean('Stretch'),
      expandable: figma.boolean('Expandable'),
      expanded: figma.boolean('Expanded'),
      imagePlacement: figma.enum('Image placement', {
        'Above header': 'above-header',
        'Below header': 'below-header',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-card
          mode-variant="${props.modeVariant}"
          header="${props.header}"
          subheader="${props.subheader}"
          clickable=${props.clickable}
          stretch=${props.stretch}
          expandable=${props.expandable}
          expanded=${props.expanded}
          image-placement="${props.imagePlacement}"
        >
          <div slot="body">Card body content</div>
        </tds-card>
      </div>
    `,
  },
);
