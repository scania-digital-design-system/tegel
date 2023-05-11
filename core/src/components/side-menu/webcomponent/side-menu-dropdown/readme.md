# sdds-side-menu-dropdown

The Side Menu dropdown is a container for navigation items.

Example:

```html
<sdds-side-menu-dropdown
  button-label="Dropdown"
>
  <tds-icon slot="button-icon" name="star" size="24"></tds-icon>
  <span slot="button-label">Button label</span>
  <sdds-side-menu-dropdown-list>
    <sdds-side-menu-dropdown-list-item>
      <a href="#">Link 1</a>
    </sdds-side-menu-dropdown-list-item>
    <sdds-side-menu-dropdown-list-item selected="true">
      <a href="#">Link 2</a>
    </sdds-side-menu-dropdown-list-item>
    <sdds-side-menu-dropdown-list-item>
      <a href="#">Link 3</a>
    </sdds-side-menu-dropdown-list-item>
  </sdds-side-menu-dropdown-list>
</sdds-side-menu-dropdown>
```


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                       | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `buttonLabel` | `button-label` | The label of the button that opens the dropdown. This is an alternative to the button-label slot. | `string`  | `undefined` |
| `defaultOpen` | `default-open` | If the dropdown should be open from the start.                                                    | `boolean` | `false`     |
| `selected`    | `selected`     | If the button that opens the dropdown should appear selected.                                     | `boolean` | `false`     |


## Dependencies

### Depends on

- [sdds-side-menu-item](../side-menu-item)
- [tds-icon](../../../icon)

### Graph
```mermaid
graph TD;
  sdds-side-menu-dropdown --> sdds-side-menu-item
  sdds-side-menu-dropdown --> tds-icon
  style sdds-side-menu-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
