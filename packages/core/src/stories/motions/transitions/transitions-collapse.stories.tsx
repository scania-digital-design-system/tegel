import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Motions/Transitions/Collapse',
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
      <h2>Collapse</h2>
      <div class="tds-u-flex-start tds-u-gap4">
        <div>
          <div class="grey-box" style="height: 200px;">
            <div class="content">
              <div class="collapse-in-box"></div>
            </div>
          </div>
          <p>--tds-motion-collapse-in</p>
        </div>

        <div>
          <div class="grey-box" style="height: 200px;">
            <div class="content">
              <div class="collapse-out-box"></div>
            </div>
          </div>
          <p>--tds-motion-collapse-out</p>
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

      .content {
        width: 100px;
        height: 100px;
      }

      .collapse-in-box,
      .collapse-out-box {
        border-radius: 4px;
        width: 100px;
        height: 100px;
        background-color: #041E42;
      }

      .collapse-in-box {
        height: 0;
      }

      .collapse-out-box {
        height: 100px;
      }

      .grey-box:hover .collapse-in-box {
        animation: var(--tds-motion-collapse-in);
      }

      .grey-box:hover .collapse-out-box {
        animation: var(--tds-motion-collapse-out);
      }
    </style>
    `,
  );

export const Collapse = Template.bind({});
