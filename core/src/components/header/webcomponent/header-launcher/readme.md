# sdds-header-launcher

See the [basic navigation pattern](/docs/patterns-navigation--basic) for an example of using the header launcher.

The [navigation pattern with few items](/docs/patterns-navigation--few-navigation-items) shows how you can implement an alternative grid layout for the header launcher.


<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [sdds-header-launcher-button](../header-launcher-button)
- [sdds-popover-canvas](../../../popover-canvas)

### Graph
```mermaid
graph TD;
  sdds-header-launcher --> sdds-header-launcher-button
  sdds-header-launcher --> sdds-popover-canvas
  sdds-header-launcher-button --> sdds-header-item
  sdds-header-launcher-button --> sdds-icon
  sdds-header-item --> sdds-core-header-item
  style sdds-header-launcher fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
