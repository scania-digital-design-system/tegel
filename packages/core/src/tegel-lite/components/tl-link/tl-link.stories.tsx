import formatHtmlPreview from '../../../stories/formatHtmlPreview';
import { iconsNames } from '../../../components/icon/iconsArray';

//Reorder of iconsNames to have download and redirect first for UX reasons
const orderedIconsNames = [...iconsNames].sort((a, b) => {
  if (a === 'download' || a === 'placeholder') return -1;
  if (b === 'download' || b === 'placeholder') return 1;
  return 0;
});

export default {
  title: 'Tegel Lite/Link',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    underline: {
      name: 'Underline',
      description: 'Adds an underline under the Link text.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the Link.',
      control: {
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

//Standalone Link
const standaloneLinkTemplate = ({ disabled, underline, iconEnabled, icon }) => {
  const underlineClass = underline ? 'tl-link--underline' : '';
  const disabledClass = disabled ? 'tl-link--disabled' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-link.css"
      ${iconEnabled ? '"@scania/tegel-lite/tl-icon.css"' : ''}
    -->
    <a href="https://tegel.scania.com" target="_blank" class="tl-link tl-link--standalone ${underlineClass} ${disabledClass}">
      Tegel
      ${
        iconEnabled && icon
          ? `<span class="tl-link__icon"><span class="tl-icon tl-icon--${icon} tl-icon--16" aria-hidden="true"></span></span>`
          : ''
      }
    </a>
  `);
};

//Link within text
const linkWithinTextTemplate = ({ disabled, underline }) => {
  const underlineClass = underline ? 'tl-link--underline' : '';
  const disabledClass = disabled ? 'tl-link--disabled' : '';

  return formatHtmlPreview(`
    <!-- Required stylesheet 
      "@scania/tegel-lite/tl-link.css"
    -->
    <p class="tl-link-text">The 
      <a href="https://tegel.scania.com" target="_blank" class="tl-link ${underlineClass} ${disabledClass}">Tegel</a> 
      Design System is for digital products and services at Scania.
      It enables an efficient development process and ensures a premium experience across all of Scania's digital touchpoints.    
    </p>
  `);
};

// Standalone Link is the primary story. Named `Default` to match the
// convention used by every other component (Button, Checkbox, Toggle, …):
// the primary story is exported as `Default` so it leads the sidebar with the
// global alphabetical `storySort`, ahead of the auto-generated Docs/Notes pages.
export const Default = standaloneLinkTemplate.bind({});
Default.args = {
  underline: false,
  disabled: false,
  iconEnabled: true,
  icon: 'placeholder',
};

// Additional argTypes for Standalone Link only
Default.argTypes = {
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
      defaultValue: { summary: 'placeholder' },
    },
    if: { arg: 'iconEnabled', truthy: true },
  },
};

export const LinkWithinText = linkWithinTextTemplate.bind({});
LinkWithinText.args = {
  underline: true,
  disabled: false,
};
