import { Component, h, Prop, Host, Element, Watch, State } from '@stencil/core';
import { IconNames } from '../../types/Icons';

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

  // SVG properties resolved from brand-specific CSS custom properties.
  // Stored as state so Stencil re-renders the icon when they change.
  @State() private pathD: string = '';
  @State() private clipRule: string | number | undefined = undefined;
  @State() private fillRule: 'nonzero' | 'evenodd' | 'inherit' | undefined = undefined;

  private brandObserver?: MutationObserver;

  componentDidLoad() {
    // Resolve icon properties after the initial render, when the host
    // element is available and its CSS custom properties can be read.
    this.resolveIconProperties();
  }

  connectedCallback() {
    // Resolve properties when the component is connected or reconnected.
    // Some icons may initially be inside a detached Shadow DOM subtree,
    // where getComputedStyle() cannot yet resolve the expected values.
    this.resolveIconProperties();

    // Retry on the next animation frame if the path was not available.
    // This allows the parent subtree to finish attaching to the DOM.
    if (!this.pathD) {
      requestAnimationFrame(() => this.resolveIconProperties());
    }

    // Watch for runtime brand changes (e.g. Scania <-> Traton).
    this.observeBrandChanges();
  }

  disconnectedCallback() {
    this.brandObserver?.disconnect();
    this.brandObserver = undefined;
  }

  @Watch('name')
  nameChanged() {
    // Each icon name maps to a different set of CSS custom properties.
    // Re-resolve them whenever the requested icon changes.
    this.resolveIconProperties();
  }

  private observeBrandChanges() {
    // The active brand is controlled by a class on the document root.
    // Re-resolve the icon when that class changes so the correct
    // brand-specific SVG path and rules are applied.
    if (this.brandObserver) return;

    this.brandObserver = new MutationObserver(() => this.resolveIconProperties());

    this.brandObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  private resolveIconProperties() {
    // Icon definitions are stored in brand-specific CSS custom properties:
    // --tds-icon-<name>-d
    // --tds-icon-<name>-fill-rule
    // --tds-icon-<name>-clip-rule
    //
    // Read them from the host so the active brand's values are used.
    const styles = getComputedStyle(this.host);

    const rawPath = styles.getPropertyValue(`--tds-icon-${this.name}-d`).trim();

    // The path token uses CSS syntax: path("M...").
    // Extract the SVG path commands so they can be assigned directly
    // to the native SVG 'd' attribute.
    //
    // This avoids relying on the CSS 'd' property, which is not
    // supported by some older browsers, including older Safari versions.
    const pathMatch = rawPath.match(/^path\(\s*(['"])([\s\S]*)\1\s*\)$/);

    this.pathD = pathMatch ? pathMatch[2] : '';

    const clipRule = styles.getPropertyValue(`--tds-icon-${this.name}-clip-rule`).trim();

    const fillRule = styles.getPropertyValue(`--tds-icon-${this.name}-fill-rule`).trim();

    // Use undefined when no rule is defined, allowing SVG defaults.
    this.clipRule = clipRule || undefined;

    // Only assign valid SVG fill-rule values.
    this.fillRule =
      fillRule === 'evenodd' || fillRule === 'nonzero' || fillRule === 'inherit'
        ? fillRule
        : undefined;
  }

  render() {
    return (
      <Host>
        <svg
          aria-hidden={`${this.tdsAriaHidden}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-labelledby={this.svgTitle ? `title-${this.name}` : undefined}
          aria-describedby={this.svgDescription ? `desc-${this.name}` : undefined}
          role="img"
          height={this.size}
          width={this.size}
        >
          {this.svgTitle && <title id={`title-${this.name}`}>{this.svgTitle}</title>}
          {this.svgDescription && <desc id={`desc-${this.name}`}>{this.svgDescription}</desc>}
          {/* Use native SVG attributes instead of inline styles.
              This preserves compatibility with strict Content Security
              Policies (CSP) that prohibit inline style attributes. */}
          <path
            fill="currentColor"
            d={this.pathD}
            fill-rule={this.fillRule}
            clip-rule={this.clipRule}
          />
        </svg>
      </Host>
    );
  }
}
