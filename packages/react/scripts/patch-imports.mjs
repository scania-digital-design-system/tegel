/**
 * Post-generate script: rewrites the auto-generated components.ts to import
 * createComponent from our custom runtime instead of @stencil/react-output-target/runtime.
 *
 * Run this BEFORE tsc so the compiled JS uses the correct import path.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(
  __dirname,
  '../lib/components/stencil-generated/components.ts',
);

let content = readFileSync(filePath, 'utf8');

// Replace the value import of createComponent to point to our custom runtime.
// Keep the type-only import pointing to the original package for EventName / StencilReactComponent.
content = content.replace(
  "import { createComponent } from '@stencil/react-output-target/runtime';",
  "import { createComponent } from '../../runtime';",
);

writeFileSync(filePath, content, 'utf8');

console.log('patch-imports: rewrote createComponent import to ../../runtime');
