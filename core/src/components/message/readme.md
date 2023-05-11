# sdds-message



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                      | Type                                                 | Default         |
| ------------- | -------------- | ------------------------------------------------ | ---------------------------------------------------- | --------------- |
| `header`      | `header`       | Header text for the component.                   | `string`                                             | `undefined`     |
| `minimal`     | `minimal`      | Minimal message styling.                         | `boolean`                                            | `false`         |
| `modeVariant` | `mode-variant` | Variant of the component, based on current mode. | `"primary" \| "secondary"`                           | `null`          |
| `noIcon`      | `no-icon`      | Removes the icon in the message.                 | `boolean`                                            | `false`         |
| `type`        | `type`         | Type of message.                                 | `"error" \| "information" \| "success" \| "warning"` | `'information'` |


## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  sdds-message --> tds-icon
  style sdds-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
