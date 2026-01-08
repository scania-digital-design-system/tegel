import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Banner',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Changes the variant of the component.',
      options: ['default', 'error', 'information'],
      control: {
        type: 'radio',
      },
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    header: {
      name: 'Header',
      description: 'Sets text to be displayed in the header section.',
      control: {
        type: 'text',
      },
    },
    subheader: {
      name: 'Subheader',
      description: 'Sets text to be displayed in the subheader section.',
      control: {
        type: 'text',
      },
    },
    actions: {
      name: 'Actions slot',
      description: 'Slot for the bottom part of the Banner, used for links.',
      control: {
        type: 'text',
      },
    },
    showClose: {
      name: 'Show close button',
      description: 'Shows or hides the close button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: true },
      },
    },
  },
};

const Template = ({ variant, header, subheader, actions, showClose }) => {
  const variantClass = variant !== 'default' ? `tl-banner--${variant}` : '';

  // Determine icon based on variant
  let iconName = '';
  if (variant === 'error') {
    iconName = 'error';
  } else if (variant === 'information') {
    iconName = 'info';
  } else {
    iconName = 'placeholder';
  }

  const iconElement = `<span class="tl-banner__icon"><span class="tl-icon tl-icon--${iconName} tl-icon--20" aria-hidden="true"></span></span>`;
  const closeButton = showClose
    ? `<div class="tl-banner__close"><span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span></div>`
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-banner.css"
    -->
    <div class="tl-banner ${variantClass}">
      ${iconElement}
      <div class="tl-banner__content">
        <div class="tl-banner__text">
          ${header ? `<div class="tl-banner__header">${header}</div>` : ''}
          ${subheader ? `<div class="tl-banner__subheader">${subheader}</div>` : ''}
        </div>
        ${actions ? `<div class="tl-banner__actions">${actions}</div>` : ''}
      </div>
      ${closeButton}
    </div>
  `);
};

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  header: 'This is a banner',
  subheader: 'This is a subheader',
  actions: '<a class="tl-link tl-link--underline" href="/">Link example</a>',
  showClose: true,
};
