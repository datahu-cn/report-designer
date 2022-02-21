import {defineConfig} from 'vite'
import {join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 58453,
    hmr: {
      host: 'localhost'
    }
  },
  resolve: {
    alias:
      process.env.NODE_ENV === 'development'
        ? [
            {
              find: '@datahu/core',
              replacement: join(process.cwd(), '../core') + '/index.ts'
            }
          ]
        : []
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
