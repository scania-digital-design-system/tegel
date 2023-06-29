# tds-side-menu



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

| Slot             | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| `"UNNAMED-SLOT"` | Used for nesting upper/top content in Side menu                                        |
| `"close-button"` | Used for injection of tds-side-menu-close-button that is show when in mobile view      |
| `"end"`          | Used for items that are presented at the bottom of the side menu, eg. profile settings |
| `"overlay"`      | Used of injection of tds-side-menu-overlay                                             |
| `"sticky-end"`   | Used for tds-side-menu-collapse-button component                                       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
