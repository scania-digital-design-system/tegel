# tds-card



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                                                           | Type                       | Default               |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------- |
| `bodyDivider`     | `body-divider`     | Divider for the body                                                                                                                                                                                  | `boolean`                  | `false`               |
| `bodyImg`         | `body-img`         | Body image src                                                                                                                                                                                        | `string`                   | `undefined`           |
| `bodyImgAlt`      | `body-img-alt`     | Alt text for the body image                                                                                                                                                                           | `string`                   | `undefined`           |
| `cardId`          | `card-id`          | ID for the Card, must be unique.  **NOTE**: If you're listening for Card events, you need to set this ID yourself to identify the Card, as the default ID is random and will be different every time. | `string`                   | `crypto.randomUUID()` |
| `clickable`       | `clickable`        | Makes the Card clickable.                                                                                                                                                                             | `boolean`                  | `false`               |
| `header`          | `header`           | Text in the header                                                                                                                                                                                    | `string`                   | `undefined`           |
| `headerImg`       | `header-img`       | Header image src                                                                                                                                                                                      | `string`                   | `undefined`           |
| `headerImgAlt`    | `header-img-alt`   | Alt text for the header image                                                                                                                                                                         | `string`                   | `undefined`           |
| `headerPlacement` | `header-placement` | Placement of the header                                                                                                                                                                               | `"above" \| "below"`       | `'above'`             |
| `modeVariant`     | `mode-variant`     | Variant of the Card based on the theme used.                                                                                                                                                          | `"primary" \| "secondary"` | `null`                |
| `subheader`       | `subheader`        | Subheader text in the header                                                                                                                                                                          | `string`                   | `undefined`           |


## Events

| Event      | Description                                                              | Type                               |
| ---------- | ------------------------------------------------------------------------ | ---------------------------------- |
| `tdsClick` | Sends unique Card identifier when the Card is clicked, if clickable=true | `CustomEvent<{ cardId: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
