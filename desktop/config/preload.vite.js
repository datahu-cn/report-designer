const {join} = require('path')
const {chrome} = require('./electron-dep-versions')

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
module.exports = {
  alias: {
    '/@/': join(process.cwd(), './src/preload') + '/'
  },
  esbuild: {
    keepNames: true
  },
  build: {
    target: `chrome${chrome}`,
    outDir: 'dist/source/preload',
    assetsDir: '.',
    sourcemap: 'true',
    // minify: process.env.MODE === 'development' ? 'terser' : 'terser',
    // terserOptions: {
    //   compress: false,
    //   mangle: false,
    //   sourceMap: true,
    //   keep_classnames: true,
    //   keep_fnames: true
    // },
    lib: {
      name: 'index',
      entry: 'src/preload/index.ts',
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
