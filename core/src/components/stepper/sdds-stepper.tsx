import { Component, Host, h, Prop, Element, Event } from '@stencil/core';
import { EventEmitter, HostElement, Watch } from '@stencil/core/internal';

type SddsStepperProps = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'aside' | 'below';
  size: 'sm' | 'lg';
  hideLabels: boolean;
};

export type InternalSddsStepperPropChange = {
  stepperId: string;
  changed: Array<keyof SddsStepperProps>;
} & Partial<SddsStepperProps>;

@Component({
  tag: 'sdds-stepper',
  styleUrl: 'sdds-stepper.scss',
  shadow: true,
})
export class SddsStepper {
  @Element() host: HostElement;

  /** The orientation the children are layed out. */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Text position, only available on direction:horizontal */
  @Prop() labelPosition: 'aside' | 'below' = 'below';

  /** Size of the component and it's children. */
  @Prop() size: 'sm' | 'lg' = 'lg';

  /** Hides the label for the child components if true. */
  @Prop() hideLabels: boolean = false;

  /** ID used for internal stepper functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for stepper events you need to set this ID yourself to identify the stepper, as the default ID is random and will be different every time.
   */
  @Prop() stepperId: string = crypto.randomUUID();

  componentWillLoad() {
    this.host.children[0].classList.add('first');
    this.host.children[this.host.children.length - 1].classList.add('last');
    if (this.orientation === 'vertical') {
      this.labelPosition = 'aside';
    }
  }

  @Event({
    eventName: 'internalSddsPropsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  internalSddsPropsChange: EventEmitter<InternalSddsStepperPropChange>;

  @Watch('orientation')
  handleDirectionChange() {
    this.internalSddsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['orientation'],
      orientation: this.orientation,
    });
  }

  @Watch('labelPosition')
  handleLabelPositionChange() {
    this.internalSddsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['labelPosition'],
      labelPosition: this.labelPosition,
    });
  }

  @Watch('size')
  handleSizeChange() {
    this.internalSddsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['size'],
      size: this.size,
    });
  }

  @Watch('hideLabels')
  handleHideLabelsChange() {
    this.internalSddsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['hideLabels'],
      hideLabels: this.hideLabels,
    });
  }

  render() {
    return (
      <Host>
        <div
          role="list"
          class={`${this.orientation} text-position-${this.labelPosition} ${this.size}`}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
