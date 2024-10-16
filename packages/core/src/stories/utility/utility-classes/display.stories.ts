import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Display',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Display = {
  render: () => {
    const code = `
      .tds-u-flex {
        display: flex !important;
      }

      .tds-u-inline-flex {
        display: inline-flex;
      }

      .tds-u-block {
        display: block !important;
      }

      .tds-u-inline-block {
        display: inline-block !important;
      }

      .tds-u-grid {
        display: grid !important;
      }

      .tds-u-display-none {
        display: none !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
