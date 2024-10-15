import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Text Alignment',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const TextAlignment = {
  render: () => {
    const code = `
      .tds-u-textalign-start {
        text-align: start !important;
      }

      .tds-u-textalign-center {
        text-align: center !important;
      }

      .tds-u-textalign-end {
        text-align: end !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
