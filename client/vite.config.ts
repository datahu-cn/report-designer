import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
const fse = require('fs-extra')
const {resolve} = require('path')

export default ({mode}) => {
  if (mode !== 'development') {
    fse.copySync('../component/src', 'datahu/component')
  }
  let config: any = {
    plugins: [vue()],
    resolve: {
      alias:
        mode === 'development'
          ? []
          : [
              {
                find: '@datahu/component',
                replacement: resolve(__dirname, 'datahu/component')
              }
            ]
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      cssCodeSplit: false,
      sourcemap: false,
      minify: 'terser',
      lib: {
        name: 'datahu.client',
        entry: './src/lib/index.ts',
        fileName: 'datahu.client',
        formats: ['cjs', 'es', 'umd']
      },
      rollupOptions: {
        external: []
      },
      output: {
        globals: {
          vue: 'vue'
        }
      },
      terserOptions:
        mode === 'development'
          ? {
              compress: false,
              mangle: false,
              sourceMap: true,
              keep_classnames: true,
              keep_fnames: true
            }
          : {
              keep_classnames: true,
              sourceMap: false
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
