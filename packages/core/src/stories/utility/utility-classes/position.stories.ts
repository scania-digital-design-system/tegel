import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Position',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Position = {
  render: () => {
    const code = `
      .tds-u-sticky {
        position: sticky !important;
      }

      .tds-u-static {
        position: static !important;
      }

      .tds-u-relative {
        position: relative !important;
      }

      .tds-u-absolute {
        position: absolute !important;
      }

      .tds-u-fixed {
        position: fixed !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
