import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Flex',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Flex = {
  render: () => {
    const code = `
      .tds-u-flex-start {
        display: flex !important;
        justify-content: flex-start !important;
      }

      .tds-u-flex-end {
        display: flex !important;
        justify-content: flex-end !important;
      }

      .tds-u-flex-center {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }

      .tds-u-flex-dir-col {
        flex-direction: column !important;
      }

      .tds-u-flex-wrap {
        flex-wrap: wrap !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
