<template>
  <div
    class="com-simple-slicer"
    :class="['com-simple-slicer-' + chart.option.slicer.type]"
  >
    <div
      class="com-simple-slicer-slider"
      :class="{
        'com-simple-slicer-slider-vertical': chart.option.slicer.vertical
      }"
      v-if="isSlider"
      :style="optionAfterTheme.slicer.style"
    >
      <Slider
        v-model:value="innerValue"
        :tipFormatter="tipFormatter"
        :min="min.toDate ? min.toDate().getTime() : min"
        :max="max.toDate ? max.toDate().getTime() : max"
        :marks="marks"
        :range="isMultiple"
        :step="sliderStep"
        :style="sliderStyle"
        :vertical="chart.option.slicer.vertical"
        :tooltipVisible="chart.option.slicer.tooltipVisible"
        :reverse="chart.option.slicer.reverse"
      ></Slider>
    </div>
    <div
      class="com-simple-slicer-block"
      v-if="!isSlider"
      :style="optionAfterTheme.slicer.style"
    >
      <div v-if="chart.option.slicer.type == 'search'">
        <InputSearch
          :allow-clear="true"
          v-model:value="innerValue"
          :placeholder="chart.option.slicer.placeholder"
          @search="change"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'number'">
        <InputNumber
          :allow-clear="true"
          v-model:value="innerValue"
          :placeholder="chart.option.slicer.placeholder"
          @change="change"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'numberrange'">
        <Row>
          <Col :span="11">
            <InputNumber
              :allow-clear="true"
              v-model:value="innerValue[0]"
              :placeholder="chart.option.slicer.placeholders[0]"
              @change="change"
            />
          </Col>
          <Col class="c-number-range-split" :span="2">~</Col>
          <Col :span="11">
            <InputNumber
              :allow-clear="true"
              v-model:value="innerValue[1]"
              :placeholder="chart.option.slicer.placeholders[1]"
              @change="change"
            />
          </Col>
        </Row>
      </div>
      <div v-if="chart.option.slicer.type == 'select'">
        <Select
          show-search
          :allow-clear="true"
          v-model:value="innerValue"
          :placeholder="chart.option.slicer.placeholder"
          :options="selectOptions"
          @change="change"
        >
          <template #option="{label, value}">
            <span :aria-label="value" v-html="label"></span>
          </template>
        </Select>
      </div>
      <div v-if="chart.option.slicer.type == 'multipleselect'">
        <Select
          show-search
          mode="multiple"
          :allow-clear="true"
          v-model:value="innerValue"
          :placeholder="chart.option.slicer.placeholder"
          :options="selectOptions"
          @change="change"
        ></Select>
      </div>
      <div v-if="chart.option.slicer.type == 'date'">
        <DatePicker
          @change="change"
          :placeholder="chart.option.slicer.placeholder"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'month'">
        <MonthPicker
          @change="change"
          :placeholder="chart.option.slicer.placeholder"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'week'">
        <WeekPicker
          @change="change"
          :placeholder="chart.option.slicer.placeholder"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'hour'">
        <DatePicker
          :show-time="{format: 'HH'}"
          format="YYYY-MM-DD HH"
          @ok="change"
          :placeholder="chart.option.slicer.placeholder"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'minute'">
        <DatePicker
          :show-time="{format: 'HH:mm'}"
          format="YYYY-MM-DD HH:mm"
          @ok="change"
          :placeholder="chart.option.slicer.placeholder"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'second'">
        <DatePicker
          :show-time="{format: 'HH:mm:ss'}"
          format="YYYY-MM-DD HH:mm:ss"
          @ok="change"
          :placeholder="chart.option.slicer.placeholder"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'monthrange'">
        <RangePicker
          @change="change"
          format="YYYY-MM"
          :placeholder="chart.option.slicer.placeholders"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'daterange'">
        <RangePicker
          @change="change"
          :placeholder="chart.option.slicer.placeholders"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'hourrange'">
        <RangePicker
          :show-time="{format: 'HH'}"
          format="YYYY-MM-DD HH"
          @ok="change"
          :placeholder="chart.option.slicer.placeholders"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'minuterange'">
        <RangePicker
          :show-time="{format: 'HH:mm'}"
          format="YYYY-MM-DD HH:mm"
          @ok="change"
          :placeholder="chart.option.slicer.placeholders"
          v-model:value="innerValue"
        />
      </div>
      <div v-if="chart.option.slicer.type == 'secondrange'">
        <RangePicker
          @ok="change"
          :show-time="{format: 'HH:mm:ss'}"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="chart.option.slicer.placeholders"
          v-model:value="innerValue"
        />
      </div>
      <div
        v-if="
          chart.option.slicer.type == 'singlelist' ||
          chart.option.slicer.type == 'multiplelist'
        "
      >
        <div
          @click="slicerListItemClick(opt)"
          class="c-slicer-list-item"
          :class="[
            'c-slicer-list-item-' + (optionAfterTheme.slicer.itemLayout || 'h')
          ]"
          :style="slicerItemStyle(opt)"
          v-for="opt in selectOptions"
        >
          {{ opt.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Row,
  Col,
  Slider,
  InputSearch,
  InputNumber,
  Select,
  MonthPicker,
  WeekPicker,
  DatePicker,
  RangePicker
} from 'ant-design-vue'
import {
  ChartData,
  CodeExpression,
  FilterExpression,
  FilterType,
  Formatter,
  Formula,
  IFilterInfo,
  Util
} from '@datahu/core'
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  computed,
  Ref
} from 'vue'
import moment from 'moment'
export default defineComponent({
  name: 'SimpleSlicer',
  props: ['chart', 'data', 'pkg', 'view', 'optionAfterTheme'],
  components: {
    Row,
    Col,
    Slider,
    InputSearch,
    InputNumber,
    Select,
    MonthPicker,
    WeekPicker,
    DatePicker,
    RangePicker
  },
  setup(props, {emit}) {
    var container = ref(null)
    let chart = props.chart

    onMounted(() => {
      emit('mounted')
    })
    onUnmounted(() => {
      emit('unmounted')
    })

    let isTime = (): boolean => {
      return (
        [
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'mintuerange',
          'secondrange'
        ].indexOf(chart.option.slicer.type) >= 0
      )
    }

    let isSlider = computed(() => {
      return (
        [
          'number',
          'numberrange',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'mintuerange',
          'secondrange'
        ].indexOf(chart.option.slicer.type) >= 0 && chart.option.slicer.slider
      )
    })

    let dateUnit: Ref<any> = computed(() => {
      let type = chart.option.slicer.type
      if (type.startsWith('date')) {
        return 'd'
      }
      if (type.startsWith('month')) {
        return 'M'
      }
      if (type.startsWith('week')) {
        return 'w'
      }
      if (type.startsWith('hour')) {
        return 'h'
      }
      if (type.startsWith('minute')) {
        return 'm'
      }
      if (type.startsWith('second')) {
        return 's'
      }
      return ''
    })

    let getDefaultValue = () => {
      let v = chart.option.slicer.defaultValue
      if (v) {
        v = CodeExpression.runCode(v)
      }
      if (
        ['date', 'month', 'week', 'hour', 'mintue', 'second'].indexOf(
          chart.option.slicer.type
        ) >= 0
      ) {
        if (v) {
          return moment(v)
        } else {
          return null
        }
      }
      return v
    }
    let defaultValue = ref(getDefaultValue())

    let getDefaultValues = () => {
      let v = chart.option.slicer.defaultValues
      if (v) {
        v = CodeExpression.runCodes(v)
      }
      if (v && v.length > 0) {
        let array = []
        for (let item of v) {
          if (item !== null && item !== undefined && item != '') {
            array.push(item)
          }
          v = array
        }
      }
      if (
        [
          'monthrange',
          'daterange',
          'hourrange',
          'mintuerange',
          'secondrange'
        ].indexOf(chart.option.slicer.type) >= 0
      ) {
        if (v && v.length == 2 && v[0] && v[1]) {
          return [moment(v[0]), moment(v[1])]
        } else {
          return null
        }
      }
      return v
    }
    let defaultValues = ref(getDefaultValues())

    let change = (v: any) => {
      let chartData: ChartData = props.data!
      chartData.setFilter(v, (a: any, v: any) => {
        if (v) {
          let type = chart.option.slicer.type
          if (type == 'search') {
            return a ? a.indexOf(v) >= 0 : false
          } else if (
            type == 'select' ||
            type == 'singlelist' ||
            type == 'number'
          ) {
            return a == v
          } else if (type == 'multipleselect' || type == 'multiplelist') {
            if (v instanceof Array) {
              if (v.length == 0) {
                return true
              } else {
                return v.indexOf(a) >= 0
              }
            } else if (v instanceof String) {
              return a ? a.indexOf(v) >= 0 : false
            }
          } else if (type == 'date') {
            return moment(v).isSame(a, 'day')
          } else if (type == 'month') {
            return moment(v).isSame(a, 'month')
          } else if (type == 'week') {
            return moment(v).isSame(a, 'week')
          } else if (type == 'hour') {
            return moment(v).isSame(a, 'hour')
          } else if (type == 'minute') {
            return moment(v).isSame(a, 'minute')
          } else if (type == 'second') {
            return moment(v).isSame(a, 'second')
          } else if (type == 'monthrange') {
            if (v.length == 2) {
              return (
                moment(v[1]).isSameOrAfter(a, 'month') &&
                moment(v[0]).isSameOrBefore(a, 'month')
              )
            }
            return true
          } else if (type == 'daterange') {
            if (v.length == 2) {
              return (
                moment(v[1]).isSameOrAfter(a, 'day') &&
                moment(v[0]).isSameOrBefore(a, 'day')
              )
            }
            return true
          } else if (type == 'hourrange') {
            if (v.length == 2) {
              return (
                moment(v[1]).isSameOrAfter(a, 'hour') &&
                moment(v[0]).isSameOrBefore(a, 'hour')
              )
            }
            return true
          } else if (type == 'minuterange') {
            if (v.length == 2) {
              return (
                moment(v[1]).isSameOrAfter(a, 'minute') &&
                moment(v[0]).isSameOrBefore(a, 'minute')
              )
            }
            return true
          } else if (type == 'secondrange') {
            if (v.length == 2) {
              return (
                moment(v[1]).isSameOrAfter(a, 'second') &&
                moment(v[0]).isSameOrBefore(a, 'second')
              )
            }
            return true
          }
          if (type == 'numberrange') {
            if (v.length == 2) {
              return a >= v[0] && a <= v[1]
            }
            return true
          }
        }
        return true
      })
    }

    let selectOptions = computed(() => {
      let chartData: ChartData = props.data!
      if (chartData.mainField) {
        let row = chartData.getMainRowBeforeTempFilter()
        let options = Formula.distinct(row)
        let opts = []
        for (let o of options) {
          let label = o && o.toString ? o.toString() : o
          if (chartData.mainField.formatter) {
            label = Formatter.formatHtml(chartData.mainField.formatter, o)
          }
          opts.push({label: label, value: o})
        }
        return opts
      }
      return []
    })

    let min = computed(() => {
      let v = Formula.min(selectOptions.value, 'value')
      if (isTime()) {
        return moment(v)
      }
      return v
    })

    let max = computed(() => {
      let v = Formula.max(selectOptions.value, 'value')
      if (isTime()) {
        return moment(v)
      }
      return v
    })

    let isMultiple = computed(() => {
      return (
        [
          'multipleselect',
          'monthrange',
          'daterange',
          'hourrange',
          'mintuerange',
          'secondrange',
          'multiplelist',
          'numberrange'
        ].indexOf(chart.option.slicer.type) >= 0
      )
    })

    if (isMultiple.value) {
      if (defaultValues.value) {
        change(defaultValues.value)
      }
    } else {
      if (defaultValue.value) {
        change(defaultValue.value)
      }
    }

    let singleValue = ref(defaultValue.value)
    let multipleValue = ref(defaultValues.value)
    let innerValue = computed({
      get() {
        if (isMultiple.value) {
          if (isTime() && chart.option.slicer.slider) {
            let result = []
            if (multipleValue.value && multipleValue.value.length > 0) {
              for (let v of multipleValue.value) {
                if (v.toDate) {
                  result.push(v.toDate().getTime())
                } else {
                  result.push(v)
                }
              }
            }
            return result
          } else {
            return multipleValue.value
          }
        } else {
          if (isTime() && chart.option.slicer.slider) {
            return singleValue.value
              ? singleValue.value.toDate().getTime()
              : singleValue.value
          } else {
            return singleValue.value
          }
        }
      },
      set(v: any) {
        if (isTime() && chart.option.slicer.slider) {
          if (isMultiple.value) {
            let result: any = []
            if (v && v.length > 0) {
              for (let item of v) {
                result.push(moment(item))
              }
            }
            multipleValue.value = result
          } else {
            singleValue.value = moment(v)
          }
        } else {
          if (isMultiple.value) {
            multipleValue.value = v
          } else {
            singleValue.value = v
          }
        }
      }
    })

    let slicerItemStyle = (opt: any) => {
      if (
        opt.value == innerValue.value ||
        (isMultiple.value &&
          innerValue.value &&
          innerValue.value.indexOf &&
          innerValue.value.indexOf(opt.value) >= 0)
      ) {
        return props.optionAfterTheme.slicer.selectedItemStyle
      } else {
        return props.optionAfterTheme.slicer.itemStyle
      }
    }
    let slicerListItemClick = (opt: any) => {
      if (isMultiple.value) {
        if (multipleValue.value.indexOf(opt.value) >= 0) {
          multipleValue.value.splice(multipleValue.value.indexOf(opt.value), 1)
        } else {
          multipleValue.value.push(opt.value)
        }
        change(multipleValue.value)
      } else {
        if (singleValue.value == opt.value) {
          singleValue.value = null
        } else {
          singleValue.value = opt.value
        }
        change(singleValue.value)
      }
    }

    let tipFormatter = (value: any) => {
      let chartData: ChartData = props.data!
      if (chartData.mainField && chartData.mainField.formatter) {
        if (isTime()) {
          if (value && value.toDate) {
            return Formatter.formatHtml(
              chartData.mainField.formatter,
              value.toDate()
            )
          }
          if (!(value instanceof Date)) {
            return Formatter.formatHtml(
              chartData.mainField.formatter,
              moment(value).toDate()
            )
          }
        }
        return Formatter.formatHtml(chartData.mainField.formatter, value)
      } else {
        if (value && value.toString) {
          return value.toString()
        } else {
          return value
        }
      }
    }

    let addTimeUnitMarks = (unit: any, text: string, markObj: any) => {
      let start = moment(min.value).startOf(unit)
      if (start.isBefore(min.value)) {
        start = start.add(1, unit)
      }
      let end = max.value
      while (true) {
        if (start.isAfter(end)) {
          break
        }
        let unitV = start.get(unit == 'd' ? 'D' : unit)
        if (!markObj[start.toDate().getTime()]) {
          markObj[start.toDate().getTime()] =
            (unit == 'M' ? unitV + 1 : unitV) + text
        }
        start = start.add(1, unit)
      }
    }

    let marks = computed(() => {
      let markObj: any = {}
      if (isTime()) {
        if (chart.option.slicer.showMinMark) {
          markObj[min.value.toDate().getTime()] = tipFormatter(
            min.value.toDate()
          )
        }
        let v = chart.option.slicer.marks
        if (v) {
          v = CodeExpression.runCodes(v)
        }
        if (v && v.length > 0) {
          for (let item of v) {
            if (item !== null && item !== undefined && item != '') {
              markObj[moment(item).toDate().getTime()] = tipFormatter(
                moment(item).toDate()
              )
            }
          }
        }
        if (chart.option.slicer.showMaxMark) {
          markObj[max.value.toDate().getTime()] = tipFormatter(
            max.value.toDate()
          )
        }
        if (
          chart.option.slicer.showYearMark &&
          [
            'date',
            'month',
            'hour',
            'minute',
            'second',
            'monthrange',
            'daterange',
            'hourrange',
            'minuterange',
            'secondrange'
          ].indexOf(chart.option.slicer.type) >= 0
        ) {
          addTimeUnitMarks('y', '年', markObj)
        }
        if (
          chart.option.slicer.showMonthMark &&
          [
            'date',
            'month',
            'hour',
            'minute',
            'second',
            'monthrange',
            'daterange',
            'hourrange',
            'minuterange',
            'secondrange'
          ].indexOf(chart.option.slicer.type) >= 0
        ) {
          addTimeUnitMarks('M', '月', markObj)
        }
        if (
          chart.option.slicer.showDayMark &&
          [
            'date',
            'hour',
            'minute',
            'second',
            'daterange',
            'hourrange',
            'minuterange',
            'secondrange'
          ].indexOf(chart.option.slicer.type) >= 0
        ) {
          addTimeUnitMarks('d', '日', markObj)
        }
        if (
          chart.option.slicer.showHourMark &&
          [
            'hour',
            'minute',
            'second',
            'hourrange',
            'minuterange',
            'secondrange'
          ].indexOf(chart.option.slicer.type) >= 0
        ) {
          addTimeUnitMarks('h', '时', markObj)
        }
        if (
          chart.option.slicer.showHourMark &&
          ['minute', 'second', 'minuterange', 'secondrange'].indexOf(
            chart.option.slicer.type
          ) >= 0
        ) {
          addTimeUnitMarks('m', '分', markObj)
        }
        if (
          chart.option.slicer.showWeekMark &&
          ['week'].indexOf(chart.option.slicer.type) >= 0
        ) {
          addTimeUnitMarks('w', '周', markObj)
        }
      } else {
        if (chart.option.slicer.showMinMark) {
          markObj[min.value] = tipFormatter(min.value)
        }
        let v = chart.option.slicer.marks
        if (v) {
          v = CodeExpression.runCodes(v)
        }
        if (v && v.length > 0) {
          for (let item of v) {
            if (item !== null && item !== undefined && item != '') {
              markObj[item] = tipFormatter(item)
            }
          }
        }
        if (chart.option.slicer.showMaxMark) {
          markObj[max.value] = tipFormatter(max.value)
        }
      }
      return markObj
    })

    let sliderStep = computed(() => {
      if (isTime()) {
        return moment
          .duration(chart.option.slicer.step, dateUnit.value)
          .asMilliseconds()
      } else {
        return chart.option.slicer.step
      }
    })

    let sliderStyle = computed(() => {
      let style: any = {}
      if (
        chart.option.slicer.stepWidth &&
        chart.option.slicer.stepWidth != 'auto'
      ) {
        let stepWidth = parseFloat(chart.option.slicer.stepWidth)
        let width = 0
        if (isTime()) {
          width =
            (max.value.diff(min.value, dateUnit.value) /
              chart.option.slicer.step) *
            stepWidth
        } else {
          width =
            ((max.value - min.value) / chart.option.slicer.step) * stepWidth
        }
        if (chart.option.slicer.vertical) {
          style.height = width + 48 + 'px'
        } else {
          style.width = width + 48 + 'px'
        }
      }
      return style
    })

    /** start 动画 */
    // 数组元素循环
    let arrayLoop = (animation: any, v: any, call: Function) => {
      if (v == null || v == undefined) {
        v = -1
      } else {
        for (let i = 0; i < selectOptions.value.length; i++) {
          if (selectOptions.value[i].value === v) {
            v = i
            break
          }
        }
      }
      let start = 0
      let end = selectOptions.value.length - 1

      return numberLoop(animation, v, start, end, call)
    }

    // 数字格式循环
    let numberLoop = (
      animation: any,
      v: number | null,
      start: number,
      end: number,
      call: Function
    ) => {
      let startIndex = start - 1
      if (end <= start) {
        return false
      }
      if (v != null && v != undefined) {
        startIndex = v
      }
      let currentIndex = startIndex
      if (currentIndex < start) {
        if (animation.inverse) {
          currentIndex = end
        } else {
          currentIndex = start
        }
      } else {
        if (animation.inverse) {
          currentIndex -= animation.steps
        } else {
          currentIndex += animation.steps
        }
        if (currentIndex > end || currentIndex < start) {
          if (animation.loop) {
            // 开启了循环，
            currentIndex =
              currentIndex < start
                ? end + currentIndex - start + 1
                : currentIndex - end - 1 + start
          } else {
            // 已到结束位置， 停止
            return false
          }
        }
      }
      call(currentIndex, currentIndex - startIndex)
      return true
    }
    // 时间格式
    let timeLoop = (animation: any, v: any, unit: string, call: Function) => {
      let startDate = min.value
      let endDate = max.value

      let startIndex = -1
      if (v) {
        startIndex = moment(v).diff(moment(startDate), unit as any)
      }

      let duration = moment(endDate).diff(moment(startDate), unit as any)
      let start = 0
      let end = duration
      return numberLoop(
        animation,
        startIndex,
        start,
        end,
        (currentIndex: number, changeIndex: number) => {
          console.log('time loop', startDate, currentIndex, unit, changeIndex)
          call(moment(startDate).add(currentIndex, unit as any), changeIndex)
        }
      )
    }

    let setNextValue = (animation: any) => {
      let type = chart.option.slicer.type
      if (type == 'search' || type == 'select' || type == 'singlelist') {
        return arrayLoop(animation, innerValue.value, (index: number) => {
          innerValue.value = selectOptions.value[index].value
          change(innerValue.value)
        })
      } else if (type == 'multipleselect' || type == 'multiplelist') {
        return arrayLoop(
          animation,
          innerValue.value && innerValue.value.length > 0
            ? innerValue.value[0]
            : null,
          (index: number) => {
            innerValue.value = [selectOptions.value[index].value]
            change(innerValue.value)
          }
        )
      } else if (type == 'number') {
        let v: any = innerValue.value ? innerValue.value : null
        return numberLoop(
          animation,
          v,
          min.value,
          max.value,
          (index: number) => {
            innerValue.value = index
            change(innerValue.value)
          }
        )
      } else if (type == 'numberrange') {
        let start: any =
          innerValue.value && innerValue.value.length >= 1
            ? innerValue.value[0]
            : null
        let end: any =
          innerValue.value && innerValue.value.length == 2
            ? innerValue.value[1]
            : null
        return numberLoop(
          animation,
          start,
          min.value,
          max.value,
          (index: number, changeIndex: number) => {
            innerValue.value = [
              index,
              end == null ? index + changeIndex : end + changeIndex
            ]
            change(innerValue.value)
          }
        )
      } else if (
        type == 'date' ||
        type == 'month' ||
        type == 'week' ||
        type == 'hour' ||
        type == 'minute' ||
        type == 'second'
      ) {
        let v: any = innerValue.value ? innerValue.value : null
        return timeLoop(animation, v, dateUnit.value, (time: moment.Moment) => {
          innerValue.value = time
          change(innerValue.value)
        })
      } else if (
        type == 'monthrange' ||
        type == 'daterange' ||
        type == 'monthrange' ||
        type == 'weekrange' ||
        type == 'hourrange' ||
        type == 'minuterange' ||
        type == 'secondrange'
      ) {
        let start: any =
          innerValue.value && innerValue.value.length >= 1
            ? innerValue.value[0]
            : null
        let end: any =
          innerValue.value && innerValue.value.length == 2
            ? innerValue.value[1]
            : null
        return timeLoop(
          animation,
          start,
          dateUnit.value,
          (time: moment.Moment, changeIndex: number) => {
            innerValue.value = [
              time,
              end == null
                ? time.add(changeIndex, dateUnit.value)
                : end.add(changeIndex, dateUnit.value)
            ]
            change(innerValue.value)
          }
        )
      }
    }

    let running = false
    let initAnimation = () => {
      let animation = props.chart.option.animation
      let runAnimation = () => {
        if (
          props.chart.option.animation &&
          props.chart.option.animation._enabled
        ) {
          if (!running) {
            running = true
            setTimeout(() => {
              if (setNextValue(animation)) {
                running = false
                runAnimation()
              } else {
                running = false
              }
            }, animation.playInterval)
          }
        } else {
          running = false
        }
      }
      runAnimation()
    }

    initAnimation()

    watch(() => {
      return props.chart.option.animation._enabled
    }, initAnimation)

    /** end 动画 */

    return {
      chart,
      change,
      isMultiple,
      selectOptions,
      defaultValue,
      defaultValues,
      slicerItemStyle,
      slicerListItemClick,
      innerValue,
      isSlider,
      tipFormatter,
      min,
      max,
      marks,
      sliderStep,
      sliderStyle
    }
  }
})
</script>

