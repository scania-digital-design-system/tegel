# tds-block

### Nested blocks

The `tds-block` component can be nested to create more complex layouts. When nesting blocks, please refrain from using the `mode-variant` attribute on the nested blocks. The nested blocks will automatically adjust their background color. It is recommended to use the `tds-mode-variant-primary` or `tds-mode-variant-secondary` as class on the parent wrapper or app level to achieve correct color scheme.





<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                  | Type                                                                                    | Default |
| -------------- | --------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------- |
| `componentTag` | `component-tag` | Specifies the HTML tag to be used for the component wrapper. | `"article" \| "aside" \| "div" \| "footer" \| "header" \| "main" \| "nav" \| "section"` | `'div'` |
| `modeVariant`  | `mode-variant`  | Mode variant of the component, based on current mode.        | `"primary" \| "secondary" \| null`                                                      | `null`  |


## Slots

| Slot | Description                                                   |
| ---- | ------------------------------------------------------------- |
|      | <default> - <b>Default</b> slot for content inside the block. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
