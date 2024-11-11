# tds-table-header-cell



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                             | Type                                                | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------- |
| `cellKey`        | `cell-key`        | The value of column key, usually comes from JSON, needed for sorting                                    | `string`                                            | `undefined` |
| `cellValue`      | `cell-value`      | Text that displays in column cell                                                                       | `string`                                            | `undefined` |
| `customWidth`    | `custom-width`    | In case noMinWidth is set, the user has to specify the width value for each column.                     | `string`                                            | `undefined` |
| `disablePadding` | `disable-padding` | Disables internal padding. Useful when passing other components to cell.                                | `boolean`                                           | `false`     |
| `sortable`       | `sortable`        | Enables sorting on that column                                                                          | `boolean`                                           | `false`     |
| `textAlign`      | `text-align`      | Setting for text align, default is "left". Other accepted values are "left", "start", "right" or "end". | `"center" \| "end" \| "left" \| "right" \| "start"` | `'left'`    |


## Events

| Event     | Description                                                                                                                                              | Type                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `tdsSort` | Sends unique Table identifier, column key and sorting direction to the tds-table-body component, can also be listened to implement custom-sorting logic. | `CustomEvent<{ tableId: string; columnKey: string; sortingDirection: "desc" \| "asc"; }>` |


## Slots

| Slot          | Description                                 |
| ------------- | ------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For the cell contents. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
