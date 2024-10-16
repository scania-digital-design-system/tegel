import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Opacity',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Opacity = {
  render: () => {
    const code = `    
      .tds-u-opacity-100 {
        opacity: 1 !important;
      }

      .tds-u-opacity-75 {
        opacity: 0.75 !important;
      }

      .tds-u-opacity-50 {
        opacity: 0.5 !important;
      }

      .tds-u-opacity-25 {
        opacity: 0.25 !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
