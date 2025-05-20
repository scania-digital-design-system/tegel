import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: `Tegel light (CSS)/Accordion`,
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
    iconPosition: {
      name: 'Expand icon position',
      description: 'Sets the horizontal position of the expand icon.',
      control: {
        type: 'radio',
      },
      options: { End: false, Start: true },
      table: {
        defaultValue: { summary: 'End' },
      },
    },
    paddingReset: {
      name: 'Less padding right',
      description: 'Sets more padding on the right inside button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disable all items',
      description: 'Disables all Accordion Items.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    hideLastBorder: {
      name: 'Hide last border',
      description: 'Removes the bottom border of the last Accordion item.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    modeVariant: 'Default',
    iconPosition: false,
    paddingReset: false,
    disabled: false,
    hideLastBorder: false,
  },
};

const Template = ({ disabled, iconPosition, paddingReset, modeVariant, hideLastBorder }) => {
  const disabledClass = disabled ? 'tl-accordion--disabled' : '';
  const iconPositionClass = iconPosition ? 'tl-accordion__button--icon-start' : '';
  const paddingResetClass = paddingReset ? 'tl-accordion__body--less-padding-right' : '';
  const hideLastBorderClass = hideLastBorder ? '' : 'tl-accordion__item--has-bottom-border';
  let modeVariantClass = '';
  if (modeVariant === 'Primary') {
    modeVariantClass = 'tds-mode-variant-primary';
  } else if (modeVariant === 'Secondary') {
    modeVariantClass = 'tds-mode-variant-secondary';
  }

  return formatHtmlPreview(`

    <script>
      import "@scania/tegel-light/tl-accordion.css"
    </script>

    <div class="tl-accordion ${modeVariantClass} ${disabledClass}">
      <div class="tl-accordion__item">
        <button class="tl-accordion__button ${iconPositionClass}">
          <span>
             First item
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="16px" width="16px" style="font-size: 16px;"><path fill="currentColor" d="M4.273 9.783a1 1 0 0 1 1.415 0l9.888 9.888a.6.6 0 0 0 .848 0l9.888-9.888a1 1 0 1 1 1.415 1.414l-9.889 9.889a2.6 2.6 0 0 1-3.677 0l-9.888-9.889a1 1 0 0 1 0-1.414Z"></path></svg>
        </button>
        <div class="tl-accordion__body ${paddingResetClass}">
          <span>
            This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet vestibulum fermentum.
          </span>
        </div>
      </div>

      <div class="tl-accordion__item ${hideLastBorderClass} ${hideLastBorderClass}">
        <button class="tl-accordion__button ${iconPositionClass} ${disabledClass}">
          <span>
            Second item
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" height="16px" width="16px" style="font-size: 16px;"><path fill="currentColor" d="M4.273 9.783a1 1 0 0 1 1.415 0l9.888 9.888a.6.6 0 0 0 .848 0l9.888-9.888a1 1 0 1 1 1.415 1.414l-9.889 9.889a2.6 2.6 0 0 1-3.677 0l-9.888-9.889a1 1 0 0 1 0-1.414Z"></path></svg>
        </button>
        <div class="tl-accordion__body tl-accordion__body--open ${paddingResetClass}">
          <span>
            This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet vestibulum fermentum.
          </span>
        </div>
      </div>
    </div>

    <script>
        const accordionItems = document.querySelectorAll('.tl-accordion__item');
        accordionItems.forEach((accordionItem) => {
          const button = accordionItem.querySelector('.tl-accordion__button');
          const body = accordionItem.querySelector('.tl-accordion__body');
          
          button.addEventListener('click', function () {
            if (!${disabled}) {
              const isOpen = body.classList.contains('tl-accordion__body--open');
              if (!isOpen) {
                body.classList.add('tl-accordion__body--open');
              } else {
                body.classList.remove('tl-accordion__body--open');
              }
            }
          });
        });
    </script>
  `);
};

export const Default = Template.bind({});
