import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill';
import tsconfigPaths from 'vite-tsconfig-paths';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        GlobalsPolyfills({
          buffer: true,
        }),
      ],
    },
  },
  define: {
    global: {},
  },
  build: {
    rollupOptions: {
      plugins: [
        (rollupNodePolyFill as any)(),
      ],
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
