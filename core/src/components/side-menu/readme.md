<!-- TODO: This looks like the docs from https://tegel.scania.com/components/sidemenu/code. Should we have it here as well? -->

# Introduction
To use the Side Menu you need to use the basic structural setup with a [functional header](/components/header) and then a Side Menu and content area nested in a container with the class `'sdds-push'`. Note that the header should have a `'sdds-nav__mob-menu-btn'` in it so you have something from where to trigger the side-menus open state on lower breakpoints.

<div style="background-color: var(--sdds-information); padding: 14px; font-weight: bold; font-size: 14px; border-radius: 4px;">This documentation applies to Side Menu component found in sdds version 3.*</div>

# Basic structure code example

--------------------------------------------

```jsx
<nav class='sdds-nav sdds-nav__sidemenu'>
    {/* Header content goes here... */}
</nav>
<div class="sdds-push">
    <div class="sdds-sidebar side-menu">
        {/* Side menu content goes here... */}
    </div>
    <div class="sdds-container">
        {/* Page content goes here... */}
    </div>
</div>
```

--------------------------------------------



# Side menu structure
The Side Menu is built up by a wrapper and three sections: mobile header, menu content and menu footer. Footer is used only in collapsible Side Menu.

--------------------------------------------

```jsx
<div class="sdds-sidebar side-menu">
  <div class="sdds-sidebar-mheader">
    Only displays on lower breakpoints
  </div>
  <ul class="sdds-sidebar-nav sdds-sidebar-nav--main">
    Menu items goes here...
  </ul>
  <ul class="sdds-sidebar-nav sdds-sidebar-nav--bottom">
    Sticky bottom items goes here...
  </ul>
</div>
```

--------------------------------------------


# Side menu header
The side-menu header is simply used to display to close button on lower breakpoints.

--------------------------------------------

```jsx
<div class="sdds-sidebar-mheader">
    <a class="sdds-sidebar-mheader__close">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.40338 2.34308C3.11048 2.05019 2.63561 2.05019 2.34272 2.34308C2.04982 2.63598 2.04982 3.11085 2.34272 3.40374L6.93897 8L2.34283 12.5961C2.04994 12.889 2.04994 13.3639 2.34283 13.6568C2.63572 13.9497 3.1106 13.9497 3.40349 13.6568L7.99963 9.06066L12.5958 13.6568C12.8887 13.9497 13.3635 13.9497 13.6564 13.6568C13.9493 13.3639 13.9493 12.889 13.6564 12.5961L9.06029 8L13.6565 3.40376C13.9494 3.11086 13.9494 2.63599 13.6565 2.3431C13.3636 2.0502 12.8888 2.0502 12.5959 2.3431L7.99963 6.93934L3.40338 2.34308Z" fill="#171719"/></svg>
    </a>
</div>
```

--------------------------------------------


# Page links
The page links are to be placed as `'sdds-sidebar-nav__item'` within `'sdds-sidebar-nav--main.'`

--------------------------------------------

```jsx
<ul class="sdds-sidebar-nav sdds-sidebar-nav--main">
  <li class="sdds-sidebar-nav__item"></li>
  <li class="sdds-sidebar-nav__item"></li>
  <li class="sdds-sidebar-nav__item"></li>
</ul>
```

--------------------------------------------

The basic structure of a Side Menu item is as follows:

--------------------------------------------

```jsx
<li class="sdds-sidebar-nav__item">
  <a class="sdds-sidebar-nav__item-link">
    <span class="sdds-sidebar-nav__item-text">Page link</span>
  </a>
</li>
```

--------------------------------------------

!! The Side Menu has an active state that is displayed by adding the class `'sdds-item--active'` to the item by a method of you choice.



# Sub-menus with page links
You can nest lists in Side Menu to create sub-menus. Style the first item in the sub-menu as `'sdds-sidebar-nav__extended'` and add the chevron icon as an inline svg. Repeat the sub-menu name as first list item in the nested list and style as `'sdds-sidebar-nav__item-title'`. This displays the sub-menu name above page links when Side Menu is collapsed and user hovers over it. List subsequent page links as usual.

--------------------------------------------

