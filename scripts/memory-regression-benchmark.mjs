#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const defaultRefs = ['@scania/tegel@1.53.0', '@scania/tegel@1.54.0', 'working-tree'];

const options = parseArgs(process.argv.slice(2));
const refs = (options.refs ?? defaultRefs.join(',')).split(',').filter(Boolean);
const outputDir = resolve(
  options.out ?? join(repoRoot, '.tmp', 'memory-regression-benchmark', timestamp()),
);
const npmCacheDir = resolve(options['npm-cache'] ?? join(outputDir, '.npm-cache'));
const keepTemp = Boolean(options.keep);
const shouldBuild = !options['no-build'];
const shouldInstallSourceDeps = !options['no-install-source-deps'];
const shouldInstallFixtureDeps = !options['no-install-fixture-deps'];
const copyWorkingTree = Boolean(options['copy-working-tree']);
const nodeOptions = options['node-options'];

mkdirSync(outputDir, { recursive: true });
mkdirSync(npmCacheDir, { recursive: true });

const tempRoot = mkdtempSync(join(tmpdir(), 'tegel-memory-benchmark-'));
const results = [];
const cleanupCommands = [];

try {
  for (const ref of refs) {
    const label = ref === 'working-tree' ? 'patched-working-tree' : ref;
    console.log(`\n== ${label} ==`);

    const sourceDir = await prepareSource(ref, label);
    const coreDir = join(sourceDir, 'packages/core');

    if (shouldInstallSourceDeps && sourceDir !== repoRoot) {
      await run(npmCmd, ['ci'], { cwd: sourceDir, env: withNpmCache() });
      await run(npmCmd, ['ci'], { cwd: coreDir, env: withNpmCache() });
    }

    if (shouldBuild) {
      const corePackage = JSON.parse(readFileSync(join(coreDir, 'package.json'), 'utf8'));
      const buildScript = corePackage.scripts?.['build:core'] ? 'build:core' : 'build';
      await run(npmCmd, ['run', buildScript], { cwd: coreDir, env: withNpmCache() });
    }

    const packDir = join(outputDir, 'packs', safeName(label));
    mkdirSync(packDir, { recursive: true });
    const pack = await packTegel(coreDir, packDir);

    const fixtureDir = join(outputDir, 'fixtures', safeName(label));
    createAngularVitestFixture(fixtureDir, pack.tarballPath);

    if (shouldInstallFixtureDeps) {
      await run(npmCmd, ['install', '--no-audit', '--fund=false'], {
        cwd: fixtureDir,
        env: withNpmCache(),
      });
    }

    const measured = await run(npmCmd, ['test'], {
      cwd: fixtureDir,
      allowFailure: true,
      measureMemory: true,
      env: {
        ...withNpmCache(),
        ...(nodeOptions ? { NODE_OPTIONS: nodeOptions } : {}),
      },
    });

    const result = {
      ref,
      label,
      exitCode: measured.exitCode,
      peakTreeRssBytes: measured.peakTreeRssBytes,
      largestProcessRssBytes: measured.largestProcessRssBytes,
      tegelCssBytes: packFileSize(pack.info, 'dist/tegel/tegel.css'),
      loaderIndexBytes: packFileSize(pack.info, 'loader/index.js'),
      loaderIndexEs2017Bytes: packFileSize(pack.info, 'loader/index.es2017.js'),
      loaderIndexCjsBytes: packFileSize(pack.info, 'loader/index.cjs.js'),
      generatedIconCssBytes: safeSize(join(sourceDir, 'tokens/scss/component/icon.scss')),
      generatedScaniaIconCssBytes: safeSize(
        join(sourceDir, 'tokens/scss/component/icon-scania.scss'),
      ),
      generatedTratonIconCssBytes: safeSize(
        join(sourceDir, 'tokens/scss/component/icon-traton.scss'),
      ),
      fixtureDir,
      tarballPath: pack.tarballPath,
    };

    results.push(result);
    console.log(formatResult(result));
  }
} finally {
  for (const cleanup of cleanupCommands.reverse()) {
    await run(cleanup.command, cleanup.args, { cwd: repoRoot, allowFailure: true, quiet: true });
  }
  if (!keepTemp) {
    rmSync(tempRoot, { recursive: true, force: true });
  } else {
    console.log(`Kept temporary sources in ${tempRoot}`);
  }
}

