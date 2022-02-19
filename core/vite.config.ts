import {defineConfig} from 'vite'
import typescript from 'rollup-plugin-typescript2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  esbuild: {
    keepNames: true
  },
  build: {
    assetsInlineLimit: 4096000,
    lib: {
      name: 'index',
      entry: 'index.ts',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: []
    },
    sourcemap: true
  }
})
