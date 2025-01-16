import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Transitions/Slide Short',
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
      <h2>Slide Short</h2>
      <p>
        Use these variables in the <code>animation</code> property of your elements to 
        achieve smooth and uniform transitions, as demonstrated below.
      </p>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Slide Short In -->
        <div>
          <div class="grey-box">
            <div class="slide-in-top-short-box"></div>
          </div>
          <p>--tds-motion-slide-in-short-top</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-in-right-short-box"></div>
          </div>
          <p>--tds-motion-slide-in-short-right</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-in-bottom-short-box"></div>
          </div>
          <p>--tds-motion-slide-in-short-bottom</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-in-left-short-box"></div>
          </div>
          <p>--tds-motion-slide-in-short-left</p>
        </div>
      </div>

      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Slide Short Out -->
        <div>
          <div class="grey-box">
            <div class="slide-out-top-short-box"></div>
          </div>
          <p>--tds-motion-slide-out-short-top</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-out-right-short-box"></div>
          </div>
          <p>--tds-motion-slide-out-short-right</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-out-bottom-short-box"></div>
          </div>
          <p>--tds-motion-slide-out-short-bottom</p>
        </div>
        <div>
          <div class="grey-box">
            <div class="slide-out-left-short-box"></div>
          </div>
          <p>--tds-motion-slide-out-short-left</p>
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

      .slide-in-top-short-box,
      .slide-in-right-short-box,
      .slide-in-bottom-short-box,
      .slide-in-left-short-box,
      .slide-out-top-short-box,
      .slide-out-right-short-box,
      .slide-out-bottom-short-box,
      .slide-out-left-short-box {
        border-radius: 4px;
        width: 80px;
        height: 80px;
        background-color: #041E42;
      }

      /* Slide Short In */
      .slide-in-top-short-box {
        visibility: hidden;
        transform: translateY(-16px);
      }

      .grey-box:hover .slide-in-top-short-box {
        animation: var(--tds-motion-slide-in-short-top);
      }

      .slide-in-right-short-box {
        visibility: hidden;
        transform: translateX(16px);
      }

      .grey-box:hover .slide-in-right-short-box {
        animation: var(--tds-motion-slide-in-short-right);
      }

      .slide-in-bottom-short-box {
        visibility: hidden;
        transform: translateY(16px);
      }

      .grey-box:hover .slide-in-bottom-short-box {
        animation: var(--tds-motion-slide-in-short-bottom);
      }

      .slide-in-left-short-box {
        visibility: hidden;
        transform: translateX(-16px);
      }

      .grey-box:hover .slide-in-left-short-box {
        animation: var(--tds-motion-slide-in-short-left);
      }

      /* Slide Short Out */
      .slide-out-top-short-box {
        transform: translateY(0);
      }

      .grey-box:hover .slide-out-top-short-box {
        animation: var(--tds-motion-slide-out-short-top);
      }

      .slide-out-right-short-box {
        transform: translateX(0);
      }

      .grey-box:hover .slide-out-right-short-box {
        animation: var(--tds-motion-slide-out-short-right);
      }

      .slide-out-bottom-short-box {
        transform: translateY(0);
      }

      .grey-box:hover .slide-out-bottom-short-box {
        animation: var(--tds-motion-slide-out-short-bottom);
      }

      .slide-out-left-short-box {
        transform: translateX(0);
      }

      .grey-box:hover .slide-out-left-short-box {
        animation: var(--tds-motion-slide-out-short-left);
      }
    </style>
    `,
  );

export const SlideShort = Template.bind({});
