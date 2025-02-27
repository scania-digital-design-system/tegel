import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Block`,
  parameters: {
    layout: 'padded',
    notes: readme,
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9743%3A24020&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9743%3A24020&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
};

const SingleTemplate = ({ modeVariant }) =>
  formatHtmlPreview(
    `
      <tds-block ${
        modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
      }>
        <section>
          <h2 class="tds-headline-02">Semantic Block</h2>
          <p class="tds-body-01">This block is now structured using a <code>&lt;section&gt;</code> element for better accessibility.</p>
          <button class="tds-button">Click me</button>
        </section>
      </tds-block>
    `,
  );

export const Default = SingleTemplate.bind({});
Default.argTypes = {
  modeVariant: {
    name: 'Mode variant',
    description:
      'Mode variant adjusts component colors to have better visibility depending on global mode and background. ',
    control: {
      type: 'radio',
    },
    options: ['Inherit from parent', 'Primary', 'Secondary'],
    table: {
      defaultValue: { summary: 'Inherit from parent' },
    },
  },
};

Default.args = {
  modeVariant: 'Inherit from parent',
};

const NestedTemplate = ({ outerModeVariant }) =>
  formatHtmlPreview(
    `
      <div ${
        outerModeVariant !== 'Inherit from parent'
          ? `class="tds-mode-variant-${outerModeVariant.toLowerCase()}"`
          : ''
      }>
        <tds-block>
          <article>
            <h2 class="tds-headline-02">Outer Block (Article)</h2>
            <p class="tds-body-01">This block is now structured using an <code>&lt;article&gt;</code>.</p>
            <tds-block>
              <aside>
                <h3 class="tds-headline-04">Middle Block (Aside)</h3>
                <p class="tds-detail-03">Nested content inside an <code>&lt;aside&gt;</code> element.</p>
                <tds-block>
                  <section>
                    <h4 class="tds-headline-06">Inner Block (Section)</h4>
                    <p class="tds-detail-03">Ensuring meaningful content structure with semantic HTML.</p>
                  </section>
                </tds-block>
              </aside>
            </tds-block>
          </article>
        </tds-block>
      </div>
    `,
  );

export const Nested = NestedTemplate.bind({});
Nested.argTypes = {
  outerModeVariant: {
    name: 'Mode variant',
    description: 'Mode variant that should be set on the parent/app level.',
    control: {
      type: 'radio',
    },
    options: ['Primary', 'Secondary'],
    table: {
      defaultValue: { summary: 'Primary' },
    },
  },
};

Nested.args = {
  outerModeVariant: 'Primary',
};
