import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';
import { iconsNames } from '../icon/iconsArray';

//Reorder of iconsNames to have download and redirect first for UX reasons
const orderedIconsNames = [...iconsNames].sort((a, b) => {
  if (a === 'download' || a === 'redirect') return -1;
  if (b === 'download' || b === 'redirect') return 1;
  return 0;
});

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
    iconEnabled: {
      name: 'Icon Enabled',
      description: 'Toggle to enable or disable the icon as suffix.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    icon: {
      name: 'Icon',
      description:
        'Sets icon to be displayed on the Link. Proposed icons are <code>download</code> and <code>redirect</code>.',
      control: {
        type: 'select',
      },
      options: orderedIconsNames,
      table: {
        defaultValue: { summary: 'download' },
      },
      if: { arg: 'iconEnabled', truthy: true },
    },
  },
  args: {
    underline: true,
    disabled: false,
    iconEnabled: false,
    icon: 'download',
  },
};

const generateLinkWithIcon = (disabled, underline, icon) => `
  <tds-link
    ${disabled ? 'disabled' : ''}
    ${underline ? '' : 'underline="false"'}
  >
    <a href="https://google.com" target='_blank'>Tegel
      <tds-icon name="${icon}" size="16px"></tds-icon>
    </a>     
  </tds-link>`;

const generateLinkWithoutIcon = (disabled, underline) => `
  <p class='tds-body-02'>The 
    <tds-link
      ${disabled ? 'disabled' : ''}
      ${underline ? '' : 'underline="false"'}    
    >
      <a href="https://google.com" target='_blank'>Tegel</a>     
    </tds-link> 
    Design System is for digital products and services at Scania.
    It enables an efficient development process and ensures a premium experience across all of Scania's digital touchpoints.    
  </p>`;

const Template = ({ underline, disabled, icon, iconEnabled }) =>
  formatHtmlPreview(
    iconEnabled
      ? generateLinkWithIcon(disabled, underline, icon)
      : generateLinkWithoutIcon(disabled, underline),
  );

export const Default = Template.bind({});
