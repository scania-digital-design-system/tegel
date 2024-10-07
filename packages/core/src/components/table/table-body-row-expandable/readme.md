# tds-table-body-row-expended

### Using the `:part` Selector

The `:part` selector allows you to style elements inside a shadow DOM that have been exposed via the `part` attribute. This is particularly useful for customizing the appearance of web components.

In the `tds-table-body-row-expandable` component, the expandable row is exposed using the `part` attribute:

```typescript:packages/core/src/components/table/table-body-row-expandable/table-body-row-expandable.tsx
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
tds-table-body-row-expandable::part(expand-row) {
  background-color: var(--tds-red-100);
  border: 1px solid var(--tds-red-200);
}
```

This CSS will apply a background color and border to the expandable row part of the `tds-table-body-row-expandable` component.

### Overflow solution for Expanded Rows (Use with Caution)

If you need to control overflow in a table, you can wrap the table content using a div with the following styles:

```html
<div style="overflow:auto; width:100%; display:table-caption;">
    // Your table content here
</div>
```

This approach forces the content to scroll within the table. However, it leverages unconventional CSS (display: table-caption) to work across Firefox, Chrome, and Safari. This might lead to unexpected issues in complex layouts or future browser updates. While effective, use this method with caution and consider other layout strategies.

We recommend fitting your content within the table’s natural size whenever possible.

<hr>
<br>

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description                                                                                                                               | Type                 | Default              |
| ------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------- |
| `colSpan`                | `col-span`                 | In case that automatic count of columns does not work, user can manually set this one. Take in mind that expandable control is column too | `number`             | `null`               |
| `expanded`               | `expanded`                 | Sets isExpanded state to true or false externally                                                                                         | `boolean`            | `undefined`          |
| `expandedPaddingEnabled` | `expanded-padding-enabled` | Determines whether padding is enabled for the expanded area                                                                               | `boolean`            | `true`               |
| `overflow`               | `overflow`                 | Controls the overflow behavior of the expandable row content                                                                              | `"auto" \| "hidden"` | `'auto'`             |
| `rowId`                  | `row-id`                   | ID for the table row. Randomly generated if not specified.                                                                                | `string`             | `generateUniqueId()` |


## Events

| Event       | Description                                                                            | Type                                                   |
| ----------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `tdsChange` | Sends unique table row identifier and isExpanded status when it is expanded/collapsed. | `CustomEvent<{ rowId: string; isExpanded: boolean; }>` |


## Methods

### `collapse() => Promise<void>`

Method to collapse table row

#### Returns

Type: `Promise<void>`



### `expand() => Promise<void>`

Method to expand table row

#### Returns

Type: `Promise<void>`




## Slots

| Slot           | Description                         |
| -------------- | ----------------------------------- |
| `"<default>"`  | <b>Unnamed slot.</b> For the cells. |
| `"expand-row"` | Slot for the expanded row.          |


## Shadow Parts

| Part           | Description                                 |
| -------------- | ------------------------------------------- |
| `"expand-row"` | Selector for the expanded row of the table. |
| `"row"`        | Selector for the main row of the table.     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
