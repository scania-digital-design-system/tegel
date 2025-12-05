import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Light (CSS)/Slider',
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'white',
    },
  },
  argTypes: {
    min: {
      name: 'Min. value',
      description: 'Sets the minimum value for the slider.',
      control: {
        type: 'number',
      },
      if: { arg: 'useDecimals', eq: false },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    max: {
      name: 'Max. value',
      description: 'Sets the maximum value for the slider.',
      control: {
        type: 'number',
      },
      if: { arg: 'useDecimals', eq: false },
      table: {
        defaultValue: { summary: 100 },
      },
    },
    initialValue: {
      name: 'Initial value',
      description: 'Sets the initial value for the slider.',
      control: {
        type: 'number',
      },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    showLabel: {
      name: 'Show label',
      description: 'Toggles if the label should be shown or hidden.',
      control: {
        type: 'boolean',
      },
    },
    labelText: {
      name: 'Label text',
      description: 'Sets the text for the label.',
      control: {
        type: 'text',
      },
      if: { arg: 'showLabel', eq: true },
    },
    showTicks: {
      name: 'Show ticks',
      description: 'Toggles if ticks should be shown or hidden.',
      control: {
        type: 'boolean',
      },
    },
    numTicks: {
      name: 'Number of ticks',
      description: 'Sets the number of ticks to be displayed.',
      control: {
        type: 'number',
      },
      if: { arg: 'showTicks', eq: true },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    showTickNumbers: {
      name: 'Show tick numbers',
      description: 'Toggles if tick numbers should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'showInput', eq: false },
      table: {
        defaultValue: { summary: false },
      },
    },
    showTooltip: {
      name: 'Show tooltip',
      description: 'Toggles if the tooltip should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    showControls: {
      name: 'Show controls (not compatible with input field)',
      description: 'Toggles if controls should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    step: {
      name: 'Step value',
      description: 'Sets the value to increment/decrement with.',
      control: {
        type: 'number',
        min: 0,
      },
      if: { arg: 'useDecimals', eq: false },
      table: {
        defaultValue: { summary: 1 },
      },
    },
    showInput: {
      name: 'Show value input field (not compatible with controls)',
      description: 'Toggles if the values input field should be shown or hidden.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    thumbSize: {
      name: 'Thumb size',
      description: 'Switches between the large and small version of the thumb.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    readonly: {
      name: 'Read Only',
      description: 'Puts the control in a read-only state.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the slider.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    useDecimals: {
      name: 'Use decimals',
      description: 'Automatically sets min to 0, max to 1, and step to 0.01 for decimal values.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    useDecimals: false,
    min: 0,
    max: 100,
    initialValue: 50,
    showLabel: true,
    labelText: 'Label',
    showTicks: true,
    numTicks: 3,
    showTickNumbers: true,
    showTooltip: true,
    showControls: true,
    step: 1,
    showInput: false,
    thumbSize: 'Large',
    readonly: false,
    disabled: false,
  },
};

const Template = ({
  useDecimals,
  min,
  max,
  initialValue,
  step,
  showLabel,
  labelText,
  showTicks,
  numTicks,
  showTickNumbers,
  showTooltip,
  showControls,
  showInput,
  thumbSize,
  readonly,
  disabled,
}) => {
  const actualMin = useDecimals ? 0 : min;
  const actualMax = useDecimals ? 1 : max;
  const actualStep = useDecimals ? 0.01 : step;
  const clampedInitialValue = Math.max(actualMin, Math.min(actualMax, initialValue));
  const actualInitialValue = useDecimals ? 0.5 : clampedInitialValue;

  const sliderClasses = [
    'tl-slider',
    thumbSize === 'Small' ? 'tl-slider--small' : '',
    disabled ? 'tl-slider--disabled' : '',
    readonly ? 'tl-slider--read-only' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const percentage = ((actualInitialValue - actualMin) / (actualMax - actualMin)) * 100;

  const formatTickValue = (tickValue: number): string => {
    if (tickValue % 1 === 0) {
      return Math.round(tickValue).toString();
    }

    const stepStr = actualStep.toString();
    const decimalPlaces = (stepStr.split('.')[1] || '').length;
    const rounded = parseFloat(tickValue.toFixed(Math.max(decimalPlaces, 10)));
    return rounded.toString().replace(/\.?0+$/, '');
  };

  const generateTicks = () => {
    if (!showTicks || numTicks < 2) return '';

    const ticks: string[] = [];
    const tickStep = (actualMax - actualMin) / (numTicks - 1);

    for (let i = 0; i < numTicks; i++) {
      const tickValue = actualMin + tickStep * i;
      const formattedValue = formatTickValue(tickValue);

      ticks.push(`
        <div class="tl-slider__value-divider">
          ${
            showTickNumbers && !showInput
              ? `<span class="tl-slider__value-divider-label">${formattedValue}</span>`
              : ''
          }
          <div class="tl-slider__value-divider-line"></div>
        </div>
      `);
    }

    return `
      <div class="tl-slider__value-dividers">
        ${ticks.join('')}
      </div>
    `;
  };

  const markup = `
    <div class="demo-wrapper" style="max-width: 600px; padding: 80px 40px; margin: 0 auto;">
      <div class="${sliderClasses}">
        ${showLabel ? `<label class="tl-slider__label">${labelText}</label>` : ''}
        
        <input 
          type="range" 
          class="tl-slider__native-input" 
          min="${actualMin}" 
          max="${actualMax}" 
          value="${actualInitialValue}"
          step="${actualStep}"
          ${disabled ? 'disabled' : ''}
          ${readonly ? 'readonly' : ''}
      />
      
      <div class="tl-slider__controls-row">
        ${
          showInput
            ? `
        <div class="tl-slider__value tl-slider__value--min">${actualMin}</div>
        `
            : showControls
            ? `
        <button class="tl-button tl-button--only-icon tl-button--ghost tl-button--sm tl-button--icon tl-slider__control--minus" type="button" ${
          disabled ? 'disabled' : ''
        }>
          <span class="tl-icon tl-icon--minus tl-icon--16"></span>
        </button>
        `
            : ''
        }
        
        <div class="tl-slider__track">
          ${generateTicks()}
          <div class="tl-slider__track-fill" style="width: ${percentage}%;"></div>
          
          <div class="tl-slider__thumb" style="left: ${percentage}%;">
            <div class="tl-slider__thumb-inner" tabindex="-1">
              ${
                showTooltip
                  ? `
              <div class="tl-slider__value-tooltip">
                ${actualInitialValue}
              </div>
              `
                  : ''
              }
            </div>
          </div>
        </div>
        
        ${
          showInput
            ? `
        <div class="tl-slider__value tl-slider__value--max">${actualMax}</div>
        <div class="tl-text-field tl-text-field--sm tl-text-field--no-min-width${
          readonly ? ' tl-text-field--readonly' : ''
        }${disabled ? ' tl-text-field--disabled' : ''} tl-slider__input-wrapper">
          <input 
            type="number" 
            class="tl-text-field__input tl-slider__input-field${
              useDecimals ? ' tl-slider__input-field--decimal' : ''
            }" 
            value="${actualInitialValue}"
            min="${actualMin}"
            max="${actualMax}"
            step="${actualStep}"
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
          />
        </div>
        `
            : showControls
            ? `
        <button class="tl-button tl-button--only-icon tl-button--ghost tl-button--sm tl-button--icon tl-slider__control--plus" type="button" ${
          disabled ? 'disabled' : ''
        }>
          <span class="tl-icon tl-icon--plus tl-icon--16"></span>
        </button>
        `
            : ''
        }
      </div>
      </div>
    </div>
  `;

  const script = `
    <script>
      (function() {
        const slider = document.querySelector('.tl-slider');
        if (!slider || slider.classList.contains('tl-slider--disabled')) return;
        
        const track = slider.querySelector('.tl-slider__track');
        const thumb = slider.querySelector('.tl-slider__thumb');
        const thumbInner = slider.querySelector('.tl-slider__thumb-inner');
        const trackFill = slider.querySelector('.tl-slider__track-fill');
        ${showInput ? "const inputField = slider.querySelector('.tl-slider__input-field');" : ''}
        const nativeInput = slider.querySelector('.tl-slider__native-input');
        ${
          showControls ? "const minusBtn = slider.querySelector('.tl-slider__control--minus');" : ''
        }
        ${showControls ? "const plusBtn = slider.querySelector('.tl-slider__control--plus');" : ''}
        ${showTooltip ? "const tooltip = slider.querySelector('.tl-slider__value-tooltip');" : ''}
        
        const min = ${actualMin};
        const max = ${actualMax};
        const step = ${actualStep};
        let currentValue = ${actualInitialValue};
        ${!readonly ? 'let isDragging = false;' : ''}
        
        const stepStr = step.toString();
        const decimalPlaces = (stepStr.split('.')[1] || '').length;
        
        function formatValue(value) {
          return parseFloat(value.toFixed(decimalPlaces));
        }
        
        function updateValue(newValue) {
          currentValue = Math.max(min, Math.min(max, newValue));
          currentValue = formatValue(currentValue);
          const percentage = ((currentValue - min) / (max - min)) * 100;
          
          trackFill.style.width = percentage + '%';
          thumb.style.left = percentage + '%';
          ${showInput ? 'if (inputField) inputField.value = currentValue;' : ''}
          if (nativeInput) nativeInput.value = currentValue;
          ${showTooltip ? 'if (tooltip) tooltip.childNodes[0].textContent = currentValue;' : ''}
        }
        ${
          !readonly
            ? `
        
        function getValueFromPosition(clientX) {
          const rect = track.getBoundingClientRect();
          const percentage = (clientX - rect.left) / rect.width;
          const rawValue = min + percentage * (max - min);
          
          const steppedValue = Math.round(rawValue / step) * step;
          return formatValue(steppedValue);
        }`
            : ''
        }
        
        ${
          !readonly
            ? `
        track.addEventListener('click', (e) => {
          updateValue(getValueFromPosition(e.clientX));
        });`
            : ''
        }
        ${
          !readonly
            ? `
        
        thumbInner.addEventListener('mousedown', (e) => {
          isDragging = true;
          thumbInner.classList.add('tl-slider__thumb-inner--pressed');
          e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          updateValue(getValueFromPosition(e.clientX));
        });
        
        document.addEventListener('mouseup', () => {
          if (isDragging) {
            isDragging = false;
            thumbInner.classList.remove('tl-slider__thumb-inner--pressed');
          }
        });`
            : ''
        }
        ${
          showInput && !readonly
            ? `
        inputField.addEventListener('change', (e) => {
          updateValue(parseFloat(e.target.value));
        });`
            : ''
        }
        ${
          showControls && !readonly
            ? `
        minusBtn.addEventListener('click', () => {
          const newValue = parseFloat((currentValue - step).toFixed(decimalPlaces));
          updateValue(newValue);
        });
        plusBtn.addEventListener('click', () => {
          const newValue = parseFloat((currentValue + step).toFixed(decimalPlaces));
          updateValue(newValue);
        });`
            : ''
        }
      })();
    </script>
  `;

  return formatHtmlPreview(markup + script);
};

export const Default = Template.bind({});
