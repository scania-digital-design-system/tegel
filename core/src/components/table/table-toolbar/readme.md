# sdds-table-toolbar



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                  | Type      | Default |
| ----------------- | ------------------ | ---------------------------- | --------- | ------- |
| `enableFiltering` | `enable-filtering` | Enables preview of searchbar | `boolean` | `false` |
| `tableTitle`      | `table-title`      | Adds title to the table      | `string`  | `''`    |


## Events

| Event              | Description                                                                                                                             | Type                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `sddsFilterChange` | Used for sending users input to main parent <sdds-table> component, can also be listened to in order to implement custom sorting logic. | `CustomEvent<{ tableId: string; query: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