const jsonPath = join(outputDir, 'memory-regression-results.json');
const markdownPath = join(outputDir, 'memory-regression-results.md');
writeFileSync(jsonPath, `${JSON.stringify(results, null, 2)}\n`);
writeFileSync(markdownPath, renderMarkdown(results));

console.log(`\nWrote ${jsonPath}`);
console.log(`Wrote ${markdownPath}`);

function parseArgs(args) {
  const parsed = {};
  for (const arg of args) {
    if (!arg.startsWith('--')) continue;
    const [key, ...valueParts] = arg.slice(2).split('=');
    parsed[key] = valueParts.length > 0 ? valueParts.join('=') : true;
  }
  return parsed;
}

function withNpmCache(env = process.env) {
  return {
    ...env,
    npm_config_cache: npmCacheDir,
  };
}

async function prepareSource(ref, label) {
  if (ref === 'working-tree') {
    if (!copyWorkingTree) return repoRoot;

    const dest = join(tempRoot, safeName(label));
    cpSync(repoRoot, dest, {
      recursive: true,
      filter: (source) => shouldCopyWorkingTreePath(source),
    });
    return dest;
  }

  const dest = join(tempRoot, safeName(label));
  await run('git', ['worktree', 'add', '--detach', dest, ref], { cwd: repoRoot });
  cleanupCommands.push({ command: 'git', args: ['worktree', 'remove', '--force', dest] });
  return dest;
}

function shouldCopyWorkingTreePath(source) {
  const relativePath = source.slice(repoRoot.length);
  const segments = relativePath.split(/[\\/]/).filter(Boolean);
  return !segments.some((segment) =>
    ['.git', '.tmp', 'node_modules', 'dist', 'dist-styles', 'loader', 'www'].includes(segment),
  );
}

async function packTegel(coreDir, packDir) {
  const packResult = await run(npmCmd, ['pack', '--json', '--pack-destination', packDir], {
    cwd: coreDir,
    env: withNpmCache(),
    quiet: true,
  });
  const packInfo = JSON.parse(packResult.stdout)[0];
  const tarballPath = isAbsolute(packInfo.filename)
    ? packInfo.filename
    : join(packDir, basename(packInfo.filename));

  return {
    info: packInfo,
    tarballPath,
  };
}

