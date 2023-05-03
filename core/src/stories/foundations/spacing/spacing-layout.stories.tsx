import { formatHtmlPreview } from "../../../utils/utils";

export default {
  title: "Foundations/Spacing",
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () =>
  formatHtmlPreview(
    `
  <style>
   /* Demo code for presentation purposes */
    .demo-wrapper {
      background-color: var(--sdds-blue-500);
      display: inline-block;
    }
    table th, table td {
      padding: 8px;
    }
    th:last-child,
    td:last-child {
      text-align: left;
    }
  </style>

  <table>
    <tr>
      <th>Px</th>
      <th>Token</th>
      <th>CSS</th>
      <th>Scale</th>
    </tr>
    <tr>
      <td>8px</td>
      <td><code>$spacing-layout-8</code></td>
      <td><code>.sdds-spacing-layout-8</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-8); height: var(--sdds-spacing-layout-8)"></span></td>
    </tr>
    <tr>
      <td>16px</td>
      <td><code>$spacing-layout-16</code></td>
      <td><code>.sdds-spacing-layout-16</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-16); height: var(--sdds-spacing-layout-16);"></span></td>
    </tr>
    <tr>
      <td>24px</td>
      <td><code>$spacing-layout-24</code></td>
      <td><code>.sdds-spacing-layout-24</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-24); height: var(--sdds-spacing-layout-24);"></span></td>
    </tr>
    <tr>
      <td>32px</td>
      <td><code>$spacing-layout-32</code></td>
      <td><code>.sdds-spacing-layout-32</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-32); height: var(--sdds-spacing-layout-32);"></span></td>
    </tr>
    <tr>
      <td>48px</td>
      <td><code>$spacing-layout-48</code></td>
      <td><code>.sdds-spacing-layout-48</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-48); height: var(--sdds-spacing-layout-48);"></span></td>
    </tr>
    <tr>
      <td>64px</td>
      <td><code>$spacing-layout-64</code></td>
      <td><code>.sdds-spacing-layout-64</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-64); height: var(--sdds-spacing-layout-64);"></span></td>
    </tr>
    <tr>
      <td>72px</td>
      <td><code>$spacing-layout-72</code></td>
      <td><code>.sdds-spacing-layout-72</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-72); height: var(--sdds-spacing-layout-72);"></span></td>
    </tr>
    <tr>
      <td>96px</td>
      <td><code>$spacing-layout-96</code></td>
      <td><code>.sdds-spacing-layout-96</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-96); height: var(--sdds-spacing-layout-96);"></span></td>
    </tr>
    <tr>
      <td>128px</td>
      <td><code>$spacing-layout-128</code></td>
      <td><code>.sdds-spacing-layout-128</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-128); height: var(--sdds-spacing-layout-128);"></span></td>
    </tr>
    <tr>
      <td>160px</td>
      <td><code>$spacing-layout-160</code></td>
      <td><code>.sdds-spacing-layout-160</code></td>
      <td><span class="demo-wrapper" style="width: var(--sdds-spacing-layout-160); height: var(--sdds-spacing-layout-160);"></span></td>
    </tr>
  </table>
  `
  );

export const SpacingLayout = Template.bind({});
SpacingLayout.args = {};
