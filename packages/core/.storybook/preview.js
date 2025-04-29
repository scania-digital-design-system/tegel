import { defineCustomElements } from '../loader';
import '../dist/tegel/tegel.css';

const preview = {
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

export default preview;

defineCustomElements();
