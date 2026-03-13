import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';

export default {
  title: 'Tegel Lite (Beta)/Popover Menu',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          ⚠️ Note: In the Tegel Web Component, positioning of the Popover Menu is handled by Popper.js.
             In Tegel Lite, positioning is left for the consuming application to define.
        `,
      },
    },
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
      table: { defaultValue: { summary: 'Primary' } },
    },
    showPopoverMenu: {
      name: 'Show Popover Menu',
      description: 'Toggles if the Popover Menu is displayed on render.',
      control: { type: 'boolean' },
    },
    fluidWidth: {
      name: 'Fluid width',
      description: 'Unsets the width of the Popover Menu.',
      control: { type: 'boolean' },
    },
    animation: {
      name: 'Animation',
      description: 'Sets the animation style of the Popover Menu.',
      control: { type: 'radio' },
      options: ['None', 'Fade'],
      table: { defaultValue: { summary: 'None' } },
    },
    showIcon: {
      name: 'Show icon',
      description: 'Displays icons in the Popover Menu.',
      control: { type: 'boolean' },
    },
    icon: {
      name: 'Icon',
      description: 'Sets icon to be displayed on the Link.',
      control: { type: 'select' },
      options: iconsNames,
      table: {
        defaultValue: { summary: 'placeholder' },
      },
      if: { arg: 'showIcon', truthy: true },
    },
  },
  args: {
    modeVariant: 'Primary',
    showPopoverMenu: false,
    showIcon: false,
    icon: 'share',
    fluidWidth: false,
    animation: 'none',
  },
};

const Template = ({ modeVariant, fluidWidth, showPopoverMenu, animation, showIcon, icon }) => {
  const modeClass = `tl-popover-menu--${modeVariant.toLowerCase()}`;
  const fluidClass = fluidWidth ? 'tl-popover-menu--fluid' : '';

  const animationMap = {
    None: 'none',
    Fade: 'fade',
  };
  const animationClass =
    animationMap[animation] === 'fade' ? 'tl-popover-menu--animation-fade' : '';
  const showPopoverClass = showPopoverMenu ? 'tl-popover-menu--visible' : '';

  const iconHtml = showIcon
    ? `<span class="tl-icon tl-icon--${icon} tl-icon--16" aria-hidden="true"></span>`
    : '';

  const firstItemLabel = fluidWidth ? 'The menu width adjusts to the widest word' : 'Action';
  const otherItemLabel = 'Action';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-global.css"
      "@scania/tegel-lite/tl-popover-menu.css"
    -->
    <!-- Optional stylesheet 
      "@scania/tegel-lite/tl-divider.css"
      "@scania/tegel-lite/tl-icon.css"
    -->
    <style>
      .demo-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
      }
    </style>
    <div class="demo-wrapper">
      <span class="click-icon">Click icon to toggle Popover Menu</span>
      <div id="popover" class="tl-popover-menu ${modeClass} ${fluidClass} ${animationClass} ${showPopoverClass}">
        <div class="tl-popover-menu__item-wrapper">
          <button class="tl-popover-menu__item">
            ${iconHtml} ${firstItemLabel}
          </button>
          <div class="tl-divider tl-divider--horizontal"></div>
          <button class="tl-popover-menu__item">${iconHtml} ${otherItemLabel}</button>
          <button class="tl-popover-menu__item">${iconHtml} ${otherItemLabel}</button>
          <button class="tl-popover-menu__item--disabled">
            ${iconHtml} Disabled action
          </button>
          <div class="tl-divider tl-divider--horizontal"></div>
          <button class="tl-popover-menu__item">${iconHtml} ${otherItemLabel}</button>
          <div class="tl-divider tl-divider--horizontal"></div>
          <button class="tl-popover-menu__item">${iconHtml} ${otherItemLabel}</button>
          <button class="tl-popover-menu__item">${iconHtml} ${otherItemLabel}</button>
        </div>
      </div>
      <button id="trigger" class="tl-button tl-button--only-icon tl-button--primary tl-button--sm tl-button--icon">
        <span id="trigger-label" class="tl-icon tl-icon--kebab tl-icon--16"></span>
      </button>
    </div>
    <!-- Demo script -->
    <script>
      (function () {
        const trigger = document.getElementById('trigger');
        const popover = document.getElementById('popover');
        const isAnimated = popover.classList.contains('tl-popover-menu--animation-fade');
        function openPopover() {
          popover.classList.add('tl-popover-menu--visible');
          if (isAnimated) {
            popover.style.opacity = 0;
            popover.style.transform = 'translateY(4px)';
            requestAnimationFrame(() => {
              popover.style.transition = 'opacity 120ms ease-out, transform 120ms ease-out';
              popover.style.opacity = 1;
              popover.style.transform = 'translateY(0)';
            });
          }
        }
        function closePopover() {
          if (isAnimated) {
            popover.style.transition = 'opacity 120ms ease-out, transform 120ms ease-out';
            popover.style.opacity = 0;
            popover.style.transform = 'translateY(4px)';
            popover.addEventListener(
              'transitionend',
              function handleEnd() {
                popover.classList.remove('tl-popover-menu--visible');
                popover.removeEventListener('transitionend', handleEnd);
              },
              { once: true }
            );
          } else {
            popover.classList.remove('tl-popover-menu--visible');
          }
        }
        function isOpen() {
          return popover.classList.contains('tl-popover-menu--visible');
        }
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          isOpen() ? closePopover() : openPopover();
        });
        popover.addEventListener('click', (e) => e.stopPropagation());
      })();
    </script>
  `);
};

export const Default = Template.bind({});
