import { defineConfig } from 'tsup';
import { cpSync } from 'fs';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'esnext',
  minify: true,
  treeshake: true,
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
