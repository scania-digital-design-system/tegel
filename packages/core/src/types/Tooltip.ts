type BasePlacement = 'top' | 'bottom' | 'left' | 'right';
type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';
export type Placement = BasePlacement | VariationPlacement;
