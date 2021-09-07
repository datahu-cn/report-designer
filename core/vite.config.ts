import {defineConfig} from 'vite'
import typescript from 'rollup-plugin-typescript2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    port: 58453,
    hmr: {
      host: 'localhost'
    }
  },
  build: {
    assetsInlineLimit: 4096000,
    cssCodeSplit: false,
    lib: {
      name: 'index',
      entry: 'index.ts',
      formats: ['cjs', 'umd', 'es']
    },
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      external: ['reflect-metadata']
    },
    terserOptions:
      process.env.MODE === 'development'
        ? {
            compress: false,
            mangle: false,
            sourceMap: true,
            keep_classnames: true,
            keep_fnames: true
          }
        : {}
  }
})
