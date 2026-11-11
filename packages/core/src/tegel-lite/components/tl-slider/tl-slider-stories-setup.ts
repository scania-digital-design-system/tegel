export const SliderArgTypes = ({ storyName }: { storyName: 'Default' | 'Decimal' }) => ({
  type: {
    name: 'Slider type',
    description: 'Determines the type of the slider',
    control: {
      type: 'radio',
    },
    options: ['standard', 'reverse', 'range'],
    table: {
      defaultValue: { summary: 'standard' },
    },
  },
  min: {
    name: 'Min. value',
    description: 'Sets the minimum value for the slider.',
    control: {
      type: 'number',
    },
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
    if: { arg: 'type', neq: 'range' },
    table: {
      defaultValue: { summary: 0 },
    },
  },
  initialLeftValue: {
    name: 'Initial left side value',
    description: 'Sets the initial left side value for the range slider.',
    control: {
      type: 'number',
    },
    if: { arg: 'type', eq: 'range' },
    table: {
      defaultValue: { summary: 0 },
    },
  },
  initialRightValue: {
    name: 'Initial right side value',
    description: 'Sets the initial right side value for the range slider.',
    control: {
      type: 'number',
    },
    if: { arg: 'type', eq: 'range' },
    table: {
      defaultValue: { summary: 10 },
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
    // if: { arg: 'showInput', eq: false },
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
    if: { arg: 'type', neq: 'range' },
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
      step: storyName === 'Decimal' ? 0.01 : undefined,
    },
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
});

export const SliderParameters = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'white',
    },
  },
};

