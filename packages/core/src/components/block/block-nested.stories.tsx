import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Block/Nested',
  parameters: {
    layout: 'padded',
  },
};

const NestedTemplate = ({ outerModeVariant, componentTag }) =>
  formatHtmlPreview(`
    <div ${
      outerModeVariant !== 'Inherit from parent'
        ? `class="tds-mode-variant-${outerModeVariant.toLowerCase()}"`
        : ''
    }>
      <tds-block component-tag="${componentTag}">
        <h2 class="tds-headline-02">Outer Block (${componentTag})</h2>
        <p class="tds-body-01">This block is now structured using a <code>&lt;${componentTag}&gt;</code>.</p>
        <tds-block component-tag="aside">
          <aside>
            <h3 class="tds-headline-04">Middle Block (Aside)</h3>
            <p class="tds-detail-03">Nested content inside an <code>&lt;aside&gt;</code> element.</p>
            <tds-block component-tag="${componentTag}">
              <section>
                <h4 class="tds-headline-06">Inner Block (Section)</h4>
                <p class="tds-detail-03">Ensuring meaningful content structure with semantic HTML.</p>
              </section>
            </tds-block>
          </aside>
        </tds-block>
      </tds-block>
    </div>
  `);

export const Nested = NestedTemplate.bind({});
Nested.argTypes = {
  outerModeVariant: {
    name: 'Mode variant',
    description: 'Mode variant that should be set on the parent/app level.',
    control: { type: 'radio' },
    options: ['Primary', 'Secondary'],
    table: { defaultValue: { summary: 'Primary' } },
  },
  componentTag: {
    name: 'Component Tag',
    description: 'Specifies the HTML tag utilized for the component wrapper.',
    control: { type: 'radio' },
    options: ['section', 'div', 'article', 'aside', 'header', 'footer', 'nav', 'main'],
    table: { defaultValue: { summary: 'div' } },
  },
};
Nested.args = {
  outerModeVariant: 'Primary',
  componentTag: 'div',
};
