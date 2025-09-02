import { Component, h, Prop, Host, Element } from '@stencil/core';
import hasSlot from '../../utils/hasSlot';

/**
 * @slot icon - Slot used to display an Icon in the Tag.
 */
@Component({
  tag: 'tds-tag',
  styleUrl: 'tag.scss',
  shadow: false,
  scoped: true,
})
export class TdsTag {
  /** The element host */
  @Element() host: HTMLElement;

  /** The title text to display in the tag */
  @Prop() text!: string;

  /** Sets the size of the tag */
  @Prop() size: 'lg' | 'sm' = 'lg';

  /** Sets the variant mode of the tag */
  @Prop() variant: 'Success' | 'Warning' | 'New' | 'Neutral' | 'Information' | 'Error' = 'Neutral';

  render() {
    const hasIconSlot = hasSlot('icon', this.host);

    const getTagClasses = () => ({
      'tds-tag': true,
      [`tds-tag-${this.size.toLowerCase()}`]: true,
      [`tds-tag-${this.variant.toLowerCase()}`]: true,
    });

    return (
      <Host class={getTagClasses()}>
        <div class="tds-tag-content">
          {hasIconSlot && <slot name="icon" />}
          <span class="tds-tag-title">{this.text}</span>
        </div>
      </Host>
    );
  }
}
