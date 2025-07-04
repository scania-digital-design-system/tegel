# tds-table

🚧 This component is not yet accessible. Please refer to the [Accessibility Guidelines](https://tds-storybook.tegel.scania.com/?path=/docs/foundations-accessibility--docs) for more information.


<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                                                                                                                                                                                 | Type                                                                     | Default              |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------- |
| `compactDesign`         | `compact-design`          | Enables style where Table toolbar, rows and footer are less high                                                                                                                                                                            | `boolean`                                                                | `false`              |
| `expandableRows`        | `expandable-rows`         | Enables extended row feature of Table                                                                                                                                                                                                       | `boolean`                                                                | `false`              |
| `horizontalScrollWidth` | `horizontal-scroll-width` | Width of the table, used as the constraint for horizontal scrolling. **NOTE**: this will disable usage of the responsive flag                                                                                                               | `string`                                                                 | `null`               |
| `modeVariant`           | `mode-variant`            | Variant of the component, based on current mode.                                                                                                                                                                                            | `"primary" \| "secondary"`                                               | `null`               |
| `multiselect`           | `multiselect`             | Enables multiselect feature of Table                                                                                                                                                                                                        | `boolean`                                                                | `false`              |
| `noMinWidth`            | `no-min-width`            | Enables to customize width on Table columns                                                                                                                                                                                                 | `boolean`                                                                | `undefined`          |
| `responsive`            | `responsive`              | Enables Table to take 100% available width with equal spacing of columns                                                                                                                                                                    | `boolean`                                                                | `false`              |
| `tableId`               | `table-id`                | ID used for internal Table functionality and events, must be unique.  **NOTE**: If you're listening for Table events, you need to set this ID yourself to identify the Table, as the default ID is random and will be different every time. | `string`                                                                 | `generateUniqueId()` |
| `verticalDividers`      | `vertical-dividers`       | Enables style with vertical dividers between columns                                                                                                                                                                                        | `boolean`                                                                | `false`              |
| `zebraMode`             | `zebra-mode`              | Enables zebra stripe mode on the table rows or columns.                                                                                                                                                                                     | `"columns-even" \| "columns-odd" \| "none" \| "rows-even" \| "rows-odd"` | `'none'`             |


## Methods

### `getSelectedRows() => Promise<any[]>`

Returns all selected rows data.

#### Returns

Type: `Promise<any[]>`




## Slots

| Slot          | Description                                  |
| ------------- | -------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For the table contents. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
