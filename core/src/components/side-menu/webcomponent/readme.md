# sdds-side-menu

The Side Menu is a container for navigation items. It can be collapsed on desktop screens and opened and closed on mobile screens.

Example:

```html
<sdds-side-menu id="sidemenu" aria-label="Side menu">
  <sdds-side-menu-overlay slot="overlay" onclick="getElementById('sidemenu').open = false;"></sdds-side-menu-overlay>

  <sdds-side-menu-close-button slot="close-button" onclick="getElementById('sidemenu').open = false;"></sdds-side-menu-close-button>

  <sdds-side-menu-item>
    <button>
      <sdds-icon name="star" size="24"></sdds-icon>
      About us
    </button>
  </sdds-side-menu-item>

  <sdds-side-menu-item slot="end">
    <button>
      <sdds-side-menu-user heading="Name Namesson" subheading="Company name">
        <img
          slot="image"
          src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg"
          alt="User menu."
        />
      </sdds-side-menu-user>
    </button>
  </sdds-side-menu-item>
</sdds-side-menu>
```


<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                                                                                       | Type      | Default |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `collapsed`  | `collapsed`  | If the Side Menu is collapsed. Only a persistent desktop menu can be collapsed. NOTE: Only use this if you have prevented the automatic collapsing with preventDefault on the sddsCollapse event. | `boolean` | `false` |
| `open`       | `open`       | Applicable only for mobile. If the Side Menu is open or not.                                                                                                                                      | `boolean` | `false` |
| `persistent` | `persistent` | Applicable only for desktop. If the Side Menu should always be shown.                                                                                                                             | `boolean` | `false` |


## Events

| Event          | Description                                            | Type                                   |
| -------------- | ------------------------------------------------------ | -------------------------------------- |
| `sddsCollapse` | Event that is emitted when the Side Menu is collapsed. | `CustomEvent<{ collapsed: boolean; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
