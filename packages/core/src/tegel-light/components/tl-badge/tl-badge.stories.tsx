import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Badge',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Sets the size of the component.',
      control: {
        type: 'radio',
      },
      options: {
        Large: 'lg',
        Small: 'sm',
      },
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    value: {
      name: 'Value',
      description: 'Sets a value to show on the Badge.',
      control: {
        type: 'number',
      },
      if: { arg: 'size', neq: 'sm' },
    },
    hidden: {
      name: 'Hidden',
      description: 'Toggles visibility of the Badge.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    demoCode: {
      name: 'Demo code',
      description: 'Displays code example of component usage. Not part of component props.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    size: 'lg',
    value: 1,
    hidden: false,
    demoCode: false,
  },
};

const Template = ({ value, size, hidden, demoCode }) => {
  // Determine shape and text based on value and size
  let shape = '';
  let text = '';

  if (value && size !== 'sm') {
    const valueAsNumber = parseInt(value);
    if (!Number.isNaN(valueAsNumber)) {
      shape = valueAsNumber.toString().length >= 2 ? 'pill' : '';
      text = valueAsNumber.toString().length >= 3 ? '99+' : valueAsNumber.toString();
    }
  }

  const shapeClass = shape ? `tl-badge--pill` : '';
  const hiddenClass = hidden ? 'tl-badge--hidden' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheets:
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-badge.css"
    -->
    ${
      demoCode
        ? `<style>
    .tl-badge-demo-box {
      margin: 5px;
      height: 32px;
      width: 32px;
      position: relative;
      background-color: #C4C4C4;
    }

    .tl-badge-demo-box .tl-badge--lg {
      position: absolute;
      left: 16px;
      top: -5px;
    }

    .tl-badge-demo-box .tl-badge--sm {
      position: absolute;
      left: 26px;
      top: -2px;
    }
    </style>`
        : ''
    }

    ${demoCode ? `<div class="tl-badge-demo-box">` : ''}
      <div class="tl-badge tl-badge--${size} ${shapeClass} ${hiddenClass}">
        ${text ? `<span class="tl-badge__text" aria-hidden="true">${text}</span>` : ''}
      </div>
    ${demoCode ? '</div>' : ''}
  `);
};

export const Default = Template.bind({});
