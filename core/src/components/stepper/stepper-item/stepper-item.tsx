import { Component, Host, h, Prop, Element, State, Listen } from '@stencil/core';
import { InternalSddsStepperPropChange } from '../stepper';

@Component({
  tag: 'sdds-stepper-item',
  styleUrl: 'stepper-item.scss',
  shadow: true,
})
export class SddsStepper {
  /** Index of the step. Will be displayed in the step if state is current/upcoming. */
  @Prop() index: string;

  /** State of the stepper-item */
  @Prop() state: 'current' | 'error' | 'success' | 'upcoming' = 'upcoming';

  @State() hideLabel: boolean;

  @State() size: 'sm' | 'lg';

  @State() orientation: 'horizontal' | 'vertical';

  @State() labelPosition: 'aside' | 'below';

  @Element() el: HTMLElement;

  private stepperEl: HTMLSddsStepperElement;

  private stepperId: string;

  /* Needs to be onload to do this on any updates. */
  componentWillLoad() {
    this.stepperEl = this.el.closest('sdds-stepper');
    this.orientation = this.stepperEl.orientation;
    this.labelPosition = this.stepperEl.labelPosition;
    this.size = this.stepperEl.size;
    this.hideLabel = this.stepperEl.hideLabels;
    this.stepperId = this.stepperEl.stepperId;
  }

  @Listen('internalSddsPropsChange', { target: 'body' })
  handlePropsChange(event: CustomEvent<InternalSddsStepperPropChange>) {
    if (this.stepperId === event.detail.stepperId) {
      event.detail.changed.forEach((changedProp) => {
        if (typeof this[changedProp] === 'undefined') {
          throw new Error(`Table prop is not supported: ${changedProp}`);
        }
        if (this[changedProp] === this.orientation && event.detail[changedProp] === 'vertical') {
          this.labelPosition = 'aside';
        }
        this[changedProp] = event.detail[changedProp];
      });
    }
  }

  render() {
    return (
      <Host>
        <div
          role="listItem"
          class={`${this.size} ${this.orientation} text-${this.labelPosition} ${
            this.hideLabel ? 'hide-labels' : ''
          }`}
        >
          <div class={`${this.state} content-container`}>
            {this.state === 'success' || this.state === 'error' ? (
              <tds-icon
                name={this.state === 'success' ? 'tick' : 'warning'}
                size={this.size === 'lg' ? '20px' : '16px'}
              ></tds-icon>
            ) : (
              this.index
            )}
          </div>
          {!this.hideLabel && (
            <div class={`label ${this.size} ${this.state}`}>
              <slot name="label"></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
