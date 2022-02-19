<template>
  <div class="c-preview">
    <div class="c-preview-close" @click="state.preview = false">
      <icon type="close" />
    </div>
    <!-- 测试显示自动生成的预览图片功能 -->
    <div v-if="false" class="c-preview-image">
      <img :src="svg" />
    </div>
    <ChartPanel ref="panelRef" :chart="panel"></ChartPanel>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  watchEffect,
  nextTick,
  onMounted,
  Ref
} from 'vue'
import {
  useI18n,
  useState,
  useLanguage,
  findChartComponent
} from '../../use/state'
import http from '../../use/http'
import Icon from '../common/icon/Icon.vue'
import html2canvas from 'html2canvas'
import {ChartPanel, setContext} from '@datahu/component-base'

export default defineComponent({
  name: 'Preview',
  props: [],
  components: {ChartPanel, Icon},
  setup(props: any) {
    let state = useState()
    let language = useLanguage()
    let i18n = useI18n()
    setContext(state, i18n, language)

    let chart = state.pkg.getChart()

    let comClass = findChartComponent(chart.type)
    let panel = reactive({com: new comClass(language.value), item: chart})
    state.focusItem = panel
    state.root = panel
    let panelRef: Ref<any> = ref(null)

    let svg = ref('')
    let toPng = async () => {
      if (panelRef.value) {
        let canvas = await html2canvas(panelRef.value.$el, {scale: 0.5})
        var v = canvas.toDataURL('image/jpeg')
        state.pkg.setPreviewImage(v, 'auto')
        svg.value = v
      }
    }
    onMounted(() => {
      setTimeout(() => {
        toPng()
      }, 2000)
    })

    return {panel, state, panelRef, svg}
  }
})
</script>

<style lang="less">
.c-preview {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 100;
  background-color: white;
  overflow: overlay;
  min-width: 10px;
  min-height: 10px;
  .c-preview-image {
    position: absolute;
    z-index: 100000;
    top: 10px;
    left: 10px;
    border: 1px solid var(--border-color-base);
    background-color: white;
    > img {
      height: 150px;
    }
  }
  .c-preview-close {
    position: absolute;
    z-index: 100000;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    border-radius: 50%;
    padding: 10px;
    top: 10px;
    right: 10px;
    background-color: #35333355;
    border: 1px solid var(--border-color-base);

    svg {
      fill: white;
    }
    &:hover {
      background-color: white;
      svg {
        fill: #35333355;
      }
    }
  }
  > div.ant-tabs {
    height: 100%;
    .ant-tabs-bar {
      margin-bottom: 1px;
    }
    > div.ant-tabs-content {
      height: 100%;
    }
  }
}
</style>
