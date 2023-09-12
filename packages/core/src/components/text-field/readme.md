# tds-text-field



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                 | Type                                  | Default      |
| --------------- | ---------------- | ------------------------------------------- | ------------------------------------- | ------------ |
| `autofocus`     | `autofocus`      | Autofocus for input                         | `boolean`                             | `false`      |
| `disabled`      | `disabled`       | Set input in disabled state                 | `boolean`                             | `false`      |
| `helper`        | `helper`         | Helper text                                 | `string`                              | `undefined`  |
| `label`         | `label`          | Label text                                  | `string`                              | `''`         |
| `labelPosition` | `label-position` | Position of the label for the Text Field.   | `"inside" \| "no-label" \| "outside"` | `'no-label'` |
| `maxLength`     | `max-length`     | Max length of input                         | `number`                              | `undefined`  |
| `modeVariant`   | `mode-variant`   | Mode variant of the Text Field              | `"primary" \| "secondary"`            | `null`       |
| `name`          | `name`           | Name property                               | `string`                              | `''`         |
| `noMinWidth`    | `no-min-width`   | Unset minimum width of 208px.               | `boolean`                             | `false`      |
| `placeholder`   | `placeholder`    | Placeholder text                            | `string`                              | `''`         |
| `readOnly`      | `read-only`      | Set input in readonly state                 | `boolean`                             | `false`      |
| `size`          | `size`           | Size of the input                           | `"lg" \| "md" \| "sm"`                | `'lg'`       |
| `state`         | `state`          | Error state of input                        | `"default" \| "error" \| "success"`   | `'default'`  |
| `type`          | `type`           | Which input type, text, password or similar | `"password" \| "text"`                | `'text'`     |
| `value`         | `value`          | Value of the input text                     | `string`                              | `''`         |


## Events

| Event       | Description                     | Type                      |
| ----------- | ------------------------------- | ------------------------- |
| `tdsBlur`   | Blur event for the Text Field   | `CustomEvent<FocusEvent>` |
| `tdsChange` | Change event for the Text Field | `CustomEvent<any>`        |
| `tdsFocus`  | Focus event for the Text Field  | `CustomEvent<FocusEvent>` |
| `tdsInput`  | Input event for the Text Field  | `CustomEvent<InputEvent>` |


## Slots

| Slot       | Description                           |
| ---------- | ------------------------------------- |
| `"prefix"` | Slot for the prefix in the Text Field |
| `"suffix"` | Slot for the suffix in the Text Field |


## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  tds-text-field --> tds-icon
  style tds-text-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
