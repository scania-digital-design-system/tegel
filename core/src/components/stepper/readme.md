# sdds-stepper



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                      | Type                         | Default               |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | --------------------- |
| `hideLabels`    | `hide-labels`    | Hides the label for the child components if true.                                                                                                                                                                                                | `boolean`                    | `false`               |
| `labelPosition` | `label-position` | Text position, only available on direction:horizontal                                                                                                                                                                                            | `"aside" \| "below"`         | `'below'`             |
| `orientation`   | `orientation`    | The orientation the children are layed out.                                                                                                                                                                                                      | `"horizontal" \| "vertical"` | `'horizontal'`        |
| `size`          | `size`           | Size of the component and it's children.                                                                                                                                                                                                         | `"lg" \| "sm"`               | `'lg'`                |
| `stepperId`     | `stepper-id`     | ID used for internal stepper functionality and events, must be unique.  **NOTE**: If you're listening for stepper events you need to set this ID yourself to identify the stepper, as the default ID is random and will be different every time. | `string`                     | `crypto.randomUUID()` |


## Events

| Event                     | Description | Type                                                                                                   |
| ------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `internalSddsPropsChange` |             | `CustomEvent<{ stepperId: string; changed: (keyof SddsStepperProps)[]; } & Partial<SddsStepperProps>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
