import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    assetsInlineLimit: 4096000,
    cssCodeSplit: false,
    lib: {
      name: 'index',
      entry: 'index.ts'
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions:
      process.env.MODE === 'development'
        ? {
            compress: false,
            mangle: false,
            sourceMap: true,
            keep_classnames: true,
            keep_fnames: true
          }
        : {}
  }
})
