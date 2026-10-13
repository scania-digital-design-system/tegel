export default {
  globs: ['src/components/**/*.tsx'],
  exclude: [
    '**/*.stories.*',
    '**/*.spec.*',
    '**/*.test.*',
    '**/*.e2e.*',
    '**/test/**',
    '**/_beta/**',
  ],
  stencil: true,
  outdir: 'public',
  packagejson: false,
};
