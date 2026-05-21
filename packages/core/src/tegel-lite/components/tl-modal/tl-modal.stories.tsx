import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (Beta)/Modal',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    actionsPosition: {
      name: 'Actions position',
      description:
        "Defines the position of Modal action's slot - if slot scrolls or stays on top of the content.",
      control: {
        type: 'radio',
      },
      options: ['Sticky', 'Static'],
      table: {
        defaultValue: { summary: 'Static' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of Modal.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Medium', 'Small', 'Extra small'],
      table: {
        defaultValue: { summary: 'Medium' },
      },
    },
    headerText: {
      name: 'Modal header',
      description: 'Sets the header text of the Modal.',
      control: {
        type: 'text',
      },
    },
    bodyContent: {
      name: 'Modal body text',
      description: 'Sets the body content of the Modal.',
      control: {
        type: 'text',
      },
    },
    showModal: {
      name: 'Show Modal',
      description: 'Toggles if the Modal is displayed.',
      control: {
        type: 'boolean',
      },
    },
    closable: {
      name: 'Closable',
      description: 'Controls visibility of the close button.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    actionsPosition: 'Static',
    size: 'Large',
    headerText: 'Header text',
    bodyContent:
      '"I beg your pardon, Dr. Lanyon," he replied civilly enough. "What you say is very well founded; and my impatience has shown its heels to my politeness. I come here at the instance of your colleague, Dr. Henry Jekyll, on a piece of business of some moment; and I understood..."',
    showModal: true,
    closable: true,
  },
};

const ModalTemplate = ({ actionsPosition, size, headerText, bodyContent, showModal, closable }) => {
  // Map readable names to CSS class names
  const actionsPositionMap = {
    Sticky: 'sticky',
    Static: 'static',
  };
  const actionsClass = actionsPositionMap[actionsPosition] === 'sticky' ? 'tl-modal--sticky' : '';
  const showClass = showModal ? 'tl-modal--visible' : '';

  // Map readable size names to CSS class names
  const sizeMap = {
    'Large': 'lg',
    'Medium': 'md',
    'Small': 'sm',
    'Extra small': 'xs',
  };
  const sizeClass = sizeMap[size] || 'lg';

  return formatHtmlPreview(`
    <!-- Required stylesheet
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-modal.css"
    -->

    <!-- Optional stylesheet
      "@scania/tegel-lite/tl-button.css"
      "@scania/tegel-lite/tl-icon.css"
    -->
    <button type="button" class="tl-button tl-button--sm tl-button--primary" data-modal-trigger>
      <span class="tl-button__label">Open modal</span>
    </button>

    <div class="demo-wrapper">
      <div class="tl-modal ${showClass} tl-modal--${sizeClass} ${actionsClass}">
        <div class="tl-modal__header">
          <h2 class="tl-modal__title">${headerText}</h2>
          ${
            closable
              ? `
          <!-- Close button -->
          <button type="button" class="tl-modal__close" aria-label="Close">
            <span class="tl-icon tl-icon--cross tl-icon--20" aria-hidden="true"></span>
          </button>
          `
              : ''
          }
        </div>
        <div class="tl-modal__body">
          ${bodyContent}
        </div>
        <div class="tl-modal__actions">
          <button type="button" class="tl-button tl-button--sm tl-button--primary" data-modal-close>
            <span class="tl-button__label">Button Text</span>
          </button>
          <button type="button" class="tl-button tl-button--sm tl-button--secondary" data-modal-close>
            <span class="tl-button__label">Button Text</span>
          </button>
        </div>
      </div>

      <!-- Overlay -->
      <div class="tl-modal__overlay ${showClass}"></div>
    </div>

    <!-- Demo wrapper styles -->
    <style>
      .demo-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        z-index: 1001;
        pointer-events: none;
      }
      .demo-wrapper .tl-modal,
      .demo-wrapper .tl-modal__overlay {
        pointer-events: auto;
      }
    </style>

    <!-- Script tag for demo purposes -->
    <script>
      (function setupModal() {
        try {
          const modal = document.querySelector('.tl-modal');
          const overlay = document.querySelector('.tl-modal__overlay');
          const trigger = document.querySelector('[data-modal-trigger]');
          if (!modal || !overlay) return;

          const open = () => {
            modal.classList.add('tl-modal--visible');
            overlay.classList.add('tl-modal--visible');
          };
          const close = () => {
            modal.classList.remove('tl-modal--visible');
            overlay.classList.remove('tl-modal--visible');
          };

          if (trigger) {
            if (trigger._modalHandler) trigger.removeEventListener('click', trigger._modalHandler);
            trigger._modalHandler = (e) => { e.preventDefault(); open(); };
            trigger.addEventListener('click', trigger._modalHandler);
          }

          document
            .querySelectorAll('.tl-modal__close, [data-modal-close]')
            .forEach((el) => {
              if (el._modalCloseHandler) el.removeEventListener('click', el._modalCloseHandler);
              el._modalCloseHandler = (e) => { e.preventDefault(); close(); };
              el.addEventListener('click', el._modalCloseHandler);
            });

          if (overlay._modalCloseHandler) overlay.removeEventListener('click', overlay._modalCloseHandler);
          overlay._modalCloseHandler = (e) => { e.preventDefault(); close(); };
          overlay.addEventListener('click', overlay._modalCloseHandler);
        } catch (error) {
          console.error('Error setting up modal:', error);
        }
      })();
    </script>
  `);
};

export const Default = ModalTemplate.bind({});
