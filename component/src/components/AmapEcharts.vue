<template>
  <div ref="echartsContainer" class="com-amap-echarts"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  watchEffect,
  nextTick
} from 'vue'
import * as echarts from 'echarts'

import {install} from './amap'
import '@amap/amap-jsapi-types'
// register renderers, components and charts
echarts.use([install])

import {Resize, Util} from '@datahu/core'
import {AMapUtil} from './AMapUtil'
export default defineComponent({
  name: 'AmapEcharts',
  props: ['option', 'theme', 'partRefresh', 'chart', 'pkg', 'view'],
  setup(props: any, {emit}) {
    var echartsContainer = ref(null)

    let mChart: echarts.EChartsType | null
    let amap: any
    let skipTimes = 0
    let render = async () => {
      let AMap = await AMapUtil.getAMap()
      renderChart(AMap)
    }
    let renderChart = (AMap: any) => {
      try {
        if (echartsContainer.value && !mChart) {
          mChart = echarts.init(echartsContainer.value as any, props.theme)
          mChart.on('click', (params) => {
            emit('click', params)
          })
          mChart.on('dblclick', (params) => {
            emit('dblclick', params)
          })
        }
        if (mChart) {
          if (props.option) {
            let opt = props.option
            opt = formatOptions(opt)
            if (skipTimes > 0) {
              skipTimes--
            } else {
              setOption(opt, mChart, AMap)
            }
          } else {
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
    let setOption = (opt: any, mChart: any, AMap: any) => {
      optionsQuene.push(opt)
      new Promise((resolve) => {
        setTimeout(() => {
          if (optionsQuene.length > 0) {
            mChart.setOption(
              optionsQuene[optionsQuene.length - 1],
              !props.partRefresh
            )
            optionsQuene = []
            amapLoaded(mChart, AMap)
          }
          resolve(true)
        }, 200)
      })
    }

    let amapLoaded = async (mChart: any, AMap: any) => {
      var amapComponent = mChart.getModel().getComponent('amap')
      // get the instance of AMap
      var _amap = amapComponent.getAMap()
      if (amap != _amap) {
        amap = _amap
        amap.on('moveend', () => {
          if (!props.view) {
            skipTimes++
            let center = amap.getCenter()
            props.chart!.option.amap.center = [center.lng, center.lat]
            props.pkg!.updateOption(props.chart)
          }
          skipTimes++
        })
        amap.on('zoomend', () => {
          if (!props.view) {
            skipTimes++
            props.chart!.option.amap.zoom = amap.getZoom()
            props.pkg!.updateOption(props.chart)
          }
        })
      }
      // add some controls provided by AMap.
      // amap.addControl(new AMap.Scale())
      // amap.addControl(new AMap.ToolBar())

      // add SatelliteLayer and RoadNetLayer to map
      // var satelliteLayer = new AMap.TileLayer.Satellite();
      // var roadNetLayer = new AMap.TileLayer.RoadNet();
      // amap.add([satelliteLayer, roadNetLayer]);
      // Add a marker to map
      // amap.add(
      //   new AMap.Marker({
      //     position: [110, 35]
      //   })
      // )
      // amapComponent.setEChartsLayerInteractive(false)
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
      watch(() => {
        return [props.option]
      }, render)
      render()
    })

    return {echartsContainer}
  }
})
</script>

<style lang="less">
.com-amap-echarts {
  width: 100%;
  height: 100%;
}
</style>
