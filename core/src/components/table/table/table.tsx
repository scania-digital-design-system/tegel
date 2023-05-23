// https://stackoverflow.com/questions/63051941/how-to-pass-data-as-array-of-object-in-stencil-js
// https://medium.com/@scottmgerstl/passing-an-object-or-array-to-stencil-dd62b7d92641

import { Component, Prop, h, Host, Event, EventEmitter, Element, Watch } from '@stencil/core';

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

export type InternalSddsTablePropChange = {
  tableId: string;
  changed: Array<keyof Props>;
} & Partial<Props>;

@Component({
  tag: 'sdds-table',
  styleUrl: 'table.scss',
  shadow: true,
})
export class Table {
  /** Enables style with vertical dividers between columns */
  @Prop({ reflect: true }) verticalDividers: boolean = false;

  /** Enables style where data-table toolbar, rows and footer are less high */
  @Prop({ reflect: true }) compactDesign: boolean = false;

  /** Enables to customise width on data-table columns */
  @Prop({ reflect: true }) noMinWidth: boolean;
  // TODO: Due to unknown reason, one of this items has to be left as is. If all are false, it seems like emitting is not properly done and it affects other events in data table. Try setting it and observe text-align set on header cell

  /** Enables multiselect feature of data-table */
  @Prop({ reflect: true }) enableMultiselect: boolean = false;

  /** Enables extended row feature of data-table */
  @Prop({ reflect: true }) enableExpandableRows: boolean = false;

  /** Enables table to take 100% available width with equal spacing of columns */
  @Prop({ reflect: true }) enableResponsive: boolean = false;

  /** Variant of the component, based on current mode. */
  @Prop({ reflect: true }) modeVariant: 'primary' | 'secondary' = null;

  /** ID used for internal table functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for table events you need to set this ID yourself to identify the table, as the default ID is random and will be different every time.
   */
  @Prop() tableId: string = crypto.randomUUID();

  @Element() host: HTMLElement;

  /** @internal Broadcasts changes to the tables props */
  @Event({
    eventName: 'internalSddsTablePropChange',
    bubbles: true,
    composed: true,
    cancelable: false,
  })
  internalSddsTablePropChange: EventEmitter<InternalSddsTablePropChange>;

  emitInternalSddsPropChange(changedValueName: keyof Props, changedValue: Props[keyof Props]) {
    this.internalSddsTablePropChange.emit({
      tableId: this.tableId,
      changed: [changedValueName],
      [changedValueName]: changedValue,
    });
  }

  @Watch('enableMultiselect')
  enableMultiselectChanged(newValue: boolean) {
    this.emitInternalSddsPropChange('enableMultiselect', newValue);
  }

  @Watch('enableExpandableRows')
  enableExpandableRowsChanged(newValue: boolean) {
    this.emitInternalSddsPropChange('enableExpandableRows', newValue);
  }

  @Watch('compactDesign')
  compactDesignChanged(newValue: boolean) {
    this.emitInternalSddsPropChange('compactDesign', newValue);
  }

  @Watch('verticalDividers')
  verticalDividersChanged(newValue: boolean) {
    this.emitInternalSddsPropChange('verticalDividers', newValue);
  }

  @Watch('noMinWidth')
  noMinWidthChanged(newValue: boolean) {
    this.emitInternalSddsPropChange('noMinWidth', newValue);
  }

  @Watch('modeVariant')
  modeVariantChanged(newValue: 'primary' | 'secondary' | null) {
    this.emitInternalSddsPropChange('modeVariant', newValue);
  }

  render() {
    return (
      <Host class={{ 'sdds-table--responsive': this.enableResponsive }}>
        <table
          class={{
            'sdds-table': true,
            'sdds-table--compact': this.compactDesign,
            'sdds-table--divider': this.verticalDividers,
            'sdds-table--no-min-width': this.noMinWidth,
            'sdds-table--responsive': this.enableResponsive,
          }}
        >
          <slot />
        </table>
      </Host>
    );
  }
}
