import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Header',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    includeTitle: { control: 'boolean', name: 'Include title?' },
    includeHamburger: { control: 'boolean', name: 'Include hamburger?' },
    includeBento: { control: 'boolean', name: 'Include bento?' },
    includeBrandSymbol: { control: 'boolean', name: 'Include brand symbol?' },
    isHamburgerActive: { control: 'boolean', name: 'Hamburger active?' },
    isHamburgerSelected: { control: 'boolean', name: 'Hamburger selected?' },
    isBentoActive: { control: 'boolean', name: 'Bento active?' },
    isBentoSelected: { control: 'boolean', name: 'Bento selected?' },
  },
  args: {
    includeTitle: false,
    includeHamburger: false,
    isHamburgerActive: false,
    isHamburgerSelected: false,
    includeBento: false,
    isBentoActive: false,
    isBentoSelected: false,
    includeBrandSymbol: false,
  },
};

const Template = ({
  includeTitle,
  includeHamburger,
  includeBento,
  includeBrandSymbol,
  isHamburgerActive,
  isHamburgerSelected,
  isBentoActive,
  isBentoSelected,
}) =>
  formatHtmlPreview(`
    <script>
        import "@scania/tegel-light/tl-header.css";
        ${includeTitle ? 'import "@scania/tegel-light/tl-header-title.css";' : ''}
        ${
          includeHamburger || includeBento || includeBrandSymbol
            ? 'import "@scania/tegel-light/tl-header-item.css";'
            : ''
        }
        ${includeBrandSymbol ? 'import "@scania/tegel-light/tl-header-brand-symbol.css";' : ''}
    </script>
    
    <header class="tl-header">
      <nav class="tl-header__nav">
        <ul class="tl-header__component-list">
          
          ${
            includeHamburger
              ? `<li class="tl-header-item ${isHamburgerActive ? 'tl-header-item--active' : ''} ${
                  isHamburgerSelected ? 'tl-header-item--selected' : ''
                }">
                    <button class="tl-header-item__wrapper">
                        <svg fill="none" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.97 6.998a1 1 0 0 1 1-1h22.05a1 1 0 0 1 0 2H4.97a1 1 0 0 1-1-1ZM3.97 15.982a1 1 0 0 1 1-1h22.05a1 1 0 0 1 0 2H4.97a1 1 0 0 1-1-1ZM3.97 24.966a1 1 0 0 1 1-1h22.05a1 1 0 0 1 0 2H4.97a1 1 0 0 1-1-1Z" fill="currentColor"/>
                        </svg>
                    </button>
                </li>`
              : ''
          }

          
          ${
            includeTitle
              ? `<div class="tl-header-title">
              <h4 class="tl-header-title__text"> Example: default </h4>
              </div>`
              : ''
          }
            
            <li class="tl-header__middle-spacer"></li>
            
            ${
              includeBento
                ? `<li class="tl-header-item ${isBentoActive ? 'tl-header-item--active' : ''} ${
                    isBentoSelected ? 'tl-header-item--selected' : ''
                  }">
                <button class="tl-header-item__wrapper">
                      <svg width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M3.98 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3.98 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3.98 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" fill="currentColor"/>
                      </svg>
                    </button>
                </li>`
                : ''
            }

            ${
              includeBrandSymbol
                ? `<li class="tl-header-item">
                      <a class="tl-header-item__wrapper">
                        <div class="tl-header-brand-symbol"></div>
                    </a>
                </li>`
                : ''
            }
            </ul>
      </nav>
    </header>
  `);

export const Default = Template.bind({});
