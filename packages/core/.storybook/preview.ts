import { defineCustomElements } from '../loader';
import '../dist/tegel/tegel.css';
import { docs, options } from './parameters';

const preview = {
  parameters: {
    docs,
    options,
    tags: ['autodocs'],
  },
};

export default preview;

defineCustomElements();
