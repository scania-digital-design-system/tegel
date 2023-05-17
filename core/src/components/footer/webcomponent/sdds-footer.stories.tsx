import { formatHtmlPreview } from '../../../utils/utils';
import readme from './readme.md';
import readmeItem from './sdds-footer-item/readme.md';
import readmeLinkGroup from './sdds-footer-group/readme.md';
import { ComponentsFolder } from '../../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    notes: { 'Footer': readme, 'Footer link group': readmeLinkGroup, 'Footer item': readmeItem },
    layout: 'fullscreen',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7568%3A298118&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=7568%3A298118&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    modeVariant: {
      name: 'Mode variant',
      description:
        'Mode variant adjusts component colors to have better visibility depending on global mode and background.',
      control: {
        type: 'radio',
      },
      options: ['Inherit from parent', 'Primary', 'Secondary'],
      table: {
        defaultValue: { summary: 'Inherit from parent' },
      },
    },
    topPart: {
      name: 'Top part',
      description: 'Adds the top part of the Footer with more links.',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    modeVariant: 'Inherit from parent',
    topPart: false,
  },
};

const Template = ({ topPart, modeVariant }) =>
  formatHtmlPreview(
    `
    <main>
      <div class="sdds-u-p3 ">
        <div class="sdds-body-01">
          Resize the window to see how the Footer behaves on smaller/bigger screens.
        </div>
      </div>
    </main>
    <sdds-footer
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    >
      ${
        topPart
          ? `
      <div slot="top">
        <sdds-footer-group title-text="Title">
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
        </sdds-footer-group>

        <sdds-footer-group title-text="Title">
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
        </sdds-footer-group>

        <sdds-footer-group title-text="Title">
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
        </sdds-footer-group>

        <sdds-footer-group title-text="Title">
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
        </sdds-footer-group>
      </div>
      `
          : ''
      }
      <div slot="main-left">
        <sdds-footer-group>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> Link text</a>
          </sdds-footer-item>
        </sdds-footer-group>
      </div>
      <div slot="main-right">
        <sdds-footer-group>
          <sdds-footer-item >
            <a href="#"> <tds-icon name="truck"></tds-icon></a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> <tds-icon name="truck"></tds-icon></a>
          </sdds-footer-item>
          <sdds-footer-item >
            <a href="#"> <tds-icon name="truck"></tds-icon></a>
          </sdds-footer-item>
        </sdds-footer-group>
      </div>
    </sdds-footer>
  
  `,
  );

export const Footer = Template.bind({});
