# tds-message



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                                                                              | Type                                                 | Default         |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------- |
| `header`         | `header`           | Header text for the component.                                                                                                                           | `string`                                             | `undefined`     |
| `minimal`        | `minimal`          | Minimal Message styling.                                                                                                                                 | `boolean`                                            | `false`         |
| `modeVariant`    | `mode-variant`     | Variant of the component, based on current mode.                                                                                                         | `"primary" \| "secondary" \| null`                   | `null`          |
| `noIcon`         | `no-icon`          | Removes the icon in the Message.                                                                                                                         | `boolean`                                            | `false`         |
| `tdsAlertDialog` | `tds-alert-dialog` | Role of the message component. Can be either 'alertdialog' for important messages that require immediate attention, or 'dialog' for regular messages.    | `"alertdialog" \| "dialog"`                          | `'dialog'`      |
| `tdsAriaLabel`   | `tds-aria-label`   | Provides an accessible name for the message component when no header is present. This ensures proper screen reader support for dialog/alertdialog roles. | `string`                                             | `undefined`     |
| `variant`        | `variant`          | Variant of Message.                                                                                                                                      | `"error" \| "information" \| "success" \| "warning"` | `'information'` |


## Slots

| Slot          | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| `"<default>"` | <b>Unnamed slot.</b> For the extended message. Not visible on minimal messages. |


## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  tds-message --> tds-icon
  style tds-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
