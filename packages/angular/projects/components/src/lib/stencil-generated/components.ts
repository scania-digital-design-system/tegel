/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from '@scania/tegel/components';

import { defineCustomElement as defineTdsAccordion } from '@scania/tegel/components/tds-accordion.js';
import { defineCustomElement as defineTdsAccordionItem } from '@scania/tegel/components/tds-accordion-item.js';
import { defineCustomElement as defineTdsBadge } from '@scania/tegel/components/tds-badge.js';
import { defineCustomElement as defineTdsBanner } from '@scania/tegel/components/tds-banner.js';
import { defineCustomElement as defineTdsBlock } from '@scania/tegel/components/tds-block.js';
import { defineCustomElement as defineTdsBodyCell } from '@scania/tegel/components/tds-body-cell.js';
import { defineCustomElement as defineTdsBreadcrumb } from '@scania/tegel/components/tds-breadcrumb.js';
import { defineCustomElement as defineTdsBreadcrumbs } from '@scania/tegel/components/tds-breadcrumbs.js';
import { defineCustomElement as defineTdsButton } from '@scania/tegel/components/tds-button.js';
import { defineCustomElement as defineTdsCard } from '@scania/tegel/components/tds-card.js';
import { defineCustomElement as defineTdsCheckbox } from '@scania/tegel/components/tds-checkbox.js';
import { defineCustomElement as defineTdsChip } from '@scania/tegel/components/tds-chip.js';
import { defineCustomElement as defineTdsCoreHeaderItem } from '@scania/tegel/components/tds-core-header-item.js';
import { defineCustomElement as defineTdsDatetime } from '@scania/tegel/components/tds-datetime.js';
import { defineCustomElement as defineTdsDivider } from '@scania/tegel/components/tds-divider.js';
import { defineCustomElement as defineTdsDropdown } from '@scania/tegel/components/tds-dropdown.js';
import { defineCustomElement as defineTdsDropdownOption } from '@scania/tegel/components/tds-dropdown-option.js';
import { defineCustomElement as defineTdsFolderTab } from '@scania/tegel/components/tds-folder-tab.js';
import { defineCustomElement as defineTdsFolderTabs } from '@scania/tegel/components/tds-folder-tabs.js';
import { defineCustomElement as defineTdsFooter } from '@scania/tegel/components/tds-footer.js';
import { defineCustomElement as defineTdsFooterGroup } from '@scania/tegel/components/tds-footer-group.js';
import { defineCustomElement as defineTdsFooterItem } from '@scania/tegel/components/tds-footer-item.js';
import { defineCustomElement as defineTdsHeader } from '@scania/tegel/components/tds-header.js';
import { defineCustomElement as defineTdsHeaderBrandSymbol } from '@scania/tegel/components/tds-header-brand-symbol.js';
import { defineCustomElement as defineTdsHeaderCell } from '@scania/tegel/components/tds-header-cell.js';
import { defineCustomElement as defineTdsHeaderDropdown } from '@scania/tegel/components/tds-header-dropdown.js';
import { defineCustomElement as defineTdsHeaderDropdownList } from '@scania/tegel/components/tds-header-dropdown-list.js';
import { defineCustomElement as defineTdsHeaderDropdownListItem } from '@scania/tegel/components/tds-header-dropdown-list-item.js';
import { defineCustomElement as defineTdsHeaderDropdownListUser } from '@scania/tegel/components/tds-header-dropdown-list-user.js';
import { defineCustomElement as defineTdsHeaderHamburger } from '@scania/tegel/components/tds-header-hamburger.js';
import { defineCustomElement as defineTdsHeaderItem } from '@scania/tegel/components/tds-header-item.js';
import { defineCustomElement as defineTdsHeaderLauncher } from '@scania/tegel/components/tds-header-launcher.js';
import { defineCustomElement as defineTdsHeaderLauncherButton } from '@scania/tegel/components/tds-header-launcher-button.js';
import { defineCustomElement as defineTdsHeaderLauncherGrid } from '@scania/tegel/components/tds-header-launcher-grid.js';
import { defineCustomElement as defineTdsHeaderLauncherGridItem } from '@scania/tegel/components/tds-header-launcher-grid-item.js';
import { defineCustomElement as defineTdsHeaderLauncherGridTitle } from '@scania/tegel/components/tds-header-launcher-grid-title.js';
import { defineCustomElement as defineTdsHeaderLauncherList } from '@scania/tegel/components/tds-header-launcher-list.js';
import { defineCustomElement as defineTdsHeaderLauncherListItem } from '@scania/tegel/components/tds-header-launcher-list-item.js';
import { defineCustomElement as defineTdsHeaderLauncherListTitle } from '@scania/tegel/components/tds-header-launcher-list-title.js';
import { defineCustomElement as defineTdsHeaderTitle } from '@scania/tegel/components/tds-header-title.js';
import { defineCustomElement as defineTdsIcon } from '@scania/tegel/components/tds-icon.js';
import { defineCustomElement as defineTdsInlineTab } from '@scania/tegel/components/tds-inline-tab.js';
import { defineCustomElement as defineTdsInlineTabs } from '@scania/tegel/components/tds-inline-tabs.js';
import { defineCustomElement as defineTdsLink } from '@scania/tegel/components/tds-link.js';
import { defineCustomElement as defineTdsMessage } from '@scania/tegel/components/tds-message.js';
import { defineCustomElement as defineTdsModal } from '@scania/tegel/components/tds-modal.js';
import { defineCustomElement as defineTdsNavigationTab } from '@scania/tegel/components/tds-navigation-tab.js';
import { defineCustomElement as defineTdsNavigationTabs } from '@scania/tegel/components/tds-navigation-tabs.js';
import { defineCustomElement as defineTdsPopoverCanvas } from '@scania/tegel/components/tds-popover-canvas.js';
import { defineCustomElement as defineTdsPopoverCore } from '@scania/tegel/components/tds-popover-core.js';
import { defineCustomElement as defineTdsPopoverMenu } from '@scania/tegel/components/tds-popover-menu.js';
import { defineCustomElement as defineTdsPopoverMenuItem } from '@scania/tegel/components/tds-popover-menu-item.js';
import { defineCustomElement as defineTdsRadioButton } from '@scania/tegel/components/tds-radio-button.js';
import { defineCustomElement as defineTdsSideMenu } from '@scania/tegel/components/tds-side-menu.js';
import { defineCustomElement as defineTdsSideMenuCloseButton } from '@scania/tegel/components/tds-side-menu-close-button.js';
import { defineCustomElement as defineTdsSideMenuCollapseButton } from '@scania/tegel/components/tds-side-menu-collapse-button.js';
import { defineCustomElement as defineTdsSideMenuDropdown } from '@scania/tegel/components/tds-side-menu-dropdown.js';
import { defineCustomElement as defineTdsSideMenuDropdownList } from '@scania/tegel/components/tds-side-menu-dropdown-list.js';
import { defineCustomElement as defineTdsSideMenuDropdownListItem } from '@scania/tegel/components/tds-side-menu-dropdown-list-item.js';
import { defineCustomElement as defineTdsSideMenuItem } from '@scania/tegel/components/tds-side-menu-item.js';
import { defineCustomElement as defineTdsSideMenuOverlay } from '@scania/tegel/components/tds-side-menu-overlay.js';
import { defineCustomElement as defineTdsSideMenuUser } from '@scania/tegel/components/tds-side-menu-user.js';
import { defineCustomElement as defineTdsSideMenuUserImage } from '@scania/tegel/components/tds-side-menu-user-image.js';
import { defineCustomElement as defineTdsSideMenuUserLabel } from '@scania/tegel/components/tds-side-menu-user-label.js';
import { defineCustomElement as defineTdsSlider } from '@scania/tegel/components/tds-slider.js';
import { defineCustomElement as defineTdsSpinner } from '@scania/tegel/components/tds-spinner.js';
import { defineCustomElement as defineTdsStep } from '@scania/tegel/components/tds-step.js';
import { defineCustomElement as defineTdsStepper } from '@scania/tegel/components/tds-stepper.js';
import { defineCustomElement as defineTdsTable } from '@scania/tegel/components/tds-table.js';
import { defineCustomElement as defineTdsTableBody } from '@scania/tegel/components/tds-table-body.js';
import { defineCustomElement as defineTdsTableBodyRow } from '@scania/tegel/components/tds-table-body-row.js';
import { defineCustomElement as defineTdsTableBodyRowExpandable } from '@scania/tegel/components/tds-table-body-row-expandable.js';
import { defineCustomElement as defineTdsTableFooter } from '@scania/tegel/components/tds-table-footer.js';
import { defineCustomElement as defineTdsTableHeader } from '@scania/tegel/components/tds-table-header.js';
import { defineCustomElement as defineTdsTableToolbar } from '@scania/tegel/components/tds-table-toolbar.js';
import { defineCustomElement as defineTdsTextField } from '@scania/tegel/components/tds-text-field.js';
import { defineCustomElement as defineTdsTextarea } from '@scania/tegel/components/tds-textarea.js';
import { defineCustomElement as defineTdsToast } from '@scania/tegel/components/tds-toast.js';
import { defineCustomElement as defineTdsToggle } from '@scania/tegel/components/tds-toggle.js';
import { defineCustomElement as defineTdsTooltip } from '@scania/tegel/components/tds-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineTdsAccordion,
  inputs: ['modeVariant']
})
@Component({
  selector: 'tds-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['modeVariant'],
  standalone: true
})
export class TdsAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsAccordion extends Components.TdsAccordion {}


