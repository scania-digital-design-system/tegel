# Dropdown option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                      | Type      | Default     |
| ---------- | ---------- | ---------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | Sets option to disabled state if true                            | `boolean` | `false`     |
| `selected` | `selected` | Selected set to true if selected                                 | `boolean` | `false`     |
| `value`    | `value`    | Value is a unique string that will be used for application logic | `string`  | `undefined` |


## Dependencies

### Used by

 - [sdds-dropdown-filter](../dropdown-filter)

### Depends on

- [sdds-checkbox](../../checkbox)

### Graph
```mermaid
graph TD;
  sdds-dropdown-option --> sdds-checkbox
  sdds-dropdown-filter --> sdds-dropdown-option
  style sdds-dropdown-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
