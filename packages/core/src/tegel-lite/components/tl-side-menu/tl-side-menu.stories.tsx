import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite/Side Menu',
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

type TemplateProps = {
  persistent: boolean;
  collapsible: boolean;
  collapsed: boolean;
};

const Template = ({ persistent, collapsible, collapsed }: TemplateProps) => {
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
   :root {
      --app-bar-height: 64px;
   }

   .demo-layout {
      min-height: 100%;
      display: flex;
      flex-direction: column;
   }

   .demo-wrap-side-menu-and-main {
      display: flex;
      flex-grow: 1;
   }

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
      }

      `
       : ''
   }

   @media (min-width: 992px) {
      .tl-header__item {
         display: none !important;
      }
   }

   .demo-hide {
      display: none;
   }

   @media (min-width: 375px) {
      .demo-xs-hide {
         display: none;
      }

      .demo-xs-show {
         display: block;
      }
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
               <nav class="tl-side-menu__navigation">
                  <div class="tl-side-menu__close">
                     <button class="tl-side-menu__item" id="tl-close">
                        <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
                     </button>
                  </div>
                  <div class="tl-side-menu__list-wrapper">
                     <ul class="tl-side-menu__upper-list">
                        <li>
                           <button class="tl-side-menu__item">
                              <span class="tl-icon tl-icon--info ${iconSize}" aria-hidden="true"></span>
                              <span class="tl-side-menu__item-text">About us</span>
                           </button>
                        </li>
                        <li class="tl-side-menu__dropdown" id="wheel-types-dropdown">
                           <button class="tl-side-menu__item tl-side-menu__item--selected" id="dropdown-trigger">
                              <span class="tl-icon tl-icon--acceleration ${iconSize}" aria-hidden="true"></span>
                              <span class="tl-side-menu__item-text">Wheel types</span>
                           </button>
                           <div class="tl-side-menu__dropdown-menu">
                              <span class="tl-side-menu__dropdown-header">Wheel types</span>
                              <ul class="tl-side-menu__dropdown-list">
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Hub-centric wheel</button>
                                 </li>
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Hub-centric wheel</button>
                                 </li>
                                 <li>
                                    <button class="tl-side-menu__dropdown-item tl-side-menu__dropdown-item--selected">
                                       <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Another type of wheel</span>
                                    </button>
                                 </li>
                              </ul>
                           </div>
                        </li>

                        <li>
                           <button class="tl-side-menu__item">
                              <span class="tl-icon tl-icon--star ${iconSize}" aria-hidden="true"></span>
                              <span class="tl-side-menu__item-text">Values</span>
                           </button>
                        </li>

                        <li class="tl-side-menu__dropdown" id="truck-types-dropdown">
                           <button class="tl-side-menu__item" id="dropdown-trigger">
                              <span class="tl-icon tl-icon--truck ${iconSize}" aria-hidden="true"></span>
                              <span class="tl-side-menu__item-text">Truck types</span>
                           </button>
                           <div class="tl-side-menu__dropdown-menu">
                              <span class="tl-side-menu__dropdown-header">Truck types</span>
                              <ul class="tl-side-menu__dropdown-list">
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Big trucks</button>
                                 </li>
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Huge trucks</button>
                                 </li>
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Ginormous trucks</button>
                                 </li>
                              </ul>
                           </div>
                        </li>
                     </ul>
                     <ul class="tl-side-menu__end-list">

                        <li class="tl-side-menu__dropdown" id="dropdown2">
                           <button class="tl-side-menu__item" id="dropdown-trigger2">
                              <div class="tl-side-menu__user">
                                 <div class="tl-side-menu__user-image tl-icon">
                                    <img src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg">
                                 </div>
                                 <div class="tl-side-menu__user-label">
                                    Name Namesson
                                    <div class="subheader">Company name</div>
                                 </div>
                              </div>
                           </button>
                           <div class="tl-side-menu__dropdown-menu">
                              <span class="tl-side-menu__dropdown-header">
                                 <div class="tl-side-menu__user-label">
                                    Name Namesson
                                    <div class="subheader">Company name</div>
                                 </div>
                              </span>
                              <ul class="tl-side-menu__dropdown-list">
                                 <li>
                                    <button class="tl-side-menu__dropdown-item">Dropdown list item</button>
                                 </li>
                                 <li>
                                    <button
                                       class="tl-side-menu__dropdown-item">Dropdown
                                       list item</button>
                                 </li>
                              </ul>
                           </div>
                        </li>
                     </ul>
                  </div>
                  ${
                    persistent && collapsible
                      ? `<div class="tl-side-menu__collapse">
                     <button class="tl-side-menu__item" id="collapse-toggle">
                        <span class="tl-icon ${
                          collapsed ? 'tl-icon--arrow_right ' : 'tl-icon--arrow_left'
                        }  tl-icon--20" aria-hidden="true"></span>
                        <span class="tl-side-menu__collapse-text">Collapse</span>
                     </button>
                  </div>`
                      : ''
                  }
               </nav>
            </aside>
         </div>
      </div>
      <main class="tds-body-01 tds-u-p3" style="box-sizing: border-box; flex:1;">
         <h1> Some styling considerations about the Side Menu</h1>
         
         <p>Since Tegel Lite purely a CSS framework, is not responsible for all the styles and functionality your
            application will need.</p>

         <p>If there are more than a few buttons and/or links in the Header, they might not fit on medium size screens.
            <br />In that case they should be placed in a persistent Side Menu — which is always visible on large
            screens.
         </p>
         <p>The icons in each side menu item should be 24px for Scania brand. For TRATON they should be 16px. </p>
         <p><strong>Note 1:</strong> The Side Menu is sticky, and should not scroll with the main content of the page.</p>
         <p><strong>Note 2:</strong> The collapse button is optional.</p>
         <p><strong>Note 3:</strong> When the side menu is collapsed, you can overwrite both the bottom distance for the end dropdown
               menus as well as the maximum height for the dropdown menus.</p>
         <p><strong>Note 4:</strong> The pattern for usage of dropdowns in the side menu defines that there is only one dropdown open at a time. <br/>
               It the user's responsibility to ensure the implementation of this pattern. In this example, we have used unique ids 
               in each of our three dropdowns implemented.</p> 
        <p><strong>Note 5:</strong> The element styled with tl-side-menu__dropdown menu item is an aggregator for tl-side-menu__dropdown-list items and shouldn't be used as a link to another page.</p>


         <p>
            To help the consumers of Tegel Lite there are GitHub repositories with the usage Tegel Lite in demo
            applications using
            <a href="https://github.com/scania-digital-design-system/tegel-lite-react-demo" target="_blank"
               class="tl-link tl-link--underline">React</a>
            and <a href="https://github.com/scania-digital-design-system/tegel-lite-angular-demo" target="_blank"
               class="tl-link tl-link--underline">Angular</a> as the framework to build the application.
            <br />
            Feel free to explore the examples for complete usage of the extra styles and functionality needed in your
            application.
         </p>
      </main>
   </div>
</div>

<!-- The script below is just for demo purposes -->
<script>
   (function () {
      const sideMenu = document.querySelector('.tl-side-menu');
      const wrapper = document.querySelector('.tl-side-menu__wrapper');
      const overlay = document.getElementById('tl-overlay');
      const closeBtn = document.getElementById('tl-close');

      const hamburger = document.querySelector('.tl-header .tl-header__item button.tl-header__item-wrapper');

      const isPersistent = ${persistent ? 'true' : 'false'};
      const isCollapsible = ${collapsible ? 'true' : 'false'};
      const isCollapsed = ${collapsible && collapsed ? 'true' : 'false'};

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

   const dropdowns = sideMenu.querySelectorAll('.tl-side-menu__dropdown');
   function toggleCollapsed() {
      if (!(isPersistent && isCollapsible)) return;
      sideMenu.classList.toggle('tl-side-menu--collapsed');

      if (sideMenu.classList.contains('tl-side-menu--collapsed')) {
         dropdowns.forEach((dd) => {
            if (dd.classList.contains('tl-side-menu__dropdown--open')) {
               toggleDropdown(dd);
            }
         });

      }

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
   document.getElementById('collapse-toggle')?.addEventListener('click', toggleCollapsed);


   function toggleDropdown(dd) {
      console.log(dd);
      if (!dd) return;

      const btn = dd.querySelector('.tl-side-menu__item');

      dd.classList.toggle('tl-side-menu__dropdown--open');
      const isOpen = dd.classList.contains('tl-side-menu__dropdown--open');

      btn?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (isOpen && !isCollapsed) {
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
      
      // For the demo purposes, we have defined and exposed an id on each dropdown. 
      // It is the user's responsibility to uniquely identify each dropdown.      
      dropdowns.forEach((item) => {
         if(item.id !== dd.id) {
            item.classList.remove('tl-side-menu__dropdown--open');
            const itemBtn = item.querySelector('.tl-side-menu__item');
            if (itemBtn?.dataset.wasSelected === 'true') {
               itemBtn.classList.add('tl-side-menu__item--selected');
               delete itemBtn.dataset.wasSelected;
            }
         }
      });
   }

   dropdowns.forEach((dd) => {
      const trigger = dd.querySelector('.tl-side-menu__item');
      if (trigger) {
         trigger.setAttribute('aria-haspopup', 'true');
         trigger.setAttribute('aria-expanded', 'false');
         trigger.addEventListener('click', () => toggleDropdown(dd));
      }
   });


    }) ();
</script>

`);
};
export const Default = Template.bind({});
