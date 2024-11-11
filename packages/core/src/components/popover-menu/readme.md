# tds-popover-menu


### Usage with @scania/tegel-angular
If you are using the `<tds-popover-menu>` in an Angular environment and want to
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

### Usage with @scania/tegel-react
If you are using the `<TdsPopoverMenu>` in an React environment and want to
use the `referenceEl` prop rather than the `selector` the referenced element can't be a Tegel component. We recommend wrapping the element in a native HTMLElement and using that as the `referenceEl`. See example below:

```jsx
<div ref={myReference.current}>
  <TdsButton text="Button"></TdsButton>
</div>
<TdsPopoverMenu referenceEl={myReference}>
  <TdsPopoverMenuItem>
    <a href="#">Action</a>
  </TdsPopoverMenuItem>
</TdsPopoverMenu>

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


## Methods

### `close() => Promise<void>`

Property for closing popover programmatically

#### Returns

Type: `Promise<void>`




## Slots

| Slot          | Description                                      |
| ------------- | ------------------------------------------------ |
| `"<default>"` | <b>Unnamed slot.</b> For the list of menu items. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
