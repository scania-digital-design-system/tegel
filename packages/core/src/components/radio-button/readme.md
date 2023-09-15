# tds-radio-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                     | Type      | Default              |
| ---------- | ---------- | ----------------------------------------------- | --------- | -------------------- |
| `checked`  | `checked`  | Decides if the Radio Button is checked or not.  | `boolean` | `false`              |
| `disabled` | `disabled` | Decides if the Radio Button is disabled or not. | `boolean` | `false`              |
| `name`     | `name`     | Name of Radio Button, used for reference.       | `string`  | `undefined`          |
| `radioId`  | `radio-id` | Unique Radio Button identifier.                 | `string`  | `generateUniqueId()` |
| `required` | `required` | Decides if the Radio Button is required or not. | `boolean` | `false`              |
| `value`    | `value`    | Value of input.                                 | `string`  | `undefined`          |


## Events

| Event       | Description                                                                                                                                                                                                        | Type                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| `tdsChange` | Sends unique Radio Button identifier and status when it is checked. If no ID is specified, a random one will be generated. To use this listener, don't use the randomized ID, use a specific one of your choosing. | `CustomEvent<{ radioId: string; value: string; }>` |


## Slots

| Slot      | Description              |
| --------- | ------------------------ |
| `"label"` | Slot for the label text. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
