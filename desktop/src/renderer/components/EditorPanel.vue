<template>
  <div class="c-editor-panel">
    <div ref="mainPanel">
      test2
      <!-- <component v-if="com" :is="com"></component> -->
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, reactive} from 'vue'
import http from '../use/http'

export default defineComponent({
  name: 'EditorPanel',
  props: ['config'],
  setup() {
    // const mainPanel = ref(null)
    // var com = ref(null)
    // onMounted(async () => {
    //   var nel = document.createElement('div')
    //   document.body.append(nel)
    //   console.log('el', nel)
    //   var result = await http.request(
    //     'http://localhost:58453/src/main',
    //     'loadComponent'
    //   )
    //   console.log('result', result)
    //   var controls: any = await import(
    //     'http://localhost:58453/dist/my-vue-app.es.js'
    //   )
    //   console.log('control', controls)
    //   com = controls.default[0]
    // })
    // return {mainPanel, com}
  },
  data() {
    return {
      com: null
    }
  },
  methods: {},
  async mounted() {
    //'http://localhost:58453/dist/my-vue-app.es.js'
    // var controls: any = await import('http://localhost:58453/src/main.ts')
    // console.log('control', controls)
    // this.com = controls.default[0]
  }
})
</script>

<style scoped>
.c-editor-panel {
  display: flex;
  gap: 1em;
  justify-content: center;
}
</style>
