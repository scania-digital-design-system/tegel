import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Animations/All',
  parameters: {
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/3vglvmuE8d0wXQRhFM0Op6/Tegel-Motions?node-id=9-167&p=f&t=J2E8IQiExfDl7AHR-0',
      },
    ],
  },
};

const Template = () =>
  formatHtmlPreview(
    `
    <main>

    <h2>Enter</h2>
    <p>
      Use these variables in the <code>animation</code> property of your elements to 
      achieve smooth and uniform animation, as demonstrated below.
    </p>
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
            <div class="content">
              <div class="collapse-enter-box"></div>
            </div>
            </div>
          <p>--collapse-enter</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="slide-enter"></div>
          </div>
          <p>--slide-enter</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="elevate-enter-box"></div>
          </div>
          <p>--elevate-enter</p>
        </div>

      </div>

      <h2>Exit</h2>
      <!-- Collapse Animation Box -->
      <div class="tds-u-flex-start tds-u-gap4">
        <div>
          <div class="grey-box">
            <div class="zoom-exit-box"></div>
          </div>
          <p>--zoom-exit</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="content">
              <div class="collapse-exit-box"></div>
            </div>
          </div>
          <p>--collapse-exit</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-exit"></div>
          </div>
          <p>--slide-exit</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="elevate-exit-box"></div>
          </div>
          <p>--elevate-exit</p>
        </div>
      </div>
    </main>


      <style>
      body, html {
        margin: 0; /* Remove default margins */
        padding: 0; /* Remove default padding */
        height: 100%; /* Ensure body and html take full viewport height */
        background-color: #121212; /* Set the dark background color */
        color: #ffffff; /* Adjust text color for dark mode */
      }

      main {
        padding: 20px;
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
      .collapse-exit-box,
      .slide-enter,
      .elevate-enter-box,
      .elevate-exit-box, 
      .slide-exit {
        width: 100px;
        height: 100px;
        background-color: #041E42;
        border-radius: 5px;
        position: relative;
      }

      .zoom-enter-box{
        opacity: 0;
      }

      .grey-box:hover .zoom-enter-box {
        animation: var(--tds-motion-zoom-enter);
      }

      .zoom-exit-box {
        opacity: 1;
      }
      
      .grey-box:hover .zoom-exit-box {
        animation: var(--tds-motion-zoom-exit);
      }

      .collapse-enter-box {
        height: 0;
      }
      
      .grey-box:hover .collapse-enter-box {
        animation: var(--tds-motion-collapse-enter);
      }
      
      .collapse-exit-box {
        opacity: 1;
        height: 100px;
      }
      
      .grey-box:hover .collapse-exit-box {
        animation: var(--tds-motion-collapse-exit);
      }

      .slide-enter {
        opacity: 0;
      }

      .grey-box:hover .slide-enter {
        animation: var(--tds-motion-slide-enter);
      }

      .elevate-enter-box {
        opacity: 0;
      }
      
      .grey-box:hover .elevate-enter-box {
        animation: var(--tds-motion-elevate-enter);
      }

      .slide-exit {
        opacity: 1;
      }
      
      .grey-box:hover .slide-exit {
        animation: var(--tds-motion-slide-exit);
      }

      .elevate-exit-box {
        transform: translateY(0);
        opacity: 1;
      }

      .grey-box:hover .elevate-exit-box {
        animation: var(--tds-motion-elevate-exit);
      }

      </style>
  `,
  );

export const All = Template.bind({});
