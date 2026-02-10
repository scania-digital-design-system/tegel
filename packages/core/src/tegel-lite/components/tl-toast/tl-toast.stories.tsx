import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Toast',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Changes the variant of the component.',
      options: ['information', 'success', 'warning', 'error'],
      control: {
        type: 'radio',
      },
      table: {
        defaultValue: { summary: 'information' },
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
      description: 'Slot for the bottom part of the Toast, used for links.',
      control: {
        type: 'text',
      },
    },
    hidden: {
      name: 'Hidden',
      description: 'Hides the Toast.',
      control: {
        type: 'boolean',
      },
    },
    closable: {
      name: 'Closable',
      description: 'Controls visibility of the close button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    variant: 'information',
    header: 'Message header',
    subheader: 'Short subheader',
    actions:
      '<a class="tl-link tl-link--underline" href="https://tegel.scania.com/home" target="_blank">Link example</a>',
    hidden: false,
    closable: true,
  },
};

const Template = ({ variant, header, subheader, actions, hidden, closable }) => {
  const variantClass = `tl-toast--${variant}`;
  const hiddenClass = hidden ? 'tl-toast--hide' : '';

  // Determine icon based on variant
  let iconName = '';
  switch (variant) {
    case 'error':
      iconName = 'error';
      break;
    case 'success':
      iconName = 'tick';
      break;
    case 'warning':
      iconName = 'warning';
      break;
    case 'information':
    default:
      iconName = 'info';
      break;
  }

  const iconElement = `<span class="tl-toast__icon"><span class="tl-icon tl-icon--${iconName} tl-icon--20" aria-hidden="true"></span></span>`;
  const closeButton = closable
    ? `<button class="tl-toast__close"><span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span></button>`
    : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-toast.css"
      "@scania/tegel-lite/tl-icon.css"
    -->
    <div class="tl-toast ${variantClass} ${hiddenClass}">
      ${iconElement}
      <div class="tl-toast__content">
        <div class="tl-toast__text">
          ${header ? `<div class="tl-toast__header">${header}</div>` : ''}
          ${subheader ? `<div class="tl-toast__subheader">${subheader}</div>` : ''}
        </div>
        ${actions ? `<div class="tl-toast__actions">${actions}</div>` : ''}
      </div>
      ${closeButton}
    </div>
  `);
};

export const Default = Template.bind({});
