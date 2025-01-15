import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Transitions',
  parameters: {
    notes: {},
    layout: 'fullscreen',
    docs: {
      source: {
        state: 'closed',
      },
    },
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
    <main class="tds-u-w-100 tds-u-p3" style="box-sizing: border-box;">
      <h2>Fade</h2>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Fade Animation Box -->
        <div>
          <div class="grey-box">
            <div class="fade-in-box"></div>
          </div>
          <p>--fade-in-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="fade-out-box"></div>
          </div>
          <p>--fade-out-animation</p>
        </div>
      </div>

      <h2>Zoom</h2>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Zoom Animation Box -->
        <div>
          <div class="grey-box">
            <div class="zoom-in-box"></div>
          </div>
          <p>--zoom-in-animation</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="zoom-out-box"></div>
          </div>
          <p>--zoom-out-animation</p>
        </div>
      </div>

      <h2>Collapse</h2>

      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Collapse Animation Box -->
        <div>
          <div class="grey-box" style="height: 200px;">
            <div class="content">
            <div class="collapse-in-box"></div>
            </div>
          </div>
          <p>--collapse-in-animation</p>
        </div>
        <div>
          <div class="grey-box" style="height: 200px;">
            <div class="content">
            <div class="collapse-out-box"></div>
            </div>
          </div>
          <p>--collapse-out-animation</p>
        </div>
      </div>

      <h2>Slide</h2>

      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Slide Animation Box -->
        <div>
          <div class="grey-box">
              <div class="slide-in-top-box"></div>
            </div>
          <p>--slide-in-top-animation</p>
        </div>
        <div>
          <div class="grey-box">
              <div class="slide-in-right-box"></div>
            </div>
          <p>--slide-in-right-animation</p>
        </div>
        <div>
          <div class="grey-box">
              <div class="slide-in-bottom-box"></div>
            </div>
          <p>--slide-in-bottom-animation</p>
        </div>
        <div>
          <div class="grey-box">
              <div class="slide-in-left-box"></div>
            </div>
          <p>--slide-in-left-animation</p>
        </div>
      </div>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Slide Animation Box -->
        <div>
          <div class="grey-box">
              <div class="slide-out-top-box"></div>
            </div>
          <p>--slide-out-top-animation</p>
        </div>
        <div>
          <div class="grey-box">
              <div class="slide-out-right-box"></div>
            </div>
          <p>--slide-out-right-animation</p>
        </div>
        <div>
          <div class="grey-box">
              <div class="slide-out-bottom-box"></div>
            </div>
          <p>--slide-out-bottom-animation</p>
        </div>
        <div>
          <div class="grey-box">
              <div class="slide-out-left-box"></div>
            </div>
          <p>--slide-out-left-animation</p>
        </div>
      </div>

      <h2>Slide Short</h2>

      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Slide Short Animation Box -->
        <div>
          <div class="grey-box">
            <div class="slide-in-top-short-box"></div>
          </div>
          <p>--slide-in-top-short-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="slide-in-right-short-box"></div>
          </div>
          <p>--slide-in-right-short-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="slide-in-bottom-short-box"></div>
          </div>
          <p>--slide-in-bottom-short-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="slide-in-left-short-box"></div>
          </div>
          <p>--slide-in-left-short-animation</p>
        </div>
      </div>

      <div class="tds-u-flex-start tds-u-gap4">
        <div>
          <div class="grey-box">
            <div class="slide-out-top-short-box"></div>
          </div>
          <p>--slide-out-top-short-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="slide-out-right-short-box"></div>
          </div>
          <p>--slide-out-right-short-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="slide-out-bottom-short-box"></div>
          </div>
          <p>--slide-out-bottom-short-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="slide-out-left-short-box"></div>
          </div>
          <p>--slide-out-left-short-animation</p>
        </div>
      </div>

      <h2>Other</h2>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Rotate Animation Box -->
        <div>
          <div class="grey-box">
            <div class="rotate-in-box"></div>
          </div>
          <p>--rotate-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="shake-box"></div>
          </div>
          <p>--shake-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="pulse-box"></div>
          </div>
          <p>--pulse-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="blink-box"></div>
          </div>
          <p>--blink-animation</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="elevate-exit-box"></div>
          </div>
          <p>--elevate-exit-animation</p>
        </div>
      </div>

    </main>



<style>

  body, html {
      margin: 0; /* Remove default margins */
      padding: 0; /* Remove default padding */
      height: 100%; /* Ensure body and html take full viewport height */
  }

  main {
      min-height: 100vh; /* Make sure the main content takes at least the full viewport height */
      box-sizing: border-box;
  }

  .grey-box:hover {
    cursor: pointer;
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

  .content{
    width: 100px;
    height: 100px;
  }

  /* Inner Box Styling */
  .fade-in-box,
  .fade-out-box,
  .zoom-in-box,
  .zoom-out-box,
  .collapse-in-box,
  .collapse-out-box,
  .slide-in-top-box,
  .slide-in-right-box,
  .slide-in-bottom-box,
  .slide-in-left-box,
  .slide-out-top-box,
  .slide-out-right-box,
  .slide-out-bottom-box,
  .slide-out-left-box,
  .slide-in-top-short-box,
  .slide-in-right-short-box,
  .slide-in-bottom-short-box,
  .slide-in-left-short-box,
  .slide-out-top-short-box,
  .slide-out-right-short-box,
  .slide-out-bottom-short-box,
  .slide-out-left-short-box,
  .shake-box,
  .rotate-in-box,
  .pulse-box,
  .blink-box,
  .elevate-exit-box {
    width: 80px;
    height: 80px;
    background-color: #041E42;
    border-radius: 5px;
    position: relative;
  }

  /* Fade Animation */
  .fade-in-box {
    opacity: 0;
  }

  .fade-out-box {
    opacity: 1;
  }

  .grey-box:hover .fade-in-box {
    animation: var(--fade-in-animation)
  }
  
  .grey-box:hover .fade-out-box {
    animation: var(--fade-out-animation)
  }

  .grey-box:hover .fade-box {
    animation: var(--fade-out-animation)
  }

  /* Zoom Animation */
  .zoom-in-box {
    animation: var(--zoom-in-animation)
  }

  .grey-box:hover .zoom-in-box {
    animation: var(--zoom-out-animation)
  }

  .zoom-out-box {
    animation: var(--zoom-out-animation)
  }
  
  .grey-box:hover .zoom-out-box {
    animation: var(--zoom-in-animation)
  }

  /* Collapse Animation */
  .collapse-in-box {
      height: 0px
  }

  .grey-box:hover .collapse-in-box {
    animation: var(--collapse-in-animation);
  }

  .collapse-out-box {
    height: 100px;
  }
  
  .grey-box:hover .collapse-out-box {
    animation: var(--collapse-out-animation);
  }

  /* Slide Animation */
  .slide-in-top-box {
  transform: translateY(-100%);
  }
  
  .grey-box:hover .slide-in-top-box {
    animation: var(--slide-in-top-animation);
  }

  .slide-in-right-box {
    transform: translateX(100%);
  }
  
  .grey-box:hover .slide-in-right-box {
    animation: var(--slide-in-right-animation);
  }
  
  .slide-in-bottom-box {
    transform: translateY(100%);
  }
  
  .grey-box:hover .slide-in-bottom-box {
    animation: var(--slide-in-bottom-animation);
  }
  
  .slide-in-left-box {
    transform: translateX(-100%);
  }
  
  .grey-box:hover .slide-in-left-box {
    animation: var(--slide-in-left-animation);
  }

  .slide-out-top-box {
    transform: translateY(0);
  }
  
  .grey-box:hover .slide-out-top-box {
    animation: var(--slide-out-top-animation);
  }
  
  .slide-out-right-box {
    transform: translateX(0);
  }

  .grey-box:hover .slide-out-right-box {
    animation: var(--slide-out-right-animation);
  }

  .slide-out-bottom-box {
    transform: translateY(0);
  }

  .grey-box:hover .slide-out-bottom-box {
    animation: var(--slide-out-bottom-animation);
  }

  .slide-out-left-box {
    transform: translateX(0);
  }

  .grey-box:hover .slide-out-left-box {
    animation: var(--slide-out-left-animation);
  }

  /* Slide Short Animation */
  .slide-in-top-short-box {
    transform: translateY(-16px);
  }

  .grey-box:hover .slide-in-top-short-box {
    animation: var(--slide-in-top-short-animation);
  }

  .slide-in-right-short-box {
    transform: translateX(16px);
  }
  
  .grey-box:hover .slide-in-right-short-box {
    animation: var(--slide-in-right-short-animation);
  }

  .slide-in-bottom-short-box {
    transform: translateY(16px);
  }
  
  .grey-box:hover .slide-in-bottom-short-box {
    animation: var(--slide-in-bottom-short-animation);
  }

  .slide-in-left-short-box {
    transform: translateX(-16px);
  }

  .grey-box:hover .slide-in-left-short-box {
    animation: var(--slide-in-left-short-animation);
  }

  .slide-out-top-short-box {
    transform: translateY(0);
  }

  .grey-box:hover .slide-out-top-short-box {
    animation: var(--slide-out-top-short-animation);
  }

  .slide-out-right-short-box {
    transform: translateX(0);
  }

  .grey-box:hover .slide-out-right-short-box {
    animation: var(--slide-out-right-short-animation);
  }

  .slide-out-bottom-short-box {
    transform: translateY(0);
  }

  .grey-box:hover .slide-out-bottom-short-box {
    animation: var(--slide-out-bottom-short-animation);
  }

  .slide-out-left-short-box {
    transform: translateX(0);
  }

  .grey-box:hover .slide-out-left-short-box {
    animation: var(--slide-out-left-short-animation);
  }
  
  /* Other Animation */

  .rotate-in-box {
    transform: rotate(0deg);
  }
  
  .grey-box:hover .rotate-in-box {
    animation: var(--rotate-animation);
  }

  .shake-box {
    transform: rotate(0deg);
  }
  
  .grey-box:hover .shake-box {
    animation: var(--shake-animation);
  }

  .pulse-box {
    transform: scale(1);
  }
  
  .grey-box:hover .pulse-box {
    animation: var(--pulse-animation);
  }

  .blink-box {
    opacity: 1;
  }
  
  .grey-box:hover .blink-box {
    animation: var(--blink-animation);
  }

  .elevate-exit-box {
    transform: translateY(0);
  }

  .grey-box:hover .elevate-exit-box {
    animation: var(--elevate-exit-animation);
  }


</style>

  `,
  );

export const Basic = Template.bind({});
