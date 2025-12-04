// Check status of webFont solution

import { Component, h, Prop, State, Host, Element } from '@stencil/core';
import { iconsCollection as scaniaIcons } from './scaniaIconsArray';
import { iconsCollection as tratonIcons } from './tratonIconsArray';
import { IconNames } from '../../types/Icons';

// Map of brand classes to their respective icon collections
type IconDefinition = {
  name: string;
  definition: string;
};
const brandIconMap: {
  scania: IconDefinition[];
  traton: IconDefinition[];
} = {
  scania: scaniaIcons,
  traton: tratonIcons,
  // Add new brands here in the future
  // Example: newBrand: newBrandIcons,
};

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
  @Prop() svgTitle?: string;

  /** Set aria-hidden attribute on svg */
  @Prop() tdsAriaHidden: boolean = false;

  /** Set description for the svg. Also used by aria-describedby. */
  @Prop() svgDescription?: string;

  @State() icons_object: string = '';

  @State() arrayOfIcons = [];

  componentWillLoad() {
    this.detectAndSetBrand();
  }

  private detectAndSetBrand() {
    const brandClasses = Object.keys(brandIconMap);
    const matchingBrand = brandClasses.find((brand) => this.host.closest(`.${brand}`));

    // Set the icons_object based on the found brand or default to scania
    this.icons_object = matchingBrand ? brandIconMap[matchingBrand] : scaniaIcons;
    this.arrayDataWatcher(this.icons_object);
  }

  private arrayDataWatcher(newValue: string) {
    if (typeof newValue === 'string') {
      this.arrayOfIcons = JSON.parse(newValue);
    } else {
      this.arrayOfIcons = newValue;
    }
    this.arrayOfIcons = [...this.arrayOfIcons];
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
