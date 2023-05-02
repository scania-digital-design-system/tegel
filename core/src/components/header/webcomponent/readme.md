# sdds-header

The header is a component that can be used to display a header on the page.

Example:

```html
<sdds-header>
  <sdds-header-title>
    Example: default
  </sdds-header-title>

  <sdds-header-item>
    <a href="https://www.scania.com" target="_blank">
      Scania
    </a>
  </sdds-header-item>

  <sdds-header-launcher slot="end">
    <sdds-header-launcher-list-title>Cool apps</sdds-header-launcher-list-title>
    <sdds-header-launcher-list>
      <sdds-header-launcher-list-item>
        <a href="https://tegel.scania.com">
          Button
        </a>
      </sdds-header-launcher-list-item>
      <sdds-header-launcher-list-item>
        <a href="https://tegel.scania.com">
          Button
        </a>
      </sdds-header-launcher-list-item>
    </sdds-header-launcher-list>
  </sdds-header-launcher>

  <sdds-header-brand-symbol slot="end" link-href="https://design.scania.com" aria-label="Scania - red gryphon on blue shield">
  </sdds-header-brand-symbol>

</sdds-header>
```

## Header components API:
See [default header story](/info/components-headerv2--default).

## Side menu components API:
See [default header story](/info/components-headerv2--default).


<!-- Auto Generated Below -->


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
