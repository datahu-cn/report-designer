const {join} = require('path')
const vue = require('@vitejs/plugin-vue')
const {chrome} = require('./electron-dep-versions')
const fse = require('fs-extra')

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
console.error('process.env.NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'development') {
  fse.copySync('../component/src', 'datahu/component')
}
module.exports = {
  root: join(process.cwd(), './src/renderer'),
  resolve: {
    alias:
      process.env.NODE_ENV === 'development'
        ? [
            {
              find: '/@/',
              replacement: join(process.cwd(), './src/renderer') + '/'
            }
          ]
        : [
            {
              find: '/@/',
              replacement: join(process.cwd(), './src/renderer') + '/'
            },
            {
              find: '@datahu/component',
              replacement: join(process.cwd(), './datahu/component')
            }
          ]
  },
  plugins: [vue()],
  base: '',
  sourcemap: 'true',
  server: {
    port: '54321'
  },
  build: {
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: join(process.cwd(), 'dist/source/renderer'),
    assetsDir: '.',
    rollupOptions: {
      external: require('./external-packages').default
    },
    minify: 'terser',
    terserOptions: {
      compress: false,
      mangle: false,
      sourceMap: true,
      keep_classnames: true,
      keep_fnames: true
    },
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
