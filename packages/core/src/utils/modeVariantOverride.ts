/** Returns true if the component should be styled as primary mode variant */
const styleAsPrimaryModeVariant = (
  modeVariant: string,
  swapModeVariant: boolean,
  readOnly: boolean = false,
) => {
  if (swapModeVariant) {
    return readOnly ? modeVariant === 'primary' : modeVariant === 'secondary';
  }
  return readOnly ? modeVariant === 'secondary' : modeVariant === 'primary';
};

/** Returns true if the component should be styled as secondary mode variant */
const styleAsSecondaryModeVariant = (
  modeVariant: string,
  swapModeVariant: boolean,
  readOnly: boolean = false,
) => {
  if (swapModeVariant) {
    return readOnly ? modeVariant === 'secondary' : modeVariant === 'primary';
  }
  return readOnly ? modeVariant === 'primary' : modeVariant === 'secondary';
};

/** Returns the potentially adjusted class for the mode variant */
export const getAdjustedModeVariant = (
  modeVariant: string,
  swapModeVariant: boolean,
  readOnly: boolean = false,
) => {
  if (!modeVariant) {
    return '';
  }
  if (!swapModeVariant) {
    return `tds-mode-variant-${modeVariant}`;
  }
  if (styleAsPrimaryModeVariant(modeVariant, swapModeVariant, readOnly)) {
    return 'tds-mode-variant-primary';
  }
  if (styleAsSecondaryModeVariant(modeVariant, swapModeVariant, readOnly)) {
    return 'tds-mode-variant-secondary';
  }
  return `tds-mode-variant-${modeVariant}`;
};
