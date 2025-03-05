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

const SingleTemplate = ({ modeVariant, componentTag }) =>
  formatHtmlPreview(
    `
      <tds-block 
        ${
          modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
        } 
        component-tag="${componentTag}">
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
      'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
    control: {
      type: 'radio',
    },
    options: ['Inherit from parent', 'Primary', 'Secondary'],
    table: {
      defaultValue: { summary: 'Inherit from parent' },
    },
  },
  componentTag: {
    name: 'Component Tag',
    description: 'Specifies the HTML tag used for the component wrapper.',
    control: {
      type: 'radio',
    },
    options: ['section', 'div', 'article', 'aside', 'header', 'footer', 'nav', 'main'],
    table: {
      defaultValue: { summary: 'section' },
    },
  },
};

Default.args = {
  modeVariant: 'Inherit from parent',
  componentTag: 'section',
};

const NestedTemplate = ({ outerModeVariant, componentTag }) =>
  formatHtmlPreview(
    `
      <div ${
        outerModeVariant !== 'Inherit from parent'
          ? `class="tds-mode-variant-${outerModeVariant.toLowerCase()}"`
          : ''
      }>
        <tds-block component-tag="${componentTag}">
          <tds-block component-tag="${componentTag}">
            <h2 class="tds-headline-02">Outer Block (${componentTag})</h2>
            <p class="tds-body-01">This block is now structured using a <code>&lt;${componentTag}&gt;</code>.</p>
            <tds-block component-tag="aside">
              <aside>
                <h3 class="tds-headline-04">Middle Block (Aside)</h3>
                <p class="tds-detail-03">Nested content inside an <code>&lt;aside&gt;</code> element.</p>
                <tds-block component-tag="section">
                  <section>
                    <h4 class="tds-headline-06">Inner Block (Section)</h4>
                    <p class="tds-detail-03">Ensuring meaningful content structure with semantic HTML.</p>
                  </section>
                </tds-block>
              </aside>
            </tds-block>
          </tds-block> 
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
  componentTag: {
    name: 'Component Tag',
    description: 'Specifies the HTML tag used for the component wrapper.',
    control: {
      type: 'radio',
    },
    options: ['section', 'div', 'article', 'aside', 'header', 'footer', 'nav', 'main'],
    table: {
      defaultValue: { summary: 'article' },
    },
  },
};

Nested.args = {
  outerModeVariant: 'Primary',
  componentTag: 'article',
};
