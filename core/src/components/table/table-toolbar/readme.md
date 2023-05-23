# sdds-table-toolbar



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                  | Type      | Default |
| ----------------- | ------------------ | ---------------------------- | --------- | ------- |
| `enableFiltering` | `enable-filtering` | Enables preview of searchbar | `boolean` | `false` |
| `tableTitle`      | `table-title`      | Adds title to the Table      | `string`  | `''`    |


## Events

| Event              | Description                                                                                                                                      | Type                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `sddsFilterChange` | Used for sending users' input to the main parent <sdds-table> the component, can also be listened to in order to implement custom sorting logic. | `CustomEvent<{ tableId: string; query: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
