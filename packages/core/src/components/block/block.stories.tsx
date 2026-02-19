import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Block/Default',
  parameters: {
    layout: 'padded',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=9743-24020&m=dev',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/design/N3EHKGUuyqC9PmlxOF7CZQ/20260219---Tegel-UI-Library--Main-?node-id=9743-24020&m=dev',
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
        <div style="height: 150px"></div>
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
