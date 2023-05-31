# tds-navigation-tabs



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                            | Type                       | Default     |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `defaultSelectedIndex` | `default-selected-index` | Sets the default selected Tab.                                                         | `number`                   | `0`         |
| `modeVariant`          | `mode-variant`           | Variant of the Tabs, primary= on white, secondary= on grey50                           | `"primary" \| "secondary"` | `'primary'` |
| `selectedIndex`        | `selected-index`         | Sets the selected Tab. If this is set all Tab changes needs to be handled by the user. | `number`                   | `undefined` |


## Events

| Event       | Description                                     | Type                                         |
| ----------- | ----------------------------------------------- | -------------------------------------------- |
| `tdsChange` | Event emitted when the selected Tab is changed. | `CustomEvent<{ selectedTabIndex: number; }>` |


## Methods

### `selectTab(tabIndex: number) => Promise<{ selectedTabIndex: number; }>`

Sets the passed tabindex as the selected Tab.

#### Returns

Type: `Promise<{ selectedTabIndex: number; }>`




## Dependencies

### Depends on

- [tds-icon](../../icon)

### Graph
```mermaid
graph TD;
  tds-navigation-tabs --> tds-icon
  style tds-navigation-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
