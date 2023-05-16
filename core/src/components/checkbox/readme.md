# sdds-checkbox



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                               | Type      | Default               |
| ------------ | ------------- | ------------------------------------------------------------------------- | --------- | --------------------- |
| `checkboxId` | `checkbox-id` | ID for the checkbox's input element. Randomly generated if not specified. | `string`  | `crypto.randomUUID()` |
| `checked`    | `checked`     | Sets the Checkbox as checked                                              | `boolean` | `false`               |
| `disabled`   | `disabled`    | Sets the Checkbox in a disabled state                                     | `boolean` | `false`               |
| `name`       | `name`        | Name for the checkbox's input element.                                    | `string`  | `undefined`           |
| `required`   | `required`    | Make the Checkbox required                                                | `boolean` | `false`               |
| `value`      | `value`       | Value for the Checkbox                                                    | `string`  | `undefined`           |


## Events

| Event        | Description                                                                       | Type                                                                     |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `sddsBlur`   | Blur event for the Checkbox                                                       | `CustomEvent<FocusEvent>`                                                |
| `sddsChange` | Sends unique Checkbox identifier and checked status when it is checked/unchecked. | `CustomEvent<{ checkboxId: string; checked: boolean; value?: string; }>` |
| `sddsFocus`  | Focus event for the Checkbox                                                      | `CustomEvent<FocusEvent>`                                                |


## Methods

### `toggleCheckbox() => Promise<{ checkboxId: string; checked: boolean; }>`

Toggles the checked value of the component.

#### Returns

Type: `Promise<{ checkboxId: string; checked: boolean; }>`




## Dependencies

### Used by

 - [sdds-dropdown-option](../dropdown/dropdown-option)
 - [sdds-dropdown-option-v2](../dropdown-v2/dropdown-option-v2)
 - [sdds-table-body-row](../data-table/table-body-row)
 - [sdds-table-header](../data-table/table-header)

### Graph
```mermaid
graph TD;
  sdds-dropdown-option --> sdds-checkbox
  sdds-dropdown-option-v2 --> sdds-checkbox
  sdds-table-body-row --> sdds-checkbox
  sdds-table-header --> sdds-checkbox
  style sdds-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
