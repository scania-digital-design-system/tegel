import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Block/Default',
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
      options: ['Inherit from parent', 'Primary', 'Secondary'],
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
    modeVariant: 'Inherit from parent',
    componentTag: 'section',
  },
};

const Template = ({ modeVariant, componentTag }) =>
  formatHtmlPreview(
    `
      <!-- Required stylesheets:
        "@scania/tegel-light/global.css"
        "@scania/tegel-light/tl-block.css"
      -->
      <div class="tl-block${
        modeVariant !== 'Inherit from parent' ? ` tl-block--${modeVariant.toLowerCase()}` : ''
      }">
        <${componentTag}>
          <h2 class="tl-block__headline-02">Semantic Block</h2>
          <p class="tl-block__body-01">This block is now structured using a <code>&lt;${componentTag}&gt;</code> element for better accessibility.</p>
        </${componentTag}>
      </div>
    `,
  );

export const Default = Template.bind({});
