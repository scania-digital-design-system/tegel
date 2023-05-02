# sdds-toggle



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                              | Type           | Default               |
| ---------- | ----------- | ------------------------------------------------------------------------ | -------------- | --------------------- |
| `checked`  | `checked`   | Sets the toggle as checked                                               | `boolean`      | `false`               |
| `disabled` | `disabled`  | Sets the toggle in a disabled state                                      | `boolean`      | `false`               |
| `headline` | `headline`  | Headline for the toggle                                                  | `string`       | `undefined`           |
| `name`     | `name`      | Name of the toggles input element                                        | `string`       | `undefined`           |
| `required` | `required`  | Make the toggle required                                                 | `boolean`      | `false`               |
| `size`     | `size`      | Size of the toggle                                                       | `"lg" \| "sm"` | `'lg'`                |
| `toggleId` | `toggle-id` | ID of the toggles input element, if not specifed it's randomly generated | `string`       | `crypto.randomUUID()` |


## Events

| Event        | Description                                                   | Type                                                   |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------ |
| `sddsToggle` | Sends unique toggle identifier and status when it is toggled. | `CustomEvent<{ toggleId: string; checked: boolean; }>` |


## Methods

### `toggle() => Promise<{ toggleId: string; checked: boolean; }>`

Toggles the toggle.

#### Returns

Type: `Promise<{ toggleId: string; checked: boolean; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
