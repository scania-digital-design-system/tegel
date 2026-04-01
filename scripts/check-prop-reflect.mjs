/**
 * Checks that all primitive/enum @Prop() decorators in Stencil components
 * include `reflect: true`. Run via: npm run lint:prop-reflect
 *
 * Exits with code 1 if any violations are found.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPONENTS_DIR = path.resolve(__dirname, '../packages/core/src/components');

// Props that should NOT be reflected (produce invalid attributes like aria-level-value)
const SKIP_PROP_NAMES = new Set(['ariaLevelValue']);

// Type substrings that indicate complex types which should NOT be reflected
const SKIP_TYPE_SUBSTRINGS = [
  'HTMLElement',
  'object',
  'Date',
  '[]',   // any array type
  '=>',   // function types
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
  return SKIP_TYPE_SUBSTRINGS.some((s) => type.includes(s));
}

/**
 * Parse a @Prop decorator line and return { decoratorArgs, propName } or null.
 */
function parsePropLine(line) {
  const propStart = line.indexOf('@Prop(');
  if (propStart === -1) return null;

  // Find the closing paren of @Prop(...)
  const argsStart = propStart + 6; // after "@Prop("
  const argsEnd = line.indexOf(')', argsStart);
  if (argsEnd === -1) return null;

  const decoratorArgs = line.slice(argsStart, argsEnd);

  // After ") " comes the prop name (word characters until ? ! : or space)
  const afterDecorator = line.slice(argsEnd + 1).trimStart();
  let propName = '';
  for (const ch of afterDecorator) {
    if (ch === '?' || ch === '!' || ch === ':' || ch === ' ' || ch === ';') break;
    propName += ch;
  }

  if (!propName) return null;
  return { decoratorArgs, propName };
}

/**
 * Collect continuation lines for a multiline type union starting after startIndex.
 */
function collectMultilineType(lines, startIndex) {
  let extra = '';
  for (let j = startIndex + 1; j < lines.length; j++) {
    const nextLine = lines[j].trim();
    if (!nextLine.startsWith('|') && !nextLine.startsWith("'")) break;

    const nextEq = nextLine.indexOf('=');
    if (nextEq !== -1) {
      extra += ' ' + nextLine.slice(0, nextEq);
      break;
    }
    extra += ' ' + trimTrailing(nextLine);
    if (!nextLine.endsWith('|')) break;
  }
  return extra;
}

/**
 * Extract the full type for a @Prop, handling multiline type unions.
 */
function extractPropType(lines, startIndex) {
  const firstLine = lines[startIndex];

  const colonIndex = firstLine.indexOf(':');
  if (colonIndex === -1) return '';

  let rest = firstLine.slice(colonIndex + 1);

  const eqIndex = findAssignmentEquals(rest);
  if (eqIndex !== -1) rest = rest.slice(0, eqIndex);

  rest = trimTrailing(rest);

  let type = rest;
  if (rest.trimEnd().endsWith('|') || !rest.trim()) {
    type += collectMultilineType(lines, startIndex);
  }

  return type.trim();
}

/**
 * Find index of " =" (assignment) that is NOT part of "=>" (arrow).
 * Returns -1 if not found.
 */
function findAssignmentEquals(str) {
  let i = 0;
  while (i < str.length) {
    i = str.indexOf('=', i);
    if (i === -1) return -1;

    // Skip "=>" (arrow functions)
    if (str[i + 1] === '>') {
      i += 2;
      continue;
    }

    // Must have a space before "=" to be an assignment
    if (i > 0 && str[i - 1] === ' ') {
      return i - 1; // return position of the space before "="
    }

    i += 1;
  }
  return -1;
}

/**
 * Remove trailing semicolons and spaces from a string.
 */
function trimTrailing(str) {
  let end = str.length;
  while (end > 0 && (str[end - 1] === ' ' || str[end - 1] === ';')) {
    end--;
  }
  return str.slice(0, end);
}

const files = findTsxFiles(COMPONENTS_DIR);
const violations = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const parsed = parsePropLine(lines[i]);
    if (!parsed) continue;

    const { decoratorArgs, propName } = parsed;

    // Skip if already has reflect: true
    if (decoratorArgs.includes('reflect') && decoratorArgs.includes('true')) continue;

    // Skip excluded prop names
    if (SKIP_PROP_NAMES.has(propName)) continue;

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
  console.error(`\nFound ${violations.length} @Prop(s) missing reflect: true:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line} -- ${v.prop}: ${v.type}`);
  }
  console.error(
    '\nAll primitive/enum @Prop() decorators must include reflect: true.',
    '\nSee docs/PROP-REFLECT-TESTING.md for details.\n',
  );
  process.exit(1);
} else {
  console.log('All primitive/enum @Prop() decorators have reflect: true.');
}
