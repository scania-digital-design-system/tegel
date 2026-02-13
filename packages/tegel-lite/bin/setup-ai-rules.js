#!/usr/bin/env node

/**
 * setup-ai-rules.js
 *
 * Interactive CLI to copy @scania/tegel-lite AI coding rules into a user's project.
 *
 * Usage:
 *   npx tegel-lite-setup-rules          # Interactive mode
 *   npx tegel-lite-setup-rules --all    # Copy all rule formats (skip prompts)
 *
 * Plain Node.js — no external dependencies. Uses built-in readline.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');

// Where files will be copied to
const projectRoot = process.cwd();

// Markers for idempotent updates in aggregated files
const MARKER_START = '<!-- START @scania/tegel-lite rules -->';
const MARKER_END = '<!-- END @scania/tegel-lite rules -->';

// ── Tool definitions ──────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: 'cursor',
    label: 'Cursor',
    description: '.cursor/rules/tegel-lite/*.mdc',
    sourceDir: path.join(packageRoot, '.cursor', 'rules', 'tegel-lite'),
    targetDir: path.join(projectRoot, '.cursor', 'rules', 'tegel-lite'),
    mode: 'directory',
  },
  {
    id: 'vscode',
    label: 'VS Code (GitHub Copilot)',
    description: '.github/copilot-instructions.md',
    sourceFile: path.join(packageRoot, '.github', 'copilot-instructions.md'),
    targetFile: path.join(projectRoot, '.github', 'copilot-instructions.md'),
    mode: 'aggregated',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Wrap content in section markers for idempotent updates.
 */
function wrapWithMarkers(content) {
  return `${MARKER_START}\n${content.trim()}\n${MARKER_END}`;
}

/**
 * Replace the marked section in existing file content, or append if not found.
 */
