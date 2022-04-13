import vue from '@vitejs/plugin-vue'
import {visualizer} from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
const {join} = require('path')

export default ({mode}) => {
  let config: any = {
    plugins: [
      vue(),
      visualizer(),
      cssInjectedByJsPlugin(),
      Components({
        resolvers: [AntDesignVueResolver({importStyle: false})]
      })
    ],
    resolve: {
      alias:
        mode === 'development'
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
              }
            ]
          : []
    },
    esbuild: {
      keepNames: true
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      sourcemap: false,
      minify: true,
      lib: {
        name: 'datahu.designer',
        entry: './src/index.ts',
        fileName: 'datahu.designer',
        formats: ['es']
      },
      rollupOptions: {
        external: []
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  }
  if (mode == 'development') {
    config.build.sourcemap = true
    config.build.minify = false
    return config
  } else {
    return config
  }
}
// export default defineConfig({
//   plugins: [vue()]
// })
