import { SliderArgTypes, SliderParameters, SliderTemplate } from './tl-slider-stories-setup';

export default {
  title: 'Tegel Lite/Slider',
  argTypes: SliderArgTypes({
    storyName: 'Decimal',
  }),
  parameters: SliderParameters,
  args: {
    type: 'standard',
    min: 0,
    max: 1,
    initialValue: 0.5,
    initialLeftValue: 0.2,
    initialRightValue: 0.8,
    step: 0.01,
    showLabel: true,
    labelText: 'Label',
    showTicks: true,
    numTicks: 3,
    showTickNumbers: true,
    showTooltip: false,
    showControls: true,
    showInput: false,
    thumbSize: 'Large',
    readonly: false,
    disabled: false,
  },
};

export const Decimal = SliderTemplate.bind({});
