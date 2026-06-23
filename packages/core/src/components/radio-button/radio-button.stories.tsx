import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Radio Button',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17335&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17335&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    label: {
      name: 'Label text',
      description: 'Sets the label for the Radio Button.',
      controls: {
        type: 'text',
      },
    },
    checkedIndex: {
      name: 'Checked index',
      description: 'Sets which Radio Button in the group is checked by index, or "none".',
      control: {
        type: 'radio',
      },
      options: [0, 1, 2, 'none'],
      table: {
        defaultValue: { summary: 0 },
      },
    },
    disabledIndex: {
      name: 'Disabled index',
      description:
        'Disables a single Radio Button in the group by index, or the whole group with "all".',
      control: {
        type: 'radio',
      },
      options: [0, 1, 2, 'none', 'all'],
      table: {
        defaultValue: { summary: 'none' },
      },
    },
  },
  args: {
    label: 'Label text',
    checkedIndex: 0,
    disabledIndex: 'none',
  },
};

const Template = ({ label, checkedIndex, disabledIndex }) =>
  formatHtmlPreview(`
  <style>
  .demo-fieldset-reset {
    border: 0;
    margin: 0;
    min-width: 0;
    padding: 0;
  }
</style>

  <fieldset class="demo-fieldset-reset">
  <tds-radio-button
    name="rb-example"
    value="option1"
    radio-id="option-1"
    required=false
    ${disabledIndex === 0 || disabledIndex === 'all' ? 'disabled' : ''}
    ${checkedIndex === 0 ? 'checked' : ''}
    tds-tab-index="0"
  >
    <div slot="label">
      ${label} 1
    </div>
  </tds-radio-button>

  <tds-radio-button
    name="rb-example"
    value="option2"
    radio-id="option-2"
    required=false
    ${disabledIndex === 1 || disabledIndex === 'all' ? 'disabled' : ''}
    ${checkedIndex === 1 ? 'checked' : ''}
  >
    <div slot="label">
      ${label} 2
    </div>
  </tds-radio-button>

  <tds-radio-button
    name="rb-example"
    value="option3"
    radio-id="option-3"
    required=false
    ${disabledIndex === 2 || disabledIndex === 'all' ? 'disabled' : ''}
    ${checkedIndex === 2 ? 'checked' : ''}
  >
    <div slot="label">
      ${label} 3
    </div>
  </tds-radio-button>

  </fieldset>

  <!-- Script tag for demo purposes: keeps the selected Radio Button checked
       across re-renders (e.g. when changing the disabled index) instead of
       snapping back, since tds-radio-button doesn't sync its checked prop on
       user interaction. -->
  <script>
  (function () {
    var GROUP = 'rb-example';
    var argIndex = ${checkedIndex === 'none' ? -1 : checkedIndex};

    // The "Checked index" control wins whenever it changes; otherwise keep the
    // user's last manual selection so unrelated re-renders don't reset it.
    if (window.__tdsRbArg !== argIndex) {
      window.__tdsRbArg = argIndex;
      window.__tdsRbSelected = argIndex;
    }

    function radios() {
      return Array.prototype.slice.call(
        document.querySelectorAll('tds-radio-button[name="' + GROUP + '"]')
      );
    }

    function applySelection() {
      radios().forEach(function (el, index) {
        el.checked = index === window.__tdsRbSelected;
      });
    }

    // Remember manual selections made directly in the preview.
    if (!window.__tdsRbBound) {
      window.__tdsRbBound = true;
      document.addEventListener('tdsChange', function (event) {
        console.log(event);
        var id = event.detail && event.detail.radioId;
        var index = radios().findIndex(function (el) {
          return el.getAttribute('radio-id') === id;
        });
        if (index !== -1) {
          window.__tdsRbSelected = index;
        }
      });
    }

    customElements.whenDefined('tds-radio-button').then(applySelection);
  })();
  </script>
  `);

export const Default = Template.bind({});
