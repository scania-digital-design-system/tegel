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
                    <h5>Highlights od Tegel Table:</h5>
                </p>
                <ul>
                    <li>Part of Tegel Design System, free to use</li>
                    <li>Simple UI components with custom events, props and slots to accomodate different use cases and tech stack in Scania</li>         
                    <li>Sorting, multiselect,filtering and pagination features with logic presented on the demo pages</li>
                </ul>
                <p>
                    <h5>What do I need to install to use Tegel Table?</h5>
                </p>
                <ul>
                    <li>Tegel table is part of Tegel Design system, no additional installation needed</li>
                    <li>Check "Installation" section in the side menu to get started</li>
                </ul>
                  
                <h5>Tegel demo page examples:</h5>
                <ul>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-angular-17-demo">Tegel Angular Demo</a></li>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-react-demo">Tegel React Demo</a></li>
                </ul>              
               
            </section>
            <section>
                <h2 class="tds-headline-02">Tegel & Tanstack</h2>
                <p>
                    Tanstack is a headless library for building powerful tables in different frameworks or plain JavaScript. 
                    On our demo pages, we have provided examples of how to combine the Tegel Table component with Tanstack. 
                    Check out column filtering and data editing features.
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
                    <h5>Highlights of Tegel & Tanstack:</h5>
                </p>
                <ul>
                    <li>Tanstack is free to use and available on npm</li>
                    <li>Tanstack is great for larger data sets and complex logic</li>
                    <li>There are many examples and documentation on how to use Tanstack, however not all features are available as examples in all supported framworks on Tanstack official website in the moment of writing this document.</li>
                    <li>Tanstack implementation requires intermediate programming knowledge</li>
                </ul>
                <p>
                    <h5>What do I need to install to use Tegel & Tanstack?</h5>
                </p>
                <ul>
                    <li>Tegel design system library</li>
                    <li>Tanstack library for the framework you are using or plain JavaScript</li>
                </ul>        

                <h5>
                    Tegel demo page examples:
                </h5>
                <ul>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-angular-17-demo/pull/14">Tegel Angular Tanstack Demo</a></li>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-react-demo/pull/193">Tegel React Tanstack Demo</a></li>
                </ul>
            </section>
            <section>
                <h2 class="tds-headline-02">Tegel & AG-Grid</h2>
                <p>
                    AG-Grid is a fully-featured and highly customizable JavaScript table library. It comes with basic UI components and logic out of the box.
                    Tegel team has created @scania/tegel-styles package which provides the foundational styles for the Tegel Design System and is designed to be used with the AG-Grid library.
                    This allows users to easily integrate Tegel Design System stylings into AG-Grid by just importing one CSS file.
                </p>
                <p> To know more about AG-Grid, free and premium features, supported frameworks and documentation please refer to the following resources:
                    <a href="https://www.ag-grid.com/">AG-Grid Documentation</a>
                </p>
                <p>
                    <h5>Highlights of Tegel & AG-Grid:</h5>
                </p>
                <ul>
                    <li>Ag-Grid is a fully-featured and easy to use table library.</li> 
                    <li>Basic features are free to use, <b>premium features come with a license cost.</b></li>
                    <li>AG-Grid is a great solution for larger data sets and complex logic.</li>
                    <li> Basic programming knowledge is required to implement AG-Grid.</li>
                </ul>     
                
                  <p>
                    <h5>What do I need to install to use Tegel & AG-Grid?</h5>
                </p>
                <ul>
                    <li>AG-Grid library for the framework you are using</li>    
                    <li>@scania/tegel-styles package as it provides Tegel theme for AG-Grid</li>   
                </ul>           
                <h5>
                    Tegel demo page examples:
                </h5>          
                <ul>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-angular-17-demo/pull/14">Tegel Angular AG-Grid Demo</a></li>
                    <li><a href="https://github.com/scania-digital-design-system/tegel-react-demo/pull/193">Tegel React AG-Grid Demo</a></li>
                </ul>
                <h5>
                    How to use @scania/tegel-styles package with AG-Grid:
                </h5>
                <ul>
                    <li>Install @scania/tegel-styles package</li>
                    <li>Import ag-grid-styles.css file from @scania/tegel-styles package in your main styles file</li>  
                    <li>This will apply the Tegel theme to your AG-Grid</li>                  
                </ul>
            </section>
            </article>             
  `,
};
