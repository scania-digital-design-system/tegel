import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Width',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Width = {
  render: () => {
    const code = `      
      .tds-u-w-auto {
        width: auto !important;
      }

      .tds-u-w-100 {
        width: 100% !important;
      }

      .tds-u-w-75 {
        width: 75% !important;
      }

      .tds-u-w-50 {
        width: 50% !important;
      }

      .tds-u-w-25 {
        width: 25% !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
