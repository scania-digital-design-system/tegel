import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const meta: Meta = {
  title: 'Utilities/Utility Classes/Margin',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
  },
};

export default meta;
export const Margin = {
  render: () => {
    const code = `      
      .tds-u-m0 {
        margin: 0 !important;
      }

      .tds-u-mt0 {
        margin-top: 0 !important;
      }

      .tds-u-mr0 {
        margin-right: 0 !important;
      }

      .tds-u-mb0 {
        margin-bottom: 0 !important;
      }

      .tds-u-ml0 {
        margin-left: 0 !important;
      }

      .tds-u-m1 {
        margin: 8px !important;
      }

      .tds-u-mt1 {
        margin-top: 8px !important;
      }

      .tds-u-mr1 {
        margin-right: 8px !important;
      }

      .tds-u-mb1 {
        margin-bottom: 8px !important;
      }

      .tds-u-ml1 {
        margin-left: 8px !important;
      }

      .tds-u-m2 {
        margin: 16px !important;
      }

      .tds-u-mt2 {
        margin-top: 16px !important;
      }

      .tds-u-mr2 {
        margin-right: 16px !important;
      }

      .tds-u-mb2 {
        margin-bottom: 16px !important;
      }

      .tds-u-ml2 {
        margin-left: 16px !important;
      }

      .tds-u-m3 {
        margin: 24px !important;
      }

      .tds-u-mt3 {
        margin-top: 24px !important;
      }

      .tds-u-mr3 {
        margin-right: 24px !important;
      }

      .tds-u-mb3 {
        margin-bottom: 24px !important;
      }

      .tds-u-ml3 {
        margin-left: 24px !important;
      }

      .tds-u-m-auto {
        margin: auto !important;
      }

      .tds-u-mt-auto {
        margin-top: auto !important;
      }

      .tds-u-mr-auto {
        margin-right: auto !important;
      }

      .tds-u-ml-auto {
        margin-left: auto !important;
      }

      .tds-u-mb-auto {
        margin-bottom: auto !important;
      }
    `;

    const highlightedCode = hljs.highlight(code, { language: 'css' }).value;

    return `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  },
};
