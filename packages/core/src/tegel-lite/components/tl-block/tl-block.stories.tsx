import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Block/Default',
  parameters: {
    layout: 'padded',
  },

  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
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
    },
  },

  args: {
    modeVariant: 'Primary',
    componentTag: 'section',
  },
};

const Template = ({ modeVariant, componentTag }) =>
  formatHtmlPreview(
    `
      <!-- Required stylesheets:
        "@scania/tegel-lite/global.css"
        "@scania/tegel-lite/tl-block.css"
      -->
      <div class="tl-block tl-block--${modeVariant.toLowerCase()}">
        <${componentTag}>
          <h2>Semantic Block</h2>
          <p>This block is now structured using a <code>&lt;${componentTag}&gt;</code> element for better accessibility.</p>
        </${componentTag}>
      </div>
    `,
  );

export const Default = Template.bind({});
