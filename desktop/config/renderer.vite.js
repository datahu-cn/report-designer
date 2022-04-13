const {join} = require('path')
const vue = require('@vitejs/plugin-vue')
const {chrome} = require('./electron-dep-versions')
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
const fse = require('fs-extra')

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
console.error('process.env.NODE_ENV', process.env.NODE_ENV)
// if (process.env.NODE_ENV !== 'development') {
//   fse.copySync('../component/src', 'datahu/component')
// }
module.exports = {
  root: join(process.cwd(), './src/renderer'),
  resolve: {
    alias:
      process.env.NODE_ENV === 'development'
        ? [
            {
              find: '@datahu/core',
              replacement: join(process.cwd(), '../core') + '/index.ts'
            },
            {
              find: '@datahu/component-base',
              replacement:
                join(process.cwd(), '../component-base') + '/index.ts'
            },
            {
              find: '@datahu/component',
              replacement: join(process.cwd(), '../component') + '/index.ts'
            },
            {
              find: '@datahu/designer',
              replacement: join(process.cwd(), '../designer') + '/index.ts'
            },
            {
              find: '/@/',
              replacement: join(process.cwd(), './src/renderer') + '/'
            }
          ]
        : [
            {
              find: '/@/',
              replacement: join(process.cwd(), './src/renderer') + '/'
            }
          ]
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({importStyle: false})]
    })
  ],
  base: '',
  sourcemap: 'true',
  server: {
    port: '54321'
  },
  esbuild: {
    keepNames: true
  },
  build: {
    outDir: join(process.cwd(), 'dist/source/renderer'),
    assetsDir: '.',
    rollupOptions: {
      external: require('./external-packages').default
    },
    sourcemap: true,
    minify: false,
    // terserOptions: {
    //   compress: false,
    //   mangle: false,
    //   sourceMap: true,
    //   keep_classnames: true,
    //   keep_fnames: true
    // },
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
