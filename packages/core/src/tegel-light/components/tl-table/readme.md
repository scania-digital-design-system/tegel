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

## JavaScript Required

The Table component may require JavaScript for:
- Sorting functionality
- Row selection and expansion
- Editable cells
- Pagination
- Dynamic data loading

## Elements

| Element                    | HTML Element | Description                     |
| -------------------------- | ------------ | ------------------------------- |
| `.tl-table`                | `<table>`    | Main table element              |
| `.tl-table__header`        | `<thead>`    | Table header section            |
| `.tl-table__body`          | `<tbody>`    | Table body section              |
| `.tl-table__row`           | `<tr>`       | Table row                       |
| `.tl-table__header-cell`   | `<th>`       | Header cell                     |
| `.tl-table__body-cell`     | `<td>`       | Body cell                       |
| `.tl-table__footer`        | `<tfoot>`    | Table footer section            |

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

| Modifier                            | Description                   |
| ----------------------------------- | ----------------------------- |
| `.tl-table--header-text-align-left` | Left-align header text        |
| `.tl-table--header-text-align-center` | Center-align header text    |
| `.tl-table--header-text-align-right` | Right-align header text      |
| `.tl-table--body-text-align-left`   | Left-align body text          |
| `.tl-table--body-text-align-center` | Center-align body text        |
| `.tl-table--body-text-align-right`  | Right-align body text         |

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

----------------------------------------------

*Part of Tegel Lite (CSS) Design System*