@ProxyCmp({
  defineCustomElementFn: defineTdsAccordionItem,
  inputs: ['disabled', 'expandIconPosition', 'expanded', 'header', 'paddingReset'],
  methods: ['toggleAccordionItem']
})
@Component({
  selector: 'tds-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'expandIconPosition', 'expanded', 'header', 'paddingReset'],
  standalone: true
})
export class TdsAccordionItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsToggle']);
  }
}


export declare interface TdsAccordionItem extends Components.TdsAccordionItem {
  /**
   * Fires when the Accordion Item is clicked, but before it is closed or opened.
   */
  tdsToggle: EventEmitter<CustomEvent<{ expanded: boolean; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsBadge,
  inputs: ['hidden', 'size', 'value']
})
@Component({
  selector: 'tds-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hidden', 'size', 'value'],
  standalone: true
})
export class TdsBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsBadge extends Components.TdsBadge {}


@ProxyCmp({
  defineCustomElementFn: defineTdsBanner,
  inputs: ['bannerId', 'header', 'hidden', 'icon', 'subheader', 'variant'],
  methods: ['hideBanner', 'showBanner']
})
@Component({
  selector: 'tds-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bannerId', 'header', 'hidden', 'icon', 'subheader', 'variant'],
  standalone: true
})
export class TdsBanner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsClose']);
  }
}


