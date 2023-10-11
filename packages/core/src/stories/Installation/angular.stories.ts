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
export const Angular = {
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
                        <h1 class="tds-headline-02">Using Tegel in Angular</h1>
                        <p>
                            Tegel offers Angular wrappers for all Web Components. While the rendered components still maintain
                            their core as Web Components, these wrappers significantly enhance the developer's experience by
                            providing a more intuitive API and seamless integration with Angular. You can find these wrappers
                            in a separate package called <code>@scania/tegel-angular</code>, which is the recommended approach for integrating
                            Tegel into a Angular application.
                        </p>
                    </section>
                    <section>
                        <h4 class="tds-u-mb2">Prerequisites</h4>
                        <ul>
                            <li>Node version 18+</li>
                            <li>Angular 14+</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="tds-u-mb2">
                            Installing <code>@scania/tegel-angular</<code>
                        </h4>
                        <p class="tds-body-01">Install the <code>@scania/tegel-angular</code> package via npm.</p>
                        <pre>
                            <code>
npm install @scania/tegel-angular
                            </code>
                        </pre>
                        <p class="tds-body-01">In your global css file import the tegel stylesheet.</p>
                        <pre>
                            <code>
@import url('@scania/tegel/dist/tegel/tegel.css');
                            </code>
                        </pre>

                        <p class="tds-body-01">Import the <code>TegelModule</code> in your app.module.ts.</p>
                        <pre>
                            <code>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TegelModule } from '@scania/tegel-angular';

@NgModule({
   declarations: [
      AppComponent,
      TesterComponent
   ],
   imports: [
      BrowserModule,
      TegelModule,
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
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
                </article>  `,
};
