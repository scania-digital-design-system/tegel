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
  @Prop({ reflect: true }) index?: string;

  /** State of the Step */
  @Prop({ reflect: true }) state: 'current' | 'error' | 'success' | 'upcoming' = 'upcoming';

  @Prop({ reflect: true }) tdsAriaCurrent?: string;

  /** Icon to show in step if state is current or upcoming. */
  @Prop({ reflect: true }) iconName?: string;

  @State() hideLabels?: boolean;

  @State() size?: 'sm' | 'lg';

  @State() orientation?: 'horizontal' | 'vertical';

  @State() labelPosition?: 'aside' | 'below';

  @State() icon?: string;

  @Element() el!: HTMLElement;

  private stepperEl!: HTMLTdsStepperElement | null;

  private stepperId!: string;

  /* Needs to be onload to do this on any updates. */
  componentWillLoad() {
    this.stepperEl = this.el.closest('tds-stepper');
    if (!this.stepperEl) return;

    this.orientation = this.stepperEl.orientation;
    this.labelPosition = this.stepperEl.labelPosition;
    this.size = this.stepperEl.size;
    this.hideLabels = this.stepperEl.hideLabels;
    this.stepperId = this.stepperEl.stepperId;
    this.icon = this.iconName;
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

  private renderStepNode() {
    if (this.state === 'error') {
      this.icon = 'warning';
    } else if (this.state === 'success') {
      this.icon = 'tick';
    }

    if (this.icon && this.icon !== '' && this.icon !== 'undefined') {
      return (
        <tds-icon
          aria-hidden="true"
          svgTitle={`tds-step-icon-${this.stepperId}`}
          class={'tds-step-icon'}
          name={this.icon}
          size={this.size === 'lg' ? '20px' : '16px'}
        ></tds-icon>
      );
    } else {
      return (
        <span aria-hidden="true" class="index-container">
          {this.index}
        </span>
      );
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
          <div class={`step-container text-${this.labelPosition}`}>
            <span class={`${this.state} content-container`}>
              <div class="left-divider"></div>
              {this.renderStepNode()}
              {(this.labelPosition === 'below' || this.orientation === 'vertical') && (
                <div class="right-divider"></div>
              )}
            </span>
            {!this.hideLabels && (
              <div aria-hidden="true" class={`label ${this.size} ${this.state}`}>
                <slot name="label"></slot>
              </div>
            )}
            {this.orientation === 'horizontal' && this.labelPosition === 'aside' && (
              <div class="right-divider"></div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
