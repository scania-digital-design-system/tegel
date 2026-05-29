/**
 * Single source of truth for the tegel-lite components that ship in the
 * @scania/tegel-lite npm package and appear in production Storybook.
 *
 * Only components migrated to the new variable structure
 * (per .claude/skills/tegel-variable-migration/SKILL.md) are listed here,
 * plus tl-icon, which provides icon assets required by the migrated set.
 *
 * Consumed by:
 *  - packages/core/scripts/compile-tegel-lite-components.js (per-component CSS emit)
 *  - packages/core/scripts/update-tegel-lite-exports.js (package.json exports map)
 *  - packages/core/.storybook/main.ts (prod-Storybook story-file allowlist)
 *  - packages/core/src/tegel-lite/components.scss (manual sync — npm components.css bundle)
 *
 * The Storybook bundle (src/global/tegel-lite-components.scss) intentionally
 * still imports every tl-* component so dev-mode Storybook can render
 * un-shipped components in flight; the prod story-file filter in main.ts
 * controls which stories the published Storybook actually surfaces.
 */
export const SHIPPED_COMPONENTS = [
  'tl-accordion',
  'tl-banner',
  'tl-block',
  'tl-breadcrumbs',
  'tl-button',
  'tl-card',
  'tl-divider',
  'tl-footer',
  'tl-icon',
  'tl-link',
  'tl-message',
  'tl-modal',
  'tl-text-field',
  'tl-textarea',
  'tl-toast',
  'tl-tooltip',
];
