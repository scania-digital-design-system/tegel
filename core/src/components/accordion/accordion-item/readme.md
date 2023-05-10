# tds-accordion-item



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                                                    | Type               | Default |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- | ------------------ | ------- |
| `disabled`           | `disabled`             | Disabled option in `boolean`.                                                                  | `boolean`          | `false` |
| `expandIconPosition` | `expand-icon-position` | Changes where the expand icon is placed.                                                       | `"end" \| "start"` | `'end'` |
| `expanded`           | `expanded`             | Set to true to expand panel open                                                               | `boolean`          | `false` |
| `header`             | `header`               | The header gives users the context about the additional information available inside the panel | `string`           | `''`    |
| `paddingReset`       | `padding-reset`        | When true 16px on right padding instead of 64px                                                | `boolean`          | `false` |


## Events

| Event       | Description                                                                     | Type                                  |
| ----------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| `tdsToggle` | Fires when the accordion item is clicked but before the it is closed or opened. | `CustomEvent<{ expanded: boolean; }>` |


## Methods

### `toggleAccordionItem() => Promise<void>`

Method for toggeling the expanded state of the accordion item.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [tds-icon](../../icon)

### Graph
```mermaid
graph TD;
  tds-accordion-item --> sdds-icon
  style tds-accordion-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