export declare interface TdsBanner extends Components.TdsBanner {
  /**
   * Sends a unique Banner identifier when the close button is pressed.
   */
  tdsClose: EventEmitter<CustomEvent<{ bannerId: string; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsBlock,
  inputs: ['modeVariant']
})
@Component({
  selector: 'tds-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['modeVariant'],
  standalone: true
})
export class TdsBlock {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsBlock extends Components.TdsBlock {}


@ProxyCmp({
  defineCustomElementFn: defineTdsBodyCell,
  inputs: ['cellKey', 'cellValue', 'disablePadding']
})
@Component({
  selector: 'tds-body-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cellKey', 'cellValue', 'disablePadding'],
  standalone: true
})
export class TdsBodyCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsBodyCell extends Components.TdsBodyCell {}


@ProxyCmp({
  defineCustomElementFn: defineTdsBreadcrumb,
  inputs: ['current']
})
@Component({
  selector: 'tds-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['current'],
  standalone: true
})
export class TdsBreadcrumb {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsBreadcrumb extends Components.TdsBreadcrumb {}


@ProxyCmp({
  defineCustomElementFn: defineTdsBreadcrumbs
})
@Component({
  selector: 'tds-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsBreadcrumbs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsBreadcrumbs extends Components.TdsBreadcrumbs {}


@ProxyCmp({
  defineCustomElementFn: defineTdsButton,
  inputs: ['disabled', 'fullbleed', 'modeVariant', 'size', 'text', 'type', 'variant']
})
@Component({
  selector: 'tds-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'fullbleed', 'modeVariant', 'size', 'text', 'type', 'variant'],
  standalone: true
})
export class TdsButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsButton extends Components.TdsButton {}


@ProxyCmp({
  defineCustomElementFn: defineTdsCard,
  inputs: ['bodyDivider', 'bodyImg', 'bodyImgAlt', 'cardId', 'clickable', 'header', 'imagePlacement', 'modeVariant', 'subheader']
})
@Component({
  selector: 'tds-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bodyDivider', 'bodyImg', 'bodyImgAlt', 'cardId', 'clickable', 'header', 'imagePlacement', 'modeVariant', 'subheader'],
  standalone: true
})
export class TdsCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsClick']);
  }
}


export declare interface TdsCard extends Components.TdsCard {
  /**
   * Sends unique Card identifier when the Card is clicked, if clickable=true
   */
  tdsClick: EventEmitter<CustomEvent<{ cardId: string; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsCheckbox,
  inputs: ['checkboxId', 'checked', 'disabled', 'name', 'required', 'value'],
  methods: ['toggleCheckbox']
})
@Component({
  selector: 'tds-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkboxId', 'checked', 'disabled', 'name', 'required', 'value'],
  standalone: true
})
export class TdsCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange', 'tdsFocus', 'tdsBlur']);
  }
}


export declare interface TdsCheckbox extends Components.TdsCheckbox {
  /**
   * Sends unique Checkbox identifier and checked status when it is checked/unchecked.
   */
  tdsChange: EventEmitter<CustomEvent<{ checkboxId: string; checked: boolean; value?: string; }>>;
  /**
   * Focus event for the Checkbox
   */
  tdsFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Blur event for the Checkbox
   */
  tdsBlur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsChip,
  inputs: ['checked', 'chipId', 'name', 'size', 'type', 'value']
})
@Component({
  selector: 'tds-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'chipId', 'name', 'size', 'type', 'value'],
  standalone: true
})
export class TdsChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange', 'tdsClick']);
  }
}


export declare interface TdsChip extends Components.TdsChip {
  /**
   * Sends unique Chip identifier and value when it is changed (checked/unchecked).
Valid only for type checkbox and radio.
If no ID is specified, a random one will be generated.
To use this listener, don't use the randomized ID, use a specific one of your choosing.
   */
  tdsChange: EventEmitter<CustomEvent<{ chipId: string; value: string; checked?: boolean; }>>;
  /**
   * Sends unique Chip identifier when Chip is clicked.
Valid only for type button.
If no ID is specified, a random one will be generated.
To use this listener, don't use the randomized ID, use a specific one of your choosing.
   */
  tdsClick: EventEmitter<CustomEvent<{ chipId: string; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsCoreHeaderItem
})
@Component({
  selector: 'tds-core-header-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsCoreHeaderItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsCoreHeaderItem extends Components.TdsCoreHeaderItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsDatetime,
  inputs: ['autofocus', 'defaultValue', 'disabled', 'helper', 'label', 'max', 'min', 'modeVariant', 'name', 'noMinWidth', 'size', 'state', 'type', 'value']
})
@Component({
  selector: 'tds-datetime',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autofocus', 'defaultValue', 'disabled', 'helper', 'label', 'max', 'min', 'modeVariant', 'name', 'noMinWidth', 'size', 'state', 'type', 'value'],
  standalone: true
})
export class TdsDatetime {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange', 'tdsBlur', 'tdsFocus']);
  }
}


