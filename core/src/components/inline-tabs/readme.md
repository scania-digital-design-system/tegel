# sdds-inline-tabs



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                            | Type                       | Default     |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `defaultSelectedIndex` | `default-selected-index` | Sets the default selected tab.                                                         | `number`                   | `0`         |
| `modeVariant`          | `mode-variant`           | Variant of the tabs, primary= on white, secondary= on grey50                           | `"primary" \| "secondary"` | `'primary'` |
| `selectedIndex`        | `selected-index`         | Sets the selected tab. If this is set all tab changes needs to be handled by the user. | `number`                   | `undefined` |


## Events

| Event        | Description | Type                                         |
| ------------ | ----------- | -------------------------------------------- |
| `sddsChange` |             | `CustomEvent<{ selectedTabIndex: number; }>` |


## Methods

### `selectTab(tabIndex: number) => Promise<{ selectedTabIndex: number; }>`

Selects a tab based on tabindex, will not select a disabled tab.

#### Returns

Type: `Promise<{ selectedTabIndex: number; }>`




## Dependencies

### Depends on

- [sdds-icon](../icon)

### Graph
```mermaid
graph TD;
  sdds-inline-tabs --> sdds-icon
  style sdds-inline-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
