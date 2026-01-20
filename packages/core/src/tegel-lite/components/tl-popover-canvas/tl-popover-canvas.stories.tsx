import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Popover Canvas',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '<br> ⚠️ Note: In the Tegel Web Component, positioning of the Popover Canvas is handled by Popper.js. In Tegel Lite, positioning is left for the consuming application to define.',
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
    showPopoverCanvas: {
      name: 'Show Popover Canvas',
      description: 'Toggles if the Popover Canvas is displayed on render.',
      control: { type: 'boolean' },
    },
    animation: {
      name: 'Animation',
      description: 'Sets the animation style of the Popover Canvas.',
      control: { type: 'radio' },
      options: ['none', 'fade'],
      table: { defaultValue: { summary: 'none' } },
    },
  },
  args: {
    modeVariant: 'Primary',
    showPopoverCanvas: true,
    animation: 'fade',
  },
};

const Template = ({ modeVariant, showPopoverCanvas, animation }) => {
  const modeClass = `tl-popover-canvas--mode-variant-${modeVariant.toLowerCase()}`;
  const animationClass = animation === 'fade' ? 'tl-popover-canvas--animation-fade' : '';
  const showPopoverClass = showPopoverCanvas ? 'tl-popover-canvas--visible' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-global.css"
      "@scania/tegel-lite/tl-popover-canvas.css"
  -->

    <style>
      .demo-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }
    </style>
    <div class="demo-wrapper">

      <div id="popover" class="tl-popover-canvas ${modeClass} ${animationClass} ${showPopoverClass}">
        <div class="tl-popover-canvas__content">
          <h2 class="tl-popover-canvas__header">A Popover Canvas!</h2>
          <p>Where you can put anything you want!</p>
          <div class="tl-popover-canvas__actions">
            <a
              class="tds-link"
              href="https://tegel.scania.com"
              target="_blank"
              rel="noopener noreferrer"
              >Even links!</a
            >
          </div>
        </div>
      </div>

      <button id="trigger" class="tl-button tl-button--only-icon tl-button--primary tl-button--sm tl-button--icon">
        <span id="trigger-label" class="tl-icon tl-icon--kebab tl-icon--16"></span>
      </button>
      <span class="click-icon">Click icon to toggle Popover Canvas</span>
    </div>

    <!-- The script below is just for demo purposes -->
    <script>
      (function () {
        const trigger = document.getElementById('trigger');
        const popover = document.getElementById('popover');

        const isAnimated = popover.classList.contains('tl-popover-canvas--animation-fade');

        function openPopover() {
          popover.classList.add('tl-popover-canvas--visible');
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
                popover.classList.remove('tl-popover-canvas--visible');
                popover.removeEventListener('transitionend', handleEnd);
              },
              { once: true }
            );
          } else {
            popover.classList.remove('tl-popover-canvas--visible');
          }
        }

        function isOpen() {
          return popover.classList.contains('tl-popover-canvas--visible');
        }

        // Toggle popover
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          isOpen() ? closePopover() : openPopover();
        });

        // Clicks inside the popover shouldn't close it
        popover.addEventListener('click', (e) => e.stopPropagation());
      })();
    </script>
  `);
};

export const Default = Template.bind({});
