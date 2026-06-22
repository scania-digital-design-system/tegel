import formatHtmlPreview from '../../stories/formatHtmlPreview';

const CardThumbnailSVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36'></svg>`,
)}`;

// Transparent placeholder so the brand-adjusted `--color-background-layer-03`
// background on `.card-body-img` shows through (and changes with the brand).
const CardBodyImage = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='300'></svg>`,
)}`;

export default {
  title: 'Components/Card',
  parameters: {
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
      if: { arg: 'expandable', eq: false },
      table: {
        defaultValue: { summary: false },
      },
    },
    stretch: {
      name: 'Stretch card',
      description:
        'Makes the Card fill the available height in stretching layouts and lets the body section grow. <br/> <br/> ℹ️ If the consumer uses multiples Card on grid or flexbox container it is up to them to manage the amount of content that is populated the body of the Card so that the overall design of the application is visually well balanced. ',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    expandable: {
      name: 'Expandable',
      description: 'Toggles if the Card can expand/collapse its content.',
      control: 'boolean',
      if: { arg: 'clickable', eq: false },
      table: { defaultValue: { summary: false } },
    },
    expanded: {
      name: 'Expanded',
      description: 'Controls the initial expanded state when expandable is enabled.',
      control: 'boolean',
      if: { arg: 'expandable', eq: true },
      table: { defaultValue: { summary: false } },
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
    cardActions: `<div slot="actions" style="display: flex; gap: 16px;"><tds-button type="button" variant="primary" size="sm" text="Button text" animation="none" tds-aria-label="A button component" name="" value=""></tds-button><tds-button type="button" variant="secondary" size="sm" text="Button text" animation="none" tds-aria-label="A button component" name="" value=""></tds-button></div>`,
    clickable: false,
    stretch: false,
    expandable: false,
    expanded: true,
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
  expandable,
  expanded,
}) =>
  formatHtmlPreview(
    `<style>
    /* demo-wrapper is for demonstration purposes only*/
    .demo-wrapper {
        max-width: 600px;
        ${
          expandable
            ? `width: 368px;
        height: 416px;`
            : ''
        }
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
    ${expandable ? 'expandable' : ''}
    ${expanded ? 'expanded' : ''}
    >
    ${
      thumbnail
        ? `<img slot="thumbnail" src="${CardThumbnailSVG}" alt="Thumbnail for the card."/>`
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
