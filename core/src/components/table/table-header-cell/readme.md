# tds-table-header-cell



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                          | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------ | --------- | ----------- |
| `cellKey`     | `cell-key`     | The value of column key, usually comes from JSON, needed for sorting                 | `string`  | `undefined` |
| `cellValue`   | `cell-value`   | Text that displays in column cell                                                    | `string`  | `undefined` |
| `customWidth` | `custom-width` |                                                                                      | `string`  | `undefined` |
| `sortable`    | `sortable`     | Enables sorting on that column                                                       | `boolean` | `false`     |
| `textAlign`   | `text-align`   | Setting for text align, default is left. Other accepted values are "right" or "end". | `string`  | `undefined` |


## Events

| Event     | Description                                                                                                                                                          | Type                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `tdsSort` | Sends unique Table identifier, column key and sorting direction to the tds-table-body component, can also be listened to in order to implement custom-sorting logic. | `CustomEvent<{ tableId: string; columnKey: string; sortingDirection: "desc" \| "asc"; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
