# sdds-dropdown-option-v2



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                    | Type      | Default     |
| ---------- | ---------- | ------------------------------ | --------- | ----------- |
| `disabled` | `disabled` | Sets the option as disabled.   | `boolean` | `false`     |
| `value`    | `value`    | Value for the Dropdown option. | `string`  | `undefined` |


## Events

| Event        | Description                          | Type                                                 |
| ------------ | ------------------------------------ | ---------------------------------------------------- |
| `sddsBlur`   | Blur event for the Dropdown option.  | `CustomEvent<FocusEvent>`                            |
| `sddsFocus`  | Focus event for the Dropdown option. | `CustomEvent<FocusEvent>`                            |
| `sddsSelect` | Click event for the Dropdown option. | `CustomEvent<{ selected: boolean; value: string; }>` |


## Methods

### `setSelected(selected: boolean) => Promise<void>`

Method to select/deselect an option if the option is not disabled.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [sdds-checkbox](../../checkbox)
- [tds-icon](../../icon)

### Graph
```mermaid
graph TD;
  sdds-dropdown-option-v2 --> sdds-checkbox
  sdds-dropdown-option-v2 --> tds-icon
  style sdds-dropdown-option-v2 fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
