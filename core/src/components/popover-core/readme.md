# tds-core-popover



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                         | Type                                                                                                                                                                                                         | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `autoHide`       | `auto-hide`       | Decides if the popover should hide automatically. Alternatevly it can be hidden externally based on emitted events. | `boolean`                                                                                                                                                                                                    | `true`      |
| `modifiers`      | --                | Array of modifier objects to pass to popper.js. See https://popper.js.org/docs/v2/modifiers/                        | `Object[]`                                                                                                                                                                                                   | `[]`        |
| `offsetDistance` | `offset-distance` | Sets the offset distance                                                                                            | `number`                                                                                                                                                                                                     | `8`         |
| `offsetSkidding` | `offset-skidding` | Sets the offset skidding                                                                                            | `number`                                                                                                                                                                                                     | `0`         |
| `placement`      | `placement`       | Decides the placement of the Popover Menu                                                                           | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'auto'`    |
| `referenceEl`    | --                | Element that will trigger the pop-over (takes priority over selector)                                               | `HTMLElement`                                                                                                                                                                                                | `undefined` |
| `selector`       | `selector`        | The CSS-selector for an element that will trigger the pop-over                                                      | `string`                                                                                                                                                                                                     | `''`        |
| `show`           | `show`            | Decides if the Popover Menu should be visible from the start                                                        | `boolean`                                                                                                                                                                                                    | `null`      |
| `trigger`        | `trigger`         | What triggers the popover to show                                                                                   | `"click" \| "hover" \| "hover-popover"`                                                                                                                                                                      | `'click'`   |


## Dependencies

### Used by

 - [tds-popover-canvas](../popover-canvas)
 - [tds-popover-menu](../popover-menu)
 - [tds-tooltip](../tooltip)

### Graph
```mermaid
graph TD;
  tds-popover-canvas --> tds-popover-core
  tds-popover-menu --> tds-popover-core
  tds-tooltip --> tds-popover-core
  style tds-popover-core fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
