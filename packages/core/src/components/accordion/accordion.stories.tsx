import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Accordion',
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

const Template = ({
  disabled,
  iconPosition,
  paddingReset,
  modeVariant,
  hideLastBorder,
  ariaLevelValue,
}) => {
  const affixAttr = iconPosition === 'start' ? 'expand-icon-position="start"' : '';
  const disabledAttr = disabled ? 'disabled' : '';
  const paddingResetAttr = paddingReset ? 'padding-reset' : '';
  const hideLastBorderAttr = hideLastBorder ? 'hide-last-border' : '';
  const ariaLevelValueAttr = `aria-level="${ariaLevelValue}"`;

  return formatHtmlPreview(`
    <tds-accordion ${
      modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
    } ${hideLastBorderAttr}>
      <tds-accordion-item header="First item" ${ariaLevelValueAttr} ${affixAttr} ${disabledAttr} ${paddingResetAttr}>
        This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header.
        Lorem ipsum doler sit amet.
      </tds-accordion-item>
      <tds-accordion-item ${ariaLevelValueAttr} ${affixAttr} ${disabledAttr} ${paddingResetAttr} expanded>
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
