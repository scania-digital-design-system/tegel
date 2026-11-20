const coreNoDataSlot = `
  <div class="tds-u-flex-center" style="padding: var(--unit-80);">
    <div class="tds-u-flex tds-u-gap2" style="max-width: 560px;">
      <tds-icon name="truck" size="28px" aria-hidden="true"></tds-icon>
      <div>
        <h4 class="tds-headline-04" style="margin: 0;">No vehicles yet</h4>
        <p class="tds-body-02" style="margin-block: var(--unit-16) 0; color: var(--color-text-defined);">
          Add a vehicle to start building your fleet, or choose a vehicle type to get started.
        </p>
        <div class="tds-u-flex tds-u-flex-wrap tds-u-gap2" style="margin-block-start: var(--unit-32);" role="group" aria-label="Vehicle types">
          ${['Trucks', 'Buses', 'Vans', 'Trailers', 'Other']
            .map(
              (label) =>
                `<tds-chip type="button" size="lg"><span slot="label">${label}</span></tds-chip>`,
            )
            .join('')}
        </div>
        <div class="tds-u-flex tds-u-flex-wrap tds-u-gap2" style="align-items: center; margin-block-start: var(--unit-32);">
          <tds-button variant="primary" size="sm" text="Add vehicle"></tds-button>
          <tds-button variant="secondary" size="sm" text="Import vehicles"></tds-button>
          <tds-button variant="ghost" size="sm" text="View sample fleet"></tds-button>
          <tds-link underline><a href="#">Explore Scania</a></tds-link>
        </div>
      </div>
    </div>
  </div>
`;

const coreNoFilteredDataSlot = `
  <div class="tds-u-flex-center" style="padding: var(--unit-80);">
    <div class="tds-u-flex tds-u-gap2" style="max-width: 448px;">
      <tds-icon name="search" size="28px" aria-hidden="true"></tds-icon>
      <div>
        <h4 class="tds-headline-04" style="margin: 0;">No data found</h4>
        <p class="tds-body-02" style="margin-block: var(--unit-16) 0; color: var(--color-text-defined);">
          There's nothing to show here yet. Try adjusting your filters or check back later.
        </p>
        <tds-button type="primary" size="sm" text="Clear filters" style="margin-block-start: var(--unit-32);"></tds-button>
      </div>
    </div>
  </div>
`;

const liteNoDataSlot = '<strong>No records yet</strong><div>New records will appear here.</div>';

const liteNoFilteredDataSlot = `
  <div class="tds-u-flex-center" style="padding: var(--unit-80);">
    <div class="tds-u-flex tds-u-gap2" style="max-width: 448px;">
      <span class="tl-icon tl-icon--search tl-icon--28" aria-hidden="true"></span>
      <div>
        <h4 class="tds-headline-04" style="margin: 0;">No data found</h4>
        <p class="tds-body-02" style="margin-block: var(--unit-16) 0; color: var(--color-text-defined);">
          There's nothing to show here yet. Try adjusting your filters or check back later.
        </p>
        <button type="button" class="tl-button tl-button--primary tl-button--sm" style="margin-top: var(--unit-32);">Clear filters</button>
      </div>
    </div>
  </div>
`;

const layouts = {
  core: { 'no-data': coreNoDataSlot, 'no-filtered-data': coreNoFilteredDataSlot },
  lite: { 'no-data': liteNoDataSlot, 'no-filtered-data': liteNoFilteredDataSlot },
};

export const renderEmptyStateSlot = (emptyState: string, variant: 'core' | 'lite') =>
  layouts[variant][emptyState];
