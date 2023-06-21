import { Component, h, Prop, Event, EventEmitter, Element, Host } from '@stencil/core';
import { hasSlot } from '../../utils/utils';

/**
 * @slto header - Slot for the Card header.
 * @slot subheader - Slot for the Card subheader.
 * @slot thumbnail - Slot for the Card thumbnail.
 * @slot body - Slot for the body section of the Card.
 * @slot body-image - Slot for the body section of the Card, used for image.
 * @slot bottom - Slot for the bottom section of the Card.
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
  @Prop() imagePlacement: 'above-header' | 'below-header' = 'above-header';

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

  /** ID for the Card, must be unique.
   *
   * **NOTE**: If you're listening for Card events, you need to set this ID yourself to identify the Card,
   * as the default ID is random and will be different every time.
   */
  @Prop() cardId: string = crypto.randomUUID();

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

  getCardContent = (hasThumbnail: boolean, hasSubheader: boolean) => (
    <div>
      {this.imagePlacement === 'above-header' && (
        <div class={`card-top ${this.imagePlacement}`}>
          <div class={hasSlot('thumbnail', this.host) ? 'thumbnail' : 'no-header-img'}>
            <slot name="thumbnail"></slot>
          </div>
          <div class={`card-top-header ${!hasThumbnail ? 'no-header-img' : ''}`}>
            <span class={`card-header`}>
              {this.header}
              <slot name="header"></slot>
            </span>
            <span class={`card-subheader ${!hasSubheader ? 'no-subheader' : ''}`}>
              {this.subheader}
              <slot name="subheader"></slot>
            </span>
          </div>
        </div>
      )}
      <div class={`card-body`}>
        <slot name="body-image"></slot>
        {this.bodyImg && <img class={`card-body-img`} src={this.bodyImg} alt={this.bodyImgAlt} />}
        {this.imagePlacement === 'below-header' && (this.header || this.subheader) && (
          <div class={`card-top ${this.imagePlacement}`}>
            <div class={hasThumbnail ? 'card-thumbnail' : 'no-header-img'}>
              <slot name="thumbnail"></slot>
            </div>
            <div
              class={`
            card-top-header
            ${!hasSlot('thumbail', this.host) ? 'no-header-img' : ''}
            `}
            >
              <span class={`card-header`}>{this.header}</span>
              <span class={`card-subheader ${!hasSubheader ? 'no-subheader' : ''}`}>
                {this.subheader}
                <slot name="subheader"></slot>
              </span>
            </div>
          </div>
        )}
        {this.bodyDivider && <tds-divider></tds-divider>}
        <slot name="body"></slot>
      </div>
      <slot name={`bottom`}></slot>
    </div>
  );

  render() {
    const hasThumbnail = hasSlot('thumbail', this.host);
    const hasSubheader = !!this.subheader || hasSlot('subheader', this.host);
    return (
      <Host class={this.modeVariant && `tds-mode-variant-${this.modeVariant}`}>
        {this.clickable ? (
          <button
            class={`card ${this.clickable ? 'clickable' : ''} ${this.imagePlacement}`}
            onClick={() => {
              if (this.clickable) {
                this.handleClick();
              }
            }}
          >
            {this.getCardContent(hasThumbnail, hasSubheader)}
          </button>
        ) : (
          <div class={`card ${this.clickable ? 'clickable' : ''} ${this.imagePlacement}`}>
            {this.getCardContent(hasThumbnail, hasSubheader)}
          </div>
        )}
      </Host>
    );
  }
}
