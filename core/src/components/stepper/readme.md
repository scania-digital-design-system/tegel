# tds-stepper



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                       | Type                         | Default              |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------- |
| `hideLabels`    | `hide-labels`    | Hides the label for the child components if true.                                                                                                                                                                                                 | `boolean`                    | `false`              |
| `labelPosition` | `label-position` | Text position, only available on a direction: horizontal                                                                                                                                                                                          | `"aside" \| "below"`         | `'below'`            |
| `orientation`   | `orientation`    | The orientation the Steps                                                                                                                                                                                                                         | `"horizontal" \| "vertical"` | `'horizontal'`       |
| `size`          | `size`           | Size of the component and it's children.                                                                                                                                                                                                          | `"lg" \| "sm"`               | `'lg'`               |
| `stepperId`     | `stepper-id`     | ID used for internal Stepper functionality and events, must be unique.  **NOTE**: If you're listening for Stepper events, you need to set this ID yourself to identify the Stepper, as the default ID is random and will be different every time. | `string`                     | `generateUniqueId()` |


## Events

| Event                    | Description | Type                                                                                                 |
| ------------------------ | ----------- | ---------------------------------------------------------------------------------------------------- |
| `internalTdsPropsChange` |             | `CustomEvent<{ stepperId: string; changed: (keyof TdsStepperProps)[]; } & Partial<TdsStepperProps>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
