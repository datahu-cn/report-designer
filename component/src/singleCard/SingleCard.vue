<template>
  <div class="com-single-card" :style="style">
    <div
      class="com-single-card-item"
      v-for="item in items"
      :style="item.itemStyle"
    >
      <div
        class="com-single-card-item-label"
        v-if="item.showLabel"
        :style="item.labelStyle"
      >
        {{ item.label }}
      </div>
      <div
        class="com-single-card-item-value"
        v-html="item.value"
        :style="item.valueStyle"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ChartData,
  CodeExpression,
  FilterExpression,
  FilterType,
  Formatter,
  Formula,
  IFieldInfo,
  IFilterInfo,
  Util
} from '@datahu/core'
import {defineComponent, ref, onMounted, watch, computed} from 'vue'
import moment from 'moment'
export default defineComponent({
  name: 'SimpleSlicer',
  props: ['chart', 'data', 'pkg', 'view', 'optionAfterTheme'],
  setup(props) {
    let chart = props.chart

    let getCardItem = (index: number) => {
      let opt = props.optionAfterTheme
      if (opt.cardItems) {
        if (opt.cardItems.length > index) {
          return opt.cardItems[index]
        }
        return opt.cardItems[opt.cardItems.length - 1]
      } else {
        return {
          showLabel: false,
          labelPosition: 'top',
          valueStyle: {},
          labelStyle: {}
        }
      }
    }

    let style = computed(() => {
      let opt = props.optionAfterTheme
      if (opt.card.layout == 'v') {
        let style: any = {}
        Util.cloneTo(opt.card.style, style)
        style.flexFlow = 'column'
        let justifyContent = style.justifyContent
        style.justifyContent = style.alignItems
        style.alignItems = justifyContent
        return style
      } else {
        return opt.card.style
      }
    })

    let labelStyle = (opt: any) => {
      let style: any = {}
      if (opt.showLabel) {
        Util.cloneTo(opt.labelStyle, style)
        if (opt.labelPosition == 'top') {
          style.order = -1
        } else if (opt.labelPosition == 'bottom') {
          style.order = 1
        } else if (opt.labelPosition == 'left') {
          style.order = -1
        } else {
          style.order = 1
        }
      }
      return style
    }

    let valueStyle = (opt: any) => {
      return opt.valueStyle
    }

    let itemStyle = (opt: any) => {
      let style: any = {}
      Util.cloneTo(opt.itemStyle, style)
      if (opt.showLabel) {
        if (opt.labelPosition == 'top') {
          style.flexFlow = 'column'
        } else if (opt.labelPosition == 'bottom') {
          style.flexFlow = 'column'
        } else if (opt.labelPosition == 'left') {
          style.flexFlow = 'row'
        } else {
          style.flexFlow = 'row'
        }
      }
      return style
    }

    let items = computed(() => {
      let chartData: ChartData = props.data!
      let items: Array<any> = []
      let index = 0
      if (chartData.mainField) {
        let fields: Array<IFieldInfo> = [
          ...chartData.mainFields,
          ...chartData.fields
        ]
        for (let field of fields) {
          let v = chartData.getRow(field)
          let itemOpt = getCardItem(index)
          let item: any = {
            label: chartData.getFieldName(field),
            showLabel: itemOpt.showLabel,
            itemStyle: itemStyle(itemOpt),
            labelStyle: labelStyle(itemOpt),
            valueStyle: valueStyle(itemOpt)
          }
          if (v && v.length > 0) {
            item.value = Formatter.formatHtml(field.formatter, v[0])
          } else {
            item.value = chart.option.card.emptyText
          }
          items.push(item)
          index++
        }
      }
      return items
    })

    return {chart, style, items}
  }
})
</script>

<style lang="less">
.com-single-card {
  width: 100%;
  height: 100%;
}
</style>
