import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';

export default {
  title: 'Tegel Lite (CSS)/Header',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    includeTitle: { control: 'boolean', name: 'Include title' },
    includeHamburger: { control: 'boolean', name: 'Include hamburger' },
    includeBentoGrid: { control: 'boolean', name: 'Include bento (Grid)' },
    includeBentoList: { control: 'boolean', name: 'Include bento (List)' },
    includeHeaderItem: { control: 'boolean', name: 'Include header item' },
    includeHeaderItemIconOnly: { control: 'boolean', name: 'Include header item (icon only)' },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed on the Link.',
      control: { type: 'select' },
      options: iconsNames,
      if: { arg: 'includeHeaderItemIconOnly', truthy: true },
    },
    includeDropdown: { control: 'boolean', name: 'Include dropdown' },
    isDropdownOpen: {
      control: 'boolean',
      name: 'Dropdown open',
      if: { arg: 'includeDropdown', truthy: true },
    },
    isDropdownSelected: {
      control: 'boolean',
      name: 'Dropdown selected',
      if: { arg: 'includeDropdown', truthy: true },
    },
    includeUserProfile: { control: 'boolean', name: 'Include user profile' },
    includeBrand: { control: 'boolean', name: 'Include brand symbol' },
    isHamburgerPressed: {
      control: 'boolean',
      name: 'Hamburger pressed',
      if: { arg: 'includeHamburger', truthy: true },
    },
    isHamburgerSelected: {
      control: 'boolean',
      name: 'Hamburger selected',
      if: { arg: 'includeHamburger', truthy: true },
    },
  },
  args: {
    includeTitle: true,
    includeHamburger: false,
    isHamburgerPressed: false,
    isHamburgerSelected: false,
    includeBentoGrid: false,
    includeBentoList: false,
    includeBrand: true,
    includeDropdown: false,
    isDropdownOpen: false,
    isDropdownSelected: false,
    includeUserProfile: false,
    includeHeaderItem: false,
    includeHeaderItemIconOnly: true,
    icon: 'placeholder',
  },
};

