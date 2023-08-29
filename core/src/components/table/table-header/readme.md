# tds-table-header-row



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default |
| ------------- | -------------- | ----------- | --------- | ------- |
| `allSelected` | `all-selected` |             | `boolean` | `false` |


## Events

| Event          | Description                                                       | Type                                                                       |
| -------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `tdsSelectAll` | Event emitted when the status of the select all checkbox changes. | `CustomEvent<{ tableId: string; checked: boolean; selectedRows: any[]; }>` |


## Slots

| Slot          | Description                                |
| ------------- | ------------------------------------------ |
| `"<default>"` | <b>Unnamed slot.</b> For the header cells. |


## Dependencies

### Depends on

- [tds-checkbox](../../checkbox)

### Graph
```mermaid
graph TD;
  tds-table-header --> tds-checkbox
  style tds-table-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
