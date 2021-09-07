<template>
  <a-config-provider :locale="locale">
    <Main></Main>
  </a-config-provider>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Main from './layout/Main.vue'
import {useAntLocale} from './use/state'
export default defineComponent({
  name: 'App',
  components: {Main},
  setup() {
    let locale = useAntLocale()
    return {locale}
  }
})
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