function upsertMarkedSection(existingContent, newSection) {
  const pattern = `${escapeRegex(MARKER_START)}[\\s\\S]*?${escapeRegex(MARKER_END)}`;
  const markerRegex = new RegExp(pattern);

  if (markerRegex.test(existingContent)) {
    // Replace existing section
    return existingContent.replace(new RegExp(pattern), newSection);
  }

  // Append with spacing
  const separator = existingContent.trim().length > 0 ? '\n\n' : '';
  return existingContent.trimEnd() + separator + newSection + '\n';
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Ask a yes/no question via readline.
 */
function askYesNo(rl, question) {
  return new Promise((resolve) => {
    rl.question(`${question} (y/N): `, (answer) => {
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

// ── Checkbox UI ───────────────────────────────────────────────────────────────

/**
 * Display an interactive checkbox list in the terminal.
 * Arrow keys navigate, space toggles, enter confirms.
 */
function showCheckboxList(items) {
  return new Promise((resolve) => {
    const selected = items.map(() => true); // All selected by default
    let cursor = 0;

    const { stdin, stdout } = process;

    // Check if we can use raw mode (not available in all environments)
    if (!stdin.isTTY) {
      console.log('Non-interactive terminal detected. Selecting all tools.');
      resolve(items.map((_, i) => i));
      return;
    }

    function render() {
      // Move cursor up to overwrite previous render (except first time)
      stdout.write('\x1B[?25l'); // Hide cursor

      const lines = items.map((item, i) => {
        const checkbox = selected[i] ? '\x1B[32m◉\x1B[0m' : '○';
        const pointer = i === cursor ? '\x1B[36m❯\x1B[0m ' : '  ';
        const desc = `\x1B[2m${item.description}\x1B[0m`;
        return `${pointer}${checkbox} ${item.label}  ${desc}`;
      });

      lines.push('');
      lines.push('\x1B[2m↑↓ navigate · space toggle · enter confirm\x1B[0m');

      return lines.join('\n');
    }

    // Initial render
    const output = render();
    stdout.write(output);
    // Position cursor at start of line after menu for consistent re-renders
    stdout.write('\n');

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf-8');

    function onKeypress(key) {
      // Ctrl+C
      if (key === '\x03') {
        stdin.setRawMode(false);
        stdin.removeListener('data', onKeypress);
        stdout.write('\x1B[?25h\n'); // Show cursor
        process.exit(0);
      }

      // Enter
      if (key === '\r' || key === '\n') {
        stdin.setRawMode(false);
        stdin.removeListener('data', onKeypress);
        stdout.write('\x1B[?25h\n'); // Show cursor
        resolve(selected.reduce((acc, sel, i) => (sel ? [...acc, i] : acc), []));
        return;
      }

      // Space — toggle
      if (key === ' ') {
        selected[cursor] = !selected[cursor];
      }

      // Arrow up or k
      if (key === '\x1B[A' || key === 'k') {
        cursor = (cursor - 1 + items.length) % items.length;
      }

      // Arrow down or j
      if (key === '\x1B[B' || key === 'j') {
        cursor = (cursor + 1) % items.length;
      }

      // Re-render: move up to overwrite
      // +3 because we have: items.length + empty line + help text + our newline
      const lineCount = items.length + 3;
      // Move to start of line, move up lineCount lines, clear from cursor to end of screen
      stdout.write('\r');
      stdout.write(`\x1B[${lineCount}A`);
      stdout.write('\x1B[0J');
      stdout.write(render());
      stdout.write('\n');
    }

    stdin.on('data', onKeypress);
  });
}

// ── Copy logic ────────────────────────────────────────────────────────────────

/**
 * Copy a directory of files (e.g. .cursor/rules/tegel-lite/*.mdc).
 */
function copyDirectoryTool(tool, rl, skipPrompt) {
  return copyDirectoryToolAsync(tool, rl, skipPrompt);
}

async function copyDirectoryToolAsync(tool, rl, skipPrompt) {
  if (!fs.existsSync(tool.sourceDir)) {
    console.log(`  ⚠ Source not found: ${path.relative(packageRoot, tool.sourceDir)}`);
    console.log('    Run "npm run generate:ai-rules" in the package first.');
    return;
  }

  const files = fs.readdirSync(tool.sourceDir).filter((f) => f.endsWith('.mdc'));

  if (files.length === 0) {
    console.log('  ⚠ No .mdc files found in source directory.');
    return;
  }

  // Check if target directory already exists
  if (fs.existsSync(tool.targetDir) && !skipPrompt) {
    const overwrite = await askYesNo(
      rl,
      `  Target exists: ${path.relative(projectRoot, tool.targetDir)}. Overwrite?`,
    );
    if (!overwrite) {
      console.log('  Skipped.');
      return;
    }
  }

  fs.mkdirSync(tool.targetDir, { recursive: true });

  for (const file of files) {
    const src = path.join(tool.sourceDir, file);
    const dest = path.join(tool.targetDir, file);
    fs.copyFileSync(src, dest);
    console.log(`  Copied: ${path.relative(projectRoot, dest)}`);
  }
}

/**
 * Copy an aggregated file (CLAUDE.md, AGENTS.md, copilot-instructions.md).
 * Uses markers for idempotent upsert.
 */
async function copyAggregatedTool(tool, rl, skipPrompt) {
  if (!fs.existsSync(tool.sourceFile)) {
    console.log(`  ⚠ Source not found: ${path.relative(packageRoot, tool.sourceFile)}`);
    console.log('    Run "npm run generate:ai-rules" in the package first.');
    return;
  }

  const sourceContent = fs.readFileSync(tool.sourceFile, 'utf-8');
  const wrappedContent = wrapWithMarkers(sourceContent);
  const targetRelative = path.relative(projectRoot, tool.targetFile);

  if (fs.existsSync(tool.targetFile)) {
    const existingContent = fs.readFileSync(tool.targetFile, 'utf-8');

    // Check if markers already exist
    if (existingContent.includes(MARKER_START)) {
      // Update in place
      const updatedContent = upsertMarkedSection(existingContent, wrappedContent);
      fs.writeFileSync(tool.targetFile, updatedContent, 'utf-8');
      console.log(`  Updated: ${targetRelative} (replaced existing tegel-lite section)`);
      return;
    }

    // File exists but no markers — ask to append
    if (!skipPrompt) {
      const append = await askYesNo(
        rl,
        `  File exists: ${targetRelative}. Append tegel-lite rules?`,
      );
      if (!append) {
        console.log('  Skipped.');
        return;
      }
    }

    const updatedContent = upsertMarkedSection(existingContent, wrappedContent);
    fs.writeFileSync(tool.targetFile, updatedContent, 'utf-8');
    console.log(`  Updated: ${targetRelative} (appended tegel-lite section)`);
  } else {
    // Create new file
    const dir = path.dirname(tool.targetFile);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(tool.targetFile, wrappedContent + '\n', 'utf-8');
    console.log(`  Created: ${targetRelative}`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const skipPrompt = args.includes('--all');

  console.log('');
  console.log('\x1B[1m@scania/tegel-lite — AI Coding Rules Setup\x1B[0m');
  console.log('');

  let selectedIndices;

  if (skipPrompt) {
    console.log('Installing all rule formats (--all flag).\n');
    selectedIndices = TOOLS.map((_, i) => i);
  } else {
    console.log('Select which AI tools to configure:\n');
    selectedIndices = await showCheckboxList(TOOLS);
  }

  if (selectedIndices.length === 0) {
    console.log('No tools selected. Exiting.');
    process.exit(0);
  }

  const selectedTools = selectedIndices.map((i) => TOOLS[i]);

  console.log(`\nInstalling rules for: ${selectedTools.map((t) => t.label).join(', ')}\n`);

  // Create a readline interface for yes/no prompts
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  for (const tool of selectedTools) {
    console.log(`\n${tool.label}:`);

    if (tool.mode === 'directory') {
      await copyDirectoryTool(tool, rl, skipPrompt);
    } else {
      await copyAggregatedTool(tool, rl, skipPrompt);
    }
  }

  rl.close();

  console.log('\n\x1B[32m✓ Done!\x1B[0m AI coding rules installed successfully.');
  console.log('\nRe-run this command anytime to update rules to the latest version.\n');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
