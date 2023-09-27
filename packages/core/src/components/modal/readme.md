# tds-modal



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                 | Type                           | Default     |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `actionsPosition` | `actions-position` | Changes the position behaviour of the actions slot.                                                                                                         | `"static" \| "sticky"`         | `'static'`  |
| `header`          | `header`           | Sets the header of the Modal.                                                                                                                               | `string`                       | `undefined` |
| `prevent`         | `prevent`          | Disables closing Modal on clicking on overlay area.                                                                                                         | `boolean`                      | `false`     |
| `referenceEl`     | --                 | Element that will show the Modal (takes priority over selector)                                                                                             | `HTMLElement`                  | `undefined` |
| `selector`        | `selector`         | CSS selector for the element that will show the Modal.                                                                                                      | `string`                       | `undefined` |
| `show`            | `show`             | Controls whether the Modal is shown or not. If this is set hiding and showing will be decided by this prop and will need to be controlled from the outside. | `boolean`                      | `undefined` |
| `size`            | `size`             | Size of Modal                                                                                                                                               | `"lg" \| "md" \| "sm" \| "xs"` | `'md'`      |


## Events

| Event      | Description                     | Type               |
| ---------- | ------------------------------- | ------------------ |
| `tdsClose` | Emits when the Modal is closed. | `CustomEvent<any>` |


## Methods

### `closeModal() => Promise<void>`

Closes the Modal.

#### Returns

Type: `Promise<void>`



### `showModal() => Promise<void>`

Shows the Modal.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                    |
| ----------- | ------------------------------ |
| `"actions"` | Slot for extra buttons         |
| `"body"`    | Slot for main content of modal |
| `"header"`  | Slot for header text           |


## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  tds-modal --> tds-icon
  style tds-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
