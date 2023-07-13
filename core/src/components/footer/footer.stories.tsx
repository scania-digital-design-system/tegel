import { formatHtmlPreview } from '../../utils/utils';
import { ComponentsFolder } from '../../utils/constants';
import readme from './readme.md';
import readmeItem from './footer-item/readme.md';
import readmeLinkGroup from './footer-group/readme.md';

export default {
  title: `${ComponentsFolder}/Footer`,
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
      <div class="tds-u-p3 ">
        <div class="tds-body-01">
          Resize the window to see how the Footer behaves on smaller/bigger screens.
        </div>
      </div>
    </main>
    <tds-footer
    ${modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''}
    >
      ${
        topPart
          ? `
      <div slot="top">
        <tds-footer-group title-text="Title">
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group title-text="Title">
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group title-text="Title">
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>

        <tds-footer-group title-text="Title">
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>
      </div>
      `
          : ''
      }
      <div slot="start">
        <tds-footer-group>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> Link text</a>
          </tds-footer-item>
        </tds-footer-group>
      </div>
      <div slot="end">
        <tds-footer-group>
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck"></tds-icon></a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck"></tds-icon></a>
          </tds-footer-item>
          <tds-footer-item >
            <a href="#"> <tds-icon name="truck"></tds-icon></a>
          </tds-footer-item>
        </tds-footer-group>
      </div>
    </tds-footer>
  
  `,
  );

export const Default = Template.bind({});
