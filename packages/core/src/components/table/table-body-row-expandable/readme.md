# tds-table-body-row-expended

### Using the `:part` Selector

The `:part` selector allows you to style elements inside a shadow DOM that have been exposed via the `part` attribute. This is particularly useful for customizing the appearance of web components.

In the `tds-table-body-row-expandable` component, the expandable row is exposed using the `part` attribute on two elements:

```typescript:packages/core/src/components/table/table-body-row-expandable/table-body-row-expandable.tsx

<tr
    class={{
      'tds-table__row': true,
      'tds-table__row--expanded': this.isExpanded,
    }}
    part="row"
  >
  .
  .
  .
<tr
  class={{
    'tds-table__row-expand': true,
    'tds-table__row-expand--expanded': this.isExpanded,
  }}
  part="expand-row"
>
  <td class="tds-table__cell-expand" colSpan={this.columnsNumber}>
    <slot name="expand-row" />
  </td>
</tr>
```

To style this part from outside the shadow DOM, you can use the `::part` pseudo-element in your CSS:

```css

tds-table-body-row-expandable::part(row) {
  background-color: var(--tds-red-100);
}
tds-table-body-row-expandable::part(expand-row) {
  background-color: var(--tds-red-200);
}
```

This CSS will apply a background color to the main row and expandable row part of the `tds-table-body-row-expandable` component.

<hr>
<br>

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                               | Type      | Default              |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------- |
| `colSpan`  | `col-span` | In case that automatic count of columns does not work, user can manually set this one. Take in mind that expandable control is column too | `number`  | `null`               |
| `expanded` | `expanded` | Sets isExpanded state to true or false externally                                                                                         | `boolean` | `undefined`          |
| `rowId`    | `row-id`   | ID for the table row. Randomly generated if not specified.                                                                                | `string`  | `generateUniqueId()` |


## Events

| Event       | Description                                                                            | Type                                                   |
| ----------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `tdsChange` | Sends unique table row identifier and isExpanded status when it is expanded/collapsed. | `CustomEvent<{ rowId: string; isExpanded: boolean; }>` |


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


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"expand-row"` |             |
| `"row"`        |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
