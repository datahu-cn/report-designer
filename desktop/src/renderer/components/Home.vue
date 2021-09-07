<template>
  <div>
    <EditorPanel :config="config" />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import EditorPanel from './EditorPanel.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: {EditorPanel},
  setup() {
    const count = ref(0)
    var config = {
      name: 'test'
    }
    return {count, config}
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
