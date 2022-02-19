import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  esbuild: {
    keepNames: true
  },
  build: {
    assetsInlineLimit: 4096000,
    lib: {
      name: 'index',
      entry: 'index.ts',
      formats: ['es']
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: [
        'vue',
        '@datahu/core',
        'ant-design-vue',
        'vxe-table',
        'xe-utils',
        'vxe-table-plugin-export-xlsx',
        'echarts',
        'axios',
        'add'
      ]
    },
    sourcemap: true
  }
})