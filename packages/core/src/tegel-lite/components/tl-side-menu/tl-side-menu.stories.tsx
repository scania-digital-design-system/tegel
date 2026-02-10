import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Side Menu',
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        state: 'closed',
      },
    },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=11142%3A42941&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    persistent: {
      name: 'Persistent',
      description: 'Set the Side Menu to always show on desktop. Use when header items won’t fit.',
      control: {
        type: 'boolean',
      },
    },
    collapsible: {
      name: 'Collapsible',
      description: 'Make the Side Menu collapsible (desktop/persistent only).',
      control: {
        type: 'boolean',
      },
      if: {
        arg: 'persistent',
        truthy: true,
      },
    },
    collapsed: {
      name: 'Collapsed',
      description: 'Collapsed Side Menu (requires collapsible).',
      control: {
        type: 'boolean',
      },
      if: {
        arg: 'collapsible',
        truthy: true,
      },
    },
  },
  args: {
    persistent: true,
    collapsible: false,
    collapsed: false,
  },
};

const Template = ({ persistent, collapsible, collapsed }) => {
  const isTraton =
    typeof document !== 'undefined' && document.documentElement.classList.contains('traton');

  const iconSize = isTraton ? 'tl-icon--16' : 'tl-icon--24';

  return formatHtmlPreview(`
<!-- Required stylesheets:
  "@scania/tegel-lite/global.css"
  "@scania/tegel-lite/tl-side-menu.css"
-->

<!-- Optional stylesheets:
  "@scania/tegel-lite/tl-icon.css"
-->

  <script>window.demoSideMenu = null;</script>
  <style>
    :root { --app-bar-height: 64px; }
    .demo-layout { min-height: 100%; display: flex; flex-direction: column; }
    .demo-wrap-side-menu-and-main { display: flex; flex-grow: 1; }

    ${
      persistent
        ? `
    /* Sticky persistent on lg (992px) to mirror WC */
    @media (min-width: 992px) {
      .tl-side-menu {
        height: calc(100vh - var(--app-bar-height));
        position: sticky;
        top: var(--app-bar-height);
        left: 0px;
      }
    }`
        : ''
    }

    @media (min-width: 992px) {
          .tl-header__item {
        display: none!important;
      }
        }

    .demo-hide { display: none; }
    @media (min-width: 375px) {
      .demo-xs-hide { display: none; }
      .demo-xs-show { display: block; }
    }

    .tl-header__item {
    display: block;
    }
  </style>

<div class="demo-layout">
   <!-- Use your existing header component markup (no extra styling added) -->
   <header class="tl-header">
      <nav class="tl-header__nav">
         <ul class="tl-header__list">
            <li class="tl-header__item">
               <button class="tl-header__item-wrapper">
               <span class="tl-icon tl-icon--burger tl-icon--20" aria-hidden="true"></span>
               </button>
            </li>
            <li class="tl-header__title">
               <h4 class="tl-header__title-text">Application Name</h4>
            </li>
            <li class="tl-header__middle-spacer"></li>
            <li class="tl-header__item">
               <a class="tl-header__item-wrapper">
                  <div class="tl-header__brand"></div>
               </a>
            </li>
         </ul>
      </nav>
   </header>
   <div class="demo-wrap-side-menu-and-main">
      <div class="tl-side-menu ${persistent ? 'tl-side-menu--persistent' : ''} ${
    collapsible && collapsed ? 'tl-side-menu--collapsed' : ''
  }">
         <div class="tl-side-menu__wrapper tl-side-menu__wrapper--closed">
            <div class="tl-side-menu__overlay" id="tl-overlay"></div>
            <aside class="tl-side-menu__aside">
               <div class="tl-side-menu__navigation">
                  <div class="tl-side-menu__close">
                     <button class="tl-side-menu__item" id="tl-close">
                        <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
                     </button>
                  </div>
                  <div class="tl-side-menu__list-wrapper">
                     <ul class="tl-side-menu__upper-list">
                        <li>
                           <button class="tl-side-menu__item tl-side-menu__item--selected">
                              <span class="tl-icon tl-icon--info ${iconSize}" aria-hidden="true"></span>
                              About us
                           </button>
                        </li>
                        <li>
                           <button class="tl-side-menu__item">
                              <span class="tl-icon tl-icon--truck ${iconSize}" aria-hidden="true"></span>
                              Trucks
                           </button>
                        </li>
                        <li class="tl-side-menu__dropdown" id="dropdown">
                           <button class="tl-side-menu__item tl-side-menu__item--selected" id="dropdown-trigger">
                              <span class="tl-icon tl-icon--info ${iconSize}" aria-hidden="true"></span>
                              Dropdown
                           </button>
                           <div class="tl-side-menu__dropdown-menu">
                              <span class="tl-side-menu__dropdown-header">Dropdown</span>
                              <ul class="tl-side-menu__dropdown-list">
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Dropdown list item</button>
                                 </li>
                                 <li>
                                    <button class="tl-side-menu__dropdown-item tl-side-menu__dropdown-item--selected">Dropdown list item</button>
                                 </li>
                              </ul>
                           </div>
                        </li>
                        <li>
                           <button class="tl-side-menu__item">
                              <span class="tl-icon tl-icon--star ${iconSize}" aria-hidden="true"></span>
                              Values
                           </button>
                        </li>
                     </ul>
                     <ul class="tl-side-menu__end-list">
                        <li>
                           <button class="tl-side-menu__item">
                              <div class="tl-side-menu__user">
                                 <div class="tl-side-menu__user-image">
                                    <img src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg">
                                 </div>
                                 <div class="tl-side-menu__user-label">
                                    Name Namesson
                                    <div class="subheader">Company name</div>
                                 </div>
                              </div>
                           </button>
                        </li>
                        <li class="tl-side-menu__dropdown" id="dropdown2">
                           <button class="tl-side-menu__item" id="dropdown-trigger2">
                              <div class="tl-side-menu__user">
                                 <div class="tl-side-menu__user-image">
                                    <img src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg">
                                 </div>
                                 <div class="tl-side-menu__user-label">
                                    Name Namesson
                                    <div class="subheader">Company name</div>
                                 </div>
                              </div>
                           </button>
                           <div class="tl-side-menu__dropdown-menu">
                              <span class="tl-side-menu__dropdown-header">Dropdown</span>
                              <ul class="tl-side-menu__dropdown-list">
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Dropdown list item</button>
                                 </li>
                                 <li>
                                    <button class="tl-side-menu__dropdown-item tl-side-menu__dropdown-item--selected">Dropdown list item</button>
                                 </li>
                              </ul>
                           </div>
                        </li>
                        ${
                          persistent && collapsible
                            ? `<li class="tl-side-menu__collapse">
                           <button class="tl-side-menu__item" id="collapse-toggle">
                              <span class="tl-icon ${
                                collapsed ? 'tl-icon--arrow_right' : 'tl-icon--arrow_left'
                              } ${iconSize}" aria-hidden="true"></span>
                              <span class="tl-side-menu__collapse-text">Collapse</span>
                           </button>
                        </li>`
                            : ''
                        }
                     </ul>
                  </div>
               </div>
            </aside>
         </div>
      </div>
      <main class="tds-u-h-100 tds-u-p3" style="box-sizing: border-box; flex:1;">
         <p>If there are more than a few buttons and/or links in the Header, they might not fit on medium size screens.
            <br/>In that case they should be placed in a persistent Side Menu — which is always visible on large screens.
         </p>
         <p><i>Note: The Side Menu is sticky, and should not scroll with the main content of the page.</i></p>
         <p><i>Note: The collapse button is optional.</i></p>
         <button id="test">Toggle the collapsed state programmatically</button>
         <button id="toggleExpandedTest">Toggle wheel types expanded programmatically</button>
      </main>
   </div>
</div>

    <!-- The script below is just for demo purposes -->
<script>
  (function () {
    const sideMenu  = document.querySelector('.tl-side-menu');
    const wrapper   = document.querySelector('.tl-side-menu__wrapper');
    const overlay   = document.getElementById('tl-overlay');
    const closeBtn  = document.getElementById('tl-close');

    const hamburger = document.querySelector('.tl-header .tl-header__item button.tl-header__item-wrapper');

    const isPersistent  = ${persistent ? 'true' : 'false'};
    const isCollapsible = ${collapsible ? 'true' : 'false'};
    const isCollapsed   = ${collapsible && collapsed ? 'true' : 'false'};

    sideMenu.classList.toggle('tl-side-menu--persistent', isPersistent);
    sideMenu.classList.toggle('tl-side-menu--collapsed', isPersistent && isCollapsible && isCollapsed);

    function openMobile() {
      wrapper.classList.remove('tl-side-menu__wrapper--closed');
      wrapper.classList.add('tl-side-menu__wrapper--open');
      hamburger?.setAttribute('aria-expanded', 'true');
    }
    function closeMobile() {
      wrapper.classList.remove('tl-side-menu__wrapper--open');
      wrapper.classList.add('tl-side-menu__wrapper--closed');
      hamburger?.setAttribute('aria-expanded', 'false');
    }

    hamburger?.addEventListener('click', openMobile);
    overlay?.addEventListener('click', closeMobile);
    closeBtn?.addEventListener('click', closeMobile);

    function toggleCollapsed(){
      if (!(isPersistent && isCollapsible)) return;
      sideMenu.classList.toggle('tl-side-menu--collapsed');
      console.log('tdsCollapse', { collapsed: sideMenu.classList.contains('tl-side-menu--collapsed') });
      
      // Update collapse button icon
      const collapseBtn = document.getElementById('collapse-toggle');
      const collapseIcon = collapseBtn?.querySelector('.tl-icon');
      if (collapseIcon) {
        if (sideMenu.classList.contains('tl-side-menu--collapsed')) {
          collapseIcon.classList.remove('tl-icon--arrow_left');
          collapseIcon.classList.add('tl-icon--arrow_right');
        } else {
          collapseIcon.classList.remove('tl-icon--arrow_right');
          collapseIcon.classList.add('tl-icon--arrow_left');
        }
      }
    }
    document.getElementById('test')?.addEventListener('click', toggleCollapsed);
    document.getElementById('collapse-toggle')?.addEventListener('click', toggleCollapsed);

    const dropdowns = sideMenu.querySelectorAll('.tl-side-menu__dropdown');

    function toggleDropdown(dd) {
      if (!dd) return;

      const btn = dd.querySelector('.tl-side-menu__item');

      dd.classList.toggle('tl-side-menu__dropdown--open');
      const isOpen = dd.classList.contains('tl-side-menu__dropdown--open');

      btn?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (isOpen) {
        if (btn?.classList.contains('tl-side-menu__item--selected')) {
          btn.dataset.wasSelected = 'true';
          btn.classList.remove('tl-side-menu__item--selected');
        }
      } else {
        if (btn?.dataset.wasSelected === 'true') {
          btn.classList.add('tl-side-menu__item--selected');
          delete btn.dataset.wasSelected;
        }
      }
    }

    dropdowns.forEach((dd) => {
      const trigger = dd.querySelector('.tl-side-menu__item');
      if (trigger) {
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.addEventListener('click', () => toggleDropdown(dd));
      }
    });

    document.getElementById('toggleExpandedTest')?.addEventListener('click', () => {
      dropdowns.forEach((dd) => toggleDropdown(dd));
    });

    })();
</script>

  `);
};
export const Default = Template.bind({});
