# tds-side-menu-collapse-button



<!-- Auto Generated Below -->


## Events

| Event         | Description                                                                                                                                                        | Type                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `tdsCollapse` | Event that is broadcast when the collapse button is clicked. Prevent it from disabling automatic collapsing, and set the collapsed prop on the Side Menu yourself. | `CustomEvent<{ collapsed: boolean; }>` |


## Slots

| Slot          | Description                                            |
| ------------- | ------------------------------------------------------ |
| `"<default>"` | <b>Unnamed slot.</b> For the text label of the button. |


## Dependencies

### Depends on

- [tds-side-menu-item](../side-menu-item)

### Graph
```mermaid
graph TD;
  tds-side-menu-collapse-button --> tds-side-menu-item
  style tds-side-menu-collapse-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
