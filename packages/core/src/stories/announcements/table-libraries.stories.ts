import type { Meta } from '@storybook/html';

const meta: Meta = {
  title: 'Intro/Announcements',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: false,
    },
  },
};

export default meta;
export const TableLibraries = {
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
            </style>

            <article class="tds-u-p2 tds-body-01">
                <section>
                    <p class="tds-body-01"><strong>Published: 2024-09-05</strong></p>
                    <h2 class="tds-headline-02">Tegel Table</h2>
                    <p> The Table component is designed to be a flexible and customizable table solution. It does not include built-in logic but instead relies on events and user-defined custom logic. On our demo pages, we have provided examples of how to implement basic logic for the Tegel Table. </p>
                    <h5>Highlights of Tegel Table:</h5>
                    <ul>
                        <li>Part of the Tegel Design System, free to use.</li>
                        <li>Simple UI components with custom events, props, and slots to accommodate different use cases and tech stacks within Scania.</li>
                        <li>Sorting, multiselect, filtering, and pagination features with logic are presented on the demo pages.</li>
                    </ul>
                    <h5>What do I need to install to use Tegel Table?</h5>
                    <ul>
                        <li>As the Table component is included in the Tegel Design System, no extra installation is required.</li>
                        <li>Check the "Installation" section in the side menu to get started.</li>
                    </ul>
                    <h5>Tegel demo page examples:</h5>
                    <ul>
                        <li><a href="https://angular-17-demo.tegel.scania.com/table" target="_blank">Tegel Angular Demo</a></li>
                        <li><a href="https://react-demo.tegel.scania.com/table" target="_blank">Tegel React Demo</a></li>
                    </ul>
                    </section>
                    <section>
                    <h2 class="tds-headline-02">Tegel & Tanstack</h2>
                    <p> Tanstack is a headless library for building powerful tables in various frameworks or plain JavaScript. On our demo pages, we have provided examples of how to combine the Tegel Table component with Tanstack. Check out the column filtering and data editing features. </p>
                    <p> Tanstack is <b>free to use</b> and is available on npm. Its documentation, supported frameworks, and features examples can be found here: <a href="https://tanstack.com/table/latest">Tanstack Table Documentation</a>. </p>
                    <p> We recommend reading the Tanstack Table documentation to get started and understand how to use the library. Inspiration on how to use Tegel with Tanstack can be found in the demo pages linked below. </p>
                    <h5>Highlights of Tegel & Tanstack:</h5>
                    <ul>
                        <li>Tanstack is free to use and available on npm.</li>
                        <li>Tanstack is great for larger data sets and complex logic.</li>
                        <li>There are many examples and documentation on how to use Tanstack, though not all features are available as examples in all supported frameworks on Tanstack’s official website at the time of writing this document.</li>
                        <li>Tanstack implementation requires intermediate programming knowledge.</li>
                    </ul>
                    <h5>What do I need to install to use Tegel & Tanstack?</h5>
                    <ul>
                        <li>The Tegel Design System library.</li>
                        <li>The Tanstack library for the framework you are using or plain JavaScript.</li>
                    </ul>
                    <h5>Tegel demo page examples:</h5>
                    <ul>
                        <li><a href="https://angular-17-demo.tegel.scania.com/tanstack" target="_blank">Tegel Angular Tanstack Demo</a></li>
                        <li><a href="https://react-demo.tegel.scania.com/tanstack" target="_blank">Tegel React Tanstack Demo</a></li>
                    </ul>
                    </section>
                    <section>
                    <h2 class="tds-headline-02">Tegel & AG-Grid</h2>
                    <p> AG-Grid is a fully-featured and highly customizable JavaScript table library. It comes with basic UI components and logic out of the box. The Tegel team has created the @scania/tegel-styles package, which provides the foundational styles for the Tegel Design System and is designed to be used with the AG-Grid library. This allows users to easily integrate Tegel Design System styling into AG-Grid by simply importing one CSS file. </p>
                    <p> To learn more about AG-Grid, including free and premium features, supported frameworks, and documentation, please refer to the following resource: <a href="https://www.ag-grid.com/">AG-Grid Documentation</a>. </p>
                    <h5>Highlights of Tegel & AG-Grid:</h5>
                    <ul>
                        <li>AG-Grid is a fully-featured and easy-to-use table library.</li>
                        <li>Basic features are free to use, but <b>premium features require a license.</b></li>
                        <li>AG-Grid is a great solution for larger data sets and complex logic.</li>
                        <li>Basic programming knowledge is required to implement AG-Grid.</li>
                    </ul>
                    <h5>What do I need to install to use Tegel & AG-Grid?</h5>
                    <ul>
                        <li>The AG-Grid library for the framework you are using.</li>
                        <li>Import the AG-Grid styling files (ag-grid.css and ag-theme-quartz.css) to get started.</li>
                        <li>The <a href="https://www.npmjs.com/package/@scania/tegel-styles" target="_blank">@scania/tegel-styles</a> package, which provides Tegel overrides for the AG-Grid quartz theme.</li>
                    </ul>
                    <h5>Tegel demo page examples:</h5>
                    <ul>
                        <li><a href="https://angular-17-demo.tegel.scania.com/ag-grid" target="_blank">Tegel Angular AG-Grid Demo</a></li>
                        <li><a href="https://react-demo.tegel.scania.com/ag-grid" target="_blank">Tegel React AG-Grid Demo</a></li>
                    </ul>
                    <h5>How to use the @scania/tegel-styles package with AG-Grid:</h5>
                    <ul>
                        <li>Install the @scania/tegel-styles package.</li>
                        <li>Import the quartz-theme-override.css file from the @scania/tegel-styles package into your main styles file.</li>
                        <li>This will apply the Tegel theme to your AG-Grid.</li>
                    </ul>
                    </section>
            </article>             
  `,
};
