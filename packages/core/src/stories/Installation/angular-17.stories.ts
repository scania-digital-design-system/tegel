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
export const Angular17 = {
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
                        <p class="tds-body-01"><strong>Published: 2024-06-04</strong></p>
                        <h1 class="tds-headline-02">Using Tegel in Angular 17 and above</h1>
                        <p>
                            Tegel offers 2 versions of Angular wrappers for all web components. <br> <code>@scania/tegel-angular</code> and <code>@scania/tegel-angular-17</code>.
                            <br>
                            <ul>
                            <li><code>@scania/tegel-angular</code> is the older version and is compatible up to Angular 16.</li>
                            <li><code>@scania/tegel-angular-17</code> is the newer version and is compatible with Angular 17 and above.</li>
                            </ul>
                            <br>
                            While the rendered components still maintain their core as web components, these wrappers significantly enhance the developer's experience by
                            providing a more intuitive API and seamless integration with Angular. This document describes how to use the <code>@scania/tegel-angular-17</code> package, which is the recommended approach for integrating
                            Tegel into an Angular application based on version 17 and above.
                        </p>
                    </section>
                    <section>
                        <h4 class="tds-u-mb2">Prerequisites</h4>
                        <ul>
                            <li>Node version 18+</li>
                            <li>Angular 17+</li>
                        </ul>
                    </section>
                    <section>
                        <h4 class="tds-u-mb2">
                            Installing <code>@scania/tegel-angular-17</code>
                        </h4>
                        <p class="tds-body-01">Install the <code>@scania/tegel-angular-17</code> package via npm.</p>
                        <pre>
                            <code>
npm install @scania/tegel-angular-17
                            </code>
                        </pre>
                        <p class="tds-body-01">In your global css file import the tegel stylesheet.</p>
                        <pre>
                            <code>
@import url('@scania/tegel/dist/tegel/tegel.css');
                            </code>
                        </pre>

                        <p class="tds-body-01">In your root module (app.component.ts) import the <code>TegelModule</code>.</p>
                        <pre>
                            <code>
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TegelModule } from '@scania/tegel-angular-17';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TegelModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
                            </code>
                        </pre>
                        <p class="tds-body-01">In your main.ts import and call defineCustomElement.</p>
                        <pre>
                            <code>
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@scania/tegel/loader';

defineCustomElements(window);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
                            </code>
                        </pre>
                        <p class="tds-body-01">After this, all TDS components will be available in your template files. Example:</p>
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
