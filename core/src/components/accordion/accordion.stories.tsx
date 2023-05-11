import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import readmeItem from './accordion-item/readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
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
  },
};

const Template = ({ disabled, iconPosition, paddingReset, modeVariant }) => {
  const affixAttr = iconPosition === 'start' ? 'expand-icon-position="start"' : '';
  const disabledAttr = disabled ? 'disabled' : '';
  const paddingResetAttr = paddingReset ? 'padding-reset' : '';

  return formatHtmlPreview(`
    <sdds-accordion ${
      modeVariant !== 'Inherit from parent' ? `mode-variant="${modeVariant.toLowerCase()}"` : ''
    }>
      <sdds-accordion-item header="First item" ${affixAttr} ${disabledAttr} ${paddingResetAttr}>
        This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header.
        Lorem ipsum doler sit amet.
      </sdds-accordion-item>
      <sdds-accordion-item ${affixAttr} ${disabledAttr} ${paddingResetAttr} expanded>
        <div slot="accordion-item-header">Second item</div>
        This is the panel, which contains associated information with the header. Usually it contains text, set in the same size as the header.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet vestibulum fermentum.
      </sdds-accordion-item>
    </sdds-accordion>

    <!-- Script tag for demo purposes -->
  <script>    
    accordionItems = document.querySelectorAll('sdds-accordion-item');
    for (let i = 0; i < accordionItems.length; i++) {
      accordionItems[i].addEventListener('sddsToggle',(event) => {
        console.log(event)
      })
    }
  </script>`);
};

export const Accordion = Template.bind({});
