import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      name: 'Type',
      description: 'The type of headline. Functional/Expressive.',
      control: {
        type: 'radio',
      },
      options: { Functional: 'functional', Expressive: 'expressive' },
    },
  },
};

const Template = ({ type }) =>
  formatHtmlPreview(
    `
    <style>
    /* Demo code for presentation purposes */
    .demo-wrapper h1 {
        margin: 0;
    }
    </style>

    <div class="demo-wrapper">
        <h1 class="tds-${type === 'expressive' ? `${type}-` : ''}headline-01">Headline</h1>
        <h2 class="tds-${type === 'expressive' ? `${type}-` : ''}headline-02">Headline</h2>
        <h3 class="tds-${
          type === 'expressive' ? `${type}-` : ''
        }headline-03">A headline for page layouts</h3>
        <h4 class="tds-${
          type === 'expressive' ? `${type}-` : ''
        }headline-04">A headline for page layouts</h4>
        <h5 class="tds-${
          type === 'expressive' ? `${type}-` : ''
        }headline-05">A sub headline, which is most commonly paired with body-01</h5>
        <h6 class="tds-${
          type === 'expressive' ? `${type}-` : ''
        }headline-06">A sub headline, which is most commonly paired with body-02</h6>
        <h7 class="tds-${
          type === 'expressive' ? `${type}-` : ''
        }headline-07">A sub headline, which is most commonly paired with detail-02 </h7>
    </div>
  `,
  );

export const Headlines = Template.bind({});
Headlines.args = {
  type: 'functional',
};
