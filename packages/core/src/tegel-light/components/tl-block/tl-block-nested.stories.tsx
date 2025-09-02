import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Block/Nested',
  parameters: {
    layout: 'padded',
  },

  argTypes: {
    outerModeVariant: {
      name: 'Mode variant',
      description: 'Mode variant that should be set on the parent/app level.',
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
    },
    componentTag: {
      name: 'Component Tag',
      description: 'Specifies the HTML tag utilized for the component wrapper.',
      control: { type: 'radio' },
      options: ['section', 'div', 'article', 'aside', 'header', 'footer', 'nav', 'main'],
    },
  },

  args: {
    outerModeVariant: 'Primary',
    componentTag: 'div',
  },
};

const Template = ({ outerModeVariant, componentTag }) =>
  formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-block.css"
    -->
    <div class="tl-block tl-block--${outerModeVariant.toLowerCase()}">
        <${componentTag} class="tl-block tl-block--even">
          <h2>Outer Block (${componentTag})</h2>
          <p>This block is now structured using a <code>&lt;${componentTag}&gt;</code>.</p>
          <div class="tl-block tl-block--odd tl-block--nested">
            <aside>
              <h3>Middle Block (Aside)</h3>
              <p>Nested content inside an <code>&lt;aside&gt;</code> element.</p>
              <div class="tl-block tl-block--even tl-block--nested-inner">
                <${componentTag}>
                  <h4>Inner Block (Section)</h4>
                  <p>Ensuring meaningful content structure with semantic HTML.</p>
                </${componentTag}>
              </div>
            </aside>
          </div>
        </${componentTag}>
    </div>
  `);

export const Nested = Template.bind({});