function createAngularVitestFixture(fixtureDir, tarballPath) {
  rmSync(fixtureDir, { recursive: true, force: true });
  mkdirSync(join(fixtureDir, 'src'), { recursive: true });

  writeFileSync(
    join(fixtureDir, 'package.json'),
    `${JSON.stringify(
      {
        name: 'tegel-memory-regression-fixture',
        private: true,
        type: 'module',
        scripts: {
          test: 'vitest run --pool=forks --no-file-parallelism',
        },
        dependencies: {
          '@angular/animations': '17.3.12',
          '@angular/common': '17.3.12',
          '@angular/compiler': '17.3.12',
          '@angular/core': '17.3.12',
          '@angular/forms': '17.3.12',
          '@angular/platform-browser': '17.3.12',
          '@angular/platform-browser-dynamic': '17.3.12',
          '@scania/tegel': `file:${tarballPath}`,
          'zone.js': '0.14.10',
        },
        devDependencies: {
          jsdom: '24.1.3',
          typescript: '5.4.5',
          vite: '5.4.21',
          vitest: '3.2.4',
        },
      },
      null,
      2,
    )}\n`,
  );

  writeFileSync(
    join(fixtureDir, 'vitest.config.ts'),
    `import { defineConfig } from 'vitest/config';\n\nexport default defineConfig({\n  test: {\n    environment: 'jsdom',\n    setupFiles: ['./src/setup.ts'],\n    include: ['./src/**/*.spec.ts'],\n    globals: true,\n    isolate: false,\n  },\n});\n`,
  );

  writeFileSync(join(fixtureDir, 'src/setup.ts'), `import '@scania/tegel/dist/tegel/tegel.css';\n`);

  writeFileSync(
    join(fixtureDir, 'src/icon.spec.ts'),
    `import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';\nimport { defineCustomElements } from '@scania/tegel/loader';\nimport { describe, expect, it } from 'vitest';\n\n@Component({\n  standalone: true,\n  schemas: [CUSTOM_ELEMENTS_SCHEMA],\n  template: \`\n    <section class=\"scania\">\n      <tds-icon name=\"truck\"></tds-icon>\n      <tds-button type=\"button\">Scania</tds-button>\n    </section>\n    <section class=\"traton\">\n      <tds-icon name=\"truck\"></tds-icon>\n      <tds-icon name=\"24v_battery\"></tds-icon>\n      <tds-button type=\"button\">Traton</tds-button>\n    </section>\n  \`,\n})\nclass TegelFixtureComponent {}\n\ndescribe('Tegel Angular/Vitest fixture', () => {\n  it('loads Angular metadata, Tegel CSS, and the Stencil loader', async () => {\n    await defineCustomElements(window);\n\n    expect(TegelFixtureComponent).toBeTypeOf('function');\n    expect(customElements.get('tds-icon')).toBeTypeOf('function');\n    expect(document.styleSheets.length).toBeGreaterThan(0);\n  });\n});\n`,
  );
}

async function run(command, args, optionsForRun = {}) {
  const {
    cwd,
    env = process.env,
    allowFailure = false,
    quiet = false,
    measureMemory = false,
  } = optionsForRun;
  const child = spawn(command, args, {
    cwd,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });

  let stdout = '';
  let stderr = '';
  let peakTreeRssBytes = 0;
  let largestProcessRssBytes = 0;

  child.stdout.on('data', (chunk) => {
    const text = chunk.toString();
    stdout += text;
    if (!quiet) process.stdout.write(text);
  });
  child.stderr.on('data', (chunk) => {
    const text = chunk.toString();
    stderr += text;
    if (!quiet) process.stderr.write(text);
  });

  const interval = measureMemory
    ? setInterval(
        () => {
          const sample = sampleProcessTreeRss(child.pid);
          peakTreeRssBytes = Math.max(peakTreeRssBytes, sample.treeRssBytes);
          largestProcessRssBytes = Math.max(largestProcessRssBytes, sample.largestProcessRssBytes);
        },
        Number(options.intervalMs ?? 100),
      )
    : undefined;

  const exitCode = await new Promise((resolveExit) => {
    child.on('close', resolveExit);
  });

  if (interval) clearInterval(interval);

  if (exitCode !== 0 && !allowFailure) {
    throw new Error(
      `${command} ${args.join(' ')} failed with exit code ${exitCode}\n${tail(stdout + stderr)}`,
    );
  }

  return {
    exitCode,
    stdout,
    stderr,
    peakTreeRssBytes,
    largestProcessRssBytes,
  };
}

