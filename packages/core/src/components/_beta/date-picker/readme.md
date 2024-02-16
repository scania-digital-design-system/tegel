# Date Picker Component

This document outlines the current status and development roadmap for the Date Picker component. The component is under development, and the following items are categorized into "To Do" and "Done" to provide clarity on the progress.

## To Do

- Review and align design.
- UX questions: What happens when I click a date in the next month, should the dates be updated to reflect the selected date month?
- Locales - date-fns have support for locales, we need to see which are available and expose the available options as a prop on the component.
- Can the start/selected date be null?
- Make sure all available props in Date Picker are available in Date Range Picker.
- Enable slots?
- What data should be submitted in a form?
- The focus state of the next/previous buttons?
- When should the Date Picker close? Only on click outside? What if you click the Date Picker and then click the input field.
- The Date Picker needs further control of the popover, it should open when you click the input field. But it should not close when the input field is clicked if the Date Picker is opened. I do not think this is possible with the implementation of the popover we have today.

## Done

- Error state - prop to set the error state to true and slot to allow for users to pass in an error message.
- Success state - prop to set the error state to true and slot to allow for users to pass in a success message.
- Label & label position props.
- Min/Max props.
- Disable same date selection.
- Something buggy with choosing a date a couple of months ahead.

Please note that this component is currently under development, and the features or functionalities listed above are subject to change as we progress.

## Important
- Evaluate if we would like to add this component as it uses 3rd party package that adds 1MB extra on bundle size.