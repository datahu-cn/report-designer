<template>
  <div class="c-echarts">
    <icon type="nodata" v-if="!option && !disableSkeleton" />

    <div ref="echartsContainer" class="com-echarts"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, watch, watchEffect} from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import {Resize, Util} from '@datahu/core'
import {ChartUtil} from '../base'
export default defineComponent({
  name: 'Echarts',
  props: ['option', 'theme', 'partRefresh', 'disableSkeleton'],
  setup(props: any, {emit}) {
    var echartsContainer = ref(null)

    let mChart: echarts.EChartsType | null
    let render = () => {
      try {
        if (echartsContainer.value && !mChart) {
          mChart = echarts.init(echartsContainer.value as any, props.theme)
          mChart.on('click', (params) => {
            emit('click', params)
          })
          mChart.on('dblclick', (params) => {
            emit('dblclick', params)
          })
          emit('ready', mChart)
        }
        if (mChart) {
          if (props.option) {
            let opt = props.option
            opt = formatOptions(opt)
            setOption(opt, mChart)
          } else if (!props.disableSkeleton) {
            mChart.clear()
          }
        }
      } catch (e) {
        console.error(e)
        if (mChart != null) {
          mChart.dispose()
          mChart = null
        }
      }
    }

    let optionsQuene: Array<any> = []
    let setOption = async (opt: any, mChart: any) => {
      optionsQuene.push(opt)
      await ChartUtil.registerAllMaps(opt)
      new Promise((resolve) => {
        setTimeout(() => {
          if (optionsQuene.length > 0) {
            mChart.setOption(
              optionsQuene[optionsQuene.length - 1],
              !props.partRefresh
            )
            optionsQuene = []
          }
          resolve(true)
        }, 200)
      })
    }

    let deleteNullProperty = (obj: any, key: string) => {
      if (
        obj[key] === null ||
        obj[key] === undefined ||
        obj[key].length === 0 ||
        obj[key] === ''
      ) {
        delete obj[key]
      }
    }
    let deleteNullProperties = (obj: any) => {
      if (obj) {
        for (let key in obj) {
          deleteNullProperty(obj, key)
        }
      }
    }

    let formatVisualMap = (map: any) => {
      if (map.type == 'piecewise') {
      } else if (map.type == 'continuous') {
        delete map.splitNumber
        delete map.pieces
      }

      if (map.pieces && map.pieces.length > 0) {
        delete map.min
        delete map.max
        delete map.splitNumber
        delete map.inRange
        delete map.outOfRange
      }
    }

    let deleteEmptyProperties = (obj: any) => {
      if (typeof obj == 'object' && !(obj instanceof Date)) {
        if (obj instanceof Array) {
          let removed = []
          for (let item of obj) {
            if (item && item._enabled === false) {
              removed.push(item)
            } else {
              deleteEmptyProperties(item)
            }
          }
          for (let r of removed) {
            obj.splice(obj.indexOf(r), 1)
          }
        } else {
          for (let key in obj) {
            if (obj[key] && obj[key]._enabled === false) {
              delete obj[key]
            } else {
              deleteEmptyProperties(obj[key])
              deleteNullProperty(obj, key)
            }
          }
        }
      }
    }

    let formatOptions = (opt: echarts.EChartsOption) => {
      deleteEmptyProperties(opt)
      if (opt.visualMap) {
        if ((opt.visualMap as any).length >= 0) {
          for (let map of opt.visualMap as []) {
            formatVisualMap(map as echarts.VisualMapComponentOption)
          }
        } else {
          formatVisualMap(opt.visualMap as echarts.VisualMapComponentOption)
        }
      }

      return opt
    }

    onMounted(() => {
      render()

      Resize.addResizeListener(echartsContainer.value, () => {
        if (mChart != null) mChart.resize()
      })
      watchEffect(() => {
        console.log('watchEffect')
        render()
      })
    })

    return {echartsContainer}
  }
})
</script>

<style lang="less">
.c-echarts {
  width: 100%;
  height: 100%;
  position: relative;
  .com-echarts {
    width: 100%;
    height: 100%;
  }
  .c-icon-nodata {
    position: absolute;
    padding: 20px;
    width: 100%;
    height: 100%;
    svg {
      width: 90%;
      height: 90%;
      max-width: 200px;
      max-height: 200px;
    }
  }
}
</style>
