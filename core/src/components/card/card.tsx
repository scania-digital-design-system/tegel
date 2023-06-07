import { Component, h, Prop, Event, EventEmitter, Element, State, Host } from '@stencil/core';
import { hasSlot } from '../../utils/utils';

@Component({
  tag: 'tds-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class TdsCard {
  /** Variant of the Card based on the theme used. */
  @Prop() modeVariant: 'primary' | 'secondary' = null;

  /** Placement of the header */
  @Prop() headerPlacement: 'above' | 'below' = 'above';

  /** Text in the header */
  @Prop() header: string;

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

  @Element() hostElement: HTMLTdsCardElement;

  @State() hasCardBottomSlot: boolean = false;

  @State() hasCardBodySlot: boolean = false;

  @State() hasCardThumbnailSlot: boolean = false;

  @State() hasSubheaderSlot: boolean;

  connectedCallback() {
    this.hasCardThumbnailSlot = hasSlot('card-thumbnail', this.hostElement);
    this.hasSubheaderSlot = hasSlot('card-subheader', this.hostElement);
    this.hasCardBodySlot = hasSlot('card-body', this.hostElement);
    this.hasCardBottomSlot = hasSlot('card-bottom', this.hostElement);
  }

  handleClick = () => {
    this.tdsClick.emit({
      cardId: this.cardId,
    });
  };

  getCardContent = () => (
    <div>
      {this.headerPlacement === 'above' && (
        <div class={`card-top ${this.headerPlacement}`}>
          {this.hasCardThumbnailSlot && (
            <div class={this.hasCardThumbnailSlot ? 'card-thumbnail' : 'no-header-img'}>
              <slot name="card-thumbnail"></slot>
            </div>
          )}
          <div
            class={`
          card-top-header
          ${!this.hasCardThumbnailSlot ? 'no-header-img' : ''}
          ${!this.header || !this.hasSubheaderSlot ? 'single-line-header' : ''}
          `}
          >
            <span class={`card-header`}>{this.header}</span>
            {this.hasSubheaderSlot && (
              <span class={`card-subheader`}>
                <slot name="card-subheader"></slot>
              </span>
            )}
          </div>
        </div>
      )}
      <div class={`card-body`}>
        {this.bodyImg && <img class={`card-body-img`} src={this.bodyImg} alt={this.bodyImgAlt} />}
        {this.headerPlacement === 'below' && (this.header || this.hasSubheaderSlot) && (
          <div class={`card-top ${this.headerPlacement}`}>
            {this.hasCardThumbnailSlot && (
              <div class="card-thumbnail">
                <slot name="card-thumbnail"></slot>
              </div>
            )}
            <div
              class={`
            card-top-header
            ${!this.hasCardThumbnailSlot ? 'no-header-img' : ''}
            ${!this.header || !this.hasSubheaderSlot ? 'single-line-header' : ''}
            `}
            >
              <span class={`card-header`}>{this.header}</span>
              <span class={`card-subheader`}>
                <slot name="card-subheader"></slot>
              </span>
            </div>
          </div>
        )}
        {this.bodyDivider && <tds-divider></tds-divider>}
        <slot name="card-body"></slot>
      </div>
      <div class={`card-bottom`}>
        {this.hasCardBottomSlot && <slot name={`card-bottom`}></slot>}
      </div>
    </div>
  );

  render() {
    return (
      <Host class={this.modeVariant && `tds-mode-variant-${this.modeVariant}`}>
        {this.clickable ? (
          <button
            class={`card ${this.clickable ? 'clickable' : ''} ${this.headerPlacement}`}
            onClick={() => {
              if (this.clickable) {
                this.handleClick();
              }
            }}
          >
            {this.getCardContent()}
          </button>
        ) : (
          <div class={`card ${this.clickable ? 'clickable' : ''} ${this.headerPlacement}`}>
            {this.getCardContent()}
          </div>
        )}
      </Host>
    );
  }
}
