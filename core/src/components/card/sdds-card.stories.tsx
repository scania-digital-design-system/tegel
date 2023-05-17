// @ts-ignore
import CardPlaceholder from '../../stories/assets/image/card-placeholder.png';
import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
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
    headerImg: {
      name: 'Header image',
      description: 'Toggles an image in the header.',
      control: {
        type: 'boolean',
      },
    },
    headerPlacement: {
      name: 'Header placement',
      description: 'Sets the placement of the header, above or below the body image.',
      control: {
        type: 'radio',
      },
      options: ['Above', 'Below'],
      table: {
        defaultValue: { summary: 'above' },
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
    cardBottom: {
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
  },
  args: {
    modeVariant: 'Inherit from parent',
    header: 'Header text',
    subheader: 'Subheader text',
    headerImg: true,
    headerPlacement: 'Above',
    bodyImg: false,
    bodyContent: '',
    bodyDivider: false,
    cardBottom: `<div slot="card-bottom"><tds-icon style="font-size: 20px;" name="arrow_right"></tds-icon></div>`,
    clickable: false,
  },
};

const Template = ({
  modeVariant,
  header,
  subheader,
  headerImg,
  headerPlacement,
  bodyImg,
  bodyContent,
  bodyDivider,
  cardBottom,
  clickable,
}) =>
  formatHtmlPreview(
    `<style>
    /* demo-wrapper is for demonstration purposes only*/
    .demo-wrapper {
        width: 368px;
    }
    </style>
    <div class="demo-wrapper">
    <sdds-card
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    ${header ? `header="${header}"` : ''}
    header-placement="${headerPlacement.toLowerCase()}"
    ${subheader ? `subheader="${subheader}"` : ''}
    ${headerImg ? `header-img="${CardPlaceholder}"` : ''}
    ${bodyImg ? `body-img="${CardPlaceholder}"` : ''}
    ${clickable ? 'clickable' : ''}
    ${bodyDivider ? 'body-divider' : ''}
  >
  ${
    bodyContent
      ? `
    <div slot="card-body">
        ${bodyContent}
    </div>`
      : ''
  }
    ${cardBottom ? `${cardBottom}` : ''}
    </sdds-card>
    </div>
    ${
      clickable
        ? `
    <script>
        document.addEventListener('sddsClick', (event)=>{
            console.log('Card with id: ', event.detail.cardId, ' was clicked.')
        })
    </script>
    `
        : ''
    }
  `,
  );

export const Card = Template.bind({});
