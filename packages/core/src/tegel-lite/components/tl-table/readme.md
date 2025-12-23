# tl-table

The Table component displays data in a structured tabular format with support for sorting, selection, and various styling options.

## Usage

```html
<table class="tl-table">
  <thead class="tl-table__header">
    <tr class="tl-table__row">
      <th class="tl-table__header-cell">Name</th>
      <th class="tl-table__header-cell">Email</th>
      <th class="tl-table__header-cell">Role</th>
    </tr>
  </thead>
  <tbody class="tl-table__body">
    <tr class="tl-table__row">
      <td class="tl-table__body-cell">John Doe</td>
      <td class="tl-table__body-cell">john@example.com</td>
      <td class="tl-table__body-cell">Admin</td>
    </tr>
  </tbody>
</table>
```

<br />

### Required Stylesheets

```
@scania/tegel-lite/global.css
@scania/tegel-lite/tl-table.css
```

## Elements

| Element                              | HTML Element | Description                     |
| ------------------------------------ | ------------ | ------------------------------- |
| `.tl-table`                          | `<table>`    | Main table element              |
| `.tl-table__header`                  | `<thead>`    | Table header section            |
| `.tl-table__body`                    | `<tbody>`    | Table body section              |
| `.tl-table__footer`                  | `<tfoot>`    | Table footer section            |
| `.tl-table__row`                     | `<tr>`       | Table row                       |
| `.tl-table__header-cell`             | `<th>`       | Header cell                     |
| `.tl-table__header-button`           | `<button>`   | Sortable header button          |
| `.tl-table__header-button-text`      | `<span>`     | Header button text              |
| `.tl-table__header-button-icon`      | `<span>`     | Header button sort icon         |
| `.tl-table__header-input-wrapper`    | `<div>`      | Header input wrapper            |
| `.tl-table__header-input`            | `<input>`    | Header filter input             |
| `.tl-table__body-cell`               | `<td>`       | Body cell                       |
| `.tl-table__toolbar`                 | `<div>`      | Toolbar container               |
| `.tl-table__upper-bar`               | `<div>`      | Upper toolbar bar               |
| `.tl-table__actionbar-left`          | `<div>`      | Left action bar section         |
| `.tl-table__actionbar-right`         | `<div>`      | Right action bar section        |
| `.tl-table__title`                   | `<div>`      | Table title                     |
| `.tl-table__expand-control-container`| `<div>`      | Expand button container         |
| `.tl-table__expand-input`            | `<button>`   | Expand button                   |
| `.tl-table__expand-icon`             | `<span>`     | Expand icon                     |
| `.tl-table__expand-row`              | `<tr>`       | Expandable row                  |
| `.tl-table__expand-row-cell`         | `<td>`       | Expandable row cell             |
| `.tl-table__footer-row`              | `<tr>`       | Footer row                      |
| `.tl-table__footer-cell`             | `<td>`       | Footer cell                     |
| `.tl-table__pagination`              | `<div>`      | Pagination container            |
| `.tl-table__row-selector`            | `<div>`      | Row selector container          |
| `.tl-table__page-selector`           | `<div>`      | Page selector container         |
| `.tl-table__rows-per-page`           | `<div>`      | Rows per page section           |
| `.tl-table__rows-per-page-label`     | `<span>`     | Rows per page label             |
| `.tl-table__rows-per-page-select`    | `<select>`   | Rows per page dropdown          |
| `.tl-table__page-selector-input`     | `<input>`    | Page selector input             |
| `.tl-icon`                           | `<span>`     | Icon element (optional)         |

## Modifiers

### Table Layout Modifiers

Apply these classes to the `.tl-table` element.

| Modifier                         | Description                                |
| -------------------------------- | ------------------------------------------ |
| `.tl-table--responsive`          | Full width responsive table                |
| `.tl-table--horizontal-scroll`   | Enable horizontal scrolling                |
| `.tl-table--compact`             | Reduced padding/height                     |
| `.tl-table--no-min-width`        | Remove minimum width constraints           |
| `.tl-table--no-padding`          | Remove cell padding                        |
| `.tl-table--no-header-padding`   | Remove header cell padding                 |
| `.tl-table--vertical-dividers`   | Show vertical dividers between cells       |

