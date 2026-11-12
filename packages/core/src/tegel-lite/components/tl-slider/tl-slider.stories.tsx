import { SliderArgTypes, SliderParameters, SliderTemplate } from './tl-slider-stories-setup';

export default {
  title: 'Tegel Lite/Slider',
  argTypes: SliderArgTypes({
    storyName: 'Default',
  }),
  parameters: SliderParameters,
  args: {
    type: 'standard',
    min: 0,
    max: 100,
    initialValue: 50,
    initialLeftValue: 25,
    initialRightValue: 75,
    step: 1,
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

export const Default = SliderTemplate.bind({});
