import formatHtmlPreview from '../../stories/formatHtmlPreview';

import { iconsNames as scaniaIconsNames } from './scaniaIconsArray';
import { iconsNames as tratonIconsNames } from './tratonIconsArray';

// Brand mapping configuration
const brandIconsMap = {
  scania: scaniaIconsNames,
  traton: tratonIconsNames,
  // Add new brands here as needed
};

export default {
  title: 'Components/Icon',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9119%3A315952&t=Ne6myqwca5m00de7-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9119%3A315952&t=Ne6myqwca5m00de7-1',
      },
    ],
  },
  argTypes: {
    brand: {
      name: 'Brand',
      description: 'Select the brand to use',
      control: {
        type: 'radio',
      },
      options: ['Scania', 'Traton'],
      table: {
        defaultValue: { summary: 'Scania' },
      },
    },
    scaniaIcon: {
      name: 'Icon name (Scania)',
      description: `Select icon to display (Scania brand - ${scaniaIconsNames.length} icons available)`,
      control: {
        type: 'select',
      },
      options: scaniaIconsNames,
      if: { arg: 'brand', eq: 'Scania' },
    },
    tratonIcon: {
      name: 'Icon name (Traton)',
      description: `Select icon to display (Traton brand - ${tratonIconsNames.length} icons available)`,
      control: {
        type: 'select',
      },
      options: tratonIconsNames,
      if: { arg: 'brand', eq: 'Traton' },
    },
    size: {
      name: 'Size in pixels',
      description: 'Set the size of the Icon',
      control: {
        type: 'select',
      },
      options: [16, 20, 24, 32],
    },
    svgTitle: {
      name: 'SVG title',
      description: 'Text that displays while hovering on icon.',
      control: {
        type: 'text',
      },
    },
    svgDescription: {
      name: 'SVG description',
      description: 'Optional long-text description of SVG icon.',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    brand: 'Scania',
    scaniaIcon: scaniaIconsNames[0],
    tratonIcon: tratonIconsNames[0],
    size: 32,
    svgTitle: '',
    svgDescription: '',
  },
};

const IconTemplate = (args) => {
  // Get the appropriate icon based on the selected brand
  const selectedIcon = args.brand === 'Traton' ? args.tratonIcon : args.scaniaIcon;
  const currentBrand = args.brand.toLowerCase();

  return formatHtmlPreview(`
  <div data-brand="${currentBrand}">
    <div style="background: #e3f2fd; border: 1px solid #bbdefb; padding: 12px; margin-bottom: 16px; border-radius: 4px; font-size: 14px;">
      <strong>Selected Brand:</strong> ${args.brand}
      (${brandIconsMap[currentBrand].length} icons available)
    </div>
    <tds-icon
      name="${selectedIcon}"
      size="${`${args.size.toString()}px`}"
      ${args.svgTitle ? `svg-title='${args.svgTitle}'` : ''}
      ${args.svgDescription ? `svg-description='${args.svgDescription}'` : ''}
      >
    </tds-icon>
  </div>
  `);
};

export const Default = IconTemplate.bind({});