function sampleProcessTreeRss(rootPid) {
  const ps = spawnSyncText('ps', ['-axo', 'pid=,ppid=,rss=,comm=']);
  if (!ps) return { treeRssBytes: 0, largestProcessRssBytes: 0 };

  const processes = ps
    .trim()
    .split('\n')
    .map((line) => {
      const match = line.trim().match(/^(\d+)\s+(\d+)\s+(\d+)\s+(.+)$/);
      if (!match) return null;
      return {
        pid: Number(match[1]),
        ppid: Number(match[2]),
        rssBytes: Number(match[3]) * 1024,
      };
    })
    .filter(Boolean);

  const childrenByParent = new Map();
  for (const processInfo of processes) {
    const children = childrenByParent.get(processInfo.ppid) ?? [];
    children.push(processInfo);
    childrenByParent.set(processInfo.ppid, children);
  }

  const stack = [rootPid];
  const treePids = new Set();
  while (stack.length > 0) {
    const pid = stack.pop();
    if (!pid || treePids.has(pid)) continue;
    treePids.add(pid);
    for (const child of childrenByParent.get(pid) ?? []) {
      stack.push(child.pid);
    }
  }

  let treeRssBytes = 0;
  let largestProcessRssBytes = 0;
  for (const processInfo of processes) {
    if (!treePids.has(processInfo.pid)) continue;
    treeRssBytes += processInfo.rssBytes;
    largestProcessRssBytes = Math.max(largestProcessRssBytes, processInfo.rssBytes);
  }

  return { treeRssBytes, largestProcessRssBytes };
}

function spawnSyncText(command, args) {
  const result = spawnSync(command, args, {
    stdio: ['ignore', 'pipe', 'ignore'],
    encoding: 'utf8',
    windowsHide: true,
  });

  return result.status === 0 ? result.stdout : undefined;
}

function safeSize(path) {
  if (!existsSync(path)) return 0;
  return readFileSync(path).byteLength;
}

function packFileSize(packInfo, path) {
  return packInfo.files.find((file) => file.path === path)?.size ?? 0;
}

function safeName(value) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '_');
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function formatResult(result) {
  return [
    `exit code: ${result.exitCode}`,
    `peak tree RSS: ${formatBytes(result.peakTreeRssBytes)}`,
    `largest process RSS: ${formatBytes(result.largestProcessRssBytes)}`,
    `tegel.css: ${formatBytes(result.tegelCssBytes)}`,
    `loader index JS: ${formatBytes(result.loaderIndexBytes)}`,
    `generated icon CSS: ${formatBytes(result.generatedIconCssBytes)}`,
  ].join('\n');
}

function renderMarkdown(rows) {
  const header = [
    '# Tegel Memory Regression Benchmark',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Ref | Exit | Peak tree RSS | Largest process RSS | tegel.css | loader/index.js | loader/index.cjs.js | generated icon CSS |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
  ];

  const body = rows.map(
    (row) =>
      `| ${row.ref} | ${row.exitCode} | ${formatBytes(row.peakTreeRssBytes)} | ${formatBytes(
        row.largestProcessRssBytes,
      )} | ${formatBytes(row.tegelCssBytes)} | ${formatBytes(
        row.loaderIndexBytes,
      )} | ${formatBytes(row.loaderIndexCjsBytes)} | ${formatBytes(
        row.generatedIconCssBytes +
          row.generatedScaniaIconCssBytes +
          row.generatedTratonIconCssBytes,
      )} |`,
  );

  const baseline = rows.find((row) => row.ref.includes('1.54.0'));
  const patched = rows.find((row) => row.ref === 'working-tree');
  const reduction =
    baseline && patched && baseline.peakTreeRssBytes > 0
      ? [
          '',
          `Peak tree RSS reduction versus 1.54.0: ${formatBytes(
            baseline.peakTreeRssBytes - patched.peakTreeRssBytes,
          )} (${(
            ((baseline.peakTreeRssBytes - patched.peakTreeRssBytes) / baseline.peakTreeRssBytes) *
            100
          ).toFixed(1)}%).`,
        ]
      : [];

  return [...header, ...body, ...reduction, ''].join('\n');
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const mib = bytes / 1024 / 1024;
  if (mib >= 1) return `${mib.toFixed(1)} MiB`;
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

function tail(text) {
  return text.split('\n').slice(-40).join('\n');
}
