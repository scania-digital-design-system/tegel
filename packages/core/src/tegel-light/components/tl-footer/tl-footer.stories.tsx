import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Footer',
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
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    mobileView: {
      name: 'Mobile view',
      description: 'Indicates if the footer group is in mobile view.',
      control: {
        type: 'boolean',
      },
    },
    isFooterGroupOpen: {
      name: 'Open mobile footer group',
      description: 'Indicates if the mobile footer group is open.',
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
  },
  args: {
    modeVariant: 'Inherit from parent',
    mobileView: true,
    isFooterGroupOpen: false,
    includeFooterTop: true,
    includeFooterStart: true,
    includeFooterEnd: true,
    includeFooterCopyright: true,
  },
};

const Template = ({ modeVariant, mobileView, isFooterGroupOpen, includeFooterTop, includeFooterStart, includeFooterEnd, includeFooterCopyright }) => {
    const modeVariantClass =
modeVariant !== 'Inherit from parent' ? `tl-footer--${modeVariant.toLowerCase()}` : '';
  return formatHtmlPreview(
    `
    <!-- Required stylesheet 
  "@scania/tegel-light/global.css";
  "@scania/tegel-light/tl-footer.css";
  "@scania/tegel-light/tl-icon.css";
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
                ${
                    mobileView
                      ? `<div class="tl-footer__group--mobile-view">
                      <button class="tl-footer__top-title-button ${isFooterGroupOpen ? '--expanded' : '--closed'}"
                      >
                        <h6>Title 1</h6>
                        <span class="tl-icon tl-icon--chevron_down tl-icon--24" aria-hidden="true"></span>
                      </button>
                      <nav>
                          <div role="list" class="tl-footer__top-list ${isFooterGroupOpen ? '--expanded' : '--closed'}">
                          <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                          </div>
                      </nav>
                    </div>
                    <div class="tl-footer__group--mobile-view">
                      <button class="tl-footer__top-title-button ${isFooterGroupOpen ? '--expanded' : '--closed'}">
                        <h6>Title 2</h6>
                        <span class="tl-icon tl-icon--chevron_down tl-icon--24" aria-hidden="true"></span>
                      </button>
                      <nav>
                          <div role="list" class="tl-footer__top-list ${isFooterGroupOpen ? '--expanded' : '--closed'}">
                          <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                          </div>
                      </nav>
                    </div>
                    <div class="tl-footer__group--mobile-view">  
                      <button class="tl-footer__top-title-button ${isFooterGroupOpen ? '--expanded' : '--closed'}">
                        <h6>Title 3</h6>
                        <span class="tl-icon tl-icon--chevron_down tl-icon--24" aria-hidden="true"></span>
                      </button>
                      <nav>
                          <div role="list" class="tl-footer__top-list ${isFooterGroupOpen ? '--expanded' : '--closed'}">
                          <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                          </div>
                      </nav>
                    </div>  
                    <div class="tl-footer__group--mobile-view">
                      <button class="tl-footer__top-title-button ${isFooterGroupOpen ? '--expanded' : '--closed'}">
                        <h6>Title 4</h6>
                        <span class="tl-icon tl-icon--chevron_down tl-icon--24" aria-hidden="true"></span>
                      </button>
                      <nav>
                          <div role="list" class="tl-footer__top-list ${isFooterGroupOpen ? '--expanded' : '--closed'}">
                          <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                              <div class="tl-footer__item--mobile-view">
                                  <a href="#"> Link text</a>
                              </div>
                          </div>
                      </nav>
                    </div>
                  ` :
                  `
                  `
                }
              
              <div class="tl-footer__group">
                <h6 class="tl-footer__top-title">Title 1</h6>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
              </div>
              <div class="tl-footer__group">
                <h6 class="tl-footer__top-title">Title 2</h6>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
              </div>

              <div class="tl-footer__group">
                <h6 class="tl-footer__top-title">Title 3</h6>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
              </div>

              <div class="tl-footer__group">
                <h6 class="tl-footer__top-title">Title 4</h6>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                  <a href="#"> Link text</a>
                </div>
              </div>
            </div>`
          : ''
      }

      <div class="tl-footer__main">
        <div class="tl-footer__main-top">
          ${
            includeFooterStart
              ? `<div class="tl-footer__main-top--start">
                    <div class="tl-footer__group">
                      <div class="tl-footer__item">
                          <a href="#"> Link text</a>
                      </div>
                      <div class="tl-footer__item">
                          <a href="#"> Link text</a>
                      </div>
                      <div class="tl-footer__item">
                          <a href="#"> Link text</a>
                      </div>
                      <div class="tl-footer__item">
                          <a href="#"> Link text</a>
                      </div>
                    </div>
                  </div>`
              : ''
          }
          ${
            includeFooterEnd
              ? `<div class="tl-footer__main-top--end">
                    <div class="tl-footer__group" tds-list-aria-label="End slot links">
                    <div class="tl-footer__item">
                        <a href="#"> <span class="tl-icon tl-icon--truck tl-icon--16" svg-title="Truck"></span></a>
                    </div>
                    <div class="tl-footer__item">
                        <a href="#"> <span class="tl-icon tl-icon--truck tl-icon--16" svg-title="Truck"></span></a>
                    </div>
                    <div class="tl-footer__item">
                        <a href="#"> <span class="tl-icon tl-icon--truck tl-icon--16" svg-title="Truck"></span></a>
                    </div>
                    </div>
                </div>`
              : ''
          }
          
        </div>
        <div class="tl-footer__main-bottom">
              
               ${
                includeFooterCopyright
                  ? `
                    <small class="tl-footer__copyright"><div>
                        <div>
                         © <span class="tl-footer__copyright-text">Copyright </span>2025
                         <span class="tl-footer__copyright-last-part">All rights reserved</span>
                        </div>
                        </div>
                    </small>
                    `
                  : ''
              }
              <div class="tl-footer__brand">
                <p>Scania</p>
              </div>
        </div>
      </div>
    </footer>
  `,
  );
};

export const Default = Template.bind({});