import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
      entry: 'src/index.ts',
      formats: ['cjs']
    },
    sourcemap: true,
    minify: false,
    terserOptions:
      process.env.MODE === 'development'
        ? {
            compress: false,
            mangle: false,
            sourceMap: true,
            keep_classnames: true,
            keep_fnames: true
          }
        : {
            compress: false,
            mangle: false,
            sourceMap: true,
            keep_classnames: true,
            keep_fnames: true
          },
    rollupOptions: {
      external: ['mysql', 'mssql', 'oracledb', 'reflect-metadata']
    }
  }
})
