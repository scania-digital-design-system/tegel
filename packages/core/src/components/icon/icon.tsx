import { Component, h, Prop, Host, Element } from '@stencil/core';
import { IconNames } from '../../types/Icons';
import { iconsCollection as scaniaIconsCollection } from './scaniaIconsArray';
import { iconsCollection as tratonIconsCollection } from './tratonIconsArray';

type Brand = 'scania' | 'traton';

type IconDefinition = {
  name: string;
  definition: string;
};

function createIconMap(collection: string) {
  const icons = JSON.parse(collection) as IconDefinition[];
  return new Map(icons.map((icon) => [icon.name, icon.definition]));
}

const iconPaths: Record<Brand, Map<string, string>> = {
  scania: createIconMap(scaniaIconsCollection),
  traton: createIconMap(tratonIconsCollection),
};

const placeholderPaths: Record<Brand, string> = {
  scania: iconPaths.scania.get('placeholder') ?? '',
  traton: iconPaths.traton.get('placeholder') ?? '',
};

const warnedMissingIcons = new Set<string>();

function shouldWarnMissingIcon() {
  return (
    typeof process !== 'undefined' &&
    typeof process.env !== 'undefined' &&
    process.env.NODE_ENV !== 'production'
  );
}

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

  private getBrand(): Brand {
    return this.host.closest('.traton') ? 'traton' : 'scania';
  }

  private getPathD() {
    const brand = this.getBrand();
    const path = iconPaths[brand].get(this.name);
    if (path) return path;

    this.warnIfMissing(brand);
    return placeholderPaths[brand];
  }

  private warnIfMissing(brand: Brand) {
    if (!shouldWarnMissingIcon()) return;

    const warningKey = `${brand}:${this.name}`;
    if (warnedMissingIcons.has(warningKey)) return;

    warnedMissingIcons.add(warningKey);
    console.warn(
      `[tds-icon] "${this.name}" is not available in brand "${brand}"; rendering placeholder.`,
    );
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
          <path fill="currentColor" d={this.getPathD()} />
        </svg>
      </Host>
    );
  }
}
