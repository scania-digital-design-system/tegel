# tds-body-cell



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                          | Type                                                             | Default     |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------- |
| `cellKey`        | `cell-key`        | Passing the same cell key for all body cells which is used in head cell enables features of text align and hovering  | `string \| undefined`                                            | `undefined` |
| `cellValue`      | `cell-value`      | Value that will be presented as text inside a cell                                                                   | `number \| string \| undefined`                                  | `undefined` |
| `colSpan`        | `col-span`        | Number of columns the cell should span.                                                                              | `number \| undefined`                                            | `undefined` |
| `disablePadding` | `disable-padding` | Disables internal padding. Useful when passing other components to cell.                                             | `boolean`                                                        | `false`     |
| `rowSpan`        | `row-span`        | Number of rows the cell should span.                                                                                 | `number \| undefined`                                            | `undefined` |
| `textAlign`      | `text-align`      | Setting for text align, default value "left". Other accepted values are "left", "start", "right", "end" or "center". | `"center" \| "end" \| "left" \| "right" \| "start" \| undefined` | `undefined` |


## Slots

| Slot          | Description                                 |
| ------------- | ------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For the cell contents. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
