import readme from './readme.md';
import CardPlaceholder from '../../stories/assets/image/card-placeholder.png';
import CardBodyImage from '../../stories/assets/image/card-img.png';
import formatHtmlPreview from '../../stories/formatHtmlPreview';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Card`,
  parameters: {
    notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2891%3A125&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2891%3A125&t=rVXuTOgTmXPauyHd-1',
      },
    ],
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
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    header: {
      name: 'Header text',
      description: 'Sets the header text.',
      control: {
        type: 'text',
      },
    },
    subheader: {
      name: 'Subheader text',
      description: 'Sets the subheader text.',
      control: {
        type: 'text',
      },
    },
    thumbnail: {
      name: 'Header thumbnail',
      description: 'Toggles a thumbnail in the header.',
      control: {
        type: 'boolean',
      },
    },
    imagePlacement: {
      name: 'Body image placement',
      description: 'Sets the placement of the body image, above or below the header.',
      control: {
        type: 'radio',
      },
      options: ['Above', 'Below'],
      table: {
        defaultValue: { summary: 'below' },
      },
    },
    bodyImg: {
      name: 'Body image',
      description: 'Toggles an image in the Card body. Cannot be combined with divider.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'bodyDivider', eq: false },
    },
    bodyContent: {
      name: 'Body text',
      description: 'Sets the body text for the Card.',
      control: {
        type: 'text',
      },
    },
    bodyDivider: {
      name: 'Body divider',
      description: 'Adds a divider above the body content. Cannot be combined with body image.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'bodyImg', eq: false },
      table: {
        defaultValue: { summary: false },
      },
    },
    cardActions: {
      name: 'Content of the bottom of the Card',
      description: 'Slot to add custom HTML elements to the bottom of the Card.',
      control: {
        type: 'text',
      },
    },
    clickable: {
      name: 'Clickable',
      description: 'Toggles if the Card is clickable or not.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    stretch: {
      name: 'Stretch card body',
      description: 'Toggles if the card body should scale with the card.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },

  args: {
    modeVariant: 'Inherit from parent',
    header: 'Header text',
    subheader: 'Subheader text',
    thumbnail: true,
    imagePlacement: 'Below',
    bodyImg: false,
    bodyContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    bodyDivider: false,
    cardActions: `<tds-icon slot="actions" size="20px" name="arrow_right"></tds-icon>`,
    clickable: false,
    stretch: false,
  },
};

const Template = ({
  modeVariant,
  header,
  subheader,
  thumbnail,
  imagePlacement,
  bodyImg,
  bodyContent,
  bodyDivider,
  cardActions,
  clickable,
  stretch,
}) =>
  formatHtmlPreview(
    `<style>
    /* demo-wrapper is for demonstration purposes only*/
    .demo-wrapper {
        width: 600px;
    }
    </style>
    <div class="demo-wrapper">
    <tds-card
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    ${header ? `header="${header}"` : ''}
    image-placement="${imagePlacement.toLowerCase()}-header"
    ${subheader ? `subheader="${subheader}"` : ''}
    ${bodyImg ? `body-img="${CardBodyImage}"` : ''}
    ${clickable ? 'clickable' : ''}
    ${bodyDivider ? 'body-divider' : ''}
    ${stretch ? 'stretch' : ''}
    >
    ${
      thumbnail
        ? `<img slot="thumbnail" src="${CardPlaceholder}" alt="Thumbnail for the card."/>`
        : ''
    }
  ${
    bodyContent
      ? `
    <div slot="body">
        ${bodyContent}
    </div>`
      : ''
  }
    ${cardActions ? `${cardActions}` : ''}
    </tds-card>
    </div>
    ${
      clickable
        ? `
    <script>
        document.addEventListener('tdsClick', (event)=>{
            console.log('Card with id: ', event.detail.cardId, ' was clicked.')
        })
    </script>
    `
        : ''
    }
  `,
  );

export const Default = Template.bind({});
