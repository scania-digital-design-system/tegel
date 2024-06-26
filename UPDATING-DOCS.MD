# Updating the documentation

## Component example

Documentation is a crucial part of the development process. It helps developers understand how to use the components, its props, methods, slots and custom events. To ease the process of updating the documentation, consider the following scenario where the Dropdown component is used as an example:

When working with the `dropdown.tsx` and `dropdown.stories.tsx` files, developers should consider updating or writing documentation in the following scenarios:

1. **Adding New Features or Props**: Whenever new properties (like `multiselect`, `filter`, etc.) are added or existing ones are modified in `dropdown.tsx`, it's crucial to update the documentation to explain these properties, their purpose, and how to use them. This includes updating the comments in the code to reflect the changes and ensuring that the Storybook (`dropdown.stories.tsx`) examples demonstrate the new features effectively.

2. **Behavioral Changes**: If changes are made to how the Dropdown behaves (e.g., how it handles opening directions, multiselect logic, etc.), this should be clearly documented. The Storybook stories should be updated or new ones added to showcase these changes.

3. **Bug Fixes**: After fixing a bug, the documentation should be reviewed to ensure that it didn't previously contain incorrect information that led to misuse of the component. If the bug fix changes how users should interact with the Dropdown, this should be reflected in the documentation.

4. **Refactoring**: Even if the external API doesn't change, significant refactoring should be accompanied by a review of the documentation to ensure it still accurately represents the code's functionality. Comments within the code (`dropdown.tsx`) should also be updated to reflect any new logic or changes in how the component works.

5. **Visual Changes**: Updates to styles or visual adjustments should be reflected in the Storybook (`dropdown.stories.tsx`) to provide a visual reference for the users of the design system. This helps in maintaining a reliable and up-to-date style guide.

6. **Accessibility Changes**: If changes are made to improve accessibility (like ARIA attributes, keyboard navigation, etc.), these should be documented both in the code and in the Storybook examples to guide developers on how to maintain accessibility standards when using the Dropdown.

In summary, documentation should be considered a living document that evolves alongside the codebase. It's essential for maintaining the usability and understandability of the components within the design system.

## Stencil auto-generates documentation for components

Stencil will automatically generate documentation for your components. This documentation is written in Markdown and can be found in folder of your component.

The documentation is generated based on the component's source code and the comments you add to the code. If you add a comment to a property in the component's source code, the documentation will be updated to include that property and its description. Same goes for the component's methods, custom events and slots.

If you need to provide additional documentation, you can add it in the `README.md` file above the lines for autogenerated documentation.

## Large system wide changes
In case of larger, system wide change, that affect integration and functionality, the documentation should be updated accordingly. This is typically done in one of the main `README.md` files of the design system, its NPM package or in the Intro section of the Storybook.
For changes like this, contact Tegel team members.

