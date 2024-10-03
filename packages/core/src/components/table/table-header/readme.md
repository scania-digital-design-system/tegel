# tds-table-header-row



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                                 | Type      | Default     |
| --------------- | --------------- | ------------------------------------------------------------------------------------------- | --------- | ----------- |
| `allSelected`   | `all-selected`  | <span style="color:red">**[DEPRECATED]**</span> Deprecated, use selected instead.<br/><br/> | `boolean` | `false`     |
| `disabled`      | `disabled`      | Prop for controlling the enabled/disabled state of the "All selected"-checkbox.             | `boolean` | `false`     |
| `indeterminate` | `indeterminate` | Prop for controlling the indeterminate state of the "All selected"-checkbox.                | `boolean` | `false`     |
| `selected`      | `selected`      | Prop for controlling the checked/unchecked state of the "All selected"-checkbox.            | `boolean` | `undefined` |


## Events

| Event          | Description                                                       | Type                                                                       |
| -------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `tdsSelectAll` | Event emitted when the status of the select all checkbox changes. | `CustomEvent<{ tableId: string; checked: boolean; selectedRows: any[]; }>` |


## Slots

| Slot          | Description                                |
| ------------- | ------------------------------------------ |
| `"<default>"` | <b>Unnamed slot.</b> For the header cells. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
