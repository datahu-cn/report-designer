<template>
  <div class="c-chart">
    <Multipanel layout="vertical">
      <div class="c-pane c-pane-1 c-chart-vertical-panel" style="width: 210px">
        <ComponentList></ComponentList>
      </div>

      <MultipaneResizer
        :show-expand="true"
        layout="vertical"
      ></MultipaneResizer>
      <div
        class="c-pane c-pane-2 c-chart-vertical-panel"
        style="width: 210px; margin-left: -3px"
      >
        <ComponentFields></ComponentFields>
      </div>
      <MultipaneResizer
        :show-expand="true"
        layout="vertical"
      ></MultipaneResizer>
      <div
        class="c-pane c-pane-3 c-chart-vertical-panel"
        style="width: 210px; margin-left: -3px"
      >
        <ComponentControls></ComponentControls>
      </div>

      <MultipaneResizer
        :show-expand="true"
        layout="vertical"
      ></MultipaneResizer>
      <div style="flex-grow: 1" class="c-pane">
        <ComponentPanel></ComponentPanel>
      </div>
    </Multipanel>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted} from 'vue'
import {useLanguage, useState, loadComponents} from '../use/state'
import http from '../use/http'
import ComponentList from '../components/chart/ComponentList.vue'
import ComponentPanel from '../components/chart/ComponentPanel.vue'
import ComponentFields from '../components/chart/ComponentFields.vue'
import ComponentControls from '../components/chart/ComponentControls.vue'
import Multipanel from '../components/common/multipanel/Multipanel.vue'
import MultipaneResizer from '../components/common/multipanel/MultipaneResizer.vue'
export default defineComponent({
  name: 'Chart',
  components: {
    ComponentList,
    ComponentPanel,
    ComponentControls,
    Multipanel,
    MultipaneResizer,
    ComponentFields
  },
  setup() {
    let language = useLanguage()
    let state = useState()
    let components: any = ref([])

    var com = ref(null)
    onMounted(async () => {
      let coms = []
      for (let c in state.components) {
        coms.push({type: c, com: new state.components[c](language.value)})
      }
      components.value = coms
    })

    // It makes no sense to make "versions" reactive
    return {components, com}
  }
})
</script>

<style lang="less">
.c-chart {
  height: 100%;
  > div {
    height: 100%;
    > div {
      height: 100%;
      &.c-pane.c-chart-vertical-panel {
        overflow: hidden;
      }
    }
  }
}
</style>
