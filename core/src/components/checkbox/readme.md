# tds-checkbox



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

| Event       | Description                                                                       | Type                                                                     |
| ----------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `tdsBlur`   | Blur event for the Checkbox                                                       | `CustomEvent<FocusEvent>`                                                |
| `tdsChange` | Sends unique Checkbox identifier and checked status when it is checked/unchecked. | `CustomEvent<{ checkboxId: string; checked: boolean; value?: string; }>` |
| `tdsFocus`  | Focus event for the Checkbox                                                      | `CustomEvent<FocusEvent>`                                                |


## Methods

### `toggleCheckbox() => Promise<{ checkboxId: string; checked: boolean; }>`

Toggles the checked value of the component.

#### Returns

Type: `Promise<{ checkboxId: string; checked: boolean; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
