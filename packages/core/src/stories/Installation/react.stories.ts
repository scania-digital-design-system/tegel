import type { Meta } from '@storybook/html';

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

export default meta;
export const React = {
  render: () => `<style>
            article {
                box-sizing: border-box;
                max-width: 688px;
                padding: 32px;
                margin: auto;
                > * {
                    margin-bottom: 72px;
                }
            }

            section > p,
            section > ul,
            section > tds-link {
                margin-bottom: 32px;
            }

            tds-link {
                display: inline-block;
            }

            .mb-72 {
                margin-bottom: 72px;
            }
            code {
                border-radius: 4px;
            }
            </style>
            <article class="tds-u-p2 tds-body-01">
            <section>
                        <p class="tds-body-01"><strong>Published: 2023-10-11</strong></p>
                        <h1 class="tds-headline-02">Using Tegel in React</h1>
                        <p class="tds-body-01">
                            Tegel offers React wrappers for all Web Components. While the rendered components still maintain
                            their core as Web Components, these wrappers significantly enhance the developers experience by
                            providing a more intuitive API and seamless integration with React. You can find these wrappers
                            in a separate package called <code>@scania/tegel-react</code>, which is the recommended approach for integrating
                            Tegel into a React application.
                        </p>
                    </section>
                    <section>
                        <h4 class="tds-u-mb2">Prerequisites</h4>
                        <ul>
                            <li>Node version 18+</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="tds-u-mb2">
                            Installing <code>@scania/tegel-react</<code>
                        </h4>
                        <p class="tds-body-01">Install the <code>@scania/tegel-react</code> package via npm.</p>
                        <pre>
                            <code>
npm install @scania/tegel-react
                            </code>
                        </pre>
                        <p class="tds-body-01">In your global css file import the tegel stylesheet.</p>
                        <pre>
                            <code>
@import url('@scania/tegel/dist/tegel/tegel.css');
                            </code>
                        </pre>

                        <p class="tds-body-01">Import the <code>defineCustomElements</code> function and call it. After that, import the components you want to use. </p>
                        <pre>
                            <code>
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { defineCustomElements, TdsButton } '@scania/tegel-react';

defineCustomElements();
function App() {
    &lt;div className="App"&gt;
        &lt;TdsButton text="Click me!"&gt;
            &lt;span slot="icon"&gt;
                &lt;TdsIcon name="truck"/&gt;
            &lt;/slot&gt;
        &lt;/TdsButton&gt;
    &lt;/div>
}
export default App;
                            </code>
                        </pre>

                    </section>
                    <section>
                        <h4 class="tds-u-mb2">
                           PascalCase
                        </h4>
                        <p class="tds-body-01">
                        Since the components exported from the @scania/tegel-react package
                        are React components these have a different look than our vanilla webcomponents.
                        They are for one, PascalCased. This means that instead of being called
                        <code>&lt;tds-button&gt;</code> the Button component from @scania/tegel-react is called
                        <code>&lt;TdsButton&gt;</code>. The same goes for the props passed to the components.
                        Instead of using a hyphen, the props use PascalCase. For example:
                        <code>&lt;tds-button mode-variant="secondary"&gt;&lt;/tds-button&gt;</code>
                        would instead be 
                        <code>&lt;TdsButton modeVariant="secondary"&gt;&lt;/TdsButton&gt;</code>.
                        </p>
                        
                    </section>
                </article>  `,
};
