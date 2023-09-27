# tds-header-dropdown



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                | Type      | Default     |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------ | --------- | ----------- |
| `label`          | `label`            | The label of the button that opens the dropdown. This is an alternative to the label slot. | `string`  | `undefined` |
| `noDropdownIcon` | `no-dropdown-icon` | If the dropdown icon (downwards chevron) should be hidden.                                 | `boolean` | `false`     |
| `selected`       | `selected`         | If the button that opens the dropdown should appear selected.                              | `boolean` | `false`     |


## Slots

| Slot          | Description                                         |
| ------------- | --------------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For injecting a dropdown list. |
| `"icon"`      | Slot for an Icon in the dropdown button.            |
| `"label"`     | Slot for a label text in the dropdown button.       |


## Dependencies

### Depends on

- [tds-header-item](../header-item)
- [tds-icon](../../icon)
- [tds-popover-canvas](../../popover-canvas)

### Graph
```mermaid
graph TD;
  tds-header-dropdown --> tds-header-item
  tds-header-dropdown --> tds-icon
  tds-header-dropdown --> tds-popover-canvas
  tds-header-item --> tds-core-header-item
  tds-popover-canvas --> tds-popover-core
  style tds-header-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
