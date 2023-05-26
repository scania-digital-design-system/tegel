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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
