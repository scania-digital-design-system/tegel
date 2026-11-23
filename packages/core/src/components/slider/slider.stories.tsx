import { SliderArgTypes, SliderTemplate, SliderParameters } from './slider-stories-setup';

export default {
  title: 'Components/Slider/Default',
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
    showLabel: true,
    labelText: 'Label',
    showTicks: true,
    numTicks: 3,
    showTickNumbers: true,
    snapToTicks: false,
    tooltipMode: 'hover',
    tooltip: false,
    showControls: true,
    step: 1,
    showInput: false,
    thumbSize: 'Large',
    readonly: false,
    disabled: false,
  },
};

export const Default = SliderTemplate.bind({});
