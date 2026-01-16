import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Block/Nested',
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
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-block.css"
    -->
    <div class="tl-block tl-block--${outerModeVariant.toLowerCase()}">
      <h2>Outer Block</h2>
      <p>Nested blocks automatically alternate backgrounds and adjust typography.</p>
      <${componentTag} class="tl-block">
        <h3>Middle Block (${componentTag})</h3>
        <p>Nested content inside a <code>&lt;${componentTag}&gt;</code> element.</p>
        <article class="tl-block">
          <h4>Inner Block (Article)</h4>
          <p>Ensuring meaningful content structure with semantic HTML.</p>
        </article>
      </${componentTag}>
    </div>
  `);

export const Nested = Template.bind({});
