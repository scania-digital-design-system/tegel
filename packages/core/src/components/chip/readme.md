# tds-chip



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                                                                                                                                                                                                | Type                                | Default              |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | -------------------- |
| `checked`      | `checked`        | Controls component's checked attribute. Valid only for type checkbox and radio.                                                                                                                                                            | `boolean`                           | `false`              |
| `chipId`       | `chip-id`        | ID used for internal Chip functionality and events, must be unique.  **NOTE**: If you're listening for input events, you need to set this ID yourself to identify the input, as the default ID is random and will be different every time. | `string`                            | `generateUniqueId()` |
| `disabled`     | `disabled`       | Sets the Chip in a disabled state                                                                                                                                                                                                          | `boolean`                           | `false`              |
| `name`         | `name`           | Name for the checkbox or radio input element. Also creates a reference between label and input. Valid only for type checkbox and radio.                                                                                                    | `string \| undefined`               | `undefined`          |
| `size`         | `size`           | Size of the Chip component                                                                                                                                                                                                                 | `"lg" \| "sm"`                      | `'lg'`               |
| `tdsAriaLabel` | `tds-aria-label` | Value to be used for the aria-label attribute                                                                                                                                                                                              | `string \| undefined`               | `undefined`          |
| `type`         | `type`           | Type of Chip, depends on usage                                                                                                                                                                                                             | `"button" \| "checkbox" \| "radio"` | `'button'`           |
| `value`        | `value`          | Value of input. Valid only for type checkbox and radio.                                                                                                                                                                                    | `string \| undefined`               | `undefined`          |


## Events

| Event       | Description                                                                                                                                                                                                                                                           | Type                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `tdsChange` | Sends unique Chip identifier and value when it is changed (checked/unchecked). Valid only for type checkbox and radio. If no ID is specified, a random one will be generated. To use this listener, don't use the randomized ID, use a specific one of your choosing. | `CustomEvent<{ chipId: string; value: string \| undefined; checked?: boolean \| undefined; }>` |
| `tdsClick`  | Sends unique Chip identifier when Chip is clicked. Valid only for type button. If no ID is specified, a random one will be generated. To use this listener, don't use the randomized ID, use a specific one of your choosing.                                         | `CustomEvent<{ chipId: string; }>`                                                             |


## Slots

| Slot       | Description               |
| ---------- | ------------------------- |
| `"label"`  | Slot for the label text.  |
| `"prefix"` | Slot for the prefix icon. |
| `"suffix"` | Slot for the suffix icon. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
