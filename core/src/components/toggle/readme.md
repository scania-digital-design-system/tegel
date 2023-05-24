# tds-toggle



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                                | Type           | Default               |
| ---------- | ----------- | -------------------------------------------------------------------------- | -------------- | --------------------- |
| `checked`  | `checked`   | Sets the Toggle as checked                                                 | `boolean`      | `false`               |
| `disabled` | `disabled`  | Sets the Toggle in a disabled state                                        | `boolean`      | `false`               |
| `headline` | `headline`  | Headline for the Toggle                                                    | `string`       | `undefined`           |
| `name`     | `name`      | Name of the toggles input element                                          | `string`       | `undefined`           |
| `required` | `required`  | Make the Toggle required                                                   | `boolean`      | `false`               |
| `size`     | `size`      | Size of the Toggle                                                         | `"lg" \| "sm"` | `'lg'`                |
| `toggleId` | `toggle-id` | ID of the Toggle's input element, if not specified it's randomly generated | `string`       | `crypto.randomUUID()` |


## Events

| Event       | Description                                                   | Type                                                   |
| ----------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| `tdsToggle` | Sends unique Toggle identifier and status when it is toggled. | `CustomEvent<{ toggleId: string; checked: boolean; }>` |


## Methods

### `toggle() => Promise<{ toggleId: string; checked: boolean; }>`

Toggles the Toggle.

#### Returns

Type: `Promise<{ toggleId: string; checked: boolean; }>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
