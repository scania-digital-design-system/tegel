import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';

import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = ['multiselect', 'expandableRows'];

/**
 * @slot <default> - <b>Unnamed slot.</b> For table rows.
 * @slot no-result - Slot for no result message when using filtering.
 */
@Component({
  tag: 'tds-table-body',
  styleUrl: 'table-body.scss',
  shadow: false,
})
export class TdsTableBody {
  /** Prop to pass JSON string which enables automatic rendering of Table rows and cells  */
  @Prop({ mutable: true }) bodyData: any;

  /** Prop for no result message when using filtering */
  @Prop() noResultMessage: string = 'Unfortunately, no data match search criteria.';

  /** Prop for a show or hide result message when using filtering */
  @Prop() showNoResultsMessage: boolean = false;

  @Element() host: HTMLElement;

  @State() multiselect: boolean = false;

  @State() enablePaginationTableBody: boolean = false;

  @State() expandableRows: boolean = false;

  @State() innerBodyData = [];

  @State() bodyDataManipulated = [];

  @State() multiselectArray = [];

  @State() multiselectArrayJSON: string;

  @State() mainCheckboxStatus: boolean = false;

  @State() columnsNumber: number = 0;

  @State() tableId: string = '';

  tableEl: HTMLTdsTableElement;

  @Watch('bodyData')
  arrayDataWatcher(newValue: string) {
    if (typeof newValue === 'string') {
      this.innerBodyData = JSON.parse(newValue);
    } else {
      this.innerBodyData = newValue;
    }
    this.bodyDataManipulated = [...this.innerBodyData];
  }

  /** @internal Sends unique Table identifier and mainCheckbox status to all rows when multiselect feature is enabled */
  @Event({
    eventName: 'internalTdsCheckboxChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsCheckboxChange: EventEmitter<any>;

  /** @internal Sends unique Table identifier and status
   * if mainCheckbox should change its state based on selection status of single rows
   * when multiselect feature is used */
  @Event({
    eventName: 'internalTdsMainCheckboxChange',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  internalTdsMainCheckboxChange: EventEmitter<any>;

  @Listen('internalTdsTablePropChange', { target: 'body' })
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

  bodyCheckBoxClicked = () => {
    const numberOfRows = this.host.getElementsByClassName('tds-table__row').length;

    const numberOfRowsSelected = this.host.getElementsByClassName(
      'tds-table__row--selected',
    ).length;

    this.mainCheckboxStatus = numberOfRows === numberOfRowsSelected;

    this.internalTdsMainCheckboxChange.emit([this.tableId, this.mainCheckboxStatus]);
  };

  // No need to read the value, event is here just to trigger another function
  @Listen('internalTdsRowChange', { target: 'body' })
  bodyCheckboxListener() {
    this.bodyCheckBoxClicked();
  }

  connectedCallback() {
    this.tableEl = this.host.closest('tds-table');
    this.tableId = this.tableEl.tableId;
  }

  componentWillLoad() {
    relevantTableProps.forEach((tablePropName) => {
      this[tablePropName] = this.tableEl[tablePropName];
    });

    if (this.bodyData) {
      this.arrayDataWatcher(this.bodyData);
    }
  }

  componentWillRender() {
    const headerColumnsNo =
      this.host.parentElement.querySelector('tds-table-header').children.length;

    // multiselect and expended features requires one extra column for controls...
    if (this.multiselect || this.expandableRows) {
      this.columnsNumber = headerColumnsNo + 1;
    } else {
      this.columnsNumber = headerColumnsNo;
    }
  }

  render() {
    return (
      <Host data-selected-rows={this.multiselectArrayJSON}>
        {this.bodyDataManipulated.map((row) => (
          <tds-table-body-row>
            {Object.keys(row).map((cellData) => (
              <tds-body-cell cell-key={cellData} cell-value={row[cellData]}></tds-body-cell>
            ))}
          </tds-table-body-row>
        ))}
        <tr hidden={!this.showNoResultsMessage}>
          <td class="tds-table__info-message" colSpan={this.columnsNumber}>
            <slot name="no-result" />
            {this.noResultMessage}
          </td>
        </tr>
        <slot></slot>
      </Host>
    );
  }
}
