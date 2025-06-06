import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Foundations/Spacing',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = () =>
  formatHtmlPreview(
    `
  <style>
    /* Demo code for presentation purposes */
    .tds-spacing-element-demo-box {
      background-color: var(--tds-red-500);
      display: inline-block;
    }
    table th, table td {
      padding: 8px;
      text-align: center;
    }

    th:last-child {
        text-align: left;
    }
    th:last-child,
    td:last-child {
      text-align: left;
    }
  </style>

  <h4>Spacing Element</h4>
  <table>
    <tr>
      <th>Px</th>
      <th>Token</th>
      <th>CSS</th>
      <th>Scale</th>
    </tr>
    <tr>
      <td>2px</td>
      <td><code>$spacing-element-2</code></td>
      <td><code>.tds-spacing-element-2</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-2); height: var(--tds-spacing-element-2)"></span></td>
    </tr>
    <tr>
      <td>4px</td>
      <td><code>$spacing-element-4</code></td>
      <td><code>.tds-spacing-element-4</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-4); height: var(--tds-spacing-element-4)"></span></td>
    </tr>
    <tr>
      <td>8px</td>
      <td><code>$spacing-element-8</code></td>
      <td><code>.tds-spacing-element-8</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-8); height: var(--tds-spacing-element-8)"></span></td>
    </tr>
    <tr>
      <td>12px</td>
      <td><code>$spacing-element-12</code></td>
      <td><code>.tds-spacing-element-12</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-12); height: var(--tds-spacing-element-12);"></span></td>
    </tr>
    <tr>
      <td>16px</td>
      <td><code>$spacing-element-16</code></td>
      <td><code>.tds-spacing-element-16</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-16); height: var(--tds-spacing-element-16);"></span></td>
    </tr>
    <tr>
      <td>20px</td>
      <td><code>$spacing-element-20</code></td>
      <td><code>.tds-spacing-element-20</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-20); height: var(--tds-spacing-element-20);"></span></td>
    </tr>
    <tr>
      <td>24px</td>
      <td><code>$spacing-element-24</code></td>
      <td><code>.tds-spacing-element-24</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-24); height: var(--tds-spacing-element-24);"></span></td>
    </tr>
    <tr>
      <td>32px</td>
      <td><code>$spacing-element-32</code></td>
      <td><code>.tds-spacing-element-32</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-32); height: var(--tds-spacing-element-32);"></span></td>
    </tr>
    <tr>
      <td>40px</td>
      <td><code>$spacing-element-40</code></td>
      <td><code>.tds-spacing-element-40</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-40); height: var(--tds-spacing-element-40);"></span></td>
    </tr>
    <tr>
      <td>48px</td>
      <td><code>$spacing-element-48</code></td>
      <td><code>.tds-spacing-element-48</code></td>
      <td><span class="tds-spacing-element-demo-box" style="width: var(--tds-spacing-element-48); height: var(--tds-spacing-element-48);"></span></td>
    </tr>
  </table>
  `,
  );

export const SpacingElement = Template.bind({});
SpacingElement.args = {};
