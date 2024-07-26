export const TAG_NAMES = [
  'date-picker-day',
  'date-picker-month',
  'date-picker-year',
  'date-range-picker-day',
  'tds-accordion',
  'tds-accordion-item',
  'tds-badge',
  'tds-banner',
  'tds-block',
  'tds-body-cell',
  'tds-breadcrumb',
  'tds-breadcrumbs',
  'tds-button',
  'tds-card',
  'tds-checkbox',
  'tds-chip',
  'tds-core-header-item',
  'tds-date-picker',
  'tds-date-range-picker',
  'tds-datetime',
  'tds-divider',
  'tds-dropdown',
  'tds-dropdown-option',
  'tds-folder-tab',
  'tds-folder-tabs',
  'tds-footer',
  'tds-footer-group',
  'tds-footer-item',
  'tds-header',
  'tds-header-brand-symbol',
  'tds-header-cell',
  'tds-header-dropdown',
  'tds-header-dropdown-list',
  'tds-header-dropdown-list-item',
  'tds-header-dropdown-list-user',
  'tds-header-hamburger',
  'tds-header-item',
  'tds-header-launcher',
  'tds-header-launcher-button',
  'tds-header-launcher-grid',
  'tds-header-launcher-grid-item',
  'tds-header-launcher-grid-title',
  'tds-header-launcher-list',
  'tds-header-launcher-list-item',
  'tds-header-launcher-list-title',
  'tds-header-title',
  'tds-icon',
  'tds-inline-tab',
  'tds-inline-tabs',
  'tds-link',
  'tds-message',
  'tds-modal',
  'tds-navigation-tab',
  'tds-navigation-tabs',
  'tds-popover-canvas',
  'tds-popover-core',
  'tds-popover-menu',
  'tds-popover-menu-item',
  'tds-radio-button',
  'tds-side-menu',
  'tds-side-menu-close-button',
  'tds-side-menu-collapse-button',
  'tds-side-menu-dropdown',
  'tds-side-menu-dropdown-list',
  'tds-side-menu-dropdown-list-item',
  'tds-side-menu-item',
  'tds-side-menu-overlay',
  'tds-side-menu-user',
  'tds-side-menu-user-image',
  'tds-side-menu-user-label',
  'tds-slider',
  'tds-spinner',
  'tds-step',
  'tds-stepper',
  'tds-table',
  'tds-table-body',
  'tds-table-body-row',
  'tds-table-body-row-expandable',
  'tds-table-footer',
  'tds-table-header',
  'tds-table-toolbar',
  'tds-text-field',
  'tds-textarea',
  'tds-toast',
  'tds-toggle',
  'tds-tooltip',
] as const;
export type TagName = (typeof TAG_NAMES)[number];

// TODO: replace with generic in TS4.1: https://stackoverflow.com/questions/57807009/typescript-generic-to-turn-underscore-object-to-camel-case
export type TagNameCamelCase =
  | 'datePickerDay'
  | 'datePickerMonth'
  | 'datePickerYear'
  | 'dateRangePickerDay'
  | 'tdsAccordion'
  | 'tdsAccordionItem'
  | 'tdsBadge'
  | 'tdsBanner'
  | 'tdsBlock'
  | 'tdsBodyCell'
  | 'tdsBreadcrumb'
  | 'tdsBreadcrumbs'
  | 'tdsButton'
  | 'tdsCard'
  | 'tdsCheckbox'
  | 'tdsChip'
  | 'tdsCoreHeaderItem'
  | 'tdsDatePicker'
  | 'tdsDateRangePicker'
  | 'tdsDatetime'
  | 'tdsDivider'
  | 'tdsDropdown'
  | 'tdsDropdownOption'
  | 'tdsFolderTab'
  | 'tdsFolderTabs'
  | 'tdsFooter'
  | 'tdsFooterGroup'
  | 'tdsFooterItem'
  | 'tdsHeader'
  | 'tdsHeaderBrandSymbol'
  | 'tdsHeaderCell'
  | 'tdsHeaderDropdown'
  | 'tdsHeaderDropdownList'
  | 'tdsHeaderDropdownListItem'
  | 'tdsHeaderDropdownListUser'
  | 'tdsHeaderHamburger'
  | 'tdsHeaderItem'
  | 'tdsHeaderLauncher'
  | 'tdsHeaderLauncherButton'
  | 'tdsHeaderLauncherGrid'
  | 'tdsHeaderLauncherGridItem'
  | 'tdsHeaderLauncherGridTitle'
  | 'tdsHeaderLauncherList'
  | 'tdsHeaderLauncherListItem'
  | 'tdsHeaderLauncherListTitle'
  | 'tdsHeaderTitle'
  | 'tdsIcon'
  | 'tdsInlineTab'
  | 'tdsInlineTabs'
  | 'tdsLink'
  | 'tdsMessage'
  | 'tdsModal'
  | 'tdsNavigationTab'
  | 'tdsNavigationTabs'
  | 'tdsPopoverCanvas'
  | 'tdsPopoverCore'
  | 'tdsPopoverMenu'
  | 'tdsPopoverMenuItem'
  | 'tdsRadioButton'
  | 'tdsSideMenu'
  | 'tdsSideMenuCloseButton'
  | 'tdsSideMenuCollapseButton'
  | 'tdsSideMenuDropdown'
  | 'tdsSideMenuDropdownList'
  | 'tdsSideMenuDropdownListItem'
  | 'tdsSideMenuItem'
  | 'tdsSideMenuOverlay'
  | 'tdsSideMenuUser'
  | 'tdsSideMenuUserImage'
  | 'tdsSideMenuUserLabel'
  | 'tdsSlider'
  | 'tdsSpinner'
  | 'tdsStep'
  | 'tdsStepper'
  | 'tdsTable'
  | 'tdsTableBody'
  | 'tdsTableBodyRow'
  | 'tdsTableBodyRowExpandable'
  | 'tdsTableFooter'
  | 'tdsTableHeader'
  | 'tdsTableToolbar'
  | 'tdsTextField'
  | 'tdsTextarea'
  | 'tdsToast'
  | 'tdsToggle'
  | 'tdsTooltip';

export const INTERNAL_TAG_NAMES: TagName[] = [];