### Table Mode Modifiers

Apply these classes to the `.tl-table` element.

| Modifier                | Description                           |
| ----------------------- | ------------------------------------- |
| `.tl-table--primary`    | Primary background mode               |
| `.tl-table--secondary`  | Secondary background mode             |

### Table Zebra Striping Modifiers

Apply these classes to the `.tl-table` element.

| Modifier                      | Description                        |
| ----------------------------- | ---------------------------------- |
| `.tl-table--zebra-rows-odd`   | Stripe odd rows                    |
| `.tl-table--zebra-rows-even`  | Stripe even rows                   |

### Table Text Alignment Modifiers

Apply these classes to the `.tl-table` element to align header and body cells.

| Modifier                             | Description                   |
| ------------------------------------ | ----------------------------- |
| `.tl-table--header-text-align-left`  | Left-align header text        |
| `.tl-table--header-text-align-start` | Start-align header text       |
| `.tl-table--header-text-align-center`| Center-align header text      |
| `.tl-table--header-text-align-right` | Right-align header text       |
| `.tl-table--header-text-align-end`   | End-align header text         |
| `.tl-table--cell-text-align-left`    | Left-align body cell text     |
| `.tl-table--cell-text-align-start`   | Start-align body cell text    |
| `.tl-table--cell-text-align-center`  | Center-align body cell text   |
| `.tl-table--cell-text-align-right`   | Right-align body cell text    |
| `.tl-table--cell-text-align-end`     | End-align body cell text      |
| `.tl-table--zebra-columns-odd`       | Stripe odd columns            |
| `.tl-table--zebra-columns-even`      | Stripe even columns           |

### Table Interaction Modifiers

Apply these classes to the `.tl-table` element.

| Modifier                  | Description                           |
| ------------------------- | ------------------------------------- |
| `.tl-table--clickable`    | Makes rows clickable with hover state |

### Table Row State Modifiers

Apply these classes to `.tl-table__row` elements.

| Modifier                   | Description                     |
| -------------------------- | ------------------------------- |
| `.tl-table__row--selected` | Selected row state              |
| `.tl-table__row--expanded` | Expanded row state              |
| `.tl-table__row--clickable`| Individual clickable row        |

### Table Header Cell Modifiers

Apply these classes to `.tl-table__header-cell` elements.

| Modifier                               | Description                     |
| -------------------------------------- | ------------------------------- |
| `.tl-table__header-cell--checkbox`     | Checkbox column header cell     |
| `.tl-table__header-cell--expand`       | Expand column header cell       |
| `.tl-table__header-cell--sortable`     | Sortable header cell            |
| `.tl-table__header-cell--is-sorted`    | Currently sorted header cell    |

### Table Header Button Icon Modifiers

Apply these classes to `.tl-table__header-button-icon` elements.

| Modifier                                     | Description                     |
| -------------------------------------------- | ------------------------------- |
| `.tl-table__header-button-icon--rotate`      | Rotated sort icon (desc order)  |

### Table Body Cell Modifiers

Apply these classes to `.tl-table__body-cell` elements.

| Modifier                                | Description                     |
| --------------------------------------- | ------------------------------- |
| `.tl-table__body-cell--checkbox`        | Checkbox column cell            |
| `.tl-table__body-cell--expand`          | Expand column cell              |
| `.tl-table__body-cell--column-highlight`| Column highlight state          |

### Table Expand Row Modifiers

Apply these classes to `.tl-table__expand-row` elements.

| Modifier                           | Description                     |
| ---------------------------------- | ------------------------------- |
| `.tl-table__expand-row--expanded`  | Expanded row visible            |

### Table Expand Row Cell Modifiers

Apply these classes to `.tl-table__expand-row-cell` elements.

| Modifier                                      | Description                     |
| --------------------------------------------- | ------------------------------- |
| `.tl-table__expand-row-cell--overflow-visible`| Overflow visible                |
| `.tl-table__expand-row-cell--overflow-hidden` | Overflow hidden                 |

## JavaScript Required

The Table component may require JavaScript for:
- Sorting functionality
- Row selection and expansion
- Editable cells
- Pagination
- Dynamic data loading

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
