import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Link`,
  parameters: {
    notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2147%3A99321&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2147%3A99321&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    underline: {
      name: 'Underline',
      description: 'Adds an underline under the Link text.',
      controls: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Link.',
      controls: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    underline: true,
    disabled: false,
  },
};

const Template = ({ underline, disabled }) =>
  formatHtmlPreview(
    `
    <p class='tds-body-02'>The <tds-link
        ${disabled ? 'disabled' : ''}
        ${underline ? '' : 'underline="false"'}
        >
        <a href="https://tegel.scania.com/home" target='_blank'>Tegel</a>
    </tds-link> Design System is for digital products and services at Scania.
     It enables an efficient development process and ensures a premium experience across all of Scania's digital touchpoints.    
    </p>  
  `,
  );
export const Default = Template.bind({});