const Template = ({
  includeTitle,
  includeHamburger,
  includeBentoGrid,
  includeBentoList,
  includeBrand,
  isHamburgerPressed,
  isHamburgerSelected,
  includeDropdown,
  isDropdownOpen,
  isDropdownSelected,
  includeUserProfile,
  includeHeaderItem,
  includeHeaderItemIconOnly,
  icon,
}) =>
  formatHtmlPreview(`

<!-- Required stylesheet 
  "@scania/tegel-lite/global.css";
  "@scania/tegel-lite/tl-header.css";
  "@scania/tegel-lite/tl-icon.css";
-->

<header class="tl-header">
  <nav class="tl-header__nav">
    <ul class="tl-header__list">

      ${
        includeHamburger
          ? `<li class="tl-header__item ${isHamburgerPressed ? 'tl-header__item--pressed' : ''} ${
              isHamburgerSelected ? 'tl-header__item--selected' : ''
            }">
              <button class="tl-header__item-wrapper">
                <span class="tl-icon tl-icon--burger tl-icon--20" aria-hidden="true"></span>
              </button>
            </li>`
          : ''
      }

      ${
        includeTitle
          ? `<li class="tl-header__title"><h4 class="tl-header__title-text">Application Name</h4></li>`
          : ''
      }

      ${
        includeHeaderItem
          ? `<li class="tl-header__item"><button class="tl-header__item-wrapper"><span>Header item</span></button></li>`
          : ''
      }

      ${
        includeDropdown
          ? `<li class="tl-header__dropdown">
              <button class="tl-header__dropdown-wrapper ${
                isDropdownOpen ? 'tl-header__dropdown-wrapper--open' : ''
              } ${isDropdownSelected ? 'tl-header__dropdown-wrapper--selected' : ''}">
                <span>Dropdown</span>
                <div class="tl-header__dropdown-icon ${
                  isDropdownOpen ? 'tl-header__dropdown-icon--rotated' : ''
                }">
                  <span class="tl-icon tl-icon--chevron_down tl-icon--16" aria-hidden="true"></span>
                </div>
              </button>
              <ul class="tl-header__dropdown-menu ${
                isDropdownOpen ? 'tl-header__dropdown-menu--open' : ''
              }">
                <li class="tl-header__dropdown-menu-item"><a href="#">Menu Item</a></li>
                <li class="tl-header__dropdown-menu-item tl-header__dropdown-menu-item--selected"><a href="#">Selected</a></li>
              </ul>
            </li>`
          : ''
      }

      <li class="tl-header__middle-spacer"></li>

      ${
        includeHeaderItemIconOnly
          ? `<li class="tl-header__item">
              <button class="tl-header__item-wrapper">
                <span class="tl-icon tl-icon--${icon} tl-icon--16" aria-hidden="true"></span>
              </button>
            </li>`
          : ''
      }

      ${
        includeBentoGrid
          ? `<li class="tl-header__dropdown">
              <button class="tl-header__dropdown-wrapper">
                <span class="tl-icon tl-icon--bento tl-icon--16"></span>
              </button>
              <ul class="tl-header__launcher-menu-grid ${
                isDropdownOpen ? 'tl-header__launcher-menu-grid--open' : ''
              }">
                <li class="tl-header__launcher-menu-title">title</li>
                <ul class="tl-header__launcher-menu-list">
                  <li class="tl-header__launcher-menu-item"><a href="#"><span class="tl-icon tl-icon--profile tl-icon--32"></span>My Profile</a></li>
                  <li class="tl-header__launcher-menu-item"><a href="#"><span class="tl-icon tl-icon--settings tl-icon--32"></span>My Settings</a></li>
                  <li class="tl-header__launcher-menu-item"><a href="#"><span class="tl-icon tl-icon--message tl-icon--32"></span>Support</a></li>
                  <li class="tl-header__launcher-menu-item"><a href="#"><span class="tl-icon tl-icon--truck tl-icon--32"></span>My Truck</a></li>
                </ul>
              </ul>
            </li>`
          : ''
      }

      ${
        includeBentoList
          ? `<li class="tl-header__dropdown">
              <button class="tl-header__dropdown-wrapper">
                <span class="tl-icon tl-icon--bento tl-icon--16"></span>
              </button>
              <ul class="tl-header__launcher-menu ${
                isDropdownOpen ? 'tl-header__launcher-menu--open' : ''
              }">
                <li class="tl-header__launcher-menu-title">title</li>
                <li class="tl-header__dropdown-menu-item tl-header__dropdown-menu-item--selected"><a href="#">My Profile</a></li>
                <li class="tl-header__dropdown-menu-item"><a href="#">My settings</a></li>
                <li class="tl-header__dropdown-menu-item"><a href="#">Support</a></li>
                <li class="tl-header__dropdown-menu-item"><a href="#">My truck</a></li>
              </ul>
            </li>`
          : ''
      }

      ${
        includeUserProfile
          ? `<li class="tl-header__dropdown">
              <button class="tl-header__dropdown-wrapper_user">
                <div class="tl-header__user-menu-image">
                  <img src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" alt="User avatar" />
                </div>
              </button>
              <ul class="tl-header__user-menu ${
                isDropdownOpen ? 'tl-header__user-menu--open' : ''
              }">
                <li class="tl-header__user-menu-item">
                  <div class="tl-header__user-menu-box">
                    <div class="tl-header__user-menu-content">
                      <span class="tl-header__user-menu-header">User Name</span>
                      <span class="tl-header__user-menu-subheader">user@example.com</span>
                    </div>
                  </div>
                </li>
                <li class="tl-header__dropdown-menu-item"><a href="#">My Profile</a></li>
                <li class="tl-header__dropdown-menu-item"><a href="#">My Settings</a></li>
                <li class="tl-header__dropdown-menu-item"><a href="#">Log out</a></li>
              </ul>
            </li>`
          : ''
      }

      ${
        includeBrand
          ? `<li class="tl-header__item"><a class="tl-header__item-wrapper"><div class="tl-header__brand"></div></a></li>`
          : ''
      }

    </ul>
  </nav>
</header>

    <!-- The script below is just for demo purposes -->
        <script>
  document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.tl-header__dropdown');

    dropdowns.forEach(dropdown => {
      const wrapper = dropdown.querySelector('.tl-header__dropdown-wrapper, .tl-header__dropdown-wrapper_user');
      const menu = dropdown.querySelector('.tl-header__dropdown-menu, .tl-header__user-menu, .tl-header__launcher-menu, .tl-header__launcher-menu-grid');
      const icon = dropdown.querySelector('.tl-header__dropdown-icon');

      if (!wrapper || !menu) return;

      wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrapper.classList.contains('tl-header__dropdown-wrapper--open') || 
                       wrapper.classList.contains('tl-header__dropdown-wrapper_user--open');

        // close all dropdowns
        document.querySelectorAll('.tl-header__dropdown-wrapper--open').forEach(w => w.classList.remove('tl-header__dropdown-wrapper--open'));
        document.querySelectorAll('.tl-header__dropdown-wrapper_user--open').forEach(w => w.classList.remove('tl-header__dropdown-wrapper_user--open'));
        document.querySelectorAll('.tl-header__dropdown-menu--open').forEach(m => m.classList.remove('tl-header__dropdown-menu--open'));
        document.querySelectorAll('.tl-header__user-menu--open').forEach(m => m.classList.remove('tl-header__user-menu--open'));
        document.querySelectorAll('.tl-header__launcher-menu--open').forEach(m => m.classList.remove('tl-header__launcher-menu--open'));
        document.querySelectorAll('.tl-header__launcher-menu-grid--open').forEach(m => m.classList.remove('tl-header__launcher-menu-grid--open'));
        document.querySelectorAll('.tl-header__dropdown-icon--rotated').forEach(i => i.classList.remove('tl-header__dropdown-icon--rotated'));

        if (!isOpen) {
          // Add --open to the appropriate wrapper type
          if (wrapper.classList.contains('tl-header__dropdown-wrapper_user')) {
            wrapper.classList.add('tl-header__dropdown-wrapper_user--open');
          } else {
            wrapper.classList.add('tl-header__dropdown-wrapper--open');
          }
          
          // Add the appropriate --open class based on menu type
          if (menu.classList.contains('tl-header__user-menu')) {
            menu.classList.add('tl-header__user-menu--open');
          } else if (menu.classList.contains('tl-header__launcher-menu')) {
            menu.classList.add('tl-header__launcher-menu--open');
          } else if (menu.classList.contains('tl-header__launcher-menu-grid')) {
            menu.classList.add('tl-header__launcher-menu-grid--open');
          } else {
            menu.classList.add('tl-header__dropdown-menu--open');
          }
          
          if (icon) {
            icon.classList.add('tl-header__dropdown-icon--rotated');
          }
        }
      });
    });

    // close on outside click
    document.addEventListener('click', () => {
      document.querySelectorAll('.tl-header__dropdown-wrapper--open').forEach(w => w.classList.remove('tl-header__dropdown-wrapper--open'));
      document.querySelectorAll('.tl-header__dropdown-wrapper_user--open').forEach(w => w.classList.remove('tl-header__dropdown-wrapper_user--open'));
      document.querySelectorAll('.tl-header__dropdown-menu--open').forEach(m => m.classList.remove('tl-header__dropdown-menu--open'));
      document.querySelectorAll('.tl-header__user-menu--open').forEach(m => m.classList.remove('tl-header__user-menu--open'));
      document.querySelectorAll('.tl-header__launcher-menu--open').forEach(m => m.classList.remove('tl-header__launcher-menu--open'));
      document.querySelectorAll('.tl-header__launcher-menu-grid--open').forEach(m => m.classList.remove('tl-header__launcher-menu-grid--open'));
      document.querySelectorAll('.tl-header__dropdown-icon--rotated').forEach(i => i.classList.remove('tl-header__dropdown-icon--rotated'));
    });

    // close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.tl-header__dropdown-wrapper--open').forEach(w => w.classList.remove('tl-header__dropdown-wrapper--open'));
        document.querySelectorAll('.tl-header__dropdown-wrapper_user--open').forEach(w => w.classList.remove('tl-header__dropdown-wrapper_user--open'));
        document.querySelectorAll('.tl-header__dropdown-menu--open').forEach(m => m.classList.remove('tl-header__dropdown-menu--open'));
        document.querySelectorAll('.tl-header__user-menu--open').forEach(m => m.classList.remove('tl-header__user-menu--open'));
        document.querySelectorAll('.tl-header__launcher-menu--open').forEach(m => m.classList.remove('tl-header__launcher-menu--open'));
        document.querySelectorAll('.tl-header__launcher-menu-grid--open').forEach(m => m.classList.remove('tl-header__launcher-menu-grid--open'));
        document.querySelectorAll('.tl-header__dropdown-icon--rotated').forEach(i => i.classList.remove('tl-header__dropdown-icon--rotated'));
      }
    });
  });
</script>
`);

export const Default = Template.bind({});
