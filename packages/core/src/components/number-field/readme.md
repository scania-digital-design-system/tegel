# tds-number-field



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                 | Type                                  | Default      |
| --------------- | ---------------- | ------------------------------------------- | ------------------------------------- | ------------ |
| `autofocus`     | `autofocus`      | Autofocus for input                         | `boolean`                             | `false`      |
| `disabled`      | `disabled`       | Set input in disabled state                 | `boolean`                             | `false`      |
| `helper`        | `helper`         | Helper text                                 | `string`                              | `undefined`  |
| `label`         | `label`          | Label text                                  | `string`                              | `''`         |
| `labelPosition` | `label-position` | Position of the label for the Number Field. | `"inside" \| "no-label" \| "outside"` | `'no-label'` |
| `max`           | `max`            | Max allowed value for input type number     | `number \| string`                    | `undefined`  |
| `min`           | `min`            | Min allowed value for input type number     | `number \| string`                    | `undefined`  |
| `modeVariant`   | `mode-variant`   | Mode variant of the Number Field            | `"primary" \| "secondary"`            | `null`       |
| `name`          | `name`           | Name property                               | `string`                              | `''`         |
| `noMinWidth`    | `no-min-width`   | Unset minimum width of 208px.               | `boolean`                             | `false`      |
| `placeholder`   | `placeholder`    | Placeholder text                            | `string`                              | `''`         |
| `readOnly`      | `read-only`      | Set input in readonly state                 | `boolean`                             | `false`      |
| `size`          | `size`           | Size of the input                           | `"lg" \| "md" \| "sm"`                | `'lg'`       |
| `state`         | `state`          | Error state of input                        | `"default" \| "error" \| "success"`   | `'default'`  |
| `value`         | `value`          | Value of the input                          | `number`                              | `undefined`  |


## Events

| Event       | Description                       | Type                      |
| ----------- | --------------------------------- | ------------------------- |
| `tdsBlur`   | Blur event for the Number Field   | `CustomEvent<FocusEvent>` |
| `tdsChange` | Change event for the Number Field | `CustomEvent<any>`        |
| `tdsFocus`  | Focus event for the Number Field  | `CustomEvent<FocusEvent>` |
| `tdsInput`  | Input event for the Number Field  | `CustomEvent<InputEvent>` |


## Slots

| Slot       | Description                             |
| ---------- | --------------------------------------- |
| `"prefix"` | Slot for the prefix in the Number Field |
| `"suffix"` | Slot for the suffix in the Number Field |


## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  tds-number-field --> tds-icon
  style tds-number-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
