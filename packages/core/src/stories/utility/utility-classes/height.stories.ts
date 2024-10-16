import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Height',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Height = {
  render: () => {
    const code = `     
      .tds-u-h-auto {
        height: auto !important;
      }

      .tds-u-h-100 {
        height: 100% !important;
      }

      .tds-u-h-75 {
        height: 75% !important;
      }

      .tds-u-h-50 {
        height: 50% !important;
      }

      .tds-u-h-25 {
        height: 25% !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
