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
                <h2 class="tds-headline-02">Tegel Table</h2>
                <p>
                    The Tegel Table component is designed to be a flexible and customizable table solution. It does not include built-in logic but relies on events and user-defined custom logic. 
                    On our demo pages, we have provided examples of how to implement basic logic for the Tegel Table.                  
                </p>
                <p>
                    Links to the demo pages here:
                  <ul>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-angular-17-demo">Tegel Angular Demo</a></li>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-react-demo">Tegel React Demo</a></li>
                  </ul>              
                </p>
                <p>
                    <h5>When to use just Tegel Table:</h5>
                </p>
                <ul>
                    <li>When you have a development team that is comfortable with React or Angular.</li>
                    <li>When your development team is comfortable with creating custom logic for the table.</li>
                    <li>When you have smaller data sets and you need to perform simpler logic on the data.</li>
                </ul>
            </section>
            <section>
                <h2 class="tds-headline-02">Tegel & Tanstack</h2>
                <p>
                    Tanstack is a headless library for building powerful tables in different frameworks or plain JavaScript. On our demo pages, we have provided examples of how to combine the Tegel Table component with Tanstack. Focus was to demo features like column filtering and data editing.
                </p>
                <p>
                    Tanstack is <b>free to use</b> and is available on npm. It documentation, supported frameworks and examples can be found here:
                    <a href="https://tanstack.com/table/latest">Tanstack Table Documentation</a>
                  
                </p>
                <p>
                    Tegel team recommends reading the Tanstack Table documentation to get started and understand how to use the library.
                    Inspiration on how to use Tegel with Tanstack can be found in the demo pages linked below.
                </p>
                  <p>
                    <h5>When to use Tegel & Tanstack:</h5>
                </p>
                <ul>
                    <li>When you have a development team that is comfortable with React or Angular.</li>                 
                    <li>When your development team has capacity to explore, learn and integrate Tanstack into your project.</li>
                    <li>When you have larger data sets and you need to perform more complex logic on the data.</li>
                </ul>
                <p>
                    Links to official npm packages:
                </p>
                <ul>
                    <li><a href="https://www.npmjs.com/package/@tanstack/react-table">tanstack/react-table</a></li>               
                    <li><a href="https://www.npmjs.com/package/@tanstack/angular-table">tanstack/angular-table</a></li>                 
                </ul>

                <p>
                    Tegel demo page examples:
                </p>
                <ul>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-angular-17-demo/pull/14">Tegel Angular Tanstack Demo</a></li>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-react-demo/pull/193">Tegel React Tanstack Demo</a></li>
                </ul>
            </section>
            <section>
                <h2 class="tds-headline-02">Tegel & AG-Grid</h2>
                <p>
                    AG-Grid is a fully-featured and highly customizable JavaScript data grid. The @styles package provides the foundational styles for the Tegel Design System and is designed to be used with the AG-Grid library. This allows users to easily integrate Tegel Design System stylings into their projects.
                </p>
                      <p>
                    <h5>When to use Tegel & AG-Grid:</h5>
                </p>
                <ul>
                    <li>You have a smaller development team and you want to simple and quick table solution to implement.</li> 
                    <li>Your application has a lot of tables and you do not want to spend time on learning and implementing new libraries.</li>
                    <li>You have a larger data set and you need to perform more complex logic on the data.</li>
                </ul>
                <p>
                    Links to official npm packages:
                </p>
                <p>
                    For more information, please refer to the following resources:
                </p>
                <ul>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-angular-17-demo/pull/14">Tegel Angular AG-Grid Demo</a></li>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-react-demo/pull/193">Tegel React AG-Grid Demo</a></li>
                </ul>
            </section>
            </article>             
  `,
};
