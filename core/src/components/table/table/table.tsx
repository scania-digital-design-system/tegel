// https://stackoverflow.com/questions/63051941/how-to-pass-data-as-array-of-object-in-stencil-js
// https://medium.com/@scottmgerstl/passing-an-object-or-array-to-stencil-dd62b7d92641

import { Component, Prop, h, Host, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { generateUniqueId } from '../../../utils/utils';

type Props = {
  verticalDividers: boolean;
  compactDesign: boolean;
  noMinWidth: boolean;
  enableMultiselect: boolean;
  enableExpandableRows: boolean;
  enableResponsive: boolean;
  modeVariant: 'primary' | 'secondary' | null;
  textAlign: string;
};

export type InternalTdsTablePropChange = {
  tableId: string;
  changed: Array<keyof Props>;
} & Partial<Props>;

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
  @Prop({ reflect: true }) enableMultiselect: boolean = false;

  /** Enables extended row feature of Table */
  @Prop({ reflect: true }) enableExpandableRows: boolean = false;

  /** Enables Table to take 100% available width with equal spacing of columns */
  @Prop({ reflect: true }) enableResponsive: boolean = false;

  /** Variant of the component, based on current mode. */
  @Prop({ reflect: true }) modeVariant: 'primary' | 'secondary' = null;

  /** ID used for internal Table functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for Table events, you need to set this ID yourself to identify the Table,
   * as the default ID is random and will be different every time.
   */
  @Prop() tableId: string = generateUniqueId();

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

  @Watch('enableMultiselect')
  enableMultiselectChanged(newValue: boolean) {
    this.emitInternalTdsPropChange('enableMultiselect', newValue);
  }

  @Watch('enableExpandableRows')
  enableExpandableRowsChanged(newValue: boolean) {
    this.emitInternalTdsPropChange('enableExpandableRows', newValue);
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

  render() {
    return (
      <Host class={{ 'tds-table--responsive': this.enableResponsive }}>
        <table
          class={{
            'tds-table': true,
            'tds-table--compact': this.compactDesign,
            'tds-table--divider': this.verticalDividers,
            'tds-table--no-min-width': this.noMinWidth,
            'tds-table--responsive': this.enableResponsive,
          }}
        >
          <slot />
        </table>
      </Host>
    );
  }
}
