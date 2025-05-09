export default {
  title: 'Migration/From Components v4',
  parameters: {
    docs: {
      description: {
        component: `
# Migration Docs

This document aims to include all the breaking changes when migrating from @scania/components version 4 to @scania/tegel.

## Deprecation of CSS class components

In @scania/tegel, we have replaced all "CSS components" with web components. As a result, every component previously available as a "CSS component" (made with CSS classes) in @scania/components now has a web component equivalent in @scania/tegel. It's important to note that this change does not impact the existing @scania/components package.

Our switch to web components should not be limiting you. In case you do find that a web component is limiting you from achieving what your designer has designed, please reach out to us through our support channel and let us know.

## Event name convention

This change affects all components.

Previously we have not had a set naming convention for our events. This has led to misalignment between
components where some events has had a \`custom\` prefix, and others have had other ways of indicating whether
or not it is a custom event. We have now settled on a naming convention for all events.
Both **external**, events we expect you as a user to interact with, and **internal**, events that are used within
our components to update state/react to changes.

## Slot name convention

For @scania/tegel we have taken another look at the naming convention of our slot names. With this we discovered
a number on inconsistencies. To align on this we have now decided on a naming convention that goes for all of our
named slot.

The slot should always be named to represent its position/use case. This could for example be 'bottom', 'label' or
'suffix'.

These components have been updated:

- Accordion
- Button
- Card
- Checkbox
- Chip
- Dropdown
- Footer
- Header
- Message
- Modal
- Radio Button
- Side Menu
- Stepper
- Table
- Text Field
- Toast
- Toggle

#### What action is required?

Make sure all slots that are being used follow the convention.

## Prefix change

Furthermore we decided to rename the previously used 'sdds'-prefix to 'tds'.
This occurred as a result of a deliberate choice to facilitate the transition to the new Tegel package and prevent conflicts with previously used components.

In short, before the prefix change:

- Web component names are named with 'sdds-' + component name. ('sdds-badge')
- External events are named: 'sdds' + native event name. ('sddsClick', 'sddsChange')
- Internal events are named: 'internalsdds' + event name. ('internalsddsTablePropsChange', 'internalsddsCheckboxChange')

Now, after prefix change:

- Web component names are named with 'tds-' + component name ('tds-badge')
- External events are named: 'tds' + native event name. ('tdsClick', 'tdsChange')
- Internal events are named: 'internaltds' + event name. ('internaltdsTablePropsChange', 'internaltdsCheckboxChange')

You can read more about naming in our code conventions [here](https://github.com/scania-digital-design-system/tegel/blob/main/.github/CODE_STYLE.md).

## Removed base font-size and moved to \`px\` instead of \`rem\`.

This change affects all components/typography/spacing/grid.

In the past we have used a base value of 4px
that has been used to calculate the spacing/padding/margins etc with rem. This was done by setting the
base value (4px) as the font-size on the \`<html>\`-element, which for some users has caused error with
custom font-sizes. We have now removed these dependencies and are using pixels in our
components/spacing/typography/margins.

We are doing this to decrease the dependencies between our packages and we want to make sure the Tegel
can be used on its own.

#### What action is required?

If you are not currently utilizing \`rem\` in your project, this change ideally should not impact you directly. However, since it affects all components, utilities, and foundations, there is a possibility of encountering unforeseen issues. Resolving these problems will be our top priority to ensure a seamless transition to Tegel.

If you are however using \`rem\` in your project you would have to consider that the base value will no longer be \`4px\`.
This value will now by default be \`16px\`. So for the element in you project that are using rem these would have to be
recalculated.

## Dark mode and mode variants

We are introducing **dark mode** as an addition to our current **light mode**, as well as two mode variants — **primary** and **secondary** — to our codebase. This will require changes to the classes and properties used for styling components. It is important to note that the primary mode variant used to be referred to as "on-white" and the secondary mode variant as "on-grey-50" in light mode.

**Light mode primary** is designed for a **white** background, while **secondary** is designed for a **grey-50** background. Previously, **grey-50** was used as our primary color.

**Dark mode primary** is designed for a **grey-958** background, and **secondary** is designed for a **grey-900** background.

#### What action is required?

It is important to note that some components may have a different appearance due to these changes. The following components will now have a primary and secondary mode:

- Accordion
- Block
- Button
- Card
- Data-table
- Datetime
- Divider
- Dropdown
- Footer
- Message
- Tab
- Text Field
- Textarea

##### Changing mode

Mode is controlled on a top level, using class \`tds-mode-dark\` or \`tds-mode-light\` (light is default).

##### Changing mode variant

For all components, you can use the \`mode-variant\` prop to apply the mode variants, with \`primary\` or \`secondary\`
as valid input (primary is default). If no prop is given, the component is going to inherit the mode variant from its parent.

To switch between the different modes and mode variants, simply use the appropriate classes or properties in your code.

These changes are also planned for the UI kit in Figma.
        `,
      },
    },
  },
};

export const Migration = () => {
  return `
    <div>
      <h2>Migration Documentation</h2>
      <p>Please refer to the documentation above for detailed information about migrating from @scania/components v4 to @scania/tegel.</p>
    </div>
  `;
};
