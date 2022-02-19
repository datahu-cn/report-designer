import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 58453,
    hmr: {
      host: 'localhost'
    }
  },
  esbuild: {
    keepNames: true
  },
  build: {
    assetsInlineLimit: 4096000,
    cssCodeSplit: false,
    lib: {
      name: 'index',
      entry: 'index.ts',
      formats: ['cjs', 'es']
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: [
        'mysql',
        'mssql',
        'oracledb',
        'reflect-metadata',
        '@datahu/core',
        'pg',
        'sqlstring',
        'exceljs',
        'axios',
        'influx',
        'jest'
      ]
    }
  }
})
