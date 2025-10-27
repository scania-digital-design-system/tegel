import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Footer',
  parameters: {
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7568%3A298118&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7568%3A298118&t=Ne6myqwca5m00de7-1',
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
    topSlot: {
      name: 'Top slot',
      description: 'Adds content to the top slot of the Footer (page links).',
      control: {
        type: 'boolean',
      },
    },
    startSlot: {
      name: 'Start slot',
      description: 'Adds content to the start slot of the Footer (legal links).',
      control: {
        type: 'boolean',
      },
    },
    endSlot: {
      name: 'End slot',
      description: 'Adds content to the end slot of the Footer (social media links).',
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
    isFooterGroupOpen: {
      name: 'Is footer group open',
      description: 'Indicates if the footer group is open.',
      control: {
        type: 'boolean',
      },
    },
    mobileView: {
      name: 'Mobile view',
      description: 'Indicates if the footer group is in mobile view.',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    topSlot: true,
    startSlot: true,
    endSlot: true,
    includeFooterTop: false,
    includeFooterStart: false,
    includeFooterEnd: false,
    includeFooterCopyright: false,
    isFooterGroupOpen: false,
    mobileView: false,
  },
};

const Template = ({ includeFooterTop, isFooterGroupOpen, mobileView, includeFooterStart, includeFooterEnd, includeFooterCopyright, topSlot, startSlot, endSlot, modeVariant }) => {
    const modeVariantClass =
modeVariant !== 'Inherit from parent' ? `tl-footer--${modeVariant.toLowerCase()}` : '';
  return formatHtmlPreview(
    `
    <!-- Required stylesheet 
  "@scania/tegel-light/global.css";
  "@scania/tegel-light/tl-footer.css";
-->
    <main>
      <div class="tds-u-p3 ">
        <div class="tds-body-01">
          Resize the window to see how the Footer behaves on smaller/bigger screens.
        </div>
      </div>
    </main>


    <!-- footer.tsx -->
   <footer class="tl-footer ${modeVariantClass}">
   ${
    includeFooterTop
      ? `<div class="tl-footer__top">
            <div class="tl-footer__group" tds-list-aria-label="Links 1">

            ${
                mobileView
                  ? `<div class="tl-footer__group--mobile-view">
              <button class="tl-footer__top-title-button ${isFooterGroupOpen ? '--expanded' : '--closed'}"
              >
                <h6>Title 1</h6>
                <span class="tl-icon tl-icon--chevron_down tl-icon--24" aria-hidden="true"></span>
              </button>
              </div>` :
              `<div class="tl-footer__top-title">
                <h6>Title 1</h6>
              </div>`
              }

                <nav>
                    <div role="list" class="top-part-child">
                    <div class="tl-footer__item" >
                            <a href="#"> Link text</a>
                        </div>
                        <div class="tl-footer__item" >
                            <a href="#"> Link text</a>
                        </div>
                        <div class="tl-footer__item" >
                            <a href="#"> Link text</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        

            <div class="tl-footer__group" tds-list-aria-label="Links 1">
                <h6 slot="title">Title 1</h6>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
            </div>

            <div class="tl-footer__group" tds-list-aria-label="Links 2">
                <h6 slot="title">Title 2</h6>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
            </div>

            <div class="tl-footer__group" tds-list-aria-label="Links 3">
                <h6 slot="title">Title 3</h6>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                    <a href="#"> Link text</a>
                </div>
            </div>

            <div class="tl-footer__group" tds-list-aria-label="Links 4">
                <h6 slot="title">Title 4</h6>
                <div class="tl-footer__item" >
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                    <a href="#"> Link text</a>
                </div>
                <div class="tl-footer__item">
                    <a href="#"> Link text</a>
                </div>
            </div>
        `
      : ''
  }
        

          <div class="tl-footer__main">
              <div class="tl-footer__main-top">
              ${
                includeFooterStart
                  ? `<div class="tl-footer__main-top--start">
                        <div class="tl-footer__group" tds-list-aria-label="Start slot links">
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
                            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
                        </div>
                        <div class="tl-footer__item">
                            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
                        </div>
                        <div class="tl-footer__item">
                            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
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
                        © <span class="tl-footer__copyright-text">Copyright</span> {new Date().getFullYear()}
                        </div>
                        <div class="tl-footer__copyright-last-part">All rights reserved</div>
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


<!-- Old code 
    <tds-footer 
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    >
      ${
        topSlot
          ? `
      <div slot="top">
        <tds-footer-group tds-list-aria-label="Links 1">
          <h6 slot="title">Title 1</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group tds-list-aria-label="Links 2">
          <h6 slot="title">Title 2</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group tds-list-aria-label="Links 3">
          <h6 slot="title">Title 3</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group tds-list-aria-label="Links 4">
          <h6 slot="title">Title 4</h6>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>
      </div>
      `
          : ''
      }
      ${
        startSlot
          ? `
      <div slot="start">
        <tds-footer-group tds-list-aria-label="Start slot links">
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          </tds-footer-group>
        </div>
      `
          : ''
      } 
      ${
        endSlot
          ? `
      <div slot="end">
        <tds-footer-group tds-list-aria-label="End slot links">
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck" svg-title="Truck"></tds-icon></a>
          </tds-footer-item>
        </tds-footer-group>
      </div>
        `
          : ''
      }
    </tds-footer>
    -->
  `,
  );
};

export const Default = Template.bind({});