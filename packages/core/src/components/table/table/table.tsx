// https://stackoverflow.com/questions/63051941/how-to-pass-data-as-array-of-object-in-stencil-js
// https://medium.com/@scottmgerstl/passing-an-object-or-array-to-stencil-dd62b7d92641

import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
  Watch,
  Method,
  State,
} from '@stencil/core';
import generateUniqueId from '../../../utils/generateUniqueId';

type Props = {
  verticalDividers: boolean;
  compactDesign: boolean;
  noMinWidth: boolean;
  multiselect: boolean;
  expandableRows: boolean;
  responsive: boolean;
  modeVariant: 'primary' | 'secondary' | null;
  textAlign: string;
  horizontalScrollWidth?: string;
};

export type InternalTdsTablePropChange = {
  tableId: string;
  changed: Array<keyof Props>;
} & Partial<Props>;

/**
 * @slot <default> - <b>Unnamed slot.</b> For the table contents.
 */
@Component({
  tag: 'tds-table',
  styleUrl: 'table.scss',
  shadow: true,
})
export class TdsTable {
  /** Enables style with vertical dividers between columns */
  @Prop({ reflect: true }) verticalDividers: boolean = false;

  /** Enables style where Table toolbar, rows and footer are less high */
  @Prop({ reflect: true }) compactDesign: boolean = false;

  /** Enables to customize width on Table columns */
  @Prop({ reflect: true }) noMinWidth: boolean;
  // TODO: Due to unknown reason, one of this items has to be left as is.
  //  If all are false, it seems like emitting is not properly done and it affects other events in Table.
  //  Try setting it and observe text-align set on header cell

  /** Enables multiselect feature of Table */
  @Prop({ reflect: true }) multiselect: boolean = false;

  /** Enables extended row feature of Table */
  @Prop({ reflect: true }) expandableRows: boolean = false;

  /** Enables Table to take 100% available width with equal spacing of columns */
  @Prop({ reflect: true }) responsive: boolean = false;

  /** Variant of the component, based on current mode. */
  @Prop({ reflect: true }) modeVariant: 'primary' | 'secondary' = null;

  /** Width of the table, used as the constraint for horizontal scrolling.
   * **NOTE**: this will disable usage of the responsive flag
   * */
  @Prop() horizontalScrollWidth?: string = null;

  /** ID used for internal Table functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for Table events, you need to set this ID yourself to identify the Table,
   * as the default ID is random and will be different every time.
   */
  @Prop() tableId: string = generateUniqueId();

  @State() enableHorizontalScrollToolbarDesign: boolean = false;

  @State() enableHorizontalScrollFooterDesign: boolean = false;

  @Element() host: HTMLElement;

  /** @internal Broadcasts changes to the Table props */
  @Event({
    eventName: 'internalTdsTablePropChange',
    bubbles: true,
    composed: true,
    cancelable: false,
  })
  internalTdsTablePropChange: EventEmitter<InternalTdsTablePropChange>;

  emitInternalTdsPropChange(changedValueName: keyof Props, changedValue: Props[keyof Props]) {
    this.internalTdsTablePropChange.emit({
      tableId: this.tableId,
      changed: [changedValueName],
      [changedValueName]: changedValue,
    });
  }

  /** Returns all selected rows data. */
  @Method()
  async getSelectedRows() {
    let selectedRowsData = [];
    const tableBody = this.host.querySelector('tds-table-body');
    const selectedRows = Array.from(tableBody.querySelectorAll('tds-table-body-row')).filter(
      (element) => element.selected,
    );

    selectedRows.forEach((row) => {
      let selectedRow = [];
      const rowCells = Array.from(row.getElementsByTagName('tds-body-cell'));

      rowCells.forEach((cell) => {
        const cellObject = {
          cellKey: null,
          cellValue: null,
        };

        cellObject.cellKey = cell.cellKey;
        cellObject.cellValue = cell.cellValue ?? cell.innerText;

        selectedRow = [...selectedRow, cellObject];
      });
      selectedRowsData = [...selectedRowsData, selectedRow];
    });

    return selectedRowsData;
  }

  private getTableStyle(): Record<string, string> {
    const styles: Record<string, string> = {};
    if (this.horizontalScrollWidth) {
      styles.width = `${this.horizontalScrollWidth}px`;
    }
    return styles;
  }

  @Watch('multiselect')
  multiselectChanged(newValue: boolean) {
    this.emitInternalTdsPropChange('multiselect', newValue);
  }

  @Watch('expandableRows')
  enableExpandableRowsChanged(newValue: boolean) {
    this.emitInternalTdsPropChange('expandableRows', newValue);
  }

  @Watch('compactDesign')
  compactDesignChanged(newValue: boolean) {
    this.emitInternalTdsPropChange('compactDesign', newValue);
  }

  @Watch('verticalDividers')
  verticalDividersChanged(newValue: boolean) {
    this.emitInternalTdsPropChange('verticalDividers', newValue);
  }

  @Watch('noMinWidth')
  noMinWidthChanged(newValue: boolean) {
    this.emitInternalTdsPropChange('noMinWidth', newValue);
  }

  @Watch('modeVariant')
  modeVariantChanged(newValue: 'primary' | 'secondary' | null) {
    this.emitInternalTdsPropChange('modeVariant', newValue);
  }

  @Watch('horizontalScrollWidth')
  widthChanged(newValue: string) {
    this.emitInternalTdsPropChange('horizontalScrollWidth', newValue);
  }

  componentWillRender() {
    if (this.horizontalScrollWidth) {
      this.enableHorizontalScrollToolbarDesign =
        this.host.closest('tds-table').getElementsByTagName('tds-table-toolbar').length >= 1;

      this.enableHorizontalScrollFooterDesign =
        this.host.closest('tds-table').getElementsByTagName('tds-table-footer').length >= 1;
    }
  }

  render() {
    return (
      <Host
        class={{
          'tds-table--responsive': this.responsive,
          'tds-mode-variant-primary': this.modeVariant === 'primary',
          'tds-mode-variant-secondary': this.modeVariant === 'secondary',
        }}
      >
        <table
          style={this.getTableStyle()}
          class={{
            'tds-table': true,
            'tds-table--compact': this.compactDesign,
            'tds-table--divider': this.verticalDividers,
            'tds-table--no-min-width': this.noMinWidth,
            'tds-table--responsive': this.responsive,
            'tds-table--horizontal-scroll': !!this.horizontalScrollWidth,
            'tds-table--horizontal-scroll-toolbar':
              this.enableHorizontalScrollToolbarDesign && !this.compactDesign,
            'tds-table--horizontal-scroll-toolbar-compact':
              this.enableHorizontalScrollToolbarDesign && this.compactDesign,
            'tds-table--horizontal-scroll-footer':
              this.enableHorizontalScrollFooterDesign && !this.compactDesign,
            'tds-table--horizontal-scroll-footer-compact':
              this.enableHorizontalScrollFooterDesign && this.compactDesign,
          }}
        >
          <slot />
        </table>
      </Host>
    );
  }
}
