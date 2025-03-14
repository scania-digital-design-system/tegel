import formatHtmlPreview from '../../stories/formatHtmlPreview';
import readme from './readme.md';
import readmeItem from './accordion-item/readme.md';

export default {
  title: `Tegel light (CSS)/Accordion`,
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
    ariaLevelValue: {
      name: 'ARIA heading level',
      description: 'Specifies the heading level for accessibility (1-6).',
      control: {
        type: 'radio',
      },
      options: ['1', '2', '3', '4', '5', '6'],
      table: {
        defaultValue: { summary: '6' },
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
    ariaLevelValue: '6',
  },
};

const Template = () => {
  return formatHtmlPreview(`
    <div class="tds-accordion">
  <input type="checkbox" id="tds-accordion-1" class="tds-accordion-input">
  <label for="tds-accordion-1" class="tds-accordion-header">Accordion Item 1</label>
  <div class="tds-accordion-content">
    <p>This is the content of the first accordion item.</p>
  </div>

  <input type="checkbox" id="tds-accordion-2" class="tds-accordion-input">
  <label for="tds-accordion-2" class="tds-accordion-header">Accordion Item 2</label>
  <div class="tds-accordion-content">
    <p>More details inside the second accordion.</p>
  </div>

  <input type="checkbox" id="tds-accordion-3" class="tds-accordion-input">
  <label for="tds-accordion-3" class="tds-accordion-header">Accordion Item 3</label>
  <div class="tds-accordion-content">
    <p>Another expandable section.</p>
  </div>
</div>`);
};

export const Default = Template.bind({});
