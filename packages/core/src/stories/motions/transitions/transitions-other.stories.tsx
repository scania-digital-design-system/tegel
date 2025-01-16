import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Transitions/Other',
  parameters: {
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
};

const Template = () =>
  formatHtmlPreview(
    `
    <main>
      <h2>Other</h2>
      <div class="tds-u-flex-start tds-u-gap4">
        <!-- Rotate -->
        <div>
          <div class="grey-box">
            <div class="rotate-in-box"></div>
          </div>
          <p>--tds-motion-rotate</p>
        </div>

        <!-- Shake -->
        <div>
          <div class="grey-box">
            <div class="shake-box"></div>
          </div>
          <p>-tds-motion-shake</p>
        </div>

        <!-- Pulse -->
        <div>
          <div class="grey-box">
            <div class="pulse-box"></div>
          </div>
          <p>-tds-motion-pulse</p>
        </div>

        <!-- Blink -->
        <div>
          <div class="grey-box">
            <div class="blink-box"></div>
          </div>
          <p>-tds-motion-blink</p>
        </div>

        <!-- Elevate Exit -->
        <div>
          <div class="grey-box">
            <div class="elevate-exit-box"></div>
          </div>
          <p>-tds-motion-elevate</p>
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

      .rotate-in-box,
      .shake-box,
      .pulse-box,
      .blink-box,
      .elevate-exit-box {
        border-radius: 4px;
        width: 80px;
        height: 80px;
        background-color: #041E42;
      }

      /* Rotate */
      .rotate-in-box {
        transform: rotate(0deg);
      }

      .grey-box:hover .rotate-in-box {
        animation: var(--tds-motion-rotate);
      }

      /* Shake */
      .shake-box {
        transform: rotate(0deg);
      }

      .grey-box:hover .shake-box {
        animation: var(--tds-motion-shake);
      }

      /* Pulse */
      .pulse-box {
        transform: scale(1);
      }

      .grey-box:hover .pulse-box {
        animation: var(--tds-motion-pulse);
      }

      /* Blink */
      .blink-box {
        opacity: 1;
      }

      .grey-box:hover .blink-box {
        animation: var(--tds-motion-blink);
      }

      /* Elevate Exit */
      .elevate-exit-box {
        transform: translateY(0);
      }

      .grey-box:hover .elevate-exit-box {
        animation: var(--tds-motion-elevate-exit);
      }
    </style>
    `,
  );

export const Other = Template.bind({});
