# tds-date-range-picker



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                                                                                                                                                                       | Type                                  | Default                                    |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------ |
| `datePickerId`  | `date-picker-id`  | ID used for internal Date Picker functionality and events, must be unique.                                                                                                                        | `string`                              | `generateUniqueId()`                       |
| `endDate`       | `end-date`        |                                                                                                                                                                                                   | `string`                              | `undefined`                                |
| `helper`        | `helper`          | Helper text for the Date Picker                                                                                                                                                                   | `string`                              | `undefined`                                |
| `label`         | `label`           | Label text                                                                                                                                                                                        | `string`                              | `undefined`                                |
| `labelPosition` | `label-position`  | Position of the label for the Text Field.                                                                                                                                                         | `"inside" \| "no-label" \| "outside"` | `'no-label'`                               |
| `locale`        | `locale`          |                                                                                                                                                                                                   | `"de" \| "en" \| "sv"`                | `'en'`                                     |
| `max`           | `max`             | Maximim selectable date.                                                                                                                                                                          | `string`                              | `undefined`                                |
| `min`           | `min`             | Minimum selectable date.                                                                                                                                                                          | `string`                              | `undefined`                                |
| `modeVariant`   | `mode-variant`    | Set the variant of the Datepicker.                                                                                                                                                                | `"primary" \| "secondary"`            | `undefined`                                |
| `range`         | `range`           |                                                                                                                                                                                                   | `boolean`                             | `undefined`                                |
| `startDate`     | `start-date`      |                                                                                                                                                                                                   | `string`                              | `format(startOfToday(), this.getFormat())` |
| `state`         | `state`           | State of the Date Picker                                                                                                                                                                          | `"default" \| "error" \| "success"`   | `'default'`                                |
| `weekDayLabels` | `week-day-labels` | Labels for the week days, should be a single string containing the first letter of each day of the week. For example: MTWTFSS -> Monday, Thursday, Wednesday, Thursday, Friday, Saturday, Sunday. | `string`                              | `'MTWTFSS'`                                |


## Events

| Event       | Description                                                                  | Type                                         |
| ----------- | ---------------------------------------------------------------------------- | -------------------------------------------- |
| `tdsSelect` | Fires when the Accordion Item is clicked, but before it is closed or opened. | `CustomEvent<{ date: string; id: string; }>` |


## Dependencies

### Depends on

- [tds-text-field](../text-field)
- [tds-icon](../icon)
- [tds-popover-core](../popover-core)
- [tds-button](../button)
- [date-picker-day](../date-picker/day)

### Graph
```mermaid
graph TD;
  tds-date-range-picker --> tds-text-field
  tds-date-range-picker --> tds-icon
  tds-date-range-picker --> tds-popover-core
  tds-date-range-picker --> tds-button
  tds-date-range-picker --> date-picker-day
  tds-text-field --> tds-icon
  style tds-date-range-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
