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
      if: { arg: 'showTicks', eq: true },
      table: {
        defaultValue: { summary: false },
      },
    },
    snapToTicks: {
      name: 'Snap to ticks',
      description: 'Snaps the thumb to the closest tick when dragging.',
      control: {
        type: 'boolean',
      },
      if: { arg: 'showTicks', eq: true },
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
      if: { arg: 'showControls', eq: false },
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
  },
  args: {
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

const Template = ({
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
  const sliderClasses = [
    'tl-slider',
    thumbSize === 'Small' ? 'tl-slider--small' : '',
    disabled ? 'tl-slider--disabled' : '',
    readonly ? 'tl-slider--read-only' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Calculate thumb position percentage
  const percentage = ((initialValue - min) / (max - min)) * 100;

  // Generate tick marks if enabled
  const generateTicks = () => {
    if (!showTicks || numTicks < 2) return '';

    const ticks: string[] = [];
    const tickStep = (max - min) / (numTicks - 1);

    for (let i = 0; i < numTicks; i++) {
      const tickValue = min + tickStep * i;
      // Remove unnecessary trailing zeros
      const formattedValue = tickValue.toString().replace(/\.?0+$/, '');
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

  const markup = `
    <!-- Required stylesheets
      "@scania/tegel-light/global.css"
      "@scania/tegel-light/tl-slider.css"
      "@scania/tegel-light/tl-button.css"
      "@scania/tegel-light/tl-icon.css"
    -->

    <div class="demo" style="display: flex; align-items: center; justify-content: center; padding: 80px 40px;">
      <div class="${sliderClasses}" style="width: 600px;">
        ${showLabel ? `<label class="tl-slider__label">${labelText}</label>` : ''}
        
        <input 
          type="range" 
          class="tl-slider__native-input" 
          min="${min}" 
          max="${max}" 
          value="${initialValue}"
          step="${step}"
          ${disabled ? 'disabled' : ''}
          ${readonly ? 'readonly' : ''}
        aria-label="${showLabel ? labelText : 'Slider'}"
      />
      
      <div class="tl-slider__slider-controls-row">
        ${
          showInput
            ? `
        <div class="tl-slider__input-value tl-slider__input-value--min">${min}</div>
        `
            : showControls
            ? `
        <button class="tl-button tl-button--only-icon tl-button--ghost tl-button--sm tl-button--icon tl-slider__control--minus" type="button" aria-label="Decrease value" ${
          disabled ? 'disabled' : ''
        }>
          <span class="tl-icon tl-icon--minus tl-icon--16" aria-hidden="true"></span>
        </button>
        `
            : ''
        }
        
        <div class="tl-slider__track" tabindex="0" role="slider" aria-valuenow="${initialValue}" aria-valuemin="${min}" aria-valuemax="${max}">
          ${generateTicks()}
          <div class="tl-slider__track-fill" style="width: ${percentage}%;"></div>
          
          <div class="tl-slider__thumb" style="left: ${percentage}%;">
            <div class="tl-slider__thumb-inner" tabindex="-1">
              ${
                showTooltip
                  ? `
              <div class="tl-slider__value-tooltip">
                ${initialValue}
                <svg class="tl-slider__value-tooltip-arrow" width="12" height="6" viewBox="0 0 12 6" fill="currentColor">
                  <path d="M6 6L0 0h12L6 6z"/>
                </svg>
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
        <div class="tl-slider__input-value tl-slider__input-value--max">${max}</div>
        <div class="tl-text-field tl-text-field--sm tl-text-field--no-min-width tl-text-field--hide-readonly-icon${
          readonly ? ' tl-text-field--readonly' : ''
        }${disabled ? ' tl-text-field--disabled' : ''} tl-slider__input-wrapper">
          <input 
            type="number" 
            class="tl-text-field__input tl-slider__input-field" 
            value="${initialValue}"
            min="${min}"
            max="${max}"
            step="${step}"
            ${disabled ? 'disabled' : ''}
            ${readonly ? 'readonly' : ''}
            aria-label="Slider value input"
          />
        </div>
        `
            : showControls
            ? `
        <button class="tl-button tl-button--only-icon tl-button--ghost tl-button--sm tl-button--icon tl-slider__control--plus" type="button" aria-label="Increase value" ${
          disabled ? 'disabled' : ''
        }>
          <span class="tl-icon tl-icon--plus tl-icon--16" aria-hidden="true"></span>
        </button>
        `
            : ''
        }
      </div>
      
      <span class="tl-slider__sr-only" role="status" aria-live="polite" aria-atomic="true">
        Value: ${initialValue}
      </span>
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
        const inputField = slider.querySelector('.tl-slider__input-field');
        const nativeInput = slider.querySelector('.tl-slider__native-input');
        const minusBtn = slider.querySelector('.tl-slider__control--minus');
        const plusBtn = slider.querySelector('.tl-slider__control--plus');
        const tooltip = slider.querySelector('.tl-slider__value-tooltip');
        
        const min = ${min};
        const max = ${max};
        const step = ${step};
        let currentValue = ${initialValue};
        let isDragging = false;
        
        // Determine decimal precision from step
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
          if (inputField) inputField.value = currentValue;
          if (nativeInput) nativeInput.value = currentValue;
          if (tooltip) tooltip.childNodes[0].textContent = currentValue;
          track.setAttribute('aria-valuenow', currentValue);
        }
        
        function getValueFromPosition(clientX) {
          const rect = track.getBoundingClientRect();
          const percentage = (clientX - rect.left) / rect.width;
          const rawValue = min + percentage * (max - min);
          const steppedValue = Math.round(rawValue / step) * step;
          return formatValue(steppedValue);
        }
        
        // Track click
        track.addEventListener('click', (e) => {
          if (slider.classList.contains('tl-slider--read-only')) return;
          updateValue(getValueFromPosition(e.clientX));
        });
        
        // Thumb drag
        thumbInner.addEventListener('mousedown', (e) => {
          if (slider.classList.contains('tl-slider--read-only')) return;
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
        });
        
        // Input field
        if (inputField) {
          inputField.addEventListener('change', (e) => {
            updateValue(parseFloat(e.target.value));
          });
        }
        
        // Control buttons
        if (minusBtn) {
          minusBtn.addEventListener('click', () => updateValue(currentValue - step));
        }
        if (plusBtn) {
          plusBtn.addEventListener('click', () => updateValue(currentValue + step));
        }
      })();
    </script>
  `;

  return formatHtmlPreview(markup + script);
};

export const Default = Template.bind({});
