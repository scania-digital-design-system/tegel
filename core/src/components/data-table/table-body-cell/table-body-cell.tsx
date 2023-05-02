import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { InternalSddsTablePropChange } from '../table/table';

const relevantTableProps: InternalSddsTablePropChange['changed'] = [
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
];
@Component({
  tag: 'sdds-body-cell',
  styleUrl: 'table-body-cell.scss',
  shadow: true,
})
export class TableBodyCell {
  /** Value that will be presented as text inside a cell */
  @Prop({ reflect: true }) cellValue: string | number;

  /** Passing same cell key for all body cells which is used in head cell enables features of text align and hovering */
  @Prop({ reflect: true }) cellKey: any;

  /** Disables internal padding. Useful when passing other components to cell. */
  @Prop({ reflect: true }) disablePadding: boolean = false;

  @State() textAlignState: string;

  @State() activeSorting: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLSddsTableElement;

  @Listen('internalSddsPropChange', { target: 'body' })
  internalSddsPropChangeListener(event: CustomEvent<InternalSddsTablePropChange>) {
    if (this.tableId === event.detail.tableId) {
      event.detail.changed
        .filter((changedProp) => relevantTableProps.includes(changedProp))
        .forEach((changedProp) => {
          if (typeof this[changedProp] === 'undefined') {
            throw new Error(`Table prop is not supported: ${changedProp}`);
          }
          this[changedProp] = event.detail[changedProp];
        });
    }
  }

  // Listen to headKey from data-table-header-element
  @Listen('internalSddsHover', { target: 'body' })
  internalSddsHoverListener(event: CustomEvent<any>) {
    const { tableId, key } = event.detail;

    if (tableId === this.tableId) {
      this.activeSorting = this.cellKey === key;
    }
  }

  // Listen to internalSddsTextAlign from data-table-header-element
  @Listen('internalSddsTextAlign', { target: 'body' })
  internalSddsTextAlignListener(event: CustomEvent<any>) {
    const [receivedID, receivedKey, receivedTextAlign] = event.detail;

    if (this.tableId === receivedID) {
      if (this.cellKey === receivedKey) {
        this.textAlignState = receivedTextAlign;
      }
    }
  }

  connectedCallback() {
    this.tableEl = this.host.closest('sdds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
  }

  render() {
    return (
      <Host
        class={{
          'sdds-table__body-cell': true,
          'sdds-table__body-cell--hover': this.activeSorting,
          'sdds-table__compact': this.compactDesign,
          'sdds-table--divider': this.verticalDividers,
          'sdds-table--no-min-width': this.noMinWidth,
          'sdds-table__body-cell--no-padding': this.disablePadding,
        }}
        style={{ textAlign: this.textAlignState }}
      >
        {this.cellValue}
        <slot />
      </Host>
    );
  }
}
