import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Placement',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Placement = {
  render: () => {
    const code = `
      .tds-u-top0 {
        top: 0 !important;
      }

      .tds-u-right0 {
        right: 0 !important;
      }

      .tds-u-bottom0 {
        bottom: 0 !important;
      }

      .tds-u-left0 {
        left: 0 !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
