import type { Meta } from '@storybook/html';
import hljs from 'highlight.js';
import '../../../.storybook/tegel.syntax.highlighter.css';

const meta: Meta = {
  title: 'Intro/Installation',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: false,
    },
  },
};

hljs.highlightAll();

export default meta;
export const Javascript = {
  render: () => `
    <style>
    article {
        box-sizing: border-box;
        max-width: 688px;

        padding: 32px;
        margin: auto;
        >* {
            margin-bottom: 72px;
        }
    }

    code {
        border-radius: 4px;
    }
</style>
<article class="tds-u-p2 tds-body-01">
    <section>
        <p class="tds-body-01"><strong>Published: 2023-10-11</strong></p>
        <h1 class="tds-headline-02">Installing Tegel</h1>
        <p>This is a getting started guide aimed at developers that want to install and use the @scania/tegel library (TDS).
            This library consists of web-components built using Stencil, which means that they are framework agnostic and follow
            the browser standards. The library is installed and updated via NPM (node package manager). For further installation
            information please see the framework specific installation guides below.
        </p>
    </section>
    
    <section>
        <h4>Migration from SDDS</h4>
        <p>TDS and @scania/components (SDDS) share a lot of design, but the tech implementation have two different approaches.
        Therefore there is some migration work needed when going from SDDS to TDS, we have outlined all the differences in this
        <tds-link><a href="?path=/story/intro-migrating-from-components-v4--page">migration document</a></tds-link>. However, since they exist in different namespaces (SDDS is prefixed with ‘sdds’ and TDS with ‘tds’)
        the two solutions can exist alongside each other, enabling a soft migration that can be done over time.</p>
    </section>

    <section>
        <h4>Framework integrations</h4>
        <p>TDS is, like previously mentioned, a collection of web components. This enables them to work within any frontend
        framework since they are built on web standards. However, achieving a seamless integration can be challenging because
        different frameworks offer varying levels of support for vanilla web components. To still allow for a premium developer
        experience we have leveraged  Stencils (the complier used to build the TDS web components) output targets to build
        “framework-wrappers”. These are separate npm packages consisting of framework specific counterparts for all of the
        components in @scania/tegel. The currently available packages are built for Angular (@scania/tegel-angular) and
        React (@scania/tegel-react).If you are planning to use TDS in a Angular or React application we recommend you follow the
        installation guides for respective framework.
        
        <div><tds-link><a href="?path=/story/intro-installation--angular">Angular installation guide</a></tds-link></div>
        <div><tds-link><a href="?path=/story/intro-installation--react">React installation guide</a></tds-link></div>
        
        </p>
    </section>
    <section>
        <h4>Javascript</h4>
        <p>This guide is aimed at developers that want to use TDS in a application without any framework.</p>
        <p>Run npm init to generate a package.json, and then install @scania/tegel.</p>
        <pre>
        <code>
npm install @scania/tegel
        </code>
        </pre>
        <p>The components needs to be registered before they can be used. For example, import and call the <code>defineCustomElements</code> function in your <code>&lt;head&gt;</code>. You also need to import the Tegel stylesheet.</p>
        <pre>
        <code>
&lt;script type="module"&gt;
    import { defineCustomElements } from './node_modules/@scania/tegel/loader/index.es2017.js';
    defineCustomElements();
&lt;/script&gt;
&lt;link rel="stylesheet" href="./node_modules/@scania/tegel/dist/tegel/tegel.css"/&gt;
        </code>
        </pre>
        <p class="tds-body-01">After this, all TDS component will be available in your template files. Example:</p>
        <pre>
            <code>
&lt;tds-button text="Click me!" variant="primary" size="sm"&gt;
    &lt;tds-icon slot="icon" name="truck"&gt; &lt;/tds-icon&gt;
&lt;/tds-button&gt;
            </code>
        </pre>
    
    </section>
</article>
    `,
};
