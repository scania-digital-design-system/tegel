# tds-header-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                      | Type      | Default |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | If the button should appear active. Can be used when the button is triggering a dropdown, and the dropdown is open, for example. | `boolean` | `false` |
| `selected` | `selected` | If the button should appear selected.                                                                                            | `boolean` | `false` |


## Slots

| Slot          | Description                                        |
| ------------- | -------------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For a link or button element. |


## Dependencies

### Used by

 - [tds-header-brand-symbol](../header-brand-symbol)
 - [tds-header-dropdown](../header-dropdown)
 - [tds-header-hamburger](../header-hamburger)
 - [tds-header-launcher-button](../header-launcher-button)

### Depends on

- [tds-core-header-item](../core-header-item)

### Graph
```mermaid
graph TD;
  tds-header-item --> tds-core-header-item
  tds-header-brand-symbol --> tds-header-item
  tds-header-dropdown --> tds-header-item
  tds-header-hamburger --> tds-header-item
  tds-header-launcher-button --> tds-header-item
  style tds-header-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
