import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'tds-dropdown-group-separator',
  styleUrl: 'dropdown-group-separator.scss',
  shadow: true,
})
export class TdsDropdownGroupSeparator {
  render() {
    return (
      <Host aria-hidden="true" role="separator" tabIndex={-1}>
        <div class="dropdown-group-separator"></div>
      </Host>
    );
  }
}
