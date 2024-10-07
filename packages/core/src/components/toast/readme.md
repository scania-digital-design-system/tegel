# tds-toast



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                            | Type                                                 | Default              |
| ----------- | ------------ | ------------------------------------------------------ | ---------------------------------------------------- | -------------------- |
| `closable`  | `closable`   | Enables the close button.                              | `boolean`                                            | `true`               |
| `header`    | `header`     | Header text for the component.                         | `string`                                             | `undefined`          |
| `hidden`    | `hidden`     | Hides the Toast.                                       | `boolean`                                            | `false`              |
| `subheader` | `subheader`  | Subheader text for the component.                      | `string`                                             | `undefined`          |
| `toastId`   | `toast-id`   | ID for the Toast. Randomly generated if not specified. | `string`                                             | `generateUniqueId()` |
| `toastRole` | `toast-role` | ARIA role for the Toast.                               | `"alert" \| "log" \| "status"`                       | `'alert'`            |
| `variant`   | `variant`    | Type of Toast.                                         | `"error" \| "information" \| "success" \| "warning"` | `'information'`      |


## Events

| Event      | Description                                             | Type                                |
| ---------- | ------------------------------------------------------- | ----------------------------------- |
| `tdsClose` | Sends unique Toast identifier when component is closed. | `CustomEvent<{ toastId: string; }>` |


## Methods

### `hideToast() => Promise<void>`

Hides the Toast.

#### Returns

Type: `Promise<void>`



### `showToast() => Promise<void>`

Shows the Toast.

#### Returns

Type: `Promise<void>`




## Slots

| Slot          | Description                                        |
| ------------- | -------------------------------------------------- |
| `"actions"`   | Slot for the Toast bottom section, used for links. |
| `"header"`    | Slot for the Toast header.                         |
| `"subheader"` | Slot for the Toast subheader.                      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
