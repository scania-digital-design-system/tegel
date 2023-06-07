# tds-banner

### The subheader of the Banner is also available as a slot.

```jsx
<tds-banner icon="truck" header="This is a header text area" >
  <div slot="banner-subheader">Subheader text</div>
  <tds-link slot="banner-link"><a href="/">Link example</a></tds-link>
</tds-banner>
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                                                                                                                                         | Type                                 | Default               |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------------- |
| `bannerId`   | `banner-id`  | ID used for internal table functionality and events, must be unique.  **NOTE**: If you're listening for Banner close events, you need to set this ID yourself to identify the Banner, as the default ID is random and will be different every time. | `string`                             | `crypto.randomUUID()` |
| `header`     | `header`     | Header text for the Banner.                                                                                                                                                                                                                         | `string`                             | `undefined`           |
| `hidden`     | `hidden`     | Hides the Banner                                                                                                                                                                                                                                    | `boolean`                            | `false`               |
| `icon`       | `icon`       | Name of the icon for the component. For error and information type, the icon is predefined.                                                                                                                                                         | `string`                             | `undefined`           |
| `persistent` | `persistent` | Removes the close button on the Banner.                                                                                                                                                                                                             | `boolean`                            | `false`               |
| `subheader`  | `subheader`  | Subheader text for the Banner.                                                                                                                                                                                                                      | `string`                             | `undefined`           |
| `type`       | `type`       | Type of Banner                                                                                                                                                                                                                                      | `"error" \| "information" \| "none"` | `'none'`              |


## Events

| Event      | Description                                                          | Type                                 |
| ---------- | -------------------------------------------------------------------- | ------------------------------------ |
| `tdsClose` | Sends a unique Banner identifier when the close button is pressed.   | `CustomEvent<{ bannerId: string; }>` |
| `tdsShow`  | Sends the unique Banner identifier when the close button is pressed. | `CustomEvent<{ bannerId: string; }>` |


## Methods

### `hideBanner() => Promise<void>`

Hides the Banner.

#### Returns

Type: `Promise<void>`



### `showBanner() => Promise<void>`

Shows the Banner

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  tds-banner --> tds-icon
  style tds-banner fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
