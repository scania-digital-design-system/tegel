// Check status of webFont solution

import { Component, h, Prop, State, Host } from '@stencil/core';

import { iconsCollection } from './iconsArray';

@Component({
  tag: 'tds-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  /** Pass the name of the icon.
   * For icon names, refer to Storybook Icon controls dropdown or https://tegel.scania.com/foundations/icons/icon-library */
  @Prop({ reflect: true }) name: string = 'truck';

  /** Pass a size of icon as a string, for example, 32px, 1rem, 4em... */
  @Prop({ reflect: true }) size: string = '16px';

  /** Override the default title for the svg. Also used by aria-labelledby. */
  @Prop() svgTitle?: string;

  /** Set description for the svg. Text used for aria-describedby too. */
  @Prop() svgDescription?: string;

  @State() icons_object: string = iconsCollection;

  @State() arrayOfIcons = [];

  componentWillLoad() {
    this.arrayDataWatcher(this.icons_object);
  }

  arrayDataWatcher(newValue: string) {
    if (typeof newValue === 'string') {
      this.arrayOfIcons = JSON.parse(newValue);
    } else {
      this.arrayOfIcons = newValue;
    }
    this.arrayOfIcons = [...this.arrayOfIcons];
  }

  setIcons = () =>
    this.arrayOfIcons.map((element) => {
      if (element.name === this.name) {
        return (
          <svg
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
