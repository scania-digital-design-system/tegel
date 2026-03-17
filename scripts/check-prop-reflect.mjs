/**
 * Checks that all primitive/enum @Prop() decorators in Stencil components
 * include `reflect: true`. Run via: npm run lint:prop-reflect
 *
 * Exits with code 1 if any violations are found.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPONENTS_DIR = path.resolve(__dirname, '../packages/core/src/components');

// Props that should NOT be reflected (produce invalid attributes like aria-level-value)
const SKIP_PROP_NAMES = ['ariaLevelValue'];

// Types that should NOT be reflected (complex types)
const SKIP_TYPE_PATTERNS = [
  /HTMLElement/,
  /\bobject\b/,
  /\bDate\b/,
  /number\[]/,
  /\(string *\| *number\)\[]/,
  /string *\| *number *\| *\(/,
  /=>/,  // function types e.g. (value: string) => boolean
];

function findTsxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'test' && entry.name !== 'node_modules') {
      results.push(...findTsxFiles(fullPath));
    } else if (entry.name.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function isComplexType(type) {
  return SKIP_TYPE_PATTERNS.some((p) => p.test(type));
}

/**
 * Extract the full type for a @Prop, handling multiline type unions.
 */
function extractPropType(lines, startIndex) {
  let type = '';
  const firstLine = lines[startIndex];

  // Get everything after the colon
  const colonIndex = firstLine.indexOf(':');
  if (colonIndex === -1) return '';

  let rest = firstLine.slice(colonIndex + 1);

  // Remove default value assignment and trailing semicolons
  // Use " =" (space before equals) to avoid matching "=>" in arrow functions
  const equalsMatch = rest.match(/ =(?!>)/);
  if (equalsMatch) rest = rest.slice(0, equalsMatch.index);
  rest = rest.replace(/;? *$/, '');
  type += rest;

  // If the line ends with | or starts with |, it's a multiline type
  if (rest.trim().endsWith('|') || !rest.trim()) {
    for (let j = startIndex + 1; j < lines.length; j++) {
      const nextLine = lines[j].trim();
      if (nextLine.startsWith('|') || nextLine.startsWith("'")) {
        const eqIdx = nextLine.indexOf('=');
        if (eqIdx !== -1) {
          type += ' ' + nextLine.slice(0, eqIdx);
          break;
        }
        type += ' ' + nextLine.replace(/;? *$/, '');
        if (!nextLine.endsWith('|')) break;
      } else {
        break;
      }
    }
  }

  return type.trim();
}

const files = findTsxFiles(COMPONENTS_DIR);
const violations = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match @Prop(...) propName
    const match = line.match(/@Prop\(([^)]*)\) +(\w+)/);
    if (!match) continue;

    const [, decoratorArgs, propName] = match;

    // Skip if already has reflect: true
    if (/reflect *: *true/.test(decoratorArgs)) continue;

    // Skip excluded prop names
    if (SKIP_PROP_NAMES.includes(propName)) continue;

    // Get the full type (handles multiline)
    const propType = extractPropType(lines, i);

    // Skip complex types
    if (propType && isComplexType(propType)) continue;

    violations.push({
      file: path.relative(COMPONENTS_DIR, file),
      line: i + 1,
      prop: propName,
      type: propType || '(unknown)',
    });
  }
}

if (violations.length > 0) {
  console.error(`\n❌ Found ${violations.length} @Prop(s) missing reflect: true:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line} — ${v.prop}: ${v.type}`);
  }
  console.error(
    '\nAll primitive/enum @Prop() decorators must include reflect: true.',
    '\nSee docs/PROP-REFLECT-TESTING.md for details.\n',
  );
  process.exit(1);
} else {
  console.log('✅ All primitive/enum @Prop() decorators have reflect: true.');
}
