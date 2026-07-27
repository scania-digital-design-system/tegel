import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tds-dropdown-separator',
  styleUrl: 'dropdown-separator.scss',
  shadow: true,
})
export class TdsDropdownSeparator {
  render() {
    return (
      <Host aria-hidden="true" role="separator" tabIndex={-1}>
        <div class="dropdown-separator"></div>
      </Host>
    );
  }
}
