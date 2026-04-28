// Check status of webFont solution

import { Component, h, Prop, State, Host } from '@stencil/core';
import { iconsCollection as scaniaIcons } from './scaniaIconsArray';
import { iconsCollection as tratonIcons } from './tratonIconsArray';
import { IconNames } from '../../types/Icons';

type IconDefinition = {
  name: string;
  definition: string;
};
type Brand = 'scania' | 'traton';

// `iconsCollection` is exported as a JSON string by the icons build pipeline
// (see icons/gulpfile.js). Parse once per brand at module load.
const parseIcons = (raw: unknown): IconDefinition[] =>
  typeof raw === 'string' ? JSON.parse(raw) : (raw as IconDefinition[]);

const brandIconMap: Record<Brand, IconDefinition[]> = {
  scania: parseIcons(scaniaIcons),
  traton: parseIcons(tratonIcons),
  // Add new brands here in the future
  // Example: newBrand: parseIcons(newBrandIcons),
};

// Brand is expected to be set at the app root (e.g. <html class="traton"> or
// <body class="traton">). For per-icon overrides, pass the `brand` prop.
const getDocumentBrand = (): Brand => {
  if (typeof document === 'undefined') return 'scania';
  const isTraton =
    document.documentElement?.classList.contains('traton') ||
    document.body?.classList.contains('traton');
  return isTraton ? 'traton' : 'scania';
};

@Component({
  tag: 'tds-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
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

  /** Pass the brand to use the correct icon set. If omitted, the brand is read
   * from a `traton` class on `<html>` or `<body>`, defaulting to 'scania'. */
  @Prop({ reflect: true }) brand?: Brand;

  @State() arrayOfIcons: IconDefinition[] = [];

  componentWillLoad() {
    const brand = this.brand ?? getDocumentBrand();
    this.arrayOfIcons = brandIconMap[brand] ?? brandIconMap.scania;
  }

  setIcons = () =>
    this.arrayOfIcons.map((element: IconDefinition) => {
      if (element.name === this.name) {
        return (
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
            <path fill="currentColor" d={element.definition} />
          </svg>
        );
      }
    });

  render() {
    return <Host>{this.setIcons()}</Host>;
  }
}
