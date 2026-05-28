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

  @State() private pathD: string = '';

  componentWillLoad() {
    this.resolvePath();
  }

  @Watch('name')
  nameChanged() {
    this.resolvePath();
  }

  private resolvePath() {
    // Path data lives on the brand-scoped CSS variable --tds-icon-<name>-d
    // (see tokens/scss/component/icon.scss), shaped as `path('M...')`. We
    // resolve it to an SVG `d` attribute via JS because the CSS `d` property
    // is Safari 18+ only — older Safari would otherwise render an empty path.
    const styles = getComputedStyle(this.host);
    const exists = styles.getPropertyValue(`--tds-icon-${this.name}-exists`).trim();
    if (!exists) {
      const brand = styles.getPropertyValue('--tds-brand-name').trim().replace(/['"]/g, '');
      console.warn(
        `[tds-icon] "${this.name}" is not available in brand "${brand || 'unknown'}"; rendering placeholder.`,
      );
      this.pathD = '';
      return;
    }
    const raw = styles.getPropertyValue(`--tds-icon-${this.name}-d`).trim();
    const match = raw.match(/^path\(\s*(['"])([\s\S]*)\1\s*\)$/);
    this.pathD = match ? match[2] : '';
  }

  render() {
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
          <path fill="currentColor" d={this.pathD} />
        </svg>
      </Host>
    );
  }
}
