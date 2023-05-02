# radio-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                     | Type      | Default               |
| ---------- | ---------- | ----------------------------------------------- | --------- | --------------------- |
| `checked`  | `checked`  | Decides if the radio button is checked or not.  | `boolean` | `false`               |
| `disabled` | `disabled` | Decides if the radio button is disabled or not. | `boolean` | `false`               |
| `name`     | `name`     | Name of radio button, used for reference.       | `string`  | `undefined`           |
| `radioId`  | `radio-id` | Unique radio button identifier.                 | `string`  | `crypto.randomUUID()` |
| `required` | `required` | Decides if the radio button is required or not. | `boolean` | `false`               |
| `value`    | `value`    | Value of input.                                 | `string`  | `undefined`           |


## Events

| Event        | Description                                                                                                                                                                                                      | Type                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `sddsChange` | Sends unique radio button identifier and status when it is checked. If no ID is specified a random one will be generated. To use this listener don't use the randomized ID, use a specific one of your choosing. | `CustomEvent<{ radioId: string; value: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
