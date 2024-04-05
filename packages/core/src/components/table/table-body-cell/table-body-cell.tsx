import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = [
  'verticalDividers',
  'compactDesign',
  'noMinWidth',
];
/**
 * @slot <default> - <b>Unnamed slot.</b> For the cell contents.
 */
@Component({
  tag: 'tds-body-cell',
  styleUrl: 'table-body-cell.scss',
  shadow: true,
})
export class TdsTableBodyCell {
  /** Value that will be presented as text inside a cell */
  @Prop({ reflect: true }) cellValue: string | number;

  /** Passing the same cell key for all body cells which is used in head cell enables features of text align and hovering */
  @Prop({ reflect: true }) cellKey: any;

  /** Disables internal padding. Useful when passing other components to cell. */
  @Prop({ reflect: true }) disablePadding: boolean = false;

  /** Setting for text align, default value "left". Other accepted values are "left", "start", "right", "end" or "center". */
  @Prop({ reflect: true }) textAlign: 'left' | 'start' | 'right' | 'end' | 'center';

  @State() textAlignState: string;

  @State() activeSorting: boolean = false;

  @State() verticalDividers: boolean = false;

  @State() compactDesign: boolean = false;

  @State() noMinWidth: boolean = false;

  @State() whiteBackground: boolean = false;

  @State() tableId: string = '';

  @Element() host: HTMLElement;

  tableEl: HTMLTdsTableElement;

  @Listen('internalTdsPropChange', { target: 'body' })
  internalTdsPropChangeListener(event: CustomEvent<InternalTdsTablePropChange>) {
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

  // Listen to headKey from table-header-element
  @Listen('internalTdsHover', { target: 'body' })
  internalTdsHoverListener(event: CustomEvent<any>) {
    const { tableId, key } = event.detail;

    if (tableId === this.tableId) {
      this.activeSorting = this.cellKey === key;
    }
  }

  // Listen to internalTdsTextAlign from table-header-element
  @Listen('internalTdsTextAlign', { target: 'body' })
  internalTdsTextAlignListener(event: CustomEvent<any>) {
    const [receivedID, receivedKey, receivedTextAlign] = event.detail;

    if (this.tableId === receivedID) {
      if (this.cellKey === receivedKey) {
        if (this.textAlign) {
          this.textAlignState = this.textAlign;
        } else {
          this.textAlignState = ['left', 'start', 'center', 'right', 'end'].includes(
            receivedTextAlign,
          )
            ? receivedTextAlign
            : 'left';
        }
      }
    }
  }

  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });
    if (this.textAlign) {
      this.textAlignState = this.textAlign;
    }
  }

  render() {
    return (
      <Host
        class={{
          'tds-table__body-cell': true,
          'tds-table__body-cell--hover': this.activeSorting,
          'tds-table__compact': this.compactDesign,
          'tds-table--divider': this.verticalDividers,
          'tds-table--no-min-width': this.noMinWidth,
          'tds-table__body-cell--no-padding': this.disablePadding,
        }}
        style={{ textAlign: this.textAlignState }}
      >
        {this.cellValue}
        <slot />
      </Host>
    );
  }
}
