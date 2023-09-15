# tds-side-menu-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                  | Type      | Default |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | If the item should appear active. Can be used when the item is triggering a dropdown, and the dropdown is open, for example. | `boolean` | `false` |
| `selected` | `selected` | If the item should appear selected.                                                                                          | `boolean` | `false` |


## Slots

| Slot          | Description                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For injecting a native <code>&lt;button</code> and <code>&lt;a></code> element. |


## Dependencies

### Used by

 - [tds-side-menu-collapse-button](../side-menu-collapse-button)
 - [tds-side-menu-dropdown](../side-menu-dropdown)

### Graph
```mermaid
graph TD;
  tds-side-menu-collapse-button --> tds-side-menu-item
  tds-side-menu-dropdown --> tds-side-menu-item
  style tds-side-menu-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