export const SliderTemplate = ({
  type,
  min,
  max,
  initialValue,
  initialLeftValue,
  initialRightValue,
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
  const actualInitialValue = Math.max(min, Math.min(max, initialValue));
  const actualInitialLeftValue = Math.max(min, Math.min(max, initialLeftValue));
  const actualInitialRightValue = Math.max(min, Math.min(max, initialRightValue));

  const sliderClasses = [
    'tl-slider',
    thumbSize === 'Small' ? 'tl-slider--small' : '',
    type === 'reverse' ? 'tl-slider--reverse' : '',
    type === 'range' ? 'tl-slider--range' : '',
    disabled ? 'tl-slider--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  let fillPercentage = 0;
  let percentage = ((actualInitialValue - min) / (max - min)) * 100;
  let rightPercentage = 0;
  if (type === 'standard') {
    fillPercentage = percentage;
  } else if (type === 'reverse') {
    fillPercentage = 100 - percentage;
  } else {
    percentage = ((actualInitialLeftValue - min) / (max - min)) * 100;
    rightPercentage = ((actualInitialRightValue - min) / (max - min)) * 100;
    fillPercentage = rightPercentage - percentage;
  }

  const formatTickValue = (tickValue: number): string => {
    if (tickValue % 1 === 0) {
      return Math.round(tickValue).toString();
    }

    const stepStr = step.toString();
    const decimalPlaces = (stepStr.split('.')[1] || '').length;
    const rounded = parseFloat(tickValue.toFixed(decimalPlaces));
    return rounded.toString().replace(/\.?0+$/, '');
  };

  const generateTicks = () => {
    if (!showTicks || numTicks < 1) return '';

    const ticks: string[] = [];
    const tickStep = (max - min) / (numTicks + 1);

    for (let i = 0; i <= numTicks + 1; i++) {
      const tickValue = min + tickStep * i;
      const formattedValue = formatTickValue(tickValue);

      ticks.push(`
        <div class="tl-slider__value-divider">
          ${
            showTickNumbers
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

  const trackFillStyle =
    type === 'range'
      ? `left: ${percentage}%; width: ${fillPercentage}%`
      : `width: ${fillPercentage}%`;

  const markup = `
    <!-- Required stylesheets:
      "@scania/tegel-lite/global.css"
      "@scania/tegel-lite/tl-slider.css"
    -->
    <!-- Optional stylesheets:
      "@scania/tegel-lite/tl-button.css"
      "@scania/tegel-lite/tl-icon.css"
      "@scania/tegel-lite/tl-text-field.css"
    -->
    <div class="demo-wrapper" style="max-width: 600px; padding: 80px 40px; margin: 0 auto;">
      <div class="${sliderClasses}">
        ${showLabel ? `<label class="tl-slider__label">${labelText}</label>` : ''}
        
        ${
          type !== 'range'
            ? `<input 
          type="range" 
          class="tl-slider__native-input" 
          min="${min}" 
          max="${max}" 
          value="${actualInitialValue}"
          step="${step}"
          ${disabled ? 'disabled' : ''}
          ${readonly ? 'readonly' : ''}
        />`
            : ''
        }
      
      <div class="tl-slider__track-wrapper">
        ${
          showInput
            ? type === 'range'
              ? `
        <div class="tl-text-field tl-text-field--sm tl-text-field--no-min-width tl-slider__input-wrapper">
          <div class="tl-text-field__input-wrapper">
            <input 
            type="number" 
            class="tl-text-field__input tl-slider__input-field" 
            value="${actualInitialLeftValue}"
            min="${min}"
            max="${actualInitialRightValue}"
            step="${step}"
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
          />
          </div>
        </div>`
              : ''
            : showControls
              ? `
        <button aria-label="decrease" class="tl-button tl-button--only-icon tl-button--ghost tl-button--sm tl-button--icon tl-slider__control-minus" type="button" ${
          disabled ? 'disabled' : ''
        }>
          <span class="tl-icon tl-icon--minus tl-icon--16"></span>
        </button>
        `
              : ''
        }
        ${!showTickNumbers ? `<div class="tl-slider__value tl-slider__value--min">${min}</div>` : ''}
        
        <div class="tl-slider__track">
          ${generateTicks()}
          <div class="tl-slider__track-fill" style="${trackFillStyle}"></div>
          
          <div class="tl-slider__thumb" style="left: ${percentage}%;">
            <div class="tl-slider__thumb-inner" tabindex="0">
            </div>
            ${
              showTooltip
                ? `
            <div class="tl-slider__value-tooltip">
              ${type === 'range' ? actualInitialLeftValue : actualInitialValue}
            </div>
            `
                : ''
            }
          </div>
          ${
            type === 'range'
              ? `<div class="tl-slider__thumb" style="left: ${rightPercentage}%;">
            <div class="tl-slider__thumb-inner" tabindex="0">
            </div>
            ${
              showTooltip
                ? `
            <div class="tl-slider__value-tooltip">
              ${actualInitialRightValue}
            </div>
            `
                : ''
            }
          </div>`
              : ''
          }
        </div>
         ${!showTickNumbers ? `<div class="tl-slider__value tl-slider__value--max">${max}</div>` : ''}
        ${
          showInput
            ? `
        <div class="tl-text-field tl-text-field--sm tl-text-field--no-min-width tl-slider__input-wrapper">
          <div class="tl-text-field__input-wrapper">
            <input 
            type="number" 
            class="tl-text-field__input tl-slider__input-field" 
            value="${type === 'range' ? actualInitialRightValue : actualInitialValue}"
            min="${type === 'range' ? actualInitialLeftValue : min}"
            max="${max}"
            step="${step}"
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
          />
          </div>
        </div>
        `
            : showControls
              ? `
        <button aria-label="increase" class="tl-button tl-button--only-icon tl-button--ghost tl-button--sm tl-button--icon tl-slider__control-plus" type="button" ${
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
        if (!slider) return;
        
        ${showInput ? "const inputFields = slider.querySelectorAll('.tl-slider__input-field');" : ''}
        
        const nativeInput = slider.querySelector('.tl-slider__native-input');
        
        // Exit early if disabled (but after setting width)
        if (nativeInput && nativeInput.disabled) return;
        
        const track = slider.querySelector('.tl-slider__track');
        const thumbs = slider.querySelectorAll('.tl-slider__thumb');
        const thumbsInner = slider.querySelectorAll('.tl-slider__thumb-inner');
        const trackFill = slider.querySelector('.tl-slider__track-fill');
        ${showControls ? "const minusBtn = slider.querySelector('.tl-slider__control-minus');" : ''}
        ${showControls ? "const plusBtn = slider.querySelector('.tl-slider__control-plus');" : ''}
        ${showTooltip ? "const tooltips = slider.querySelectorAll('.tl-slider__value-tooltip');" : ''}
        
        const min = ${min};
        const max = ${max};
        const step = ${step};
        let currentValue = ${type === 'range' ? actualInitialLeftValue : actualInitialValue};
        let currentRightValue = ${actualInitialRightValue};
        ${!readonly ? 'let isDragging = false; let isDraggingRight = false' : ''}
        
        const stepStr = step.toString();
        const decimalPlaces = (stepStr.split('.')[1] || '').length;
        
        ${showInput ? '' : ''}
        
        function formatValue(value) {
          return parseFloat(value.toFixed(decimalPlaces));
        }
        
        function updateValue(newValue, right) {
          if(${type === 'range'} && right) {
            // cannot go over the left thumb
            if(newValue < currentValue) return;
            currentRightValue = Math.max(min, Math.min(max, newValue));
            currentRightValue = formatValue(currentRightValue);
            const rightPercentage = ((currentRightValue - min) / (max - min)) * 100;
            const leftPercentage = ((currentValue - min) / (max - min)) * 100;
            const fillPercentage = rightPercentage - leftPercentage;
            
            trackFill.style.width = fillPercentage + '%';
            thumbs[1].style.left = rightPercentage + '%';
            ${showInput ? 'if (inputFields) {inputFields[1].value = currentRightValue;}' : ''}
            ${showTooltip ? 'if (tooltips) tooltips[1].childNodes[0].textContent = currentRightValue;' : ''}
          } else if(${type !== 'range'}) {
            currentValue = Math.max(min, Math.min(max, newValue));
            currentValue = formatValue(currentValue);
            const percentage = ((currentValue - min) / (max - min)) * 100;
            const fillPercentage = ${type === 'reverse' ? '100 - percentage' : 'percentage'};
            
            trackFill.style.width = fillPercentage + '%';
            thumbs[0].style.left = percentage + '%';
            ${showInput ? 'if (inputFields) inputFields[0].value = currentValue;' : ''}
            if (nativeInput) nativeInput.value = currentValue;
            ${showTooltip ? 'if (tooltips) tooltips[0].childNodes[0].textContent = currentValue;' : ''}
          } else {
            // cannot go over the right thumb
            if(newValue > currentRightValue) return;
            currentValue = Math.max(min, Math.min(max, newValue));
            currentValue = formatValue(currentValue);
            const rightPercentage = ((currentRightValue - min) / (max - min)) * 100;
            const leftPercentage = ((currentValue - min) / (max - min)) * 100;
            const fillPercentage = rightPercentage - leftPercentage;

            trackFill.style.width = fillPercentage + '%';
            trackFill.style.left = leftPercentage + '%';
            thumbs[0].style.left = leftPercentage + '%';
            ${showInput ? 'if (inputFields) inputFields[0].value = currentValue;' : ''}
            ${showTooltip ? 'if (tooltips) tooltips[0].childNodes[0].textContent = currentValue;' : ''}
          }
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
          if(getValueFromPosition(e.clientX) >= currentRightValue) {
            updateValue(getValueFromPosition(e.clientX), true);
          } else {
            updateValue(getValueFromPosition(e.clientX), false);
          }
        });`
            : ''
        }
        ${
          !readonly
            ? `
        
        thumbsInner[0].addEventListener('mousedown', (e) => {
          isDragging = true;
          thumbsInner[0].classList.add('tl-slider__thumb-inner--pressed');
          e.preventDefault();
        });

        
        ${
          type === 'range'
            ? `thumbsInner[1].addEventListener('mousedown', (e) => {
          isDraggingRight = true;
          thumbsInner[1].classList.add('tl-slider__thumb-inner--pressed');
          e.preventDefault();
        });`
            : ''
        }
        
        document.addEventListener('mousemove', (e) => {
          if (!isDragging && !isDraggingRight) return;
          if(isDraggingRight) {
            updateValue(getValueFromPosition(e.clientX), true);
          } else if(isDragging) {
            updateValue(getValueFromPosition(e.clientX), false);
          }
        });
        
        document.addEventListener('mouseup', () => {
          if (isDragging || isDraggingRight) {
            isDragging = false;
            isDraggingRight = false;
            thumbsInner[0].classList.remove('tl-slider__thumb-inner--pressed');
            thumbsInner[1].classList.remove('tl-slider__thumb-inner--pressed');
          }
        });`
            : ''
        }
        ${
          showInput && !readonly
            ? `
        inputFields[0].addEventListener('change', (e) => {
          updateValue(parseFloat(e.target.value), false);
        });
        if(${type === 'range'}) {
          inputFields[1].addEventListener('change', (e) => {
            updateValue(parseFloat(e.target.value), true);
          });
        }  
        `
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

  return markup + script;
};
