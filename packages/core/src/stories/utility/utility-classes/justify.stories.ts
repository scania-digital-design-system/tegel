import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Justify',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Justify = {
  render: () => {
    const code = `
      .tds-u-justify-between {
        justify-content: space-between !important;
      }

      .tds-u-justify-around {
        justify-content: space-around !important;
      }

      .tds-u-justify-center {
        justify-content: center !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
