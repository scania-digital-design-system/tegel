export const TAG_NAMES = [
  'v1-tds-accordion',
  'v1-tds-badge',
  'v1-tds-banner',
  'v1-tds-breadcrumbs',
  'v1-tds-button',
  'v1-tds-card',
  'v1-tds-block',
  'v1-tds-checkbox',
  'v1-tds-chip',
  'v1-tds-datetime',
  'v1-tds-divider',
  'v1-tds-dropdown',
  'v1-tds-footer',
  'v1-tds-header',
  'v1-tds-icon',
  'v1-tds-link',
  'v1-tds-message',
  'v1-tds-modal',
  'v1-tds-popover-canvas',
  'v1-tds-popover-core',
  'v1-tds-radio-button',
  'v1-tds-popover-menu',
  'v1-tds-side-menu',
  'v1-tds-slider',
  'v1-tds-spinner',
  'v1-tds-stepper',
  'v1-tds-text-field',
  'v1-tds-textarea',
  'v1-tds-toast',
  'v1-tds-toggle',
  'v1-tds-tooltip',
  'v1-tds-accordion-item',
  'v1-tds-breadcrumb',
  'v1-tds-dropdown-option',
  'v1-tds-footer-group',
  'v1-tds-footer-item',
  'v1-tds-core-header-item',
  'v1-tds-header-brand-symbol',
  'v1-tds-header-dropdown',
  'v1-tds-header-dropdown-list',
  'v1-tds-header-dropdown-list-item',
  'v1-tds-header-dropdown-list-user',
  'v1-tds-header-hamburger',
  'v1-tds-header-item',
  'v1-tds-header-launcher',
  'v1-tds-header-launcher-button',
  'v1-tds-header-launcher-grid',
  'v1-tds-header-launcher-grid-item',
  'v1-tds-header-launcher-grid-title',
  'v1-tds-header-launcher-list',
  'v1-tds-header-launcher-list-item',
  'v1-tds-header-launcher-list-title',
  'v1-tds-header-title',
  'v1-tds-popover-menu-item',
  'v1-tds-side-menu-close-button',
  'v1-tds-side-menu-dropdown',
  'v1-tds-side-menu-collapse-button',
  'v1-tds-side-menu-dropdown-list',
  'v1-tds-side-menu-item',
  'v1-tds-side-menu-dropdown-list-item',
  'v1-tds-side-menu-user',
  'v1-tds-side-menu-overlay',
  'v1-tds-side-menu-user-image',
  'v1-tds-side-menu-user-label',
  'v1-tds-step',
  'v1-tds-table',
  'v1-tds-table-body',
  'v1-tds-body-cell',
  'v1-tds-table-body-row',
  'v1-tds-table-body-row-expandable',
  'v1-tds-table-footer',
  'v1-tds-table-header',
  'v1-tds-header-cell',
  'v1-tds-table-toolbar',
  'v1-tds-folder-tabs',
  'v1-tds-inline-tabs',
  'v1-tds-navigation-tabs',
  'v1-tds-date-picker',
  'v1-tds-date-range-picker',
  'v1-tds-folder-tab',
  'v1-tds-inline-tab',
  'v1-tds-navigation-tab',
  'v1-date-picker-day',
  'v1-date-picker-year',
  'v1-date-picker-month',
  'v1-date-range-picker-day',
] as const;
export type TagName = (typeof TAG_NAMES)[number];
export type TagNameCamelCase =
  | 'v1TdsAccordion'
  | 'v1TdsBadge'
  | 'v1TdsBanner'
  | 'v1TdsBreadcrumbs'
  | 'v1TdsButton'
  | 'v1TdsCard'
  | 'v1TdsBlock'
  | 'v1TdsCheckbox'
  | 'v1TdsChip'
  | 'v1TdsDatetime'
  | 'v1TdsDivider'
  | 'v1TdsDropdown'
  | 'v1TdsFooter'
  | 'v1TdsHeader'
  | 'v1TdsIcon'
  | 'v1TdsLink'
  | 'v1TdsMessage'
  | 'v1TdsModal'
  | 'v1TdsPopoverCanvas'
  | 'v1TdsPopoverCore'
  | 'v1TdsRadioButton'
  | 'v1TdsPopoverMenu'
  | 'v1TdsSideMenu'
  | 'v1TdsSlider'
  | 'v1TdsSpinner'
  | 'v1TdsStepper'
  | 'v1TdsTextField'
  | 'v1TdsTextarea'
  | 'v1TdsToast'
  | 'v1TdsToggle'
  | 'v1TdsTooltip'
  | 'v1TdsAccordionItem'
  | 'v1TdsBreadcrumb'
  | 'v1TdsDropdownOption'
  | 'v1TdsFooterGroup'
  | 'v1TdsFooterItem'
  | 'v1TdsCoreHeaderItem'
  | 'v1TdsHeaderBrandSymbol'
  | 'v1TdsHeaderDropdown'
  | 'v1TdsHeaderDropdownList'
  | 'v1TdsHeaderDropdownListItem'
  | 'v1TdsHeaderDropdownListUser'
  | 'v1TdsHeaderHamburger'
  | 'v1TdsHeaderItem'
  | 'v1TdsHeaderLauncher'
  | 'v1TdsHeaderLauncherButton'
  | 'v1TdsHeaderLauncherGrid'
  | 'v1TdsHeaderLauncherGridItem'
  | 'v1TdsHeaderLauncherGridTitle'
  | 'v1TdsHeaderLauncherList'
  | 'v1TdsHeaderLauncherListItem'
  | 'v1TdsHeaderLauncherListTitle'
  | 'v1TdsHeaderTitle'
  | 'v1TdsPopoverMenuItem'
  | 'v1TdsSideMenuCloseButton'
  | 'v1TdsSideMenuDropdown'
  | 'v1TdsSideMenuCollapseButton'
  | 'v1TdsSideMenuDropdownList'
  | 'v1TdsSideMenuItem'
  | 'v1TdsSideMenuDropdownListItem'
  | 'v1TdsSideMenuUser'
  | 'v1TdsSideMenuOverlay'
  | 'v1TdsSideMenuUserImage'
  | 'v1TdsSideMenuUserLabel'
  | 'v1TdsStep'
  | 'v1TdsTable'
  | 'v1TdsTableBody'
  | 'v1TdsBodyCell'
  | 'v1TdsTableBodyRow'
  | 'v1TdsTableBodyRowExpandable'
  | 'v1TdsTableFooter'
  | 'v1TdsTableHeader'
  | 'v1TdsHeaderCell'
  | 'v1TdsTableToolbar'
  | 'v1TdsFolderTabs'
  | 'v1TdsInlineTabs'
  | 'v1TdsNavigationTabs'
  | 'v1TdsDatePicker'
  | 'v1TdsDateRangePicker'
  | 'v1TdsFolderTab'
  | 'v1TdsInlineTab'
  | 'v1TdsNavigationTab'
  | 'v1DatePickerDay'
  | 'v1DatePickerYear'
  | 'v1DatePickerMonth'
  | 'v1DateRangePickerDay';
export const INTERNAL_TAG_NAMES: TagName[] = [];
