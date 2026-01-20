import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Accordion',
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
    iconPosition: {
      name: 'Expand icon position',
      description: 'Sets the horizontal position of the expand icon.',
      control: {
        type: 'radio',
      },
      options: { End: 'end', Start: 'start' },
      table: {
        defaultValue: { summary: 'end' },
      },
    },
    paddingReset: {
      name: 'Less padding right',
      description: 'Sets less padding on the right inside Accordion Items.',
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
    modeVariant: 'Primary',
    iconPosition: 'end',
    paddingReset: false,
    disabled: false,
    hideLastBorder: false,
  },
};

const Template = ({ disabled, iconPosition, paddingReset, modeVariant, hideLastBorder }) => {
  const modeVariantClass = `tl-accordion--${modeVariant.toLowerCase()}`;
  const hideLastBorderClass = hideLastBorder ? 'tl-accordion--hide-last-border' : '';
  const iconPositionClass =
    iconPosition === 'start' ? 'tl-accordion__item--icon-start' : 'tl-accordion__item--icon-end';
  const disabledClass = disabled ? 'tl-accordion__item--disabled' : '';
  const paddingClass = paddingReset ? 'tl-accordion__item--less-padding' : '';
  const expandedClass = 'tl-accordion__item--expanded';

  return formatHtmlPreview(`
    <!-- Required stylesheets: 
    "@scania/tegel-lite/global.css"
    "@scania/tegel-lite/tl-accordion.css"
    "@scania/tegel-lite/tl-icon.css"
    -->
    
    <div style="width: 100%; margin: 0 auto;">
      <div class="tl-accordion ${modeVariantClass} ${hideLastBorderClass}">
        <div class="tl-accordion__item ${iconPositionClass} ${disabledClass} ${paddingClass}">
          <button class="tl-accordion__header-icon-${iconPosition}">
            ${
              iconPosition === 'start'
                ? '<span class="tl-accordion__icon"><span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span></span>'
                : ''
            }
            <span class="tl-accordion__title">First item</span>
            ${
              iconPosition === 'end'
                ? '<span class="tl-accordion__icon"><span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span></span>'
                : ''
            }
          </button>
          <div class="tl-accordion__panel">
            This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header.
            Lorem ipsum doler sit amet.
          </div>
        </div>
        
        <div class="tl-accordion__item ${iconPositionClass} ${disabledClass} ${expandedClass} ${paddingClass}">
          <button class="tl-accordion__header-icon-${iconPosition}">
            ${
              iconPosition === 'start'
                ? '<span class="tl-accordion__icon"><span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span></span>'
                : ''
            }
            <span class="tl-accordion__title">Second item</span>
            ${
              iconPosition === 'end'
                ? '<span class="tl-accordion__icon"><span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span></span>'
                : ''
            }
          </button>
          <div class="tl-accordion__panel">
            This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet vestibulum fermentum.
          </div>
        </div>
      </div>
    </div>

    <!-- Script tag for demo purposes -->
    <script>
      function setupAccordion() {
        try {
          const accordionItems = document.querySelectorAll('.tl-accordion__item');
          
          accordionItems.forEach((item, index) => {
            const button = item.querySelector('button');
            const panel = item.querySelector('.tl-accordion__panel');
            const icon = item.querySelector('.tl-accordion__icon');
            
            if (!button || !panel || !icon) return;
            
            if (button._accordionHandler) {
              button.removeEventListener('click', button._accordionHandler);
            }
            
            button._accordionHandler = function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              if (item.classList.contains('tl-accordion__item--disabled')) return;
              
              const isExpanded = item.classList.contains('tl-accordion__item--expanded');
              
              if (isExpanded) {
                item.classList.remove('tl-accordion__item--expanded');
                panel.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
              } else {
                item.classList.add('tl-accordion__item--expanded');
                panel.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
              }
            };
            
            button.addEventListener('click', button._accordionHandler);
          });
        } catch (error) {
          console.error('Error setting up accordion:', error);
        }
      } 
        
      setupAccordion();

    </script>
  `);
};

export const Default = Template.bind({});
