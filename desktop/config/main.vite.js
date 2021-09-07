const {join} = require('path')
const {node} = require('./electron-dep-versions')
import vue from '@vitejs/plugin-vue'

/**
 * minify: 'terser',
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
module.exports = {
  plugins: [vue()],
  resolve: {
    alias: {
      '/@/': join(process.cwd(), './src/main') + '/'
    }
  },
  build: {
    target: `node${node}`,
    outDir: 'dist/source/main',
    assetsDir: '.',
    sourcemap: 'true',
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
      sourceMap: true,
      keep_classnames: true,
      keep_fnames: true
    },
    lib: {
      entry: 'src/main/index.ts',
      name: 'index',
      formats: ['cjs']
    },
    rollupOptions: {
      external: require('./external-packages').default,
      output: {
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name].[format].js',
        assetFileNames: '[name].[ext]'
      }
    },
    emptyOutDir: true
  }
}
