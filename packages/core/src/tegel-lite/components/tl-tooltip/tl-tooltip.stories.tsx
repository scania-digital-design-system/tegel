import formatHtmlPreview from '../../../stories/formatHtmlPreview';

export default {
  title: 'Tegel Lite (CSS)/Tooltip',
  parameters: { layout: 'centered' },
  argTypes: {
    position: {
      name: 'Position',
      control: { type: 'select' },
      options: [
        'Top',
        'Top-start',
        'Top-end',
        'Bottom',
        'Bottom-start',
        'Bottom-end',
        'Left',
        'Left-start',
        'Left-end',
        'Right',
        'Right-start',
        'Right-end',
      ],
      table: { defaultValue: { summary: 'Top' } },
    },
    label: {
      name: 'Tooltip Text',
      control: 'text',
      table: { defaultValue: { summary: 'Tooltip content' } },
    },
  },
  args: {
    position: 'Top',
    label: 'This is a helpful tooltip with information',
  },
};

const positionMap = {
  'Top': 'top',
  'Top-start': 'top-start',
  'Top-end': 'top-end',
  'Bottom': 'bottom',
  'Bottom-start': 'bottom-start',
  'Bottom-end': 'bottom-end',
  'Left': 'left',
  'Left-start': 'left-start',
  'Left-end': 'left-end',
  'Right': 'right',
  'Right-start': 'right-start',
  'Right-end': 'right-end',
};

const Template = ({ position, label }) => {
  const posClass = positionMap[position];

  return formatHtmlPreview(
    `<style>
  .demo-wrapper {
    position: relative;
    display: inline-block;
  }
</style>

<div class="demo-wrapper">
  <!-- Tooltip popup -->
  <div 
    id="demo-tooltip" 
    class="tl-tooltip${posClass ? ` tl-tooltip--${posClass}` : ''}" 
    role="tooltip"
  >
    ${label}
  </div>

  <!-- Trigger button -->
  <button 
    type="button" 
    class="tl-button tl-button--variant-primary" 
    aria-describedby="demo-tooltip"
    id="demo-trigger"
  >
    Hover me
  </button>
</div>

<script>
(function() {
  const trigger = document.getElementById('demo-trigger');
  const tooltip = document.getElementById('demo-tooltip');
  
  if (!trigger || !tooltip) return;

  function positionTooltip() {
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 8;
    const pos = '${posClass}';
    
    let top = 0;
    let left = 0;

    if (pos.startsWith('top')) {
      top = triggerRect.top - tooltipRect.height - gap;
      if (pos === 'top') {
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      } else if (pos === 'top-start') {
        left = triggerRect.left;
      } else if (pos === 'top-end') {
        left = triggerRect.right - tooltipRect.width;
      }
    } else if (pos.startsWith('bottom')) {
      top = triggerRect.bottom + gap;
      if (pos === 'bottom') {
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      } else if (pos === 'bottom-start') {
        left = triggerRect.left;
      } else if (pos === 'bottom-end') {
        left = triggerRect.right - tooltipRect.width;
      }
    } else if (pos.startsWith('left')) {
      left = triggerRect.left - tooltipRect.width - gap;
      if (pos === 'left') {
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
      } else if (pos === 'left-start') {
        top = triggerRect.top;
      } else if (pos === 'left-end') {
        top = triggerRect.bottom - tooltipRect.height;
      }
    } else if (pos.startsWith('right')) {
      left = triggerRect.right + gap;
      if (pos === 'right') {
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
      } else if (pos === 'right-start') {
        top = triggerRect.top;
      } else if (pos === 'right-end') {
        top = triggerRect.bottom - tooltipRect.height;
      }
    }

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function show() {
    positionTooltip();
    tooltip.classList.add('tl-tooltip--visible');
  }

  function hide() {
    tooltip.classList.remove('tl-tooltip--visible');
  }

  trigger.addEventListener('mouseenter', show);
  trigger.addEventListener('mouseleave', hide);
  trigger.addEventListener('focus', show);
  trigger.addEventListener('blur', hide);
})();
</script>`,
  );
};

export const Default = Template.bind({});