export declare interface TdsDatetime extends Components.TdsDatetime {
  /**
   * Change event for the Datetime
   */
  tdsChange: EventEmitter<CustomEvent<any>>;
  /**
   * Blur event for the Datetime
   */
  tdsBlur: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Focus event for the Datetime
   */
  tdsFocus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsDivider,
  inputs: ['orientation']
})
@Component({
  selector: 'tds-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['orientation'],
  standalone: true
})
export class TdsDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsDivider extends Components.TdsDivider {}


@ProxyCmp({
  defineCustomElementFn: defineTdsDropdown,
  inputs: ['defaultValue', 'disabled', 'error', 'filter', 'helper', 'label', 'labelPosition', 'modeVariant', 'multiselect', 'name', 'noResultText', 'openDirection', 'placeholder', 'size'],
  methods: ['reset', 'setValue', 'removeValue', 'close']
})
@Component({
  selector: 'tds-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultValue', 'disabled', 'error', 'filter', 'helper', 'label', 'labelPosition', 'modeVariant', 'multiselect', 'name', 'noResultText', 'openDirection', 'placeholder', 'size'],
  standalone: true
})
export class TdsDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange', 'tdsFocus', 'tdsBlur', 'tdsInput']);
  }
}


export declare interface TdsDropdown extends Components.TdsDropdown {
  /**
   * Change event for the Dropdown.
   */
  tdsChange: EventEmitter<CustomEvent<{ name: string; value: string; }>>;
  /**
   * Focus event for the Dropdown.
   */
  tdsFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Blur event for the Dropdown.
   */
  tdsBlur: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Input event for the Dropdown.
   */
  tdsInput: EventEmitter<CustomEvent<InputEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsDropdownOption,
  inputs: ['disabled', 'value'],
  methods: ['setSelected']
})
@Component({
  selector: 'tds-dropdown-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'value'],
  standalone: true
})
export class TdsDropdownOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsSelect', 'tdsFocus', 'tdsBlur']);
  }
}


export declare interface TdsDropdownOption extends Components.TdsDropdownOption {
  /**
   * Click event for the Dropdown option.
   */
  tdsSelect: EventEmitter<CustomEvent<{ selected: boolean; value: string; }>>;
  /**
   * Focus event for the Dropdown option.
   */
  tdsFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Blur event for the Dropdown option.
   */
  tdsBlur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsFolderTab,
  inputs: ['disabled']
})
@Component({
  selector: 'tds-folder-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled'],
  standalone: true
})
export class TdsFolderTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsFolderTab extends Components.TdsFolderTab {}


@ProxyCmp({
  defineCustomElementFn: defineTdsFolderTabs,
  inputs: ['defaultSelectedIndex', 'modeVariant', 'selectedIndex'],
  methods: ['selectTab']
})
@Component({
  selector: 'tds-folder-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultSelectedIndex', 'modeVariant', 'selectedIndex'],
  standalone: true
})
export class TdsFolderTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange']);
  }
}


export declare interface TdsFolderTabs extends Components.TdsFolderTabs {
  /**
   * Event emitted when the selected Tab is changed.
   */
  tdsChange: EventEmitter<CustomEvent<{ selectedTabIndex: number; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsFooter,
  inputs: ['modeVariant']
})
@Component({
  selector: 'tds-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['modeVariant'],
  standalone: true
})
export class TdsFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsFooter extends Components.TdsFooter {}


@ProxyCmp({
  defineCustomElementFn: defineTdsFooterGroup,
  inputs: ['titleText']
})
@Component({
  selector: 'tds-footer-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['titleText'],
  standalone: true
})
export class TdsFooterGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsFooterGroup extends Components.TdsFooterGroup {}


@ProxyCmp({
  defineCustomElementFn: defineTdsFooterItem
})
@Component({
  selector: 'tds-footer-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsFooterItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsFooterItem extends Components.TdsFooterItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeader
})
@Component({
  selector: 'tds-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeader extends Components.TdsHeader {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderBrandSymbol
})
@Component({
  selector: 'tds-header-brand-symbol',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderBrandSymbol {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderBrandSymbol extends Components.TdsHeaderBrandSymbol {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderCell,
  inputs: ['cellKey', 'cellValue', 'customWidth', 'sortable', 'textAlign']
})
@Component({
  selector: 'tds-header-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cellKey', 'cellValue', 'customWidth', 'sortable', 'textAlign'],
  standalone: true
})
export class TdsHeaderCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsSort']);
  }
}


