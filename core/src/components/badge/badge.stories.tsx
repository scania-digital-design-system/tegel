import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    layout: 'centered',
    notes: readme,
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7477%3A297479&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7477%3A297479&t=rVXuTOgTmXPauyHd-1',
      },
    ],
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

const Template = ({ value, size, hidden, demoCode }) =>
  formatHtmlPreview(
    `
    ${demoCode
      ? `<style>
    /* Note: Demo classes used here are just for demo purposes in Storybook */
    .badge-demo-box {
      margin:5px;
      height: 32px;
      width: 32px;
      position: relative;
      background-color: #C4C4C4;
    }

    .badge-demo-box tds-badge[size="lg"]{
      position: absolute;
      left: 16px;
      top: -5px;
    }

    .badge-demo-box tds-badge[size="sm"]{
      position: absolute;
      left: 26px;
      top: -2px;
    }
    </style>`
      : ''
    }

    <div class="${demoCode ? 'badge-demo-box' : ''}">
      <tds-badge
        ${value ? `value="${value}"` : ''}
        ${hidden ? 'hidden' : ''}
        size="${size}">
      </tds-badge>
    </div>`,
  );

export const Badge = Template.bind({});
