# sdds-banner



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                                                                                                                                        | Type                                 | Default               |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------------- |
| `bannerId`   | `banner-id`  | ID used for internal table functionality and events, must be unique.  **NOTE**: If you're listening for banner close events you need to set this ID yourself to identify the banner, as the default ID is random and will be different every time. | `string`                             | `crypto.randomUUID()` |
| `header`     | `header`     | Header text.                                                                                                                                                                                                                                       | `string`                             | `undefined`           |
| `hidden`     | `hidden`     | Hides the banner                                                                                                                                                                                                                                   | `boolean`                            | `false`               |
| `icon`       | `icon`       | Name of the icon for the component. For error and information type the icon is predefined.                                                                                                                                                         | `string`                             | `undefined`           |
| `persistent` | `persistent` | Removes the close button on the banner.                                                                                                                                                                                                            | `boolean`                            | `false`               |
| `type`       | `type`       | Type of banner                                                                                                                                                                                                                                     | `"error" \| "information" \| "none"` | `'none'`              |


## Events

| Event       | Description                                                      | Type                                 |
| ----------- | ---------------------------------------------------------------- | ------------------------------------ |
| `sddsClose` | Sends unique banner identifier when the close button is pressed. | `CustomEvent<{ bannerId: string; }>` |
| `sddsShow`  | Sends unique banner identifier when the close button is pressed. | `CustomEvent<{ bannerId: string; }>` |


## Methods

### `hideBanner() => Promise<void>`

Hides the banner.

#### Returns

Type: `Promise<void>`



### `showBanner() => Promise<void>`

Shows the banner

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [sdds-icon](../icon)

### Graph
```mermaid
graph TD;
  sdds-banner --> sdds-icon
  style sdds-banner fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
