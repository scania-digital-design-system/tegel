# tds-popover-canvas



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                   | Type                                                                                                                                                                                                         | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `modifiers`      | --                | Array of modifier objects to pass to popper.js. See https://popper.js.org/docs/v2/modifiers/                                                                  | `Object[]`                                                                                                                                                                                                   | `[]`        |
| `offsetDistance` | `offset-distance` | Sets the offset distance                                                                                                                                      | `number`                                                                                                                                                                                                     | `8`         |
| `offsetSkidding` | `offset-skidding` | Sets the offset skidding                                                                                                                                      | `number`                                                                                                                                                                                                     | `0`         |
| `placement`      | `placement`       | Decides the placement of the Popover Canvas. See https://popper.js.org/docs/v2/constructors/#placement                                                        | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'auto'`    |
| `referenceEl`    | --                | Element that will trigger the Popover (takes priority over selector)                                                                                          | `HTMLElement`                                                                                                                                                                                                | `undefined` |
| `selector`       | `selector`        | The CSS-selector for an element that will trigger the Popover                                                                                                 | `string`                                                                                                                                                                                                     | `''`        |
| `show`           | `show`            | Controls whether the Popover is shown or not. If this is set hiding and showing will be decided by this prop and will need to be controlled from the outside. | `boolean`                                                                                                                                                                                                    | `null`      |


## Slots

| Slot          | Description                                           |
| ------------- | ----------------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For the contents of the popover. |


## Dependencies

### Used by

 - [tds-header-dropdown](../header/header-dropdown)
 - [tds-header-launcher](../header/header-launcher)

### Depends on

- [tds-core-popover](../core-popover)

### Graph
```mermaid
graph TD;
  tds-popover-canvas --> tds-core-popover
  tds-header-dropdown --> tds-popover-canvas
  tds-header-launcher --> tds-popover-canvas
  style tds-popover-canvas fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
