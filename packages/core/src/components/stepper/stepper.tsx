import { Component, Host, h, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';
import generateUniqueId from '../../utils/generateUniqueId';

type TdsStepperProps = {
  orientation: 'horizontal' | 'vertical';
  labelPosition: 'aside' | 'below';
  size: 'sm' | 'lg';
  hideLabels: boolean;
};

export type InternalTdsStepperPropChange = {
  stepperId: string;
  changed: Array<keyof TdsStepperProps>;
} & Partial<TdsStepperProps>;

/**
 * @slot <default> - <b>Unnamed slot.</b> For the step elements.
 */
@Component({
  tag: 'tds-stepper',
  styleUrl: 'stepper.scss',
  shadow: true,
})
export class TdsStepper {
  @Element() host: HTMLElement;

  /** The orientation the Steps */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Text position, only available on a direction: horizontal */
  @Prop() labelPosition: 'aside' | 'below' = 'below';

  /** Size of the component and it's children. */
  @Prop() size: 'sm' | 'lg' = 'lg';

  /** Hides the label for the child components if true. */
  @Prop() hideLabels: boolean = false;

  /** ID used for internal Stepper functionality and events, must be unique.
   *
   * **NOTE**: If you're listening for Stepper events, you need to set this ID yourself to identify the Stepper,
   * as the default ID is random and will be different every time.
   */
  @Prop() stepperId: string = generateUniqueId();

  componentWillLoad() {
    this.host.children[0].classList.add('first');
    this.host.children[this.host.children.length - 1].classList.add('last');
    if (this.orientation === 'vertical') {
      this.labelPosition = 'aside';
    }
  }

  @Event({
    eventName: 'internalTdsPropsChange',
    composed: true,
    bubbles: true,
    cancelable: false,
  })
  internalTdsPropsChange: EventEmitter<InternalTdsStepperPropChange>;

  @Watch('orientation')
  handleDirectionChange() {
    this.internalTdsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['orientation'],
      orientation: this.orientation,
    });
  }

  @Watch('labelPosition')
  handleLabelPositionChange() {
    this.internalTdsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['labelPosition'],
      labelPosition: this.labelPosition,
    });
  }

  @Watch('size')
  handleSizeChange() {
    this.internalTdsPropsChange.emit({
      stepperId: this.stepperId,
      changed: ['size'],
      size: this.size,
    });
  }

  @Watch('hideLabels')
  handleHideLabelsChange() {
    this.internalTdsPropsChange.emit({
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