export declare interface TdsHeaderCell extends Components.TdsHeaderCell {
  /**
   * Sends unique Table identifier, column key and sorting direction to the tds-table-body component, can also be listened to in order to implement custom-sorting logic.
   */
  tdsSort: EventEmitter<CustomEvent<{ tableId: string; columnKey: string; sortingDirection: 'asc' | 'desc'; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderDropdown,
  inputs: ['label', 'noDropdownIcon', 'selected']
})
@Component({
  selector: 'tds-header-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'noDropdownIcon', 'selected'],
  standalone: true
})
export class TdsHeaderDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderDropdown extends Components.TdsHeaderDropdown {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderDropdownList,
  inputs: ['size']
})
@Component({
  selector: 'tds-header-dropdown-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['size'],
  standalone: true
})
export class TdsHeaderDropdownList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderDropdownList extends Components.TdsHeaderDropdownList {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderDropdownListItem,
  inputs: ['selected', 'size']
})
@Component({
  selector: 'tds-header-dropdown-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['selected', 'size'],
  standalone: true
})
export class TdsHeaderDropdownListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderDropdownListItem extends Components.TdsHeaderDropdownListItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderDropdownListUser,
  inputs: ['header', 'imgAlt', 'imgUrl', 'subheader']
})
@Component({
  selector: 'tds-header-dropdown-list-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['header', 'imgAlt', 'imgUrl', 'subheader'],
  standalone: true
})
export class TdsHeaderDropdownListUser {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderDropdownListUser extends Components.TdsHeaderDropdownListUser {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderHamburger
})
@Component({
  selector: 'tds-header-hamburger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderHamburger {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderHamburger extends Components.TdsHeaderHamburger {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderItem,
  inputs: ['active', 'selected']
})
@Component({
  selector: 'tds-header-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'selected'],
  standalone: true
})
export class TdsHeaderItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderItem extends Components.TdsHeaderItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncher
})
@Component({
  selector: 'tds-header-launcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderLauncher {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncher extends Components.TdsHeaderLauncher {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncherButton,
  inputs: ['active']
})
@Component({
  selector: 'tds-header-launcher-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active'],
  standalone: true
})
export class TdsHeaderLauncherButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncherButton extends Components.TdsHeaderLauncherButton {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncherGrid
})
@Component({
  selector: 'tds-header-launcher-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderLauncherGrid {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncherGrid extends Components.TdsHeaderLauncherGrid {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncherGridItem
})
@Component({
  selector: 'tds-header-launcher-grid-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderLauncherGridItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncherGridItem extends Components.TdsHeaderLauncherGridItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncherGridTitle
})
@Component({
  selector: 'tds-header-launcher-grid-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderLauncherGridTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncherGridTitle extends Components.TdsHeaderLauncherGridTitle {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncherList
})
@Component({
  selector: 'tds-header-launcher-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderLauncherList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncherList extends Components.TdsHeaderLauncherList {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncherListItem
})
@Component({
  selector: 'tds-header-launcher-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderLauncherListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncherListItem extends Components.TdsHeaderLauncherListItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderLauncherListTitle
})
@Component({
  selector: 'tds-header-launcher-list-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderLauncherListTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderLauncherListTitle extends Components.TdsHeaderLauncherListTitle {}


@ProxyCmp({
  defineCustomElementFn: defineTdsHeaderTitle
})
@Component({
  selector: 'tds-header-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsHeaderTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsHeaderTitle extends Components.TdsHeaderTitle {}


@ProxyCmp({
  defineCustomElementFn: defineTdsIcon,
  inputs: ['name', 'size']
})
@Component({
  selector: 'tds-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['name', 'size'],
  standalone: true
})
export class TdsIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsIcon extends Components.TdsIcon {}


@ProxyCmp({
  defineCustomElementFn: defineTdsInlineTab,
  inputs: ['disabled']
})
@Component({
  selector: 'tds-inline-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled'],
  standalone: true
})
export class TdsInlineTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsInlineTab extends Components.TdsInlineTab {}


@ProxyCmp({
  defineCustomElementFn: defineTdsInlineTabs,
  inputs: ['defaultSelectedIndex', 'modeVariant', 'selectedIndex'],
  methods: ['selectTab']
})
@Component({
  selector: 'tds-inline-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultSelectedIndex', 'modeVariant', 'selectedIndex'],
  standalone: true
})
export class TdsInlineTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange']);
  }
}


export declare interface TdsInlineTabs extends Components.TdsInlineTabs {
  /**
   * Event emitted when the selected Tab is changed.
   */
  tdsChange: EventEmitter<CustomEvent<{ selectedTabIndex: number; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsLink,
  inputs: ['disabled', 'underline']
})
@Component({
  selector: 'tds-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'underline'],
  standalone: true
})
export class TdsLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsLink extends Components.TdsLink {}


@ProxyCmp({
  defineCustomElementFn: defineTdsMessage,
  inputs: ['header', 'minimal', 'modeVariant', 'noIcon', 'variant']
})
@Component({
  selector: 'tds-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['header', 'minimal', 'modeVariant', 'noIcon', 'variant'],
  standalone: true
})
export class TdsMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsMessage extends Components.TdsMessage {}


@ProxyCmp({
  defineCustomElementFn: defineTdsModal,
  inputs: ['actionsPosition', 'header', 'prevent', 'referenceEl', 'selector', 'show', 'size'],
  methods: ['showModal', 'closeModal']
})
@Component({
  selector: 'tds-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionsPosition', 'header', 'prevent', 'referenceEl', 'selector', 'show', 'size'],
  standalone: true
})
export class TdsModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsClose']);
  }
}


