import { Component, h, Prop, Event, EventEmitter, Element, Host } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';
import hasSlot from '../../utils/hasSlot';

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

  /**
   * Enables expandable behaviour.
   * When true, clicking the header toggles content visibility.
   */
  @Prop() expandable: boolean = false;

  /**
   * Tracks the current expanded state when expandable is enabled.
   */
  @Prop({ mutable: true, reflect: true }) expanded: boolean = false;

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

  private toggleExpand = () => {
    if (this.expandable) {
      this.expanded = !this.expanded;
    }
  };

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
      <div
        class={{ 'card-header': true, 'expandable': this.expandable, 'expanded': this.expanded }}
      >
        {usesThumbnailSlot && <slot name="thumbnail"></slot>}
        <div class="header-subheader" id={`header-${this.cardId}`}>
          {this.header && <span class="header">{this.header}</span>}
          {usesHeaderSlot && <slot name="header"></slot>}
          {this.subheader && <span class="subheader">{this.subheader}</span>}
          {usesSubheaderSlot && <slot name="subheader"></slot>}
        </div>
        {this.expandable && (
          <tds-button
            type="button"
            variant="ghost"
            size="sm"
            tds-aria-label="Icon button"
            onClick={this.toggleExpand}
          >
            <tds-icon
              slot="icon"
              size="16px"
              name="chevron_down"
              class={{ rotated: this.expanded }}
            ></tds-icon>
          </tds-button>
        )}
      </div>
    );
  };

  getCardContent = () => {
    const usesBodySlot = hasSlot('body', this.host);
    const usesBodyImageSlot = hasSlot('body-image', this.host);
    const usesActionsSlot = hasSlot('actions', this.host);
    const bodyId = `body-${this.cardId}`;
    return (
      <div class={this.stretch && 'stretch'} aria-describedby={usesBodySlot ? bodyId : null}>
        {this.imagePlacement === 'below-header' && this.getCardHeader()}
        <div class="card-body" id={bodyId}>
          {usesBodyImageSlot && <slot name="body-image"></slot>}
          {this.bodyImg && <img class="card-body-img" src={this.bodyImg} alt={this.bodyImgAlt} />}
          {this.imagePlacement === 'above-header' && this.getCardHeader()}
          {this.bodyDivider && <tds-divider></tds-divider>}
          {usesBodySlot && <slot name="body"></slot>}
        </div>
        {usesActionsSlot && <slot name={`actions`}></slot>}
      </div>
    );
  };

  render() {
    const cardStyle = {
      card: true,
      clickable: this.clickable,
      [this.imagePlacement]: !this.stretch,
      [`${this.imagePlacement}-stretch`]: this.stretch,
    };

    const ariaLabel = this.header ? this.header : `Card ${this.cardId}`;

    return (
      <Host class={this.modeVariant && `tds-mode-variant-${this.modeVariant}`}>
        {this.clickable ? (
          <button
            class={cardStyle}
            onClick={this.handleClick}
            aria-label={ariaLabel}
            aria-describedby={`header-${this.cardId}`}
          >
            {this.getCardContent()}
          </button>
        ) : (
          <div class={cardStyle}>{this.getCardContent()}</div>
        )}
      </Host>
    );
  }
}
