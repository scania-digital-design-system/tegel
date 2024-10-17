import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Z Index',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const ZIndex = {
  render: () => {
    const code = `     
      .tds-u-z10 {
        z-index: 10 !important;
      }

      .tds-u-z100 {
        z-index: 100 !important;
      }

      .tds-u-z500 {
        z-index: 500 !important;
      }

      .tds-u-z1000 {
        z-index: 1000 !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
