import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Footer',
  parameters: {
    layout: 'fullscreen',
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
    isFooterGroupOpen: {
      name: 'Expanded mobile footer group',
      description: 'Indicates if the mobile footer group is expanded.',
      control: {
        type: 'boolean',
      },
    },
    includeFooterTop: {
      name: 'Include footer top',
      description: 'Adds content to the top slot of the Footer (page links).',
      control: {
        type: 'boolean',
      },
    },
    includeFooterStart: {
      name: 'Include footer start',
      description: 'Adds content to the start slot of the Footer (legal links).',
      control: {
        type: 'boolean',
      },
    },
    includeFooterEnd: {
      name: 'Include footer end',
      description: 'Adds content to the end slot of the Footer (social media links).',
      control: {
        type: 'boolean',
      },
    },
    includeFooterCopyright: {
      name: 'Include footer copyright',
      description: 'Adds content to the copyright area of the Footer.',
      control: {
        type: 'boolean',
      },
    },
    numberOfLinks: {
      name: 'Number of footer groups',
      description: 'Number of groups to display in the footer top section.',
      control: {
        type: 'number',
        min: 1,
        max: 8,
      },
    },
  },
  args: {
    modeVariant: 'Primary',
    isFooterGroupOpen: false,
    includeFooterTop: true,
    includeFooterStart: true,
    includeFooterEnd: true,
    includeFooterCopyright: true,
    numberOfLinks: 4,
  },
};

const Template = ({
  modeVariant,
  isFooterGroupOpen,
  includeFooterTop,
  includeFooterStart,
  includeFooterEnd,
  includeFooterCopyright,
  numberOfLinks,
}) => {
  const modeVariantClass = `tl-footer--${modeVariant.toLowerCase()}`;

  // Generate groups based on numberOfLinks (actually number of groups)
  const generateGroups = () => {
    return Array.from(
      { length: numberOfLinks },
      (_, i) =>
        `<div class="tl-footer__group ${
          isFooterGroupOpen ? 'tl-footer__group--expanded' : ''
        }" role="list">
                <button class="tl-footer__top-title" type="button">Title ${i + 1}</button>
                <a href="#" class="tl-footer__link">Link text</a>
                <a href="#" class="tl-footer__link">Link text</a>
                <a href="#" class="tl-footer__link">Link text</a>
              </div>`,
    ).join('\n              ');
  };

  const footerMarkup = `
    <!-- Required stylesheet 
  "@scania/tegel-lite/global.css";
  "@scania/tegel-lite/tl-footer.css";
  "@scania/tegel-lite/tl-icon.css";
-->
    <main>
      <div class="tds-u-p3 ">
        <div class="tds-body-01">
          Make sure "Mobile view" is set to true and resize the window to see how the Footer behaves on smaller/bigger screens.
        </div>
      </div>
    </main>

    <footer class="tl-footer ${modeVariantClass}">
      ${
        includeFooterTop
          ? `
            <div class="tl-footer__top">
              ${generateGroups()}
            </div>`
          : ''
      }

      <div class="tl-footer__main">
        ${
          includeFooterStart || includeFooterEnd
            ? `<div class="tl-footer__main-top">
          ${
            includeFooterStart
              ? `<div class="tl-footer__main-top--start">
                    <div class="tl-footer__group" role="list">
                      <a href="#" class="tl-footer__link">Link text</a>
                      <a href="#" class="tl-footer__link">Link text</a>
                      <a href="#" class="tl-footer__link">Link text</a>
                      <a href="#" class="tl-footer__link">Link text</a>
                    </div>
                  </div>`
              : ''
          }
          ${
            includeFooterEnd
              ? `<div class="tl-footer__main-top--end">
                    <div class="tl-footer__group" role="list">
                      <a href="#" class="tl-footer__link"><span class="tl-icon tl-icon--truck tl-icon--16" svg-title="Truck"></span></a>
                      <a href="#" class="tl-footer__link"><span class="tl-icon tl-icon--truck tl-icon--16" svg-title="Truck"></span></a>
                      <a href="#" class="tl-footer__link"><span class="tl-icon tl-icon--truck tl-icon--16" svg-title="Truck"></span></a>
                    </div>
                </div>`
              : ''
          }
          
        </div>`
            : ''
        }
        <div class="tl-footer__main-bottom">
               ${
                 includeFooterCopyright
                   ? `<small class="tl-footer__copyright">© Copyright 2026 All rights reserved.</small>`
                   : ''
               }
              <p class="tl-footer__brand">Scania</p>
        </div>
      </div>
    </footer>
  `;

  return formatHtmlPreview(footerMarkup);
};

export const Default = Template.bind({});
