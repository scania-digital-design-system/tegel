import { SliderArgTypes, SliderParameters, SliderTemplate } from './slider-stories-setup';

export default {
  title: 'Components/Slider',
  argTypes: SliderArgTypes({
    storyName: 'Decimal',
  }),
  parameters: SliderParameters,
  args: {
    min: 0,
    max: 1,
    initialValue: 0.5,
    showLabel: true,
    labelText: 'Label',
    showTicks: true,
    numTicks: 3,
    showTickNumbers: true,
    snapToTicks: false,
    showTooltip: true,
    showControls: true,
    step: 0.01,
    showInput: false,
    thumbSize: 'Large',
    readonly: false,
    disabled: false,
  },
};

export const Decimal = SliderTemplate.bind({});
