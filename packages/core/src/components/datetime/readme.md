# tds-datetime

The tds-datetime component currently has the following limitations:
- On iOS, the native input "calendar" does not limit the selection according to the min/max values defined. This can be seen in [MDN browser compatibility table](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date#browser_compatibility).
- Depending on the Operating System, browser and locale/region the user is in, the value displayed to the user, for the input type "date", "time", or "datetime-local" may differ in their patterns (eg: time may use AM/PM or not, date may be `DD-MM-YYYY` or `MM-DD-YYYY`, and the separator may alter between dash `-` a forward slash `/`). 

Despite the visual discrepancies, the value used internally for handling dates is always in the ISO 8601 format, ie, `YYYY-MM-DD`.

These issues stem from the use of the native HTML <code style="font-size: inherit !important">&lt;input&gt;</code> element, which inherits these limitations.

<br>


<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                                                                                                                                                            | Type                                                        | Default                                |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | -------------------------------------- |
| `autofocus`          | `autofocus`            | Autofocus for input                                                                                                                                                                                    | `boolean`                                                   | `false`                                |
| `customValidator`    | --                     | Function for additional validation based on business rules                                                                                                                                             | `((value: string) => boolean) \| undefined`                 | `undefined`                            |
| `defaultValue`       | `default-value`        | Default value of the component.<br/>Format for date-time: yyyy-MM-ddTHH:mm.<br/>Format for date: yyyy-MM-dd.<br/>Format for month: yyyy-MM.<br/>Format for week: yyyy-Www.<br/>Format for time: HH:mm. | `string`                                                    | `'none'`                               |
| `disabled`           | `disabled`             | Set input in disabled state                                                                                                                                                                            | `boolean`                                                   | `false`                                |
| `helper`             | `helper`               | Default contextual helper text for the component for states = success or none                                                                                                                          | `string`                                                    | `''`                                   |
| `helperError`        | `helper-error`         | Contextual helper text for the component for error state                                                                                                                                               | `string \| undefined`                                       | `undefined`                            |
| `helperErrorInvalid` | `helper-error-invalid` | Contextual helper text for the component when input is invalid                                                                                                                                         | `string \| undefined`                                       | `'Invalid input'`                      |
| `label`              | `label`                | Label text for the component                                                                                                                                                                           | `string`                                                    | `''`                                   |
| `labelPosition`      | `label-position`       | Position of the label                                                                                                                                                                                  | `"inside" \| "no-label" \| "outside"`                       | `'no-label'`                           |
| `max`                | `max`                  | Sets max value.<br/>Example for different types:<br/>datetime="2023-01-31T00:00"<br/>date="2023-01-01"<br/>month="2023-01"<br/>week="2023-W02"<br/>time="15:00"                                        | `string \| undefined`                                       | `undefined`                            |
| `min`                | `min`                  | Sets min value.<br/>Example for different types:<br/>datetime="2023-01-31T00:00"<br/>date="2023-01-01"<br/>month="2023-01"<br/>week="2023-W02"<br/>time="15:00"                                        | `string \| undefined`                                       | `undefined`                            |
| `modeVariant`        | `mode-variant`         | Set the variant of the Datetime component.                                                                                                                                                             | `"primary" \| "secondary" \| null`                          | `null`                                 |
| `name`               | `name`                 | Name property. Uses a unique ID as fallback if not specified.                                                                                                                                          | `string`                                                    | `` `datetime-${generateUniqueId()}` `` |
| `noMinWidth`         | `no-min-width`         | Resets min width rule                                                                                                                                                                                  | `boolean`                                                   | `false`                                |
| `size`               | `size`                 | Size of the input                                                                                                                                                                                      | `"lg" \| "md" \| "sm"`                                      | `'lg'`                                 |
| `state`              | `state`                | Switches between success and error state.                                                                                                                                                              | `"error" \| "none" \| "success" \| undefined`               | `undefined`                            |
| `tdsAriaLabel`       | `tds-aria-label`       | Value for the aria-label attribute                                                                                                                                                                     | `string \| undefined`                                       | `undefined`                            |
| `type`               | `type`                 | Sets an input type                                                                                                                                                                                     | `"date" \| "datetime-local" \| "month" \| "time" \| "week"` | `'datetime-local'`                     |
| `value`              | `value`                | Value of the input text                                                                                                                                                                                | `string`                                                    | `''`                                   |


## Events

| Event       | Description                   | Type                      |
| ----------- | ----------------------------- | ------------------------- |
| `tdsBlur`   | Blur event for the Datetime   | `CustomEvent<FocusEvent>` |
| `tdsChange` | Change event for the Datetime | `CustomEvent<any>`        |
| `tdsFocus`  | Focus event for the Datetime  | `CustomEvent<FocusEvent>` |
| `tdsInput`  | Input event for the Datetime  | `CustomEvent<InputEvent>` |


## Methods

### `focusElement() => Promise<void>`

Method to programmatically focus the datetime element

#### Returns

Type: `Promise<void>`



### `reset() => Promise<void>`

Method that resets the value of the Datetime, using defaultValue if is not 'none'

#### Returns

Type: `Promise<void>`



### `setValue(newValue: string) => Promise<void>`

Method that sets the value of the datetime element

#### Parameters

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| `newValue` | `string` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  tds-datetime --> tds-icon
  style tds-datetime fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
