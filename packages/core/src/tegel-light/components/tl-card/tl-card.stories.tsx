import formatHtmlPreview from '../../../stories/formatHtmlPreview';

const thumbSVG =
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
    <rect width='40' height='40' fill='#E6E6E6'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='#999'></text>
  </svg>`);

const bodyImgSVG =
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='300'>
    <rect width='100%' height='100%' fill='#F2F2F2'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='#999'></text>
  </svg>`);

export default {
  title: 'Tegel Light (CSS)/Card',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: {
          summary: 'Inherit from parent',
        },
      },
    },
    header: {
      name: 'Header text',
      control: {
        type: 'text',
      },
    },
    subheader: {
      name: 'Subheader text',
      control: {
        type: 'text',
      },
    },
    thumbnail: {
      name: 'Header thumbnail',
      control: {
        type: 'boolean',
      },
    },
    bodyImg: {
      name: 'Body image',
      control: {
        type: 'boolean',
      },
      if: {
        arg: 'bodyDivider',
        eq: false,
      },
    },
    imagePlacement: {
      name: 'Body image placement',
      control: {
        type: 'radio',
      },
      options: ['Above', 'Below'],
      if: {
        arg: 'bodyImg',
        truthy: true,
      },
      table: {
        defaultValue: {
          summary: 'Below',
        },
      },
    },
    bodyContent: {
      name: 'Body text',
      control: {
        type: 'text',
      },
    },
    bodyDivider: {
      name: 'Body divider',
      control: {
        type: 'boolean',
      },
      if: {
        arg: 'bodyImg',
        eq: false,
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    cardActions: {
      name: 'Actions (HTML)',
      control: {
        type: 'text',
      },
    },
    clickable: {
      name: 'Clickable',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    stretch: {
      name: 'Stretch card body',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    header: 'Header text',
    subheader: 'Subheader text',
    thumbnail: true,
    bodyImg: false,
    imagePlacement: 'Below',
    bodyContent: 'Lorem ipsum dummy text for printing; standard filler ever since 1500s',
    bodyDivider: false,
    cardActions:
      '<button class="tl-button tl-button--primary tl-button--md"><span class="tl-button__label">Button text</span></button><button class="tl-button tl-button--secondary tl-button--md"><span class="tl-button__label">Button text</span></button>',
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
}) => {
  const modeClass =
    modeVariant !== 'Inherit from parent'
      ? `tl-card--mode-variant-${modeVariant.toLowerCase()}`
      : '';

  let placementClass = '';
  if (imagePlacement === 'Above') {
    placementClass = 'tl-card--image-above-header';
  }
  if (imagePlacement === 'Below') {
    placementClass = 'tl-card--image-below-header';
  }

  const clickableClass = clickable ? 'tl-card--clickable' : '';
  const stretchClass = stretch ? 'tl-card--stretch' : '';

  const headerHtml = `
    <div class="tl-card__header">
      ${
        thumbnail ? `<img class="tl-card__thumbnail" src="${thumbSVG}" alt="Card thumbnail" />` : ''
      }
      <div class="tl-card__headings">
        ${header ? `<div class="tl-card__title">${header}</div>` : ''}
        ${subheader ? `<div class="tl-card__subtitle">${subheader}</div>` : ''}
      </div>
    </div>`;

  const imageHtml = bodyImg
    ? `<img class="tl-card__image" src="${bodyImgSVG}" alt="Card image" />`
    : '';

  const dividerHtml = !bodyImg && bodyDivider ? `<div class="tl-card__divider"></div>` : '';

  const bodyHtml = `
    <div class="tl-card__body">
      ${imagePlacement === 'Above' ? `${imageHtml}${headerHtml}` : `${headerHtml}${imageHtml}`}
      ${dividerHtml}
      ${bodyContent ? `<div class="tl-card__content">${bodyContent}</div>` : ''}
    </div>`;

  const actionsHtml = cardActions
    ? `<div class="tl-card__actions" style="gap: 16px;">${cardActions}</div>`
    : '';

  const wrapperClasses = `tl-card ${modeClass} ${placementClass} ${clickableClass} ${stretchClass}`
    .replace(/\s+/g, ' ')
    .trim();

  const hasInnerInteractive = /<button|<a\s/i.test(cardActions);

  const wrapperEl = clickable && !hasInnerInteractive ? 'button' : 'div';
  const extraAttrs = wrapperEl === 'button' ? 'type="button"' : 'role="button" tabindex="0"';

  const markup =
    `<${wrapperEl} class="${wrapperClasses}" ${clickable ? extraAttrs : ''}>` +
    `${bodyHtml}${actionsHtml}` +
    `</${wrapperEl}>`;

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-light/tl-card.css";
    -->
    <style>
      .demo-wrapper { max-width: 600px; }
    </style>
    <div class="demo-wrapper">${markup}</div>
  `);
};

export const Default = Template.bind({});
