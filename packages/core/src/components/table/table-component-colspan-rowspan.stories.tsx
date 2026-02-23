import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Table/Col and Row Span',
  parameters: {
    docs: {
      description: {
        component: `
The \`tds-header-cell\` and \`tds-body-cell\` components support \`col-span\` and \`row-span\` props,
allowing cells to span multiple columns or rows — the same as HTML's native \`colspan\` and \`rowspan\` attributes.
        `,
      },
    },
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    headerColSpan: {
      name: 'Header cell col-span',
      description: 'Number of columns the first header cell should span.',
      control: {
        type: 'number',
        min: 1,
        max: 3,
      },
      table: {
        defaultValue: { summary: 1 },
      },
    },
    bodyColSpan: {
      name: 'Body cell col-span',
      description: 'Number of columns the first cell in row 1 should span.',
      control: {
        type: 'number',
        min: 1,
        max: 3,
      },
      table: {
        defaultValue: { summary: 1 },
      },
    },
    bodyRowSpan: {
      name: 'Body cell row-span',
      description: 'Number of rows the first cell in row 2 should span.',
      control: {
        type: 'number',
        min: 1,
        max: 3,
      },
      table: {
        defaultValue: { summary: 1 },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    headerColSpan: 1,
    bodyColSpan: 1,
    bodyRowSpan: 1,
  },
};

const ColRowSpanTemplate = ({ modeVariant, headerColSpan, bodyColSpan, bodyRowSpan }) =>
  formatHtmlPreview(`
  <tds-table
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
  >
    <tds-table-header>
      <tds-header-cell
        cell-value="Column A"
        ${headerColSpan > 1 ? `col-span="${headerColSpan}"` : ''}
      ></tds-header-cell>
      ${headerColSpan < 2 ? '<tds-header-cell cell-value="Column B"></tds-header-cell>' : ''}
      ${headerColSpan < 3 ? '<tds-header-cell cell-value="Column C"></tds-header-cell>' : ''}
    </tds-table-header>
    <tds-table-body>
      <tds-table-body-row>
        <tds-body-cell
          cell-value="Spans ${bodyColSpan} col${bodyColSpan > 1 ? 's' : ''}"
          ${bodyColSpan > 1 ? `col-span="${bodyColSpan}"` : ''}
        ></tds-body-cell>
        ${bodyColSpan < 2 ? '<tds-body-cell cell-value="B1"></tds-body-cell>' : ''}
        ${bodyColSpan < 3 ? '<tds-body-cell cell-value="C1"></tds-body-cell>' : ''}
      </tds-table-body-row>
      <tds-table-body-row>
        <tds-body-cell
          cell-value="Spans ${bodyRowSpan} row${bodyRowSpan > 1 ? 's' : ''}"
          ${bodyRowSpan > 1 ? `row-span="${bodyRowSpan}"` : ''}
        ></tds-body-cell>
        <tds-body-cell cell-value="B2"></tds-body-cell>
        <tds-body-cell cell-value="C2"></tds-body-cell>
      </tds-table-body-row>
      <tds-table-body-row>
        ${bodyRowSpan < 2 ? '<tds-body-cell cell-value="A3"></tds-body-cell>' : ''}
        <tds-body-cell cell-value="B3"></tds-body-cell>
        <tds-body-cell cell-value="C3"></tds-body-cell>
      </tds-table-body-row>
      <tds-table-body-row>
        ${bodyRowSpan < 3 ? '<tds-body-cell cell-value="A4"></tds-body-cell>' : ''}
        <tds-body-cell cell-value="B4"></tds-body-cell>
        <tds-body-cell cell-value="C4"></tds-body-cell>
      </tds-table-body-row>
    </tds-table-body>
  </tds-table>
`);

export const ColAndRowSpan = ColRowSpanTemplate.bind({});
