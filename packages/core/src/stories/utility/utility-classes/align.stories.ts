import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Align',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Align = {
  render: () => {
    const code = `
      .tds-u-align-start {
        align-items: start !important;
      }

      .tds-u-align-center {
        align-items: center !important;
      }

      .tds-u-align-end {
        align-items: end !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
