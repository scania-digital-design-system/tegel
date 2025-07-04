import { Component, Host, h, Prop, Element, State, Listen } from '@stencil/core';
import { InternalTdsStepperPropChange } from '../stepper';

const propToStateMap = {
  orientation: 'orientation',
  labelPosition: 'labelPosition',
  size: 'size',
  hideLabels: 'hideLabels',
};

/**
 * @slot label - Slot for the label text.
 */
@Component({
  tag: 'tds-step',
  styleUrl: 'step.scss',
  shadow: true,
})
export class TdsStep {
  /** Index of the step. Will be displayed in the step if the state is current/upcoming. */
  @Prop() index: string;

  /** State of the Step */
  @Prop() state: 'current' | 'error' | 'success' | 'upcoming' = 'upcoming';

  @Prop() tdsAriaCurrent: string;

  @State() hideLabels: boolean;

  @State() size: 'sm' | 'lg';

  @State() orientation: 'horizontal' | 'vertical';

  @State() labelPosition: 'aside' | 'below';

  @Element() el: HTMLElement;

  private stepperEl: HTMLTdsStepperElement;

  private stepperId: string;

  /* Needs to be onload to do this on any updates. */
  componentWillLoad() {
    this.stepperEl = this.el.closest('tds-stepper');
    this.orientation = this.stepperEl.orientation;
    this.labelPosition = this.stepperEl.labelPosition;
    this.size = this.stepperEl.size;
    this.hideLabels = this.stepperEl.hideLabels;
    this.stepperId = this.stepperEl.stepperId;
  }

  @Listen('internalTdsPropsChange', { target: 'body' })
  handlePropsChange(event: CustomEvent<InternalTdsStepperPropChange>) {
    if (this.stepperId === event.detail.stepperId) {
      event.detail.changed.forEach((changedProp) => {
        if (typeof this[changedProp] === 'undefined') {
          throw new Error(`Stepper prop is not supported: ${changedProp}`);
        } else if (changedProp in propToStateMap) {
          this[propToStateMap[changedProp]] = event.detail[changedProp];
        }
      });
    }
  }

  render() {
    return (
      <Host>
        <div
          role="listitem"
          aria-disabled={this.state === 'upcoming' ? 'true' : 'false'}
          aria-current={this.tdsAriaCurrent}
          tabIndex={-1}
          aria-label={`Step ${this.index}: ${this.state}`}
          class={`${this.size} ${this.orientation} text-${this.labelPosition} ${
            this.hideLabels ? 'hide-labels' : ''
          }`}
        >
          <span class={`${this.state} content-container`}>
            {this.state === 'success' || this.state === 'error' ? (
              <tds-icon
                aria-hidden="true"
                svgTitle={`tds-step-icon-${this.stepperId}`}
                class={'tds-step-icon'}
                name={this.state === 'success' ? 'tick' : 'warning'}
                size={this.size === 'lg' ? '20px' : '16px'}
              ></tds-icon>
            ) : (
              <span aria-hidden="true" class="index-container">
                {this.index}
              </span>
            )}
          </span>
          {!this.hideLabels && (
            <div aria-hidden="true" class={`label ${this.size} ${this.state}`}>
              <slot name="label"></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
