import formatHtmlPreview from '../../../stories/formatHtmlPreview';
// import readme from './readme.md';

export default {
  title: 'Tegel Light (CSS)/Button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    fullwidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    fullwidth: false,
    disabled: false,
  },
};

const Template = ({ variant, size, fullwidth, disabled }) =>
  formatHtmlPreview(`
    <script>
        import "@scania/tegel-light/tl-button.css";
    </script>

      <button class="tl-button tl-button--${variant} tl-button--${size} 
        ${fullwidth ? 'tl-button--fullwidth' : ''} 
        ${disabled ? 'tl-button--disabled' : ''}"
        ${disabled ? 'disabled' : ''}>
        <span class="tl-button__label">Button</span>
      </button>
    `);
export const Default = Template.bind({});
