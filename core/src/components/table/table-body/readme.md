# sdds-table-body



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                        | Type      | Default     |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------- | --------- | ----------- |
| `bodyData`        | `body-data`         | Prop to pass JSON string which enables automatic rendering of table rows and cells | `any`     | `undefined` |
| `enableDummyData` | `enable-dummy-data` | Prop for showcase of rendering JSON in body-data, just for presentation purposes   | `boolean` | `false`     |


## Dependencies

### Depends on

- [sdds-table-body-row](../table-body-row)
- [sdds-body-cell](../table-body-cell)

### Graph
```mermaid
graph TD;
  sdds-table-body --> sdds-table-body-row
  sdds-table-body --> sdds-body-cell
  sdds-table-body-row --> sdds-checkbox
  style sdds-table-body fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