export declare interface TdsModal extends Components.TdsModal {
  /**
   * Emits when the Modal is closed.
   */
  tdsClose: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsNavigationTab,
  inputs: ['disabled']
})
@Component({
  selector: 'tds-navigation-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled'],
  standalone: true
})
export class TdsNavigationTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsNavigationTab extends Components.TdsNavigationTab {}


@ProxyCmp({
  defineCustomElementFn: defineTdsNavigationTabs,
  inputs: ['defaultSelectedIndex', 'modeVariant', 'selectedIndex'],
  methods: ['selectTab']
})
@Component({
  selector: 'tds-navigation-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultSelectedIndex', 'modeVariant', 'selectedIndex'],
  standalone: true
})
export class TdsNavigationTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange']);
  }
}


export declare interface TdsNavigationTabs extends Components.TdsNavigationTabs {
  /**
   * Event emitted when the selected Tab is changed.
   */
  tdsChange: EventEmitter<CustomEvent<{ selectedTabIndex: number; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsPopoverCanvas,
  inputs: ['modifiers', 'offsetDistance', 'offsetSkidding', 'placement', 'referenceEl', 'selector', 'show']
})
@Component({
  selector: 'tds-popover-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['modifiers', 'offsetDistance', 'offsetSkidding', 'placement', 'referenceEl', 'selector', 'show'],
  standalone: true
})
export class TdsPopoverCanvas {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsPopoverCanvas extends Components.TdsPopoverCanvas {}


@ProxyCmp({
  defineCustomElementFn: defineTdsPopoverCore,
  inputs: ['autoHide', 'modifiers', 'offsetDistance', 'offsetSkidding', 'placement', 'referenceEl', 'selector', 'show', 'trigger']
})
@Component({
  selector: 'tds-popover-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoHide', 'modifiers', 'offsetDistance', 'offsetSkidding', 'placement', 'referenceEl', 'selector', 'show', 'trigger'],
  standalone: true
})
export class TdsPopoverCore {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsPopoverCore extends Components.TdsPopoverCore {}


@ProxyCmp({
  defineCustomElementFn: defineTdsPopoverMenu,
  inputs: ['fluidWidth', 'offsetDistance', 'offsetSkidding', 'placement', 'referenceEl', 'selector', 'show']
})
@Component({
  selector: 'tds-popover-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fluidWidth', 'offsetDistance', 'offsetSkidding', 'placement', 'referenceEl', 'selector', 'show'],
  standalone: true
})
export class TdsPopoverMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsPopoverMenu extends Components.TdsPopoverMenu {}


@ProxyCmp({
  defineCustomElementFn: defineTdsPopoverMenuItem,
  inputs: ['disabled']
})
@Component({
  selector: 'tds-popover-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled'],
  standalone: true
})
export class TdsPopoverMenuItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsPopoverMenuItem extends Components.TdsPopoverMenuItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsRadioButton,
  inputs: ['checked', 'disabled', 'name', 'radioId', 'required', 'value']
})
@Component({
  selector: 'tds-radio-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'name', 'radioId', 'required', 'value'],
  standalone: true
})
export class TdsRadioButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange']);
  }
}


export declare interface TdsRadioButton extends Components.TdsRadioButton {
  /**
   * Sends unique Radio Button identifier and status when it is checked.
If no ID is specified, a random one will be generated.
To use this listener, don't use the randomized ID, use a specific one of your choosing.
   */
  tdsChange: EventEmitter<CustomEvent<{ radioId: string; value: string; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenu,
  inputs: ['collapsed', 'open', 'persistent']
})
@Component({
  selector: 'tds-side-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapsed', 'open', 'persistent'],
  standalone: true
})
export class TdsSideMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsCollapse']);
  }
}


import type { CollapseEvent as ITdsSideMenuCollapseEvent } from '@scania/tegel/components';

export declare interface TdsSideMenu extends Components.TdsSideMenu {
  /**
   * Event that is emitted when the Side Menu is collapsed.
   */
  tdsCollapse: EventEmitter<CustomEvent<ITdsSideMenuCollapseEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuCloseButton
})
@Component({
  selector: 'tds-side-menu-close-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsSideMenuCloseButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuCloseButton extends Components.TdsSideMenuCloseButton {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuCollapseButton
})
@Component({
  selector: 'tds-side-menu-collapse-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsSideMenuCollapseButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsCollapse']);
  }
}


import type { CollapseEvent as ITdsSideMenuCollapseButtonCollapseEvent } from '@scania/tegel/components';

