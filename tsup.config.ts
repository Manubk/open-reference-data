import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'countries/index': 'src/countries/index.ts',
    'currencies/index': 'src/currencies/index.ts',
    'banks/index': 'src/banks/index.ts',
  },

  format: ['esm', 'cjs'],

  dts: true,

  clean: false,

  splitting: false,

  sourcemap: true,

  treeshake: true,

  outDir: 'dist',
});