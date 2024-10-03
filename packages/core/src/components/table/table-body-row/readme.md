# tds-table-body-row



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                            | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------ | --------- | ------- |
| `disabled` | `disabled` | Marks the row as disabled, used for multiselect table. | `boolean` | `false` |
| `selected` | `selected` | Marks the row as selected, used for multiselect table. | `boolean` | `false` |


## Events

| Event       | Description                                      | Type                                                                       |
| ----------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| `tdsSelect` | Event emitted when a row is selected/deselected. | `CustomEvent<{ tableId: string; checked: boolean; selectedRows: any[]; }>` |


## Slots

| Slot          | Description                         |
| ------------- | ----------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For the cells. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
