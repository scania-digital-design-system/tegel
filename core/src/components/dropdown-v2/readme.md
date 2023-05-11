# sdds-dropdown-v2

The dropdown can be populated with options either by passing the `<sdds-dropdown-option>` as a child to the element. Or by specifying a data property on the element.
This property should be a JSON array containing objects of the following structure:

```json
{ 
  "value": string;
  "label": any;
  "disabled": boolean; 
}
```


<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                | Type                                                     | Default       |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------- |
| `defaultValue`  | `default-value`  | Default value selected in the dropdown.                                                    | `string`                                                 | `undefined`   |
| `disabled`      | `disabled`       | Sets the dropdown in a disabled state                                                      | `boolean`                                                | `false`       |
| `error`         | `error`          | Sets the dropdown in an error state                                                        | `boolean`                                                | `false`       |
| `filter`        | `filter`         | Enables filtration in the dropdown.                                                        | `boolean`                                                | `false`       |
| `helper`        | `helper`         | Helper text for the dropdown.                                                              | `string`                                                 | `undefined`   |
| `label`         | `label`          | Label text for the dropdown.                                                               | `string`                                                 | `undefined`   |
| `labelPosition` | `label-position` | Label text position                                                                        | `"inside" \| "outside"`                                  | `undefined`   |
| `modeVariant`   | `mode-variant`   | Mode variant of the component, based on current mode.                                      | `"primary" \| "secondary"`                               | `null`        |
| `multiselect`   | `multiselect`    | Enables multiselect in the dropdown.                                                       | `boolean`                                                | `false`       |
| `name`          | `name`           | Name for the dropdowns input element.                                                      | `string`                                                 | `undefined`   |
| `noResultText`  | `no-result-text` | Text that is displayed if filter is used and there are no options that matches the search. | `string`                                                 | `'No result'` |
| `openDirection` | `open-direction` | The direction the dropdown should open, auto if not specified.                             | `"auto" \| "down" \| "up"`                               | `'auto'`      |
| `options`       | --               | Populate the dropdown via a JSON array                                                     | `{ value: string; label: string; disabled: boolean; }[]` | `undefined`   |
| `placeholder`   | `placeholder`    | Placeholder text for the dropdown.                                                         | `string`                                                 | `undefined`   |
| `size`          | `size`           | The size of the dropdown.                                                                  | `"lg" \| "md" \| "sm"`                                   | `'lg'`        |


## Events

| Event        | Description                    | Type                                            |
| ------------ | ------------------------------ | ----------------------------------------------- |
| `sddsBlur`   | Blur event for the dropdown.   | `CustomEvent<FocusEvent>`                       |
| `sddsChange` | Change event for the dropdown. | `CustomEvent<{ name: string; value: string; }>` |
| `sddsFocus`  | Focus event for the dropdown.  | `CustomEvent<FocusEvent>`                       |
| `sddsInput`  | Input event for the dropdown.  | `CustomEvent<InputEvent>`                       |


## Methods

### `close() => Promise<void>`

Method for closing the dropdown.

#### Returns

Type: `Promise<void>`



### `removeValue(oldValue: string) => Promise<{ value: string; label: string; }[]>`

Method for removing a selected value in the dropdown.

#### Returns

Type: `Promise<{ value: string; label: string; }[]>`



### `reset() => Promise<void>`

Method that resets the dropdown.

#### Returns

Type: `Promise<void>`



### `setValue(newValue: string, newValueLabel: string) => Promise<{ value: string; label: string; }[]>`

Method for setting the value of the dropdown.

#### Returns

Type: `Promise<{ value: string; label: string; }[]>`




## Dependencies

### Depends on

- [tds-icon](../icon)

### Graph
```mermaid
graph TD;
  sdds-dropdown-v2 --> tds-icon
  style sdds-dropdown-v2 fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
