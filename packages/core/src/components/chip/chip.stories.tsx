import formatHtmlPreview from '../../stories/formatHtmlPreview';

export default {
  title: 'Components/Chip',
  parameters: {
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  argTypes: {
    inputType: {
      name: 'Type',
      description: 'Sets the Chip type.',
      control: {
        type: 'radio',
      },
      options: ['Button', 'Radio', 'Checkbox'],
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the Chip size.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: { summary: 'Large' },
      },
    },
    label: {
      name: 'Label text',
      description: 'Sets the label of the component.',
      control: {
        type: 'text',
      },
    },
    icon: {
      name: 'Icon',
      description: 'Adds an icon to the component.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    iconPosition: {
      name: 'Icon Position',
      description: 'Sets the icon position.',
      if: { arg: 'icon', eq: true },
      control: {
        type: 'radio',
      },
      options: ['Prefix', 'Suffix'],
      table: {
        defaultValue: { summary: 'Prefix' },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the checkbox.',
      control: {
        type: 'boolean',
      },
      table: {
        // TODO: Remove line below after we make design for disabled state, it hides control
        defaultValue: { summary: false },
      },
    },
    tdsAriaLabel: {
      name: 'Aria Label',
      description: 'Sets the aria-label of the component.',
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'A chip component' },
      },
    },
  },
  args: {
    inputType: 'Button',
    size: 'Large',
    label: 'Label',
    icon: false,
    iconPosition: 'Prefix',
    disabled: false,
    tdsAriaLabel: 'A chip component',
  },
};

const Template = ({ inputType, size, label, icon, iconPosition, disabled, tdsAriaLabel }) => {
  const sizeLookUp = {
    Large: 'lg',
    Small: 'sm',
  };

  const disabledAttribute = disabled ? ' disabled' : '';

  return formatHtmlPreview(`
  ${
    inputType === 'Button'
      ? `<tds-chip type="button" size="${
          sizeLookUp[size]
        }"${disabledAttribute} tds-aria-label="${tdsAriaLabel}">        
            ${
              icon && iconPosition === 'Prefix'
                ? '<tds-icon slot="prefix" name="star" size="16px"></tds-icon>'
                : ''
            }           
            <span slot="label">                
                ${label}                
            </span>         
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            }          
        </tds-chip>

        <!-- Script tag for demo purposes -->
        <script>
          document.addEventListener('tdsClick', (event)=>{
          console.log(event)
          })
        </script>`
      : ''
  }
  ${
    inputType === 'Checkbox'
      ? ` <style>
      /* demo-wrapper and demo-styles is for demonstration purposes only */
      .demo-wrapper {
        display: flex;
        gap: 8px;
      }
      label {
        margin: 8px;
      }
    </style>

    <label id="group-1">Group 1</label>
    <div class="demo-wrapper">
      <div role="group" aria-labelledby="group-1">
        <tds-chip type="checkbox"  size="${
          sizeLookUp[size]
        }" checked ${disabledAttribute} value="checkbox-1-value" tds-aria-label="Label 1">        
            ${
              icon && iconPosition === 'Prefix'
                ? '<tds-icon slot="prefix" name="heart" size="16px"></tds-icon>'
                : ''
            }
            <span slot="label">
              ${label} 1
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            }        
        </tds-chip>
        <tds-chip type="checkbox" size="${
          sizeLookUp[size]
        }" value="checkbox-2-value" tds-aria-label="Label 2">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="email" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 2
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
        <tds-chip type="checkbox" size="${
          sizeLookUp[size]
        }" value="checkbox-3-value" tds-aria-label="Label 3">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="smartphone" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 3
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
      </div>
    </div>

    <!-- Script tag for demo purposes -->
    <script>
      document.addEventListener('tdsChange', (event)=>{
          console.log(event)
      })
    </script>`
      : ''
  }
  ${
    inputType === 'Radio'
      ? ` <style>
      /* demo-wrapper and demo-styles is for demonstration purposes only */
      .demo-wrapper {
        display: flex;
        gap: 8px;
      }
      .demo-wrapper:first-of-type {
        margin-bottom: 8px;
      }
      label {
        margin: 8px;
      }
    </style>

    <label id="group-1">Group 1</label>
    <div class="demo-wrapper">
      <div role="group" aria-labelledby="group-1">
        <tds-chip name="group1" type="radio" size="${
          sizeLookUp[size]
        }" checked ${disabledAttribute} value="radio-1-value" tds-aria-label="Label 1">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="sorting" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 1
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
        <tds-chip name="group1" type="radio" size="${
          sizeLookUp[size]
        }" value="radio-2-value" tds-aria-label="Label 2">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="cart" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 2
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
        <tds-chip name="group1" type="radio" size="${
          sizeLookUp[size]
        }" value="radio-3-value" tds-aria-label="Label 3">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="star" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 3
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
      </div>
    </div>
    <label id="group-2">Group 2</label>
    <div class="demo-wrapper">
      <div role="group" aria-labelledby="group-2">
        <tds-chip name="group2" type="radio" size="${
          sizeLookUp[size]
        }" checked ${disabledAttribute} value="radio-1-value" tds-aria-label="Label 1">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="sorting" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 1
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
        <tds-chip name="group2" type="radio" size="${
          sizeLookUp[size]
        }" value="radio-2-value" tds-aria-label="Label 2">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="cart" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 2
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
        <tds-chip name="group2" type="radio" size="${
          sizeLookUp[size]
        }" value="radio-3-value" tds-aria-label="Label 3">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon slot="prefix" name="star" size="16px"></tds-icon>'
              : ''
          }
            <span slot="label">
              ${label} 3
            </span>
            ${
              icon && iconPosition === 'Suffix'
                ? '<tds-icon slot="suffix" name="cross" size="16px"></tds-icon>'
                : ''
            } 
        </tds-chip>
      </div>
    </div>

    <!-- Script tag for demo purposes -->
    <script>
      document.addEventListener('tdsChange', (event)=>{
          console.log(event)
      })
    </script>`
      : ''
  }


  `);
};

export const Default = Template.bind({});
