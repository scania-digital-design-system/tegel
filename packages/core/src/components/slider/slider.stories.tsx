import { SliderArgTypes, SliderTemplate, SliderParameters } from './slider-stories-setup';

export default {
  title: 'Components/Slider/Default',
  argTypes: SliderArgTypes({
    storyName: 'Default',
  }),
  parameters: SliderParameters,
  args: {
    modeVariant: 'Inherit from parent',
    state: 'Default',
    min: 0,
    max: 100,
    initialValue: 50,
    showLabel: true,
    labelText: 'Label',
    showTicks: true,
    numTicks: 3,
    showTickNumbers: true,
    snapToTicks: false,
    showTooltip: true,
    showControls: true,
    step: 1,
    showInput: false,
    thumbSize: 'Large',
    readonly: false,
    disabled: false,
  },
};

export const Default = SliderTemplate.bind({});
