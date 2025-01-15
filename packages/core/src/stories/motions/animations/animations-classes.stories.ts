import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Animations',
  parameters: {
    notes: {},
    layout: 'fullscreen',
    docs: {},
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {},
  args: {},
};

const Template = () =>
  formatHtmlPreview(
    `
      <h2>Enter</h2>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Zoom Animation Box -->
        <div>
          <div class="grey-box">
            <div class="zoom-enter-box"></div>
          </div>
          <p>--zoom-enter</p>
        </div>
        
        <div>
          <div class="grey-box">
            <div class="zoom-exit-box"></div>
          </div>
          <p>--zoom-exit</p>
        </div>
      </div>

      <div class="tds-u-gap4">
        <!-- Collapse Animation Box -->
        <h2>Collapse</h2>
        <div>
          <div class="grey-box">
            <div class="content">
              <div class="collapse-enter-box"></div>
            </div>
            </div>
          <p>--collapse-enter</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="content">
              <div class="collapse-exit-box"></div>
            </div>
          </div>
          <p>--collapse-exit</p>
        </div>
      </div>


      <style>
      body, html {
        margin: 0; /* Remove default margins */
        padding: 0; /* Remove default padding */
        height: 100%; /* Ensure body and html take full viewport height */
        background-color: #121212; /* Set the dark background color */
        color: #ffffff; /* Adjust text color for dark mode */
      }

      main {
          min-height: 100vh; /* Ensure main content takes at least full viewport height */
          box-sizing: border-box;
          background-color: #121212; /* Set background color for dark mode compatibility */
      }

      main {
          min-height: 100vh; /* Make sure the main content takes at least the full viewport height */
          box-sizing: border-box;
      }

      p {
        font-size: 12px;
      }

      .grey-box:hover {
        cursor: pointer;
      }
      
      .content{
        width: 100px;
        height: 100px;
      }

      .grey-box {
        width: 200px;
        height: 200px;
        background-color: #EDEFF3;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0; 
        box-sizing: border-box;
        overflow: hidden;
      }

      .zoom-enter-box,
      .zoom-exit-box,
      .collapse-enter-box,
      .collapse-exit-box {
        width: 80px;
        height: 80px;
        background-color: #041E42;
        border-radius: 5px;
        position: relative;
      }

      .zoom-enter-box{
        opacity: 0;
      }

      .grey-box:hover .zoom-enter-box {
        animation: var(--zoom-enter);
      }

      .zoom-exit-box {
        opacity: 1;
      }
      
      .grey-box:hover .zoom-exit-box {
        animation: var(--zoom-exit);
      }

      .collapse-enter-box {
        height: 0;
      }
      
      .grey-box:hover .collapse-enter-box {
        animation: var(--collapse-enter);
      }
      
      .collapse-exit-box {
        height: 100px;
      }
      
      .grey-box:hover .collapse-exit-box {
        animation: var(--collapse-exit);
      }

      </style>
  `,
  );

export const Basic = Template.bind({});
