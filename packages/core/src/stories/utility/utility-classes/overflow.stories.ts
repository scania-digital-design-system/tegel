import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Overflow',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Overflow = {
  render: () => {
    const code = `      
      .tds-u-overflow-auto {
        overflow: auto !important;
      }

      .tds-u-overflow-scroll {
        overflow: scroll !important;
      }

      .tds-u-overflow-hidden {
        overflow: hidden !important;
      }

      .tds-u-overflow-visible {
        overflow: visible !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
