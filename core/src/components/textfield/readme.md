# sdds-textfield

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                 | Type                                  | Default      |
| --------------- | ---------------- | ------------------------------------------- | ------------------------------------- | ------------ |
| `autofocus`     | `autofocus`      | Autofocus for input                         | `boolean`                             | `false`      |
| `disabled`      | `disabled`       | Set input in disabled state                 | `boolean`                             | `false`      |
| `helper`        | `helper`         | Helper text                                 | `string`                              | `undefined`  |
| `label`         | `label`          | Label text                                  | `string`                              | `''`         |
| `labelPosition` | `label-position` | Position of the label for the textfield.    | `"inside" \| "no-label" \| "outside"` | `'no-label'` |
| `maxLength`     | `max-length`     | Max length of input                         | `number`                              | `undefined`  |
| `modeVariant`   | `mode-variant`   | Mode variant of the textfield               | `"primary" \| "secondary"`            | `null`       |
| `name`          | `name`           | Name property                               | `string`                              | `''`         |
| `noMinWidth`    | `no-min-width`   | With setting                                | `boolean`                             | `false`      |
| `placeholder`   | `placeholder`    | Placeholder text                            | `string`                              | `''`         |
| `readOnly`      | `read-only`      | Set input in readonly state                 | `boolean`                             | `false`      |
| `size`          | `size`           | Size of the input                           | `"lg" \| "md" \| "sm"`                | `'lg'`       |
| `state`         | `state`          | Error state of input                        | `"default" \| "error" \| "success"`   | `'default'`  |
| `type`          | `type`           | Which input type, text, password or similar | `"password" \| "text"`                | `'text'`     |
| `value`         | `value`          | Value of the input text                     | `string`                              | `''`         |


## Events

| Event        | Description                    | Type                      |
| ------------ | ------------------------------ | ------------------------- |
| `sddsBlur`   | Blur event for the textfield   | `CustomEvent<FocusEvent>` |
| `sddsChange` | Change event for the textfield | `CustomEvent<any>`        |
| `sddsFocus`  | Focus event for the textfield  | `CustomEvent<FocusEvent>` |
| `sddsInput`  | Input event for the textfield  | `CustomEvent<InputEvent>` |


## Dependencies

### Depends on

- [sdds-icon](../icon)

### Graph
```mermaid
graph TD;
  sdds-textfield --> sdds-icon
  style sdds-textfield fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
