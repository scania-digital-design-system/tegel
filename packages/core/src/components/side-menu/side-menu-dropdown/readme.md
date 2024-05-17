# tds-side-menu-dropdown



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------ | --------- | ----------- |
| `buttonLabel` | `button-label` | The label of the button that opens the dropdown. This is an alternative to the label slot. | `string`  | `undefined` |
| `defaultOpen` | `default-open` | If the dropdown should be open from the start.                                             | `boolean` | `false`     |
| `open`        | `open`         | Used to programatically toggle dropdown.                                                   | `boolean` | `false`     |
| `selected`    | `selected`     | If the button that opens the dropdown should appear selected.                              | `boolean` | `false`     |


## Slots

| Slot          | Description                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `"<default>"` | <b>Unnamed slot.</b> For injection of the <code>tds-side-menu-dropdown-list</code> subcomponent. |
| `"icon"`      | Used for injecting the icon that compliments the dropdown title                                  |
| `"label"`     | Used for injecting the text, aka dropdown title                                                  |


## Dependencies

### Depends on

- [tds-side-menu-item](../side-menu-item)
- [tds-icon](../../icon)

### Graph
```mermaid
graph TD;
  tds-side-menu-dropdown --> tds-side-menu-item
  tds-side-menu-dropdown --> tds-icon
  style tds-side-menu-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