export declare interface TdsSideMenuCollapseButton extends Components.TdsSideMenuCollapseButton {
  /**
   * Event that is broadcast when the collapse button is clicked.
Prevent it from disabling automatic collapsing, and set the collapsed prop on the Side Menu yourself.
   */
  tdsCollapse: EventEmitter<CustomEvent<ITdsSideMenuCollapseButtonCollapseEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuDropdown,
  inputs: ['buttonLabel', 'defaultOpen', 'selected']
})
@Component({
  selector: 'tds-side-menu-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['buttonLabel', 'defaultOpen', 'selected'],
  standalone: true
})
export class TdsSideMenuDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuDropdown extends Components.TdsSideMenuDropdown {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuDropdownList
})
@Component({
  selector: 'tds-side-menu-dropdown-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsSideMenuDropdownList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuDropdownList extends Components.TdsSideMenuDropdownList {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuDropdownListItem,
  inputs: ['selected']
})
@Component({
  selector: 'tds-side-menu-dropdown-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['selected'],
  standalone: true
})
export class TdsSideMenuDropdownListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuDropdownListItem extends Components.TdsSideMenuDropdownListItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuItem,
  inputs: ['active', 'selected']
})
@Component({
  selector: 'tds-side-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'selected'],
  standalone: true
})
export class TdsSideMenuItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuItem extends Components.TdsSideMenuItem {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuOverlay
})
@Component({
  selector: 'tds-side-menu-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsSideMenuOverlay {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuOverlay extends Components.TdsSideMenuOverlay {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuUser,
  inputs: ['heading', 'imgAlt', 'imgSrc', 'subheading']
})
@Component({
  selector: 'tds-side-menu-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['heading', 'imgAlt', 'imgSrc', 'subheading'],
  standalone: true
})
export class TdsSideMenuUser {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuUser extends Components.TdsSideMenuUser {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuUserImage,
  inputs: ['alt', 'src']
})
@Component({
  selector: 'tds-side-menu-user-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alt', 'src'],
  standalone: true
})
export class TdsSideMenuUserImage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuUserImage extends Components.TdsSideMenuUserImage {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSideMenuUserLabel,
  inputs: ['heading', 'subheading']
})
@Component({
  selector: 'tds-side-menu-user-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['heading', 'subheading'],
  standalone: true
})
export class TdsSideMenuUserLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSideMenuUserLabel extends Components.TdsSideMenuUserLabel {}


@ProxyCmp({
  defineCustomElementFn: defineTdsSlider,
  inputs: ['controls', 'disabled', 'input', 'label', 'max', 'min', 'name', 'readOnly', 'showTickNumbers', 'sliderId', 'snap', 'step', 'thumbSize', 'ticks', 'tooltip', 'value'],
  methods: ['reset']
})
@Component({
  selector: 'tds-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['controls', 'disabled', 'input', 'label', 'max', 'min', 'name', 'readOnly', 'showTickNumbers', 'sliderId', 'snap', 'step', 'thumbSize', 'ticks', 'tooltip', 'value'],
  standalone: true
})
export class TdsSlider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange']);
  }
}


export declare interface TdsSlider extends Components.TdsSlider {
  /**
   * Sends the value of the slider when changed.
   */
  tdsChange: EventEmitter<CustomEvent<{ value: string; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsSpinner,
  inputs: ['size', 'variant']
})
@Component({
  selector: 'tds-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['size', 'variant'],
  standalone: true
})
export class TdsSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsSpinner extends Components.TdsSpinner {}


@ProxyCmp({
  defineCustomElementFn: defineTdsStep,
  inputs: ['index', 'state']
})
@Component({
  selector: 'tds-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['index', 'state'],
  standalone: true
})
export class TdsStep {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsStep extends Components.TdsStep {}


@ProxyCmp({
  defineCustomElementFn: defineTdsStepper,
  inputs: ['hideLabels', 'labelPosition', 'orientation', 'size', 'stepperId']
})
@Component({
  selector: 'tds-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hideLabels', 'labelPosition', 'orientation', 'size', 'stepperId'],
  standalone: true
})
export class TdsStepper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['internalTdsPropsChange']);
  }
}


import type { InternalTdsStepperPropChange as ITdsStepperInternalTdsStepperPropChange } from '@scania/tegel/components';

export declare interface TdsStepper extends Components.TdsStepper {

  internalTdsPropsChange: EventEmitter<CustomEvent<ITdsStepperInternalTdsStepperPropChange>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsTable,
  inputs: ['compactDesign', 'expandableRows', 'modeVariant', 'multiselect', 'noMinWidth', 'responsive', 'tableId', 'verticalDividers'],
  methods: ['getSelectedRows']
})
@Component({
  selector: 'tds-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compactDesign', 'expandableRows', 'modeVariant', 'multiselect', 'noMinWidth', 'responsive', 'tableId', 'verticalDividers'],
  standalone: true
})
export class TdsTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsTable extends Components.TdsTable {}


@ProxyCmp({
  defineCustomElementFn: defineTdsTableBody
})
@Component({
  selector: 'tds-table-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class TdsTableBody {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsTableBody extends Components.TdsTableBody {}


@ProxyCmp({
  defineCustomElementFn: defineTdsTableBodyRow,
  inputs: ['selected']
})
@Component({
  selector: 'tds-table-body-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['selected'],
  standalone: true
})
export class TdsTableBodyRow {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsSelect']);
  }
}


export declare interface TdsTableBodyRow extends Components.TdsTableBodyRow {
  /**
   * Event emitted when a row is selected/deselected.
   */
  tdsSelect: EventEmitter<CustomEvent<{ tableId: string; checked: boolean; selectedRows: any[]; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsTableBodyRowExpandable,
  inputs: ['colSpan']
})
@Component({
  selector: 'tds-table-body-row-expandable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['colSpan'],
  standalone: true
})
export class TdsTableBodyRowExpandable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsTableBodyRowExpandable extends Components.TdsTableBodyRowExpandable {}


@ProxyCmp({
  defineCustomElementFn: defineTdsTableFooter,
  inputs: ['cols', 'pages', 'pagination', 'paginationValue']
})
@Component({
  selector: 'tds-table-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cols', 'pages', 'pagination', 'paginationValue'],
  standalone: true
})
export class TdsTableFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsPagination']);
  }
}


