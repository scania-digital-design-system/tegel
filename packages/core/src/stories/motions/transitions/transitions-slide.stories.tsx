import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Transitions/Slide',
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
      <h2>Slide</h2>
      <p>
        Use these variables in the <code>animation</code> property of your elements to 
        achieve smooth and uniform transitions, as demonstrated below.
      </p>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Slide In -->
        <div>
          <div class="grey-box">
            <div class="slide-in-top-box"></div>
          </div>
          <p>--tds-motion-slide-in-top</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-in-right-box"></div>
          </div>
          <p>--tds-motion-slide-in-right</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-in-bottom-box"></div>
          </div>
          <p>--tds-motion-slide-in-bottom</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-in-left-box"></div>
          </div>
          <p>--tds-motion-slide-in-left</p>
        </div>
      </div>

      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Slide Out -->
        <div>
          <div class="grey-box">
            <div class="slide-out-top-box"></div>
          </div>
          <p>--tds-motion-slide-out-top</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-out-right-box"></div>
          </div>
          <p>--tds-motion-slide-out-right</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-out-bottom-box"></div>
          </div>
          <p>--tds-motion-slide-out-bottom</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-out-left-box"></div>
          </div>
          <p>--tds-motion-slide-out-left</p>
        </div>
      </div>
    </main>

    <style>
      main {
        padding: 20px;
      }

      .grey-box {
        width: 200px;
        height: 200px;
        background-color: #EDEFF3;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        overflow: hidden;
      }

      .slide-in-top-box,
      .slide-in-right-box,
      .slide-in-bottom-box,
      .slide-in-left-box,
      .slide-out-top-box,
      .slide-out-right-box,
      .slide-out-bottom-box,
      .slide-out-left-box {
        border-radius: 4px;
        width: 80px;
        height: 80px;
        background-color: #041E42;
      }

      /* Slide In */
      .slide-in-top-box {
        visibility: hidden;
        transform: var(--tds-motion-slide-in-top);
      }

      .grey-box:hover .slide-in-top-box {
        animation: var(--tds-motion-slide-in-top);
      }

      .slide-in-right-box {
        visibility: hidden;
        transform: translateX(100%);
      }

      .grey-box:hover .slide-in-right-box {
        animation: var(--tds-motion-slide-in-right);
      }

      .slide-in-bottom-box {
        visibility: hidden;
        transform: translateY(100%);
      }

      .grey-box:hover .slide-in-bottom-box {
        animation: var(--tds-motion-slide-in-bottom);
      }

      .slide-in-left-box {
        visibility: hidden;
        transform: translateX(-100%);
      }

      .grey-box:hover .slide-in-left-box {
        animation: var(--tds-motion-slide-in-left);
      }

      /* Slide Out */
      .slide-out-top-box {
        transform: translateY(0);
      }

      .grey-box:hover .slide-out-top-box {
        animation: var(--tds-motion-slide-out-top);
      }

      .slide-out-right-box {
        transform: translateX(0);
      }

      .grey-box:hover .slide-out-right-box {
        animation: var(--tds-motion-slide-out-right);
      }

      .slide-out-bottom-box {
        transform: translateY(0);
      }

      .grey-box:hover .slide-out-bottom-box {
        animation: var(--tds-motion-slide-out-bottom);
      }

      .slide-out-left-box {
        transform: translateX(0);
      }

      .grey-box:hover .slide-out-left-box {
        animation: var(--tds-motion-slide-out-left);
      }
    </style>
    `,
  );

export const Slide = Template.bind({});
