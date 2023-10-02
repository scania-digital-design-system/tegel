# tds-popover-menu


### Usage in Angular
If you are using the `<popover-menu>` in an Angular environment and want to
use the `referenceEl` prop rather than the `selector` the referenced element can't be a Tegel component. We recommend wrapping the element in a native HTMLElement and using that as the `referenceEl`. See example below:

```html
<div #myReference>
  <tds-button text="Button"></tds-button>
</div>
<tds-popover-menu [referenceEl]="myReference">
  <tds-popover-menu-item>
    <a href="#">Action</a>
  </tds-popover-menu-item>
</tds-popover-menu>

```
<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                                                                                        | Type                                                                                                                                                                                                         | Default     |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `fluidWidth`     | `fluid-width`     | If true this unsets the width (160px) of the Popover Menu                                                                                                                                                                          | `boolean`                                                                                                                                                                                                    | `false`     |
| `offsetDistance` | `offset-distance` | Sets the offset distance                                                                                                                                                                                                           | `number`                                                                                                                                                                                                     | `8`         |
| `offsetSkidding` | `offset-skidding` | Sets the offset skidding                                                                                                                                                                                                           | `number`                                                                                                                                                                                                     | `0`         |
| `placement`      | `placement`       | Decides the placement of the Popover Menu                                                                                                                                                                                          | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'auto'`    |
| `referenceEl`    | --                | Element that will trigger the pop-over (takes priority over selector)                                                                                                                                                              | `HTMLElement`                                                                                                                                                                                                | `undefined` |
| `selector`       | `selector`        | The CSS-selector for an element that will trigger the pop-over                                                                                                                                                                     | `string`                                                                                                                                                                                                     | `''`        |
| `show`           | `show`            | Controls whether the Popover is shown or not. If this is set hiding and showing will be decided by this prop and will need to be controlled from the outside. This also means that clicking outside of the popover won't close it. | `boolean`                                                                                                                                                                                                    | `null`      |


## Slots

| Slot          | Description                                      |
| ------------- | ------------------------------------------------ |
| `"<default>"` | <b>Unnamed slot.</b> For the list of menu items. |


## Dependencies

### Depends on

- [tds-popover-core](../popover-core)

### Graph
```mermaid
graph TD;
  tds-popover-menu --> tds-popover-core
  style tds-popover-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
