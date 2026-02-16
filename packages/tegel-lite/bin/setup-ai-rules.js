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
  {
    id: 'claude',
    label: 'Claude',
    description: 'CLAUDE.md',
    sourceFile: path.join(packageRoot, 'CLAUDE.md'),
    targetFile: path.join(projectRoot, 'CLAUDE.md'),
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
 *
 * Uses readline.emitKeypressEvents to correctly parse multi-byte
 * escape sequences (arrow keys) across all platforms.
 */
function showCheckboxList(items) {
  return new Promise((resolve) => {
    const selected = items.map(() => true); // All selected by default
    let cursor = 0;

    const { stdin, stdout } = process;

    // Non-interactive fallback (e.g. CI, piped input)
    if (!stdin.isTTY) {
      console.log('Non-interactive terminal detected. Selecting all tools.');
      resolve(items.map((_, i) => i));
      return;
    }

    // ── Rendering ───────────────────────────────────────────────

    let rendered = false;

    function render() {
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

    function rerender() {
      if (rendered) {
        // Move up to overwrite previous output
        // items.length + 1 (empty line) + 1 (help text) + 1 (trailing newline)
        const lineCount = items.length + 3;
        readline.moveCursor(stdout, 0, -lineCount);
        readline.clearScreenDown(stdout);
      }

      stdout.write(render());
      stdout.write('\n');
      rendered = true;
    }

    // ── Cleanup ─────────────────────────────────────────────────

    function cleanup() {
      stdin.setRawMode(false);
      stdin.removeAllListeners('keypress');
      stdin.pause();
      stdout.write('\x1B[?25h'); // Show cursor
    }

    // ── Keypress handler ────────────────────────────────────────

    function onKeypress(_, key) {
      if (!key) return;

      // Ctrl+C → exit
      if (key.ctrl && key.name === 'c') {
        cleanup();
        stdout.write('\n');
        process.exit(0);
      }

      // Enter → confirm selection
      if (key.name === 'return') {
        cleanup();
        stdout.write('\n');
        resolve(selected.reduce((acc, sel, i) => (sel ? [...acc, i] : acc), []));
        return;
      }

      // Space → toggle current item
      if (key.name === 'space') {
        selected[cursor] = !selected[cursor];
      }

      // Up arrow or k → move cursor up
      if (key.name === 'up' || key.name === 'k') {
        cursor = (cursor - 1 + items.length) % items.length;
      }

      // Down arrow or j → move cursor down
      if (key.name === 'down' || key.name === 'j') {
        cursor = (cursor + 1) % items.length;
      }

      rerender();
    }

    // ── Start listening ─────────────────────────────────────────

    readline.emitKeypressEvents(stdin);

    stdin.setRawMode(true);
    stdin.resume();

    stdin.on('keypress', onKeypress);

    // Initial render
    stdout.write('\x1B[?25l'); // Hide cursor
    rerender();
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