export declare interface TdsTableFooter extends Components.TdsTableFooter {
  /**
   * Event to send current page value to tds-table-body component, can also be listened to in order to implement custom pagination logic.
   */
  tdsPagination: EventEmitter<CustomEvent<{ tableId: string; paginationValue: number; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsTableHeader,
  inputs: ['allSelected']
})
@Component({
  selector: 'tds-table-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allSelected'],
  standalone: true
})
export class TdsTableHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsSelectAll']);
  }
}


export declare interface TdsTableHeader extends Components.TdsTableHeader {
  /**
   * Event emitted when the status of the select all checkbox changes.
   */
  tdsSelectAll: EventEmitter<CustomEvent<{ tableId: string; checked: boolean; selectedRows: any[]; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsTableToolbar,
  inputs: ['filter', 'tableTitle']
})
@Component({
  selector: 'tds-table-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['filter', 'tableTitle'],
  standalone: true
})
export class TdsTableToolbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsFilter']);
  }
}


export declare interface TdsTableToolbar extends Components.TdsTableToolbar {
  /**
   * Used for sending users' input to the main parent tds-table the component,
can also be listened to in order to implement custom sorting logic.
   */
  tdsFilter: EventEmitter<CustomEvent<{ tableId: string; query: string; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsTextField,
  inputs: ['autofocus', 'disabled', 'helper', 'label', 'labelPosition', 'maxLength', 'modeVariant', 'name', 'noMinWidth', 'placeholder', 'readOnly', 'size', 'state', 'type', 'value']
})
@Component({
  selector: 'tds-text-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autofocus', 'disabled', 'helper', 'label', 'labelPosition', 'maxLength', 'modeVariant', 'name', 'noMinWidth', 'placeholder', 'readOnly', 'size', 'state', 'type', 'value'],
  standalone: true
})
export class TdsTextField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange', 'tdsInput', 'tdsFocus', 'tdsBlur']);
  }
}


export declare interface TdsTextField extends Components.TdsTextField {
  /**
   * Change event for the Text Field
   */
  tdsChange: EventEmitter<CustomEvent<any>>;
  /**
   * Input event for the Text Field
   */
  tdsInput: EventEmitter<CustomEvent<InputEvent>>;
  /**
   * Focus event for the Text Field
   */
  tdsFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Blur event for the Text Field
   */
  tdsBlur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsTextarea,
  inputs: ['autofocus', 'cols', 'disabled', 'helper', 'label', 'labelPosition', 'maxLength', 'modeVariant', 'name', 'noMinWidth', 'placeholder', 'readOnly', 'rows', 'state', 'value']
})
@Component({
  selector: 'tds-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autofocus', 'cols', 'disabled', 'helper', 'label', 'labelPosition', 'maxLength', 'modeVariant', 'name', 'noMinWidth', 'placeholder', 'readOnly', 'rows', 'state', 'value'],
  standalone: true
})
export class TdsTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsChange', 'tdsBlur', 'tdsInput', 'tdsFocus']);
  }
}


export declare interface TdsTextarea extends Components.TdsTextarea {
  /**
   * Change event for the Textarea
   */
  tdsChange: EventEmitter<CustomEvent<any>>;
  /**
   * Blur event for the Textarea
   */
  tdsBlur: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Input event for the Textarea
   */
  tdsInput: EventEmitter<CustomEvent<InputEvent>>;
  /**
   * Focus event for the Textarea
   */
  tdsFocus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsToast,
  inputs: ['header', 'hidden', 'subheader', 'toastId', 'toastRole', 'variant'],
  methods: ['hideToast', 'showToast']
})
@Component({
  selector: 'tds-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['header', 'hidden', 'subheader', 'toastId', 'toastRole', 'variant'],
  standalone: true
})
export class TdsToast {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsClose']);
  }
}


export declare interface TdsToast extends Components.TdsToast {
  /**
   * Sends unique Toast identifier when component is closed.
   */
  tdsClose: EventEmitter<CustomEvent<{ toastId: string; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsToggle,
  inputs: ['checked', 'disabled', 'headline', 'name', 'required', 'size', 'toggleId'],
  methods: ['toggle']
})
@Component({
  selector: 'tds-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'headline', 'name', 'required', 'size', 'toggleId'],
  standalone: true
})
export class TdsToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tdsToggle']);
  }
}


export declare interface TdsToggle extends Components.TdsToggle {
  /**
   * Sends unique Toggle identifier and status when it is toggled.
   */
  tdsToggle: EventEmitter<CustomEvent<{ toggleId: string; checked: boolean; }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineTdsTooltip,
  inputs: ['mouseOverTooltip', 'placement', 'referenceEl', 'selector', 'show', 'text']
})
@Component({
  selector: 'tds-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['mouseOverTooltip', 'placement', 'referenceEl', 'selector', 'show', 'text'],
  standalone: true
})
export class TdsTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface TdsTooltip extends Components.TdsTooltip {}


