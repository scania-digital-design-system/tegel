import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Transitions/Fade',
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
      <h2>Fade</h2>
      <div class="tds-u-flex-start tds-u-gap4">
        <div>
          <div class="grey-box">
            <div class="fade-in-box"></div>
          </div>
          <p>--tds-motion-fade-in</p>
        </div>

        <div>
          <div class="grey-box">
            <div class="fade-out-box"></div>
          </div>
          <p>--tds-motion-fade-out</p>
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
      }

      .fade-in-box,
      .fade-out-box {
        border-radius: 4px;
        width: 80px;
        height: 80px;
        background-color: #041E42;
      }

      .fade-in-box {
        opacity: 0;
      }

      .fade-out-box {
        opacity: 1;
      }

      .grey-box:hover .fade-in-box {
        animation: var(--tds-motion-fade-in);
      }

      .grey-box:hover .fade-out-box {
        animation: var(--tds-motion-fade-out);
      }
    </style>
    `,
  );

export const Fade = Template.bind({});