<style lang="less">
.com-simple-slicer {
  width: 100%;
  height: 100%;

  &.com-simple-slicer-singlelist,
  &.com-simple-slicer-multiplelist {
    overflow: overlay;
    .com-simple-slicer-block {
      > div {
        height: 100%;
        > div {
          width: auto;
          height: auto;
          border-width: 0px;
          margin: 0px;
        }
      }
    }
  }
  .com-simple-slicer-slider {
    overflow: overlay;
    padding: 24px;
    width: 100%;
    height: 100%;

    .ant-slider {
      .ant-slider-rail {
        background-color: #d5d5d5;
      }
      .ant-slider-track {
        background-color: var(--primary-color);
      }
      .ant-slider-handle {
        background-color: #ffffff;
      }
    }
  }
  .com-simple-slicer-block {
    height: 100%;
    > div {
      height: 100%;
      > div {
        width: 100%;
        height: 100%;
        border-width: 0px;
        margin: 0px;
      }
      > span {
        height: 100%;
        width: 100%;
        border-width: 0px;
      }
      .c-number-range-split {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      div,
      span,
      input,
      svg,
      .ant-input-affix-wrapper .ant-input-suffix {
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        background-color: transparent;
      }

      .ant-select-single:not(.ant-select-customize-input)
        .ant-select-selector
        .ant-select-selection-search-input {
        height: 100%;
      }
      .ant-select-selector,
      .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        width: 100%;
        height: 100%;
        border-width: 0px;
        background-color: transparent;
      }
      .ant-select-arrow {
        top: 50%;
        width: 1em;
        height: 1em;
      }
      .ant-select-single {
        &:hover {
          .ant-select-arrow {
            display: none;
          }
        }
      }
      .ant-input-number {
        width: 100%;
        height: 100%;
        border-width: 0px;

        .ant-input-number-input-wrap {
          height: 100%;
          > input {
            height: 100%;
            text-align: center;
          }
        }
      }

      .ant-select-selection-item,
      .ant-select-selection-placeholder {
        display: flex;
        align-items: center;
        height: 100%;
      }
      .ant-select-multiple {
        .ant-select-selection-item {
          height: auto;
        }
      }

      .ant-input,
      .ant-input-search {
        &:hover {
          border-right-width: 0px !important;
        }
      }

      .ant-calendar-picker {
        width: 100% !important;
        > div {
          height: 100%;
        }
        > span {
          height: 100%;
        }
        .ant-input {
          height: 100%;
          border-width: 0px;
        }
        &:hover {
          .anticon-calendar {
            display: none;
          }
        }
        .ant-calendar-range-picker-separator {
          vertical-align: initial;
        }
      }
    }
  }
  > .ant-row,
  table {
    width: 100%;
    height: 100%;
  }

  div.c-slicer-list-item {
    cursor: pointer;
    width: auto;
    height: auto;
  }
  .c-slicer-list-item-h {
    display: inline-block;
  }
  .c-slicer-list-item-v {
    display: block;
  }
}
</style>
