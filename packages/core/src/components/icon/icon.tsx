import { Component, h, Prop, Host, Element, Watch, State } from '@stencil/core';
import { IconNames } from '../../types/Icons';

// Feature-detect the CSS `d` property once per module load. Where it is
// supported (Chromium, Firefox, Safari 18+) the path renders reactively from
// the brand-scoped --tds-icon-<name>-d variable via the CSS `d` property, so
// none of the imperative getComputedStyle / MutationObserver fallback runs —
// those engines pay no per-icon runtime cost. Only engines without it fall
// back to resolving the `d` attribute in JS.
//
// The probe must mirror exactly how render() applies the path: `d` set to a
// `var(--…)` reference resolved through the cascade, NOT a literal `path()`.
// That distinction is what fixes the TRATON placeholder (and every icon) in
// Safari: WebKit ships the `d` property — so a `CSS.supports('d', 'path(…)')`
// syntax check returns a false positive — yet it silently drops `var()`
// substitution inside `d` (https://bugs.webkit.org/show_bug.cgi?id=219448).
// `CSS.supports` only validates syntax (where `var()` is always "valid"), so
// it cannot detect this gap. Instead, render a detached probe element that
// reads its `d` from a custom property and verify via getComputedStyle that
// the value actually resolved. WebKit yields an empty/unresolved `d` and
// reports false, correctly falling through to the JS `d`-attribute path that
// works there; Chromium/Firefox resolve it and keep the zero-cost CSS path.
function detectCssDVarSupport(): boolean {
  if (typeof document === 'undefined' || !document.createElementNS) return false;
  try {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.style.setProperty('--tds-icon-probe-d', 'path("M0 0Z")');
    // position offscreen; never reflowed into the layout flow
    svg.setAttribute(
      'style',
      `${svg.getAttribute('style') ?? ''};position:absolute;width:0;height:0`,
    );
    path.style.setProperty('d', 'var(--tds-icon-probe-d)');
    svg.appendChild(path);
    document.documentElement.appendChild(svg);
    // Supporting engines resolve `var()` and report a normalised `path(…)`
    // value (Chromium/Firefox rewrite "M0 0Z" to "M 0 0 Z", so match the
    // command, not the exact bytes); WebKit drops the substitution and returns
    // an empty string.
    const resolved = getComputedStyle(path).getPropertyValue('d');
    document.documentElement.removeChild(svg);
    return resolved.trim().startsWith('path(');
  } catch {
    return false;
  }
}

const SUPPORTS_CSS_D = detectCssDVarSupport();

@Component({
  tag: 'tds-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  @Element() host!: HTMLTdsIconElement;

  /** Pass the name of the icon.
   * For icon names, refer to Storybook Icon controls dropdown or https://tegel.scania.com/foundations/icons/icon-library */
  @Prop({ reflect: true }) name: IconNames = 'truck';

  /** Pass a size of icon as a string, for example, 32px, 1rem, 4em... */
  @Prop({ reflect: true }) size: string = '16px';

  /** Override the default title for the svg. Also used by aria-labelledby. */
  @Prop({ reflect: true }) svgTitle?: string;

  /** Set aria-hidden attribute on svg */
  @Prop({ reflect: true }) tdsAriaHidden: boolean = false;

  /** Set description for the svg. Also used by aria-describedby. */
  @Prop({ reflect: true }) svgDescription?: string;

  @State() private pathD: string = '';

  private brandObserver?: MutationObserver;

  componentWillLoad() {
    if (SUPPORTS_CSS_D) return;
    this.resolvePath();
  }

  connectedCallback() {
    // The CSS `d` property handles brand-aware rendering reactively where
    // supported, so the JS fallback below only runs on engines without it.
    if (SUPPORTS_CSS_D) return;
    // When the icon is nested in another component's shadow tree, its load
    // lifecycle runs while the subtree is still detached, so the synchronous
    // getComputedStyle read in resolvePath yields nothing. Retry on the next
    // frame once the subtree is attached and the CSS variables resolve.
    this.resolvePath();
    if (!this.pathD) {
      requestAnimationFrame(() => this.resolvePath());
    }
    this.observeBrandChanges();
  }

  disconnectedCallback() {
    this.brandObserver?.disconnect();
    this.brandObserver = undefined;
  }

  @Watch('name')
  nameChanged() {
    if (SUPPORTS_CSS_D) return;
    this.resolvePath();
  }

  private observeBrandChanges() {
    // The JS `d` attribute fallback is read imperatively via getComputedStyle,
    // so it must re-resolve when the brand changes at runtime. The brand is
    // selected by a `.scania`/`.traton` class on the document root, so watch
    // the root's class attribute and re-resolve on change.
    if (this.brandObserver) return;
    this.brandObserver = new MutationObserver(() => this.resolvePath());
    this.brandObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  private resolvePath() {
    // Path data lives on the brand-scoped CSS variable --tds-icon-<name>-d
    // (see tokens/scss/component/icon.scss), shaped as `path('M...')`. Resolve
    // it to an SVG `d` attribute here as the fallback for engines without CSS
    // `d` support. An unknown icon name — brands have different icon sets, so a
    // name may not exist in the active brand — simply yields no match and
    // renders an empty path.
    const raw = getComputedStyle(this.host).getPropertyValue(`--tds-icon-${this.name}-d`).trim();
    const match = raw.match(/^path\(\s*(['"])([\s\S]*)\1\s*\)$/);
    this.pathD = match ? match[2] : '';
  }

  render() {
    // Brand-aware path data is supplied two ways so it works everywhere:
    //   1. The CSS `d` property bound to the brand-scoped --tds-icon-<name>-d
    //      variable. The CSS cascade resolves and updates this reactively when
    //      the .scania/.traton brand class changes — no JS, no timing races.
    //      Supported in Chromium, Firefox and Safari 18+.
    //   2. The `d` attribute resolved imperatively (this.pathD), as a fallback
    //      for engines that ignore the CSS `d` property (older Safari/WebKit).
    // Where the CSS `d` property is supported it overrides the `d` attribute,
    // so the two coexist: supporting engines use (1) and never populate (2);
    // others fall back to (2). See SUPPORTS_CSS_D above.
    const pathStyle = { d: `var(--tds-icon-${this.name}-d)` } as { [key: string]: string };

    return (
      <Host>
        <svg
          aria-hidden={this.tdsAriaHidden}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-labelledby={this.svgTitle ? `title-${this.name}` : undefined}
          aria-describedby={this.svgDescription ? `desc-${this.name}` : undefined}
          role="img"
          style={{ fontSize: this.size }}
          height={this.size}
          width={this.size}
        >
          {this.svgTitle && <title id={`title-${this.name}`}>{this.svgTitle}</title>}
          {this.svgDescription && <desc id={`desc-${this.name}`}>{this.svgDescription}</desc>}
          <path fill="currentColor" style={pathStyle} d={this.pathD} />
        </svg>
      </Host>
    );
  }
}
