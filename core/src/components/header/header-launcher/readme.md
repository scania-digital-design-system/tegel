# tds-header-launcher



<!-- Auto Generated Below -->


## Slots

| Slot          | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For a launcher list (or grid) element. |


## Dependencies

### Depends on

- [tds-header-launcher-button](../header-launcher-button)
- [tds-popover-canvas](../../popover-canvas)

### Graph
```mermaid
graph TD;
  tds-header-launcher --> tds-header-launcher-button
  tds-header-launcher --> tds-popover-canvas
  tds-header-launcher-button --> tds-header-item
  tds-header-launcher-button --> tds-icon
  tds-header-item --> tds-core-header-item
  tds-popover-canvas --> tds-popover-core
  style tds-header-launcher fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