```jsx
<li class="sdds-sidebar-nav__item sdds-sidebar-nav__extended">
    <a class="sdds-sidebar-nav__item-link" href="#">
        <span class="sdds-sidebar-nav__item-text">Sub-menu</span>
        <svg class="sdds-sidebar-nav__chevron" width="12" height="7" viewBox="0 0 12 7" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                stroke-linejoin="round"></path>
        </svg>
    </a>
    {/* Sub menu */}
    <ul class="sdds-sidebar-nav-subnav">
    {/* Sub menu title shows on collapsed Side Menu */}
        <li class="sdds-sidebar-nav-subnav__item">
            <span class="sdds-sidebar-nav__item-title">Sub-menu</span>
        </li>
    {/* Sub menu page links */}
        <li class="sdds-sidebar-nav-subnav__item">
            <a class="sdds-sidebar-nav__item-link" href="#"><span class="sdds-sidebar-nav__item-text">Sub Page
                    name</span></a>
        </li>
        <li class="sdds-sidebar-nav-subnav__item">
            <a class="sdds-sidebar-nav__item-link" href="#"><span class="sdds-sidebar-nav__item-text">Sub Page
                    name</span></a>
        </li>
        <li class="sdds-sidebar-nav-subnav__item">
            <a class="sdds-sidebar-nav__item-link" href="#"><span class="sdds-sidebar-nav__item-text">Sub Page
                    name</span></a>
        </li>
    </ul>
    {/* End of sub menu */}
</li>
```

--------------------------------------------

!! Toggle the display of the sup page items with the class .subnav-open on the Side Menu parent.
!! Toggle a sup page options active state with the class .sdds-item--active to the item by a method of you choice.



# Icons
Icons are optional for non-collapsible menu but mandatory for the collapsible. Icons should be in inline svg and have the class `'sdds-sidebar-nav__icon'`. Appropriate icons are available in the SDDS icon library. 

If you are looking for a more dynamic solution you can toggle the visibility of icons by adding the class `'icons-disabled'` to the `'sdds-sidebar-nav--main'` container.

--------------------------------------------

```jsx
<li class="sdds-sidebar-nav__item">
  <a class="sdds-sidebar-nav__item-link">
    {/* Icon */} <svg class="sdds-sidebar-nav__icon" width="20" height="20" viewBox="0 0 20 20" fill="#e2e2e4" xmlns="http://www.w3.org/2000/svg"><rect y="0.334473" width="20" height="20"/></svg>
    <span>Page link</span>
  </a>
</li>
```

--------------------------------------------



# Collapsible
Note that if you opt for a collapsible menu, you need to have icon added, since the collapsed state of the menu shows only the icons. To add a collapse-button simply put a `'sdds-sidebar-nav__item'` (the same way you do any Side Menu item) in the `'sdds-sidebar-nav--bottom'` container. and select an appropriate icon for it. We recommend arrow-left from the icon library. Below is an example with the recommended icon embedded.

--------------------------------------------

```jsx
<ul class="sdds-sidebar-nav sdds-sidebar-nav--bottom icons-enabled">
    <li class="sdds-sidebar-nav__item">
        <a class="sdds-sidebar-toggle sdds-sidebar-nav__item-link" href="#">
            <svg class="sdds-sidebar-nav__icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M14.046 5.685a1 1 0 0 0-1.414-1.415l-9.9 9.9a2.6 2.6 0 0 0 0 3.678l9.9 9.9a1 1 0 1 0 1.415-1.415L4.722 17.01h24.306a1 1 0 0 0 0-2H4.722l9.325-9.324Z"
                    fill="currentColor"></path>
            </svg>
            <span class="sdds-sidebar-nav__item-text">Collapse</span>
        </a>
    </li>
</ul>
```

--------------------------------------------

!! Toggle the collapsed state with the class `.collapsed` on the `.side-menu` container.



# Responsive
The Side Menu collapses into a hamburger menu at lower breakpoints. To then access the menu you need to add the att a trigger to open the menu. Place the trigger on the `'sdds-nav__mob-menu-btn'` in the header and make it add the class `'mobile-menu-open'` to the `'side-menu'` container. To close the menu, add a trigger to `'sdds-sidebar-mheader__close'` that removes the class `'mobile-menu-open'`.
