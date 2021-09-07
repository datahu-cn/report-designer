<template>
  <div class="c-relationship">
    <RelationshipPanel></RelationshipPanel>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted} from 'vue'
import http from '../use/http'
import RelationshipPanel from '../components/relationship/RelationshipPanel.vue'
export default defineComponent({
  name: 'Relationship',
  components: {RelationshipPanel},
  setup() {
    let dataSources = ref([])
    onMounted(async () => {})

    // It makes no sense to make "versions" reactive
    return {dataSources}
  }
})
</script>

<style lang="less">
.c-relationship {
  width: 100%;
  height: 100%;
}
</style>
