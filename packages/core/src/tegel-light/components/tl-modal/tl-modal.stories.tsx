import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Modal',
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
      options: ['sticky', 'static'],
      table: {
        defaultValue: { summary: 'static' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the size of Modal.',
      control: {
        type: 'radio',
      },
      options: ['lg', 'md', 'sm', 'xs'],
      table: {
        defaultValue: { summary: 'md' },
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
    actionsPosition: 'static',
    size: 'lg',
    headerText: 'Header text',
    bodyContent:
      '"I beg your pardon, Dr. Lanyon," he replied civilly enough. "What you say is very well founded; and my impatience has shown its heels to my politeness. I come here at the instance of your colleague, Dr. Henry Jekyll, on a piece of business of some moment; and I understood..."',
    showModal: true,
    closable: true,
  },
};

const ModalTemplate = ({ actionsPosition, size, headerText, bodyContent, showModal, closable }) => {
  const actionsClass = actionsPosition === 'sticky' ? 'sticky' : '';
  const showClass = showModal ? 'show' : 'hide';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-light/tl-modal.css"
    -->
    <div class="demo-wrapper">
      <div class="tl-modal tl-modal--${size} tl-modal--${actionsClass} tl-modal--${showClass}">
        <div class="tl-modal__header">
          <h2 class="tl-modal__title">${headerText}</>
          ${
            closable
              ? `
          <!-- Close button -->
          <button class="tl-modal__close">
            <span class="tl-modal__close--icon">&times;</>
          </>
          `
              : ''
          }
        </>
        <div class="tl-modal__body">
          ${bodyContent}
        </>
        <div class="tl-modal__actions">
          <button class="tl-button tl-button--primary">Button Text</>
          <button class="tl-button tl-button--secondary">Button Text</>
        </>
      </>
    </>

    <!-- Backdrop -->
    <div class="tl-modal__backdrop"></>

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
        background-color: rgba(0, 0, 0, 0.3);
        padding: 0 16px;
        z-index: 1001;
      }
    </style>

  `);
};

export const Default = ModalTemplate.bind({});
