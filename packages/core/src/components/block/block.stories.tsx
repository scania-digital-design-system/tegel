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
        <h2 class="tds-headline-02">Block</h2>
        <p class="tds-body-01">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum nisi ut eleifend ultrices. Nunc venenatis maximus sapien, ac bibendum nisl aliquam in. Morbi ac velit et ligula consectetur interdum. Vestibulum condimentum, augue vitae lobortis rhoncus, mi est ultricies mi, sed tincidunt magna nibh in lectus. Pellentesque vel vulputate orci, vel lacinia orci. Sed suscipit leo at diam ullamcorper, vitae volutpat neque dapibus. Maecenas sit amet rhoncus arcu. Sed sed molestie elit. Nullam in interdum est, vitae aliquam ipsum. Nunc rutrum nibh ut arcu egestas egestas.</p>
       
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
          <h2 class="tds-headline-02">Outer Block</h2>
          <p class="tds-body-01">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <tds-block>
            <h3 class="tds-headline-04">Middle Block</h3>
            <p class="tds-detail-03">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <tds-block>
              <h4 class="tds-headline-06">Inner Block</h4>
              <p class="tds-detail-03">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
};

Nested.args = {
  outerModeVariant: 'Primary',
};
