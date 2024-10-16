import { Component, h, Prop, Event, EventEmitter, Element, Host } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';
import hasSlot from '../../utils/hasSlot';
import { getPrefixedTagNames } from '../../utils/tagName';

/**
 * @slot header - Slot for the Card header.
 * @slot subheader - Slot for the Card subheader.
 * @slot thumbnail - Slot for the Card thumbnail.
 * @slot body - Slot for the body section of the Card.
 * @slot body-image - Slot for the body section of the Card, used for image.
 * @slot actions - Slot for the bottom section of the Card, used for buttons .
 */
@Component({
  tag: 'tds-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class TdsCard {
  @Element() host: HTMLElement;

  /** Variant of the Card based on the theme used. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Placement of the header */
  @Prop() imagePlacement: 'above-header' | 'below-header' = 'below-header';

  /** Text in the header */
  @Prop() header: string;

  /** Subheader text in the header */
  @Prop() subheader: string;

  /** Body image src */
  @Prop() bodyImg: string;

  /** Alt text for the body image */
  @Prop() bodyImgAlt: string;

  /** Divider for the body */
  @Prop() bodyDivider: boolean = false;

  /** Makes the Card clickable. */
  @Prop() clickable: boolean = false;

  @Prop() stretch: boolean = false;

  /** ID for the Card, must be unique.
   *
   * **NOTE**: If you're listening for Card events, you need to set this ID yourself to identify the Card,
   * as the default ID is random and will be different every time.
   */
  @Prop() cardId: string = generateUniqueId();

  /** Sends unique Card identifier when the Card is clicked, if clickable=true */
  @Event({
    eventName: 'tdsClick',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  tdsClick: EventEmitter<{
    cardId: string;
  }>;

  handleClick = () => {
    this.tdsClick.emit({
      cardId: this.cardId,
    });
  };

  getCardHeader = () => {
    const usesHeaderSlot = hasSlot('header', this.host);
    const usesSubheaderSlot = hasSlot('subheader', this.host);
    const usesThumbnailSlot = hasSlot('thumbnail', this.host);
    return (
      <div class="card-header">
        {usesThumbnailSlot && <slot name="thumbnail"></slot>}
        <div class="header-subheader">
          {this.header && <span class="header">{this.header}</span>}
          {usesHeaderSlot && <slot name="header"></slot>}
          {this.subheader && <span class="subheader">{this.subheader}</span>}
          {usesSubheaderSlot && <slot name="subheader"></slot>}
        </div>
      </div>
    );
  };

  getCardContent = (prefixedTagNames) => {
    const usesBodySlot = hasSlot('body', this.host);
    const usesBodyImageSlot = hasSlot('body-image', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    return (
      <div class={this.stretch && 'stretch'}>
        {this.imagePlacement === 'below-header' && this.getCardHeader()}
        <div class={`card-body`}>
          {usesBodyImageSlot && <slot name="body-image"></slot>}
          {this.bodyImg && <img class="card-body-img" src={this.bodyImg} alt={this.bodyImgAlt} />}
          {this.imagePlacement === 'above-header' && this.getCardHeader()}
          {this.bodyDivider && <prefixedTagNames.tdsDivider></prefixedTagNames.tdsDivider>}
          {usesBodySlot && <slot name="body"></slot>}
        </div>
        {usesActionsSlot && <slot name={`actions`}></slot>}
      </div>
    );
  };

  render() {
    const prefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host class={this.modeVariant && `tds-mode-variant-${this.modeVariant}`}>
        {this.clickable ? (
          <button
            class={`card ${this.clickable ? 'clickable' : ''} ${
              this.stretch ? `${this.imagePlacement}-stretch` : this.imagePlacement
            }`}
            onClick={() => {
              if (this.clickable) {
                this.handleClick();
              }
            }}
          >
            {this.getCardContent(prefixedTagNames)}
          </button>
        ) : (
          <div
            class={`card ${this.clickable ? 'clickable' : ''} ${
              this.stretch ? `${this.imagePlacement}-stretch` : this.imagePlacement
            }`}
          >
            {this.getCardContent(prefixedTagNames)}
          </div>
        )}
      </Host>
    );
  }
}
