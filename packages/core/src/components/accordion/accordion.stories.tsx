import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import readmeItem from './accordion-item/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: `${ComponentsFolder}/Accordion`,
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
    iconPosition: {
      name: 'Expand icon position',
      description: 'Sets the horizontal position of the expand icon.',
      control: {
        type: 'radio',
      },
      options: { End: 'end', Start: 'start' },
      table: {
        defaultValue: { summary: 'end' },
      },
    },
    paddingReset: {
      name: 'Less padding right',
      description: 'Sets less padding on the right inside Accordion Items.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disable all items',
      description: 'Disables all Accordion Items.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    hideLastBorder: {
      name: 'Hide last border',
      description: 'Removes the bottom border of the last Accordion item.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    animation: {
      name: 'Animation',
      description: 'Sets the animation type for the Accordion.',
      control: {
        type: 'radio',
      },
      options: { None: 'none', Slide: 'slide' },
      table: {
        defaultValue: { summary: 'slide' },
      },
    },
  },
  parameters: {
    notes: { 'Accordion': readme, 'Accordion Item': readmeItem },
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2762%3A84&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=2762%3A84&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  args: {
    modeVariant: 'Inherit from parent',
    iconPosition: 'end',
    paddingReset: false,
    disabled: false,
    hideLastBorder: false,
    animation: 'none',
  },
};

const Template = ({
  disabled,
  iconPosition,
  paddingReset,
  modeVariant,
  hideLastBorder,
  animation,
}) => {
  const affixAttr = iconPosition === 'start' ? 'expand-icon-position="start"' : '';
  const disabledAttr = disabled ? 'disabled' : '';
  const paddingResetAttr = paddingReset ? 'padding-reset' : '';
  const hideLastBorderAttr = hideLastBorder ? 'hide-last-border' : '';

  return formatHtmlPreview(`
    <tds-accordion ${
      modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
    } ${hideLastBorderAttr} animation="${animation}">
      <tds-accordion-item header="First item" ${affixAttr} ${disabledAttr} ${paddingResetAttr}>
        This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header.
        Lorem ipsum doler sit amet.
      </tds-accordion-item>
      <tds-accordion-item ${affixAttr} ${disabledAttr} ${paddingResetAttr} expanded>
        <div slot="header">Second item</div>
        This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet vestibulum fermentum.
      </tds-accordion-item>
    </tds-accordion>

    <!-- Script tag for demo purposes -->
  <script>
    accordionItems = document.querySelectorAll('tds-accordion-item');
    for (let i = 0; i < accordionItems.length; i++) {
      accordionItems[i].addEventListener('tdsToggle',(event) => {
        console.log(event)
      })
    }
  </script>`);
};

export const Default = Template.bind({});
