import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Gap',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Gap = {
  render: () => {
    const code = `
      .tds-u-gap1 {
        gap: 8px !important;
      }

      .tds-u-gap2 {
        gap: 16px !important;
      }

      .tds-u-gap3 {
        gap: 24px !important;
      }

      .tds-u-gap4 {
        gap: 32px !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
