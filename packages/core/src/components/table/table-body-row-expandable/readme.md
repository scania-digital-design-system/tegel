# tds-table-body-row-expended



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                               | Type      | Default              |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------- |
| `colSpan`         | `col-span`         | In case that automatic count of columns does not work, user can manually set this one. Take in mind that expandable control is column too | `number`  | `null`               |
| `defaultExpanded` | `default-expanded` | Sets default expanded value of row                                                                                                        | `boolean` | `undefined`          |
| `rowId`           | `row-id`           | ID for the table row. Randomly generated if not specified.                                                                                | `string`  | `generateUniqueId()` |


## Events

| Event       | Description                                                                        | Type                                                   |
| ----------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `tdsChange` | Sends unique table row identifier and checked status when it is checked/unchecked. | `CustomEvent<{ rowId: string; isExpanded: boolean; }>` |


## Methods

### `collapse() => Promise<void>`

method to collapse table row

#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`

method to expand table row

#### Returns

Type: `Promise<void>`




## Slots

| Slot           | Description                         |
| -------------- | ----------------------------------- |
| `"<default>"`  | <b>Unnamed slot.</b> For the cells. |
| `"expand-row"` | Slot for the expanded row.          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
