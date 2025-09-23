import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';

export default {
  title: 'Tegel Light (CSS)/Header',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    includeTitle: {
      control: 'boolean',
      name: 'Include title',
    },
    includeHamburger: {
      control: 'boolean',
      name: 'Include hamburger',
    },
    includeBentoGrid: {
      control: 'boolean',
      name: 'Include bento (Grid)',
    },
    includeBentoList: {
      control: 'boolean',
      name: 'Include bento (List)',
    },
    includeHeaderItem: {
      control: 'boolean',
      name: 'Include header item',
    },
    includeHeaderItemIconOnly: {
      control: 'boolean',
      name: 'Include header item(icon only)',
    },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed on the Link.',
      control: {
        type: 'select',
      },
      options: iconsNames,
      table: {
        defaultValue: {
          summary: 'placeholder',
        },
      },
      if: {
        arg: 'includeHeaderItemIconOnly',
        truthy: true,
      },
    },
    includeDropdown: {
      control: 'boolean',
      name: 'Include dropdown',
    },
    isDropdownSelected: {
      control: 'boolean',
      name: 'Dropdown selected',
      if: {
        arg: 'includeDropdown',
        truthy: true,
      },
    },
    includeUserProfile: {
      control: 'boolean',
      name: 'Include user profile',
    },
    includeBrandSymbol: {
      control: 'boolean',
      name: 'Include brand symbol',
    },
    isHamburgerPressed: {
      control: 'boolean',
      name: 'Hamburger pressed',
      if: {
        arg: 'includeHamburger',
        truthy: true,
      },
    },
    isHamburgerSelected: {
      control: 'boolean',
      name: 'Hamburger selected',
      if: {
        arg: 'includeHamburger',
        truthy: true,
      },
    },
  },
  args: {
    includeTitle: false,
    includeHamburger: false,
    isHamburgerPressed: false,
    isHamburgerSelected: false,
    includeBentoGrid: false,
    includeBentoList: false,
    includeBrandSymbol: false,
    includeDropdown: false,
    isDropdownSelected: false,
    includeUserProfile: false,
    includeHeaderItem: false,
    includeHeaderItemIconOnly: false,
    icon: 'placeholder',
  },
};

const Template = ({
  includeTitle,
  includeHamburger,
  includeBentoGrid,
  includeBentoList,
  includeBrandSymbol,
  isHamburgerPressed,
  isHamburgerSelected,
  includeDropdown,
  isDropdownSelected,
  includeUserProfile,
  includeHeaderItem,
  includeHeaderItemIconOnly,
  icon,
}) =>
  formatHtmlPreview(`

<!-- Required stylesheet 
    "@scania/tegel-light/tl-header.css";
    ${includeTitle ? '@scania/tegel-light/tl-header__title.css' : ''}
    ${
      includeHamburger ||
      includeBentoGrid ||
      includeBrandSymbol ||
      includeHeaderItem ||
      includeHeaderItemIconOnly
        ? '@scania/tegel-light/tl-header__item.css'
        : ''
    }
    ${includeBrandSymbol ? '@scania/tegel-light/tl-header__brand-symbol.css' : ''}
    ${
      includeDropdown || includeBentoGrid || includeBentoList || includeUserProfile
        ? '@scania/tegel-light/tl-header__dropdown.css'
        : ''
    }
    ${
      includeDropdown ||
      includeBentoGrid ||
      includeBentoList ||
      includeUserProfile ||
      includeHeaderItemIconOnly
        ? '@scania/tegel-light/tl-icon.css'
        : ''
    }
-->
    
    <header class="tl-header">
      <nav class="tl-header__nav">
        <ul class="tl-header__component-list">
          
          ${
            includeHamburger
              ? `<li class="tl-header__item tl-header__item-hamburger ${
                  isHamburgerPressed ? 'tl-header__item--pressed' : ''
                } ${isHamburgerSelected ? 'tl-header__item--selected' : ''}">
                    <button class="tl-header__item-wrapper">
                        <svg fill="none" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.97 6.998a1 1 0 0 1 1-1h22.05a1 1 0 0 1 0 2H4.97a1 1 0 0 1-1-1ZM3.97 15.982a1 1 0 0 1 1-1h22.05a1 1 0 0 1 0 2H4.97a1 1 0 0 1-1-1ZM3.97 24.966a1 1 0 0 1 1-1h22.05a1 1 0 0 1 0 2H4.97a1 1 0 0 1-1-1Z" fill="currentColor"/>
                        </svg>
                    </button>
                </li>`
              : ''
          }

          
          ${
            includeTitle
              ? `<div class="tl-header__title">
              <h4 class="tl-header__title-text"> Application Name </h4>
              </div>`
              : ''
          }

          ${
            includeHeaderItem
              ? `<li class="tl-header__item">
                    <button class="tl-header__item-wrapper">
                        <span> Header item </span>
                    </button>
                </li>`
              : ''
          }

          ${
            includeHeaderItem
              ? `<li class="tl-header__item">
                    <button class="tl-header__item-wrapper">
                        <span> Header item two </span>
                    </button>
                </li>`
              : ''
          }

          ${
            includeDropdown
              ? `<div class="tl-header__dropdown ${
                  isDropdownSelected ? 'tl-header__dropdown--selected' : ''
                }">
  <button class="tl-header__dropdown-wrapper">
    <span>Dropdown</span>
    <!-- If not using noDropdownIcon -->
    <div class="tl-header__dropdown-icon">
      <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
    </div>
  </button>
  <div class="tl-header__dropdown-menu">
    <!-- Dropdown content here -->
        <!-- Regular menu item -->
        <li class="tl-header__dropdown-menu-item">
          <a href="#">Menu Item</a>
        </li>

        <!-- Selected menu item -->
        <li class="tl-header__dropdown-menu-item tl-header__dropdown-menu-item--selected">
          <a href="#">Selected Item</a>
        </li>

        <li class="tl-header__dropdown-menu-item">
          <a href="#">Another menu Item</a>
        </li>
  </div>
