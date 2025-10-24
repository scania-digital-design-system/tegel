import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core';
import { InternalTdsTablePropChange } from '../table/table';

const relevantTableProps: InternalTdsTablePropChange['changed'] = ['compactDesign'];

@Component({
  tag: 'tds-table-body-input-wrapper',
  styleUrl: 'table-body-input-wrapper.scss',
  shadow: true,
})
export class TdsTableBodyInputWrapper {
  @Element() host: HTMLTdsTableBodyInputWrapperElement;

  /** Controls if the edit icon is shown */
  @Prop() showIcon: boolean = true;

  @State() renderSlot: boolean = true;

  @State() inputFocused: boolean = false;

  @State() compactDesign: boolean = false;

  @State() tableId: string = '';

  @Listen('internalTdsTablePropChange', { target: 'body' })
  internalTdsPropChangeListener(event: CustomEvent<InternalTdsTablePropChange>) {
    if (this.tableId === event.detail.tableId) {
      event.detail.changed
        .filter((changedProp) => relevantTableProps.includes(changedProp))
        .forEach((changedProp) => {
          if (typeof this[changedProp] === 'undefined') {
            console.error(`Table prop is not supported: ${changedProp}`); // More informative error
            throw new Error(`Table prop is not supported: ${changedProp}`);
          }
          this[changedProp] = event.detail[changedProp];
        });
    }
  }

  connectedCallback() {
    const tableEl = this.host.closest('tds-table');
    if (tableEl) {
      this.tableId = tableEl.getAttribute('table-id');
    } else {
      console.error('Failed to find parent tds-table element.');
    }
  }

  componentWillLoad() {
    const tableEl = this.host.closest('tds-table');
    if (tableEl) {
      relevantTableProps.forEach((tablePropName) => {
        this[tablePropName] = tableEl[tablePropName];
      });
    } else {
      console.error('Failed to find parent tds-table element.');
    }
  }

  private handleSlotChange() {
    this.validateSlot();
  }

  private validateSlot() {
    const children = Array.from(this.host.children).filter(
      (element): element is HTMLInputElement => element.tagName === 'INPUT',
    );

    if (children.length !== 1) {
      console.warn('TABLE-BODY-INPUT-WRAPPER: Wrapper only accepts input as children.');
      this.renderSlot = false;
    } else {
      if (!this.renderSlot) this.renderSlot = true;

      const input = children[0];
      input.addEventListener('focus', () => {
        this.inputFocused = true;
      });
      input.addEventListener('blur', () => {
        this.inputFocused = false;
      });

      // Handle Enter key event
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.moveToNextEditableCell();
        }
      });
    }
  }

  private moveToNextEditableCell() {
    const allEditableCells = Array.from(
      document.querySelectorAll<HTMLTdsTableBodyInputWrapperElement>(
        'tds-table-body-input-wrapper',
      ),
    );

    const currentIndex = allEditableCells.indexOf(this.host);

    if (currentIndex !== -1 && currentIndex < allEditableCells.length - 1) {
      const nextCell = allEditableCells[currentIndex + 1];
      const nextInput = nextCell.querySelector<HTMLInputElement>('input');
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  render() {
    return (
      <Host
        class={{
          'focused-input-wrapper': this.inputFocused,
          'show-icon': this.showIcon,
          'tds-table__compact': this.compactDesign,
        }}
      >
        {this.renderSlot ? <slot onSlotchange={() => this.handleSlotChange()} /> : null}
        {this.showIcon ? (
          <tds-icon class="edit-icon" slot="icon" size="16px" name="edit"></tds-icon>
        ) : null}
      </Host>
    );
  }
}
