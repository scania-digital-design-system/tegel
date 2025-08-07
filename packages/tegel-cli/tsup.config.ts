import { defineConfig } from 'tsup';
import { cpSync, readFileSync } from 'fs';
import { resolve } from 'path';

// Read package.json to get version
const packageJson = JSON.parse(readFileSync(resolve('./package.json'), 'utf-8'));
const cliVersion = packageJson.version;

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'esnext',
  minify: true,
  treeshake: true,
  define: {
    __CLI_VERSION__: JSON.stringify(cliVersion),
  },
  esbuildOptions(options) {
    options.define = {
      ...options.define,
      __CLI_VERSION__: JSON.stringify(cliVersion),
    };
  },
  onSuccess: async () => {
    // Run prepare:source after build
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    await execAsync('npm run prepare:source');

    // Copy tegel-source to dist
    console.log('📦 Copying tegel-source to dist...');
    try {
      cpSync('tegel-source', 'dist/tegel-source', { recursive: true });
      console.log('✅ Copied tegel-source to dist');
    } catch (error) {
      console.error('❌ Failed to copy tegel-source:', error);
    }

    console.log('✅ Build complete!');
  },
});
