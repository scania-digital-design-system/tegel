// Check status of webFont solution

import { Component, h, Prop, State, Host } from '@stencil/core';

import { iconsCollection } from './iconsArray';

@Component({
  tag: 'tds-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  /** Pass a name of the icon. For icon names, refer to Storybook Icon controls dropdown or https://tegel.scania.com/foundations/icons/icon-library */
  @Prop({ reflect: true }) name: string = 'truck';

  /** Pass a size of icon as a string, for example: 32px, 1rem, 4em... */
  @Prop({ reflect: true }) size: string = '16px';

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
            aria-labelledby={`icon ${element.name}`}
            role="img"
            style={{ fontSize: this.size }}
            height={this.size}
            width={this.size}
          >
            <text>{`${element.name} icon`}</text>
            <path fill="currentColor" d={element.definition} />
          </svg>
        );
      }
    });

  render() {
    return <Host>{this.setIcons()}</Host>;
  }
}
