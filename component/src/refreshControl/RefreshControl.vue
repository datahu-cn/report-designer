<template>
  <div class="com-refresh-control" v-if="show">
    <Popover title="" trigger="click">
      <template #content>
        <div class="com-refresh-control-detail">
          <div v-for="(schedule, index) in schedules" :key="index">
            <div>
              <div class="com-refresh-control-detail-header">
                <span>刷新计划：</span>
                <span v-if="schedule.refreshWhenPageLoad">立即</span>
                <span v-if="schedule.interval">
                  每隔{{ schedule.interval }}ms
                </span>
                <span v-if="schedule.manual">
                  <Button
                    @click="handleManualRefresh(schedule)"
                    :disabled="loading"
                    shape="circle"
                    size="small"
                    type="block"
                  >
                    <template #icon><ComponentIcon type="refresh" /></template>
                  </Button>
                </span>
              </div>
              <div class="com-refresh-control-detail-body">
                <small v-for="table in schedule.tables" :key="table.id">
                  {{ table.alias || table.name }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="com-refresh-control-btn" type="primary">
        <span v-if="!loading">{{ minInterval }}s</span>
        <Spin v-if="loading" />
      </div>
    </Popover>
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
  Util,
  TableCacheType
} from '@datahu/core'
import {ComponentIcon} from '@datahu/component-base'
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  computed
} from 'vue'
import moment from 'moment'
import {Progress, Popover, Button, Spin} from 'ant-design-vue'
export default defineComponent({
  name: 'SimpleSlicer',
  props: ['chart', 'language', 'pkg', 'view', 'optionAfterTheme'],
  components: {Progress, Popover, Button, Spin, ComponentIcon},
  setup(props, {emit}) {
    let timer = null
    onMounted(() => {
      emit('mounted')
    })
    onUnmounted(() => {
      if (timer) {
        clearTimeout(timer)
      }
      emit('unmounted')
    })
    let chart = props.chart
    let opt = props.optionAfterTheme

    let show = computed(() => {
      return props.optionAfterTheme.refreshPanel.show
    })

    let loading = ref(false)
    let seconds = ref(0)

    let scheduleIntervals = ref({})

    let schedules = computed(() => {
      let scheduleOpts = []
      for (let item of props.optionAfterTheme.refreshSchedules) {
        if (item._enabled && item.tables && item.tables.length > 0) {
          let scheduleOpt = {
            interval: item.interval,
            manual: item.manual,
            refreshWhenPageLoad: item.refreshWhenPageLoad
          }
          let hasAll = item.tables.indexOf('_all_') >= 0
          let tables = []
          if (hasAll) {
            for (let table of props.pkg.definition.tables) {
              if (
                table.cacheType != TableCacheType.Disabled &&
                table.cacheType != TableCacheType.Enabled
              ) {
                tables.push(table)
              }
            }
          } else {
            for (let tableId of item.tables) {
              for (let table of props.pkg.definition.tables) {
                if (
                  table.cacheType != TableCacheType.Disabled &&
                  table.cacheType != TableCacheType.Enabled &&
                  !table.isFormula &&
                  table.id == tableId
                ) {
                  tables.push(table)
                }
              }
            }
          }

          scheduleOpt.tables = tables
          if (scheduleOpt.interval > 0) {
            scheduleOpt.countInterval = scheduleOpt.interval
          }
          scheduleOpts.push(scheduleOpt)
        }
      }
      resetMinInterval(scheduleOpts)
      return scheduleOpts
    })

    let runRefresh = async (schedule: any) => {
      loading.value = true
      try {
        let run = () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve()
            }, 2000)
          })
        }
        if (
          !props.view &&
          props.optionAfterTheme.refreshPanel.disabledWhenDesign
        ) {
          run()
        } else {
          await props.pkg.refreshTableData(
            schedule.tables,
            props.language,
            true
          )
        }
        await run()
      } catch (e) {
        console.error('刷新数据失败', e)
      }
      if (schedule.interval > 0) {
        schedule.countInterval = schedule.interval
      }
      loading.value = false
    }

    let handleManualRefresh = async (schedule: any) => {
      await runRefresh(schedule)
      resetMinInterval(schedules.value)
    }

    let minInterval = ref(0)
    let resetMinInterval = (schedules) => {
      let min = 0
      for (let schedule of schedules) {
        if (schedule.interval > 0) {
          if (min == 0 || schedule.countInterval < min) {
            min = schedule.countInterval
          }
        }
      }
      minInterval.value = min
    }

    let timerRun = async () => {
      for (let schedule of schedules.value) {
        if (schedule.interval > 0) {
          if (schedule.countInterval <= 1) {
            await runRefresh(schedule)
          } else {
            schedule.countInterval--
          }
        }
      }
      resetMinInterval(schedules.value)
      timer = setTimeout(timerRun, 1000)
    }

    let init = async () => {
      for (let schedule of schedules.value) {
        if (schedule.refreshWhenPageLoad > 0) {
          await runRefresh(schedule)
        }
      }
      timer = setTimeout(timerRun, 1000)
    }

    init()

    return {chart, show, schedules, loading, handleManualRefresh, minInterval}
  }
})
</script>

<style lang="less">
.com-refresh-control {
  width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
  .com-refresh-control-btn {
    cursor: pointer;
    width: auto;
  }
}
.com-refresh-control-detail {
  > div {
    > div {
      padding: 10px;
      border-bottom: 1px solid #f0f0f0;
      .com-refresh-control-detail-header {
        > span {
          display: inline-block;
          margin: 5px 7px;
        }
      }
      .com-refresh-control-detail-body {
        padding-left: 10px;
        > small {
          display: block;
        }
      }
    }
  }
}
</style>
