# sdds-dropdown-option-v2



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                    | Type      | Default     |
| ---------- | ---------- | ------------------------------ | --------- | ----------- |
| `disabled` | `disabled` | Sets the option as disabled.   | `boolean` | `false`     |
| `value`    | `value`    | Value for the dropdown option. | `string`  | `undefined` |


## Events

| Event        | Description                          | Type                                                 |
| ------------ | ------------------------------------ | ---------------------------------------------------- |
| `sddsBlur`   | Blur event for the dropdown option.  | `CustomEvent<FocusEvent>`                            |
| `sddsFocus`  | Focus event for the dropdown option. | `CustomEvent<FocusEvent>`                            |
| `sddsSelect` | Click event for the dropdown option. | `CustomEvent<{ selected: boolean; value: string; }>` |


## Methods

### `setSelected(selected: boolean) => Promise<void>`

Method to select/deselect an option if the option is not disabled.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [sdds-checkbox](../../checkbox)
- [sdds-icon](../../icon)

### Graph
```mermaid
graph TD;
  sdds-dropdown-option-v2 --> sdds-checkbox
  sdds-dropdown-option-v2 --> sdds-icon
  style sdds-dropdown-option-v2 fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
