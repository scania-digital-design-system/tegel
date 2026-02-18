/**
 * Figma Code Connect for tds-table.
 * Figma: Rows Selection node-id=35259-292295, Columns Selection node-id=35259-292296.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=35259-292295&m=dev',
  {
    props: {
      theme: figma.enum('Theme', {
        Light: 'light',
        Dark: 'dark',
      }),
      verticalDividers: figma.boolean('Vertical dividers'),
      compactDesign: figma.boolean('Compact design'),
      multiselect: figma.boolean('Multiselect'),
      expandableRows: figma.boolean('Expandable rows'),
      responsive: figma.boolean('Responsive'),
      modeVariant: figma.enum('Mode variant', {
        Primary: 'primary',
        Secondary: 'secondary',
      }),
      zebraMode: figma.enum('Zebra mode', {
        'Rows odd': 'rows-odd',
        'Rows even': 'rows-even',
        'Columns odd': 'columns-odd',
        'Columns even': 'columns-even',
        'None': 'none',
      }),
    },
    example: (props) => html`
      <div class="scania tds-mode-${props.theme || 'light'}">
        <tds-table
          vertical-dividers=${props.verticalDividers}
          compact-design=${props.compactDesign}
          multiselect=${props.multiselect}
          expandable-rows=${props.expandableRows}
          responsive=${props.responsive}
          mode-variant="${props.modeVariant}"
          zebra-mode="${props.zebraMode}"
        >
          <tds-table-header>
            <tds-header-cell cell-value="Column 1">Column 1</tds-header-cell>
          </tds-table-header>
          <tds-table-body>
            <tds-table-body-row>
              <tds-body-cell cell-value="Cell">Cell</tds-body-cell>
            </tds-table-body-row>
          </tds-table-body>
        </tds-table>
      </div>
    `,
  },
);
