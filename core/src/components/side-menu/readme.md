# tds-side-menu

### Side Menu is a component that consists of these sub-components:

 - side-menu-user-label
 - side-menu-user-image
 - side-menu-user
 - side-menu-overlay
 - side-menu-item
 - side-menu-dropdown
 - side-menu-dropdown-list
 - side-menu-dropdown-list-item
 - side-menu-collapse-button
 - side-menu-close-button

Some of the upper mentioned subcomponents are not listed under <i>Notes</i> tab
because either they are used only internally or they have no props or events but serve as wrappers.
Their purpose is to improve code readability and present hierarchy structure.

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                                                                                       | Type      | Default |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `collapsed`  | `collapsed`  | If the Side Menu is collapsed. Only a persistent desktop menu can be collapsed. NOTE: Only use this if you have prevented the automatic collapsing with preventDefault on the tds-Collapse event. | `boolean` | `false` |
| `open`       | `open`       | Applicable only for mobile. If the Side Menu is open or not.                                                                                                                                      | `boolean` | `false` |
| `persistent` | `persistent` | Applicable only for desktop. If the Side Menu should always be shown.                                                                                                                             | `boolean` | `false` |


## Events

| Event         | Description                                            | Type                                   |
| ------------- | ------------------------------------------------------ | -------------------------------------- |
| `tdsCollapse` | Event that is emitted when the Side Menu is collapsed. | `CustomEvent<{ collapsed: boolean; }>` |


## Slots

| Slot             | Description                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `"<default>"`    | <b>Unnamed slot.</b> Used for nesting main content of Side Menu, e.g. <code><tds-side-menu-item></code> and <code><tds-side-menu-dropdown></code> components |
| `"close-button"` | Used for injection of tds-side-menu-close-button that is show when in mobile view                                                                            |
| `"end"`          | Used for items that are presented at the bottom of the Side Menu, e.g. profile settings                                                                      |
| `"overlay"`      | Used of injection of tds-side-menu-overlay                                                                                                                   |
| `"sticky-end"`   | Used for tds-side-menu-collapse-button component                                                                                                             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
