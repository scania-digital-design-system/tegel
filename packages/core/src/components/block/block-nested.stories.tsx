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
        <div style="height: 100px"></div>
        <tds-block component-tag="aside">
          <div style="height: 100px"></div>
          <tds-block component-tag="${componentTag}">
            <div style="height: 100px"></div>
          </tds-block>
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