</div>`
              : ''
          }
            
            <li class="tl-header__middle-spacer"></li>


          ${
            includeHeaderItemIconOnly
              ? `<li class="tl-header__item">
                    <button class="tl-header__item-wrapper">
                          ${
                            icon
                              ? `<span class="tl-icon tl-icon--${icon} tl-icon--16" aria-hidden="true"></span>`
                              : ''
                          }
                    </button>
                </li>`
              : ''
          }
            
${
  includeBentoGrid
    ? `<div class="tl-header__dropdown tl-header__dropdown-launcher-grid">
        <button class="tl-header__dropdown-wrapper">
          <svg width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M3.98 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3.98 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3.98 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" fill="currentColor"/>
          </svg>
        </button>
        <div class="tl-header__dropdown-menu">
          <!-- User profile section -->
                      
          <div class="tl-header__dropdown-menu-launcher-title">
                title
          </div>
          <div class="tl-header__dropdown-menu-launcher">


            <!-- Menu items -->
            <li class="tl-header__dropdown-menu-launcher-item">
              <a href="#"><span class="tl-icon tl-icon--profile tl-icon--32" aria-hidden="true"></span>My Profile</a>
            </li>
            <li class="tl-header__dropdown-menu-launcher-item">
              <a href="#"><span class="tl-icon tl-icon--settings tl-icon--32" aria-hidden="true"></span>Settings</a>
            </li>
            <li class="tl-header__dropdown-menu-launcher-item">
              <a href="#"><span class="tl-icon tl-icon--arrow_right tl-icon--32" aria-hidden="true"></span>Sign out</a>
            </li>


          </div>

                    
          <div class="tl-header__dropdown-menu-launcher-title">
                title two
          </div>
          <div class="tl-header__dropdown-menu-launcher">
            <!-- Menu items -->
            <li class="tl-header__dropdown-menu-launcher-item">
              <a href="#"><span class="tl-icon tl-icon--profile tl-icon--32" aria-hidden="true"></span>My Profile</a>
            </li>
            <li class="tl-header__dropdown-menu-launcher-item">
              <a href="#"><span class="tl-icon tl-icon--settings tl-icon--32" aria-hidden="true"></span>Settings</a>
            </li>
            <li class="tl-header__dropdown-menu-launcher-item">
              <a href="#"><span class="tl-icon tl-icon--arrow_right tl-icon--32" aria-hidden="true"></span>Sign out</a>
            </li>
            <li class="tl-header__dropdown-menu-launcher-item">
              <a href="#"><span class="tl-icon tl-icon--info tl-icon--32" aria-hidden="true"></span>Information</a>
            </li>
          </div>
          
          </div>
      </div>`
    : ''
}


${
  includeBentoList
    ? `<div class="tl-header__dropdown tl-header__dropdown-launcher-list">
        <button class="tl-header__dropdown-wrapper">
          <svg width="20px" height="20px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M3.98 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3.98 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3.98 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM14 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 5.978a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM24.019 26.02a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" fill="currentColor"/>
          </svg>
        </button>
        <div class="tl-header__dropdown-menu">
          <!-- User profile section -->
          <!-- Menu items -->
            <div class="tl-header__dropdown-menu-launcher-title">
                title
            </div>

          <li class="tl-header__dropdown-menu-item tl-header__dropdown-menu-item--selected">
            <a href="#">My Profile</a>
          </li>
          <li class="tl-header__dropdown-menu-item">
            <a href="#">Settings</a>
          </li>
          <li class="tl-header__dropdown-menu-item">
            <button type="button">Sign Out</button>
          </li>

          <div class="tl-header__dropdown-menu-launcher-title">
                Title two
          </div>

                    <li class="tl-header__dropdown-menu-item tl-header__dropdown-menu-item">
            <a href="#">My Profile</a>
          </li>
          <li class="tl-header__dropdown-menu-item">
            <a href="#">Settings</a>
          </li>
          <li class="tl-header__dropdown-menu-item">
            <button type="button">Sign Out</button>
          </li>
                    <li class="tl-header__dropdown-menu-item">
            <button type="button">Information</button>
          </li>
          
          </div>
      </div>`
    : ''
}

${
  includeUserProfile
    ? `<div class="tl-header__dropdown tl-header__dropdown-user">
        <button class="tl-header__dropdown-wrapper">
              <div class="tl-header__dropdown-menu-user-image">
                <img src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" alt="User avatar" />
              </div>
        </button>
        <div class="tl-header__dropdown-menu">
          <!-- User profile section -->
          <div class="tl-header__dropdown-menu-user">
            <div class="tl-header__dropdown-menu-user-box">

              <div class="tl-header__dropdown-menu-user-content">
                <span class="tl-header__dropdown-menu-user-header">User Name</span>
                <span class="tl-header__dropdown-menu-user-subheader">user@example.com</span>
              </div>
            </div>
          </div>
          <!-- Menu items -->
          <li class="tl-header__dropdown-menu-item tl-header__dropdown-menu-item--selected">
            <a href="#">My Profile</a>
          </li>
          <li class="tl-header__dropdown-menu-item">
            <a href="#">Settings</a>
          </li>
          <li class="tl-header__dropdown-menu-item">
            <button type="button">Sign Out</button>
          </li>
        </div>
      </div>`
    : ''
}

            ${
              includeBrandSymbol
                ? `<li class="tl-header__item">
                      <a class="tl-header__item-wrapper">
                        <div class="tl-header__brand-symbol"></div>
                    </a>
                </li>`
                : ''
            }
            </ul>
      </nav>
    </header>




        <script>
      // Get all header items
      const headerItems = document.querySelectorAll('.tl-header__item');
      
      // Add event listeners to each header item
      headerItems.forEach(item => {
        item.addEventListener('mousedown', () => {
          item.classList.add('tl-header__item--pressed');
        });
        
        item.addEventListener('mouseup', () => {
          item.classList.remove('tl-header__item--pressed');
        });
        
        // Handle case when mouse leaves the element while pressed
        item.addEventListener('mouseleave', () => {
          item.classList.remove('tl-header__item--pressed');
        });
      });






      document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.tl-header__dropdown');

  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.tl-header__dropdown-wrapper');

    // Toggle dropdown
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('tl-header__dropdown--open');
      
      // Close all other dropdowns
      dropdowns.forEach(d => d.classList.remove('tl-header__dropdown--open'));
      
      // Toggle current dropdown
      dropdown.classList.toggle('tl-header__dropdown--open', !isOpen);
    });

    // Handle pressed state
    button.addEventListener('mousedown', () => {
      dropdown.classList.add('tl-header__dropdown--pressed');
    });

    button.addEventListener('mouseup', () => {
      dropdown.classList.remove('tl-header__dropdown--pressed');
    });

    button.addEventListener('mouseleave', () => {
      dropdown.classList.remove('tl-header__dropdown--pressed');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('tl-header__dropdown--open');
      }
    });
  });

  // Handle Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('tl-header__dropdown--open');
      });
    }
  });
});
    </script>
  `);

export const Default = Template.bind({});
