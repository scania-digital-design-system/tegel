# sdds-modal

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute  | Description                                                                                                                                                 | Type                           | Default     |
| ------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `actions`     | `actions`  | Sticky or Static Actions                                                                                                                                    | `"static" \| "sticky"`         | `'static'`  |
| `prevent`     | `prevent`  | Disables closing modal on clicking on overlay area.                                                                                                         | `boolean`                      | `false`     |
| `referenceEl` | --         | Element that will show the modal (takes priority over selector)                                                                                             | `HTMLElement`                  | `undefined` |
| `selector`    | `selector` | CSS selector for the element that will show the modal.                                                                                                      | `string`                       | `undefined` |
| `show`        | `show`     | Controls whether the modal is shown or not. If this is set hiding and showing will be decided by this prop and will need to be controlled from the outside. | `boolean`                      | `undefined` |
| `size`        | `size`     | Size of modal                                                                                                                                               | `"lg" \| "md" \| "sm" \| "xs"` | `'md'`      |


## Events

| Event       | Description                      | Type               |
| ----------- | -------------------------------- | ------------------ |
| `sddsClose` | Emitts when the modal is closed. | `CustomEvent<any>` |


## Methods

### `closeModal() => Promise<void>`

Closes the modal.

#### Returns

Type: `Promise<void>`



### `showModal() => Promise<void>`

Shows the modal.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  sdds-modal --> tds-icon
  style sdds-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
