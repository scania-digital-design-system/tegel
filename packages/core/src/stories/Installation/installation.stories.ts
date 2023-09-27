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
export const Installation = {
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
    <h2>React</h2>
    <section>
        <h4>Typescript</h4>
        <ol class="tds-body-01">
            <li>
                <p>Run <code>npm install @scania/tegel</code></p>
            </li>
            <li>
                <p>In the src folder create a file called <code>register-webcomponents.ts</code></p>
            </li>
            <li>
                <p>Paste the following into that file:</p>
                <pre>
<code>import &#123; defineCustomElements, JSX as LocalJSX &#125; from '@scania/tegel/loader';
import &#123; DetailedHTMLProps, HTMLAttributes &#125; from 'react';

type StencilProps&lt;T&gt; = &#123;
    [P in keyof T]?:Omit&lt;T[P], 'ref'&gt; | HTMLAttributes&lt;T&gt;;&#125;;

type ReactProps&lt;T&gt; = &#123;
[P in keyof T]?: DetailedHTMLProps&lt;HTMLAttributes&lt;T[P]&gt;,
    T[P]&gt;;&#125;;

type StencilToReact&lt;T = LocalJSX.IntrinsicElements,
    U = HTMLElementTagNameMap&gt; = StencilProps&lt;T&gt; &
    ReactProps&lt;U&gt;;

declare global &#123;
    export namespace JSX &#123;
        interface IntrinsicElements extends StencilToReact &#123;&#125;
    &#125;
&#125;

defineCustomElements(window);
</code>
</pre>
            </li>
            <li>
                <p>In your index.tsx import <code>register-webcomponents.ts</code></p>
                <pre>
<code>import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './register-webcomponents';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
&lt;React.StrictMode&gt;
    &lt;App /&gt;
&lt;/React.StrictMode&gt;,
);

reportWebVitals();</code>
                </pre>

            </li>
            <li>
                <p>In your global css file import the tegel stylesheet.</p>
                <pre>
            <code>@import url('@scania/tegel/dist/tegel/tegel.css');</code>
        </pre>
            </li>
        </ol>
    </section>
    <section>
        <h4>Javascript</h4>
        <ol class="tds-body-01">
            <li>
                <p>Run <code>npm install @scania/tegel</code></p>
            </li>
            <li>
                <p>In your index.jsx define the custom components:</p>
                <pre>
<code>import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@scania/tegel/loader';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
&lt;React.StrictMode&gt;
    &lt;App /&gt;
&lt;/React.StrictMode&gt;,
);

reportWebVitals();
defineCustomElements();</code>
                </pre>

            </li>
            <li>
                <p>In your global css file import the tegel stylesheet.</p>
                <pre>
            <code>@import url('@scania/tegel/dist/tegel/tegel.css');</code>
        </pre>
            </li>
        </ol>
    </section>
    <h2>Angular</h2>
    <section>
        <ol class="tds-body-01">
            <li>
                <p>Run <code>npm install @scania/tegel</code></p>
            </li>
            <li>
                <p>In your main.ts import and call the function <code>defineCustomElements()</code></p>
                <pre>
                    <code>import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@scania/tegel/loader';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
.bootstrapModule(AppModule)
.catch((err) => console.error(err));

defineCustomElements(window);</code>
                </pre>
            </li>
            <li>
                <p>In your app.module.ts import 'CUSTOM_ELEMENTS_SCHEMA'</p>
                <pre>
                    <code>import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { 
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule
    } from '@angular/core';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {}</code>
                </pre>
            </li>
            <li>
                <p>In your global css file import the tegel stylesheet.</p>
                <pre>
                    <code>@import url('@scania/tegel/dist/tegel/tegel.css');</code>
                </pre>
            </li>
        </ol>
    </section>
    <h2>HTML</h2>
    <section>
        <ol>
            <li><p>Run <code>npm init</code> to generate a package.json</p></li>
            <li><p>Run <code>npm install @scania/tegel</code></p></li>
            <li><p>Import the package and stylesheet in your <code>&lt;head&gt;</code></p>
                <pre>
                    <code>&lt;script type="module"&gt;
    import { defineCustomElements } from 
        './node_modules/@scania/tegel/loader/index.es2017.js';
    defineCustomElements();
&lt;/script&gt;
&lt;link rel="stylesheet"
    href="./node_modules/@scania/tegel/dist/tegel/tegel.css"/&gt;</code>
                <pre>
            </li>
            
        </ol>
    </section>
    <h2>Stencil</h2>
    <section>
        <ol>
            <li><p>Run <code>npm install @scania/tegel</code></p></li>
            <li><p>Import @scania/tegel in your stencil component.</p></li>
            <li><p>In your global css file import the tegel stylesheet.</p>
            <pre>
                <code>@import url('@scania/tegel/dist/tegel/tegel.css');</code>
            </pre></li>
            <li><p>And don't forget to set <code>'shadow: false';</code> for your component.</p></li>
        </ol>
    </section>
</article>
    `,
};
