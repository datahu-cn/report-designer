<template>
  <div class="com-data-table">
    <vxe-grid
      ref="vxeTable"
      v-if="!loading"
      v-bind="gridOptions"
      v-on="gridEvents"
    >
      <template #cellTemplate="cellData">
        <span v-html="colFormatter(cellData)"></span>
      </template>
      <template #cellFooterTemplate="cellData">
        <span v-html="colFooterFormatter(cellData)"></span>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts">
import {
  ChartData,
  CodeExpression,
  Formula,
  Util,
  IFieldInfo,
  DataMergeType,
  Formatter
} from '@datahu/core'
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  computed,
  nextTick,
  Ref,
  watchEffect,
  ComputedRef,
  reactive
} from 'vue'
import {ColumnStyleComponentOption} from './index'

interface IDataTableColumn {
  type: string
  title: string
  field: string
  order: number
  fieldIndex: number
  opt: ColumnStyleComponentOption
  filters: Array<any>
  treeNode?: boolean
  fieldFormatter: string
  slots: any
  children?: Array<IDataTableColumn>
}
export default defineComponent({
  name: 'GridLayout',
  props: ['chart', 'view', 'data'],
  setup(props) {
    let chart = props.chart

    let getColOption = (colName: string): ColumnStyleComponentOption => {
      let defaultOpt: any = null
      let selfOpt: any = null
      for (let opt of chart.option.columnStyles) {
        if (opt.fields && opt.fields.indexOf('__all__') >= 0) {
          defaultOpt = opt
        }
        if (opt.fields && opt.fields.indexOf(colName) >= 0) {
          selfOpt = opt
        }
      }
      if (selfOpt) {
        return selfOpt
      }
      return defaultOpt || new ColumnStyleComponentOption()
    }

    let columns: ComputedRef<Array<IDataTableColumn>> = computed(() => {
      let cols = []
      if (
        props.data!.getDataset().data &&
        props.data!.getDataset().data.length > 0
      ) {
        if (chart.option.tableStyle.showSeqence) {
          let col: any = {type: 'seq', field: ''}
          let opt = getColOption('__seq__')
          col.opt = opt
          col.order = opt.order
          cols.push(col)
        }
        for (let j = 0; j < props.data!.getDataset().data[0].length; j++) {
          let col = props.data!.getDataset().data[0][j]
          let tcol = {
            title: col,
            field: col,
            fieldIndex: j
          } as any
          let opt = getColOption(tcol.field)
          tcol.opt = opt
          tcol.order = opt.order
          tcol.width = opt.width
          tcol.treeNode = false
          tcol.sortable = opt.sortable
          tcol.fixed = opt.fixed
          tcol.showOverflow = opt.showOverflow
          if (opt.cellType == 'html') {
            tcol.type = 'html'
          }
          let field: IFieldInfo | null = props.data!.getFieldByDatasetIndex(
            tcol.fieldIndex
          )
          if (field && field.formatter) {
            tcol.fieldFormatter = field.formatter
          }
          cols.push(tcol)
        }
      }
      cols = Util.orderBy(cols, 'order', false)
      return cols
    })

    let getCol = (colName: string) => {
      let column: any = null
      for (let col of columns.value) {
        if (col.field == colName) {
          column = col
          break
        }
      }
      return column
    }

    let groupFields: Ref<Array<string>> = ref([])

    let rowData: ComputedRef<Array<any>> = computed(() => {
      let data: Array<any> = []
      if (
        props.data!.getDataset().data &&
        props.data!.getDataset().data.length > 0
      ) {
        for (let i = 1; i < props.data!.getDataset().data.length; i++) {
          let row: any = {}
          let arr = props.data!.getDataset().data[i]
          for (let j = 0; j < props.data!.getDataset().data[0].length; j++) {
            let col = props.data!.getDataset().data[0][j]
            row[col] = arr[j]
          }
          data.push(row)
        }
        if (data.length > 0) {
          for (let col of columns.value) {
            if (col.opt.filter) {
              col.filters = []
              let distincts = Formula.distinct(data, col.field)
              let index = 0
              for (let v of distincts) {
                if (index < 100) {
                  col.filters.push({label: v, value: v})
                } else {
                  break
                }
                index++
              }
            }
          }
        }
      }
      return data
    })

    let groupTable = (data: Array<any>) => {
      groupFields.value = []
      if (chart.option.tableGroup.type == 'rowGroup') {
        let groupField = chart.option.tableGroup.groupField
        if (groupField && groupField.length > 0) {
          let existGroupFields: Array<any> = []
          for (let f of groupField) {
            for (let col of columns.value) {
              if (col.field == f) {
                existGroupFields.push(col.field)
              }
            }
          }
          if (existGroupFields.length > 0) {
            groupFields.value = existGroupFields
            let groupTableRow = (
              groupIndex: number,
              data: Array<any>,
              children: Array<any>,
              existGroupFields: Array<string>
            ) => {
              let gField = existGroupFields[groupIndex]
              let groupData = Util.groupBy(data, gField)
              for (let g of groupData) {
                let groupRow: any = {[gField]: g[0][gField], __children: []}
                children.push(groupRow)
                if (groupIndex < existGroupFields.length - 1) {
                  groupTableRow(
                    groupIndex + 1,
                    g,
                    groupRow.__children,
                    existGroupFields
                  )
                } else {
                  groupRow.__children = g
                }
                for (let col of columns.value) {
                  if (col.field != gField) {
                    let mergeValue = getColMergeValue(col, groupRow.__children)
                    groupRow[col.field] = mergeValue
                  }
                }
              }
            }
            let rows: Array<any> = []
            groupTableRow(0, data, rows, existGroupFields)

            return rows
          }
        }
      } else if (chart.option.tableGroup.type == 'tree') {
        let treeParentField = chart.option.tableGroup.treeParentField
        let treeField = chart.option.tableGroup.treeField
        let hasParentField = false,
          hasField = false
        for (let col of columns.value) {
          if (col.field == treeParentField) {
            hasParentField = true
          }
          if (col.field == treeField) {
            hasField = true
          }
        }
        if (treeField != treeParentField && hasParentField && hasField) {
          groupFields.value = [treeField, treeParentField]
          let roots = []
          let buildTree = (parent: any) => {
            let key = parent[treeField]
            parent.__children = []
            for (let row of data) {
              if (row[treeParentField] == key) {
                parent.__children.push(row)
                buildTree(row)
              }
            }
          }
          for (let row of data) {
            let parent = row[treeParentField]
            let hasParent = false
            for (let sub of data) {
              if (parent == sub[treeField]) {
                hasParent = true
                break
              }
            }
            if (hasParentField) {
              buildTree(row)
              roots.push(row)
            }
          }
          return roots
        }
      }
      return data
    }

    let tableData: ComputedRef<Array<any>> = computed(() => {
      let data = rowData.value
      if (data && data.length > 0) {
        data = groupTable(data)
      }
      return data
    })

    let getFilters = (col: any) => {
      if (col.opt.filter) {
        if (!col.filters) {
          col.filters = []
          let distincts = Formula.distinct(tableData.value, col.field)
          let index = 0
          for (let v of distincts) {
            if (index < 100) {
              col.filters.push({label: v, value: v})
            } else {
              break
            }
            index++
          }
        }
        return col.filters
      } else {
        return null
      }
    }

    let rowStyle = (arg: any) => {
      let style = Util.copy(chart.option.tableStyle.rowStyle)
      let row = arg.row
      if (row.__children && row.__children.length > 0) {
        style = Util.copy(chart.option.tableGroup.groupRowStyle)
      }
      if (chart.option.tableStyle.rowBackgroundColor) {
        style.backgroundColor = CodeExpression.runCode(
          chart.option.tableStyle.rowBackgroundColor,
          ['row'],
          row
        )
      }
      if (chart.option.tableStyle.rowColor) {
        style.color = CodeExpression.runCode(
          chart.option.tableStyle.rowColor,
          ['row'],
          row
        )
      }
      return style
    }

    let headerCellStyle = (arg: any) => {
      let property = ''
      let col = arg.column
      // 表头分组栏目逻辑处理
      while (!property && col) {
        if (col.property) {
          property = col.property
          break
        }
        if (col.children && col.children.length > 0) {
          col = col.children[0]
        } else {
          col = null
        }
      }
      let column: any = getCol(property)
      if (column) {
        return column.opt.headerCellStyle
      }
    }

    let cellStyle = (arg: any) => {
      let column: any = getCol(arg.column.property)
      if (!column) {
        return
      }
      let style = Util.copy(column.opt.cellStyle)

      if (column.opt.cellBackgroundColor) {
        style.backgroundColor = CodeExpression.runCode(
          column.opt.cellBackgroundColor,
          ['row'],
          arg.row
        )
      }
      if (column.opt.cellColor) {
        style.color = CodeExpression.runCode(
          column.opt.cellColor,
          ['row'],
          arg.row
        )
      }
      return style
    }

    let sortConfig = computed(() => {
      let config: any = {
        multiple: true,
        trigger: 'cell',
        defaultSort: {},
        orders: ['asc', 'desc', null]
      }
      for (let col of columns.value) {
        if (col.opt && col.opt.defaultSort && col.field) {
          config.defaultSort[col.field] = col.opt.defaultSort
        }
      }
      return config
    })

    // 通用行合并函数（将相同多列数据合并为一行）
    const mergeRowMethod = (arg: any) => {
      let {row, _rowIndex, column, visibleData} = arg
      let col: any = getCol(column.property)
      if (!col || !col.opt.mergeColumn) {
        return
      }
      const cellValue = row[column.property]
      if (cellValue) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return {rowspan: 0, colspan: 0}
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return {rowspan: countRowspan, colspan: 1}
          }
        }
      }
    }

    let getColMergeValue = (col: any, data: Array<any>) => {
      if (col.opt && col.opt.summary != 'none' && col.fieldIndex >= 0) {
        let mergeType = DataMergeType.none
        let field: IFieldInfo | null = props.data!.getFieldByDatasetIndex(
          col.fieldIndex
        )
        if (col.opt.summary == 'auto') {
          if (field) {
            mergeType = field.mergeType
          }
          if (mergeType == DataMergeType.count) {
            mergeType = DataMergeType.sum
          }
        } else {
          mergeType = col.opt.summary as DataMergeType
        }

        if (mergeType == DataMergeType.none) {
          return null
        } else {
          let v = props.data!.getMergeValue(
            data,
            col.field,
            mergeType,
            field ? field.mergeCode : null
          )
          return v
        }
      } else {
        return null
      }
    }

    let footerData: ComputedRef<Array<any>> = computed(() => {
      let totals = []
      for (let col of gridColumns.value) {
        totals.push(getColMergeValue(col, rowData.value))
      }

      if (totals.length > 0 && totals[0] == null) {
        totals[0] = chart.option.tableStyle.footerText
      }
      return [totals]
    })

    let footerMethod = (arg: any) => {
      let {columns, data} = arg
      return footerData.value
    }

    let loading = ref(false)
    let reload = () => {
      loading.value = true
      nextTick(() => {
        loading.value = false
      })
    }
    // 监听属性变化，刷新表格配置
    watch(
      () => {
        let opts = []
        for (let opt of chart.option.columnStyles) {
          opts.push(opt.showOverflow)
          opts.push(opt.sortable)
          opts.push(opt.width)
          opts.push(opt.filter)
          opts.push(opt.order)
          opts.push(opt.field)
          opts.push(opt.defaultSort)
          opts.push(opt.summary)
          opts.push(opt.fixed)
        }
        opts.push(chart.option.tableStyle.footerText)
        return opts
      },
      () => {
        reload()
      }
    )

    let colFormatter = (cellData: any) => {
      // let cellValue = row[column.field]
      let {columnIndex, row} = cellData
      let col = gridColumns.value[columnIndex]
      if (col && col.field) {
        if (row) {
          let cellValue = row[col.field]
          if (col && col.fieldFormatter) {
            return Formatter.formatHtml(col.fieldFormatter, cellValue)
          }
          return cellValue
        }
      } else if (col && col.type == 'seq') {
        return cellData.seq
      }
    }

    let colFooterFormatter = (cellData: any) => {
      let {columnIndex, items} = cellData
      let col = gridColumns.value[columnIndex]
      if (col && items && items.length > columnIndex) {
        let cellValue = items[columnIndex]
        if (col.fieldFormatter) {
          return Formatter.formatHtml(col.fieldFormatter, cellValue)
        }
        return cellValue
      }
      return ''
    }

    let gridColumns: ComputedRef<Array<IDataTableColumn>> = computed(() => {
      let cols: Array<IDataTableColumn> = []
      for (let col of columns.value) {
        if (col.opt.show) {
          col.filters = getFilters(col)
          cols.push(col)
        }
        col.slots = {
          // 使用插槽模板渲染
          default: 'cellTemplate',
          footer: 'cellFooterTemplate'
        }
      }
      if (groupFields.value && groupFields.value.length > 0) {
        cols[0].treeNode = true
      }
      return cols
    })

    // 表头合并分组
    let groupGridColumns: ComputedRef<Array<IDataTableColumn>> = computed(
      () => {
        let result: Array<IDataTableColumn> = []
        for (let col of gridColumns.value) {
          if (
            col.opt &&
            col.opt.columnGroups &&
            col.opt.columnGroups.length > 0
          ) {
            let parentCol: IDataTableColumn
            let children = result
            for (let groupName of col.opt.columnGroups) {
              if (!groupName) {
                continue
              }
              let has = false
              for (let parent of children) {
                if (parent.title == groupName) {
                  parentCol = parent
                  if (!parentCol.children) {
                    parentCol.children = []
                  }
                  children = parentCol.children
                  has = true
                  break
                }
              }
              if (!has) {
                let newCol: any = {title: groupName, children: [], field: ''}
                children.push(newCol)
                parentCol = newCol
                children = newCol.children
              }
            }
            children.push(col)
          } else {
            result.push(col)
          }
        }
        return result
      }
    )

    let gridOptions = computed(() => {
      let gridOpt = {
        data: tableData.value,
        columns: groupGridColumns.value,
        size: 'mini',
        height: '100%',
        highlightHoverRow: true,
        border: chart.option.tableStyle.border,
        showHeader: chart.option.tableStyle.showHeader,
        stripe: chart.option.tableStyle.stripe,
        resizable: chart.option.tableStyle.resizable,
        autoResize: true,
        headerCellStyle: headerCellStyle,
        rowStyle: rowStyle,
        footerRowStyle: chart.option.tableStyle.footerRowStyle,
        cellStyle: cellStyle,
        sortConfig: sortConfig.value,
        spanMethod: mergeRowMethod,
        exportConfig: {
          type: 'xlsx',
          types: ['xlsx']
        },
        footerMethod: footerMethod,
        showFooter: chart.option.tableStyle.showFooter,
        treeConfig:
          groupFields.value && groupFields.value.length > 0
            ? {children: '__children'}
            : null
      }

      return gridOpt
    })

    let gridEvents: any = {
      cellDblclick(arg: any) {
        let {row} = arg
        let chartData = props.data as ChartData
        let mainFieldName = chartData.getFieldName(chartData.mainField!)
        chartData.drillDown(row[mainFieldName])
      }
    }

    let vxeTable: Ref<any> = ref(null)
    let exportData = () => {
      if (vxeTable.value) {
        vxeTable.value.exportData({})
      }
    }

    return {
      gridOptions,
      gridEvents,
      chart,
      loading,
      colFormatter,
      colFooterFormatter,
      vxeTable,
      exportData
    }
  }
})
</script>

<style lang="less">
.com-data-table {
  width: 100%;
  height: 100%;

  .vxe-table--render-default .vxe-table--body-wrapper,
  .vxe-table--render-default .vxe-table--footer-wrapper {
    background-color: transparent;
  }

  .vxe-table--render-default.border--inner .vxe-table--header-wrapper,
  .vxe-table--render-default.border--none .vxe-table--header-wrapper {
    background-color: transparent;
  }

  .vxe-table--render-default.border--default .vxe-table--header-wrapper,
  .vxe-table--render-default.border--full .vxe-table--header-wrapper,
  .vxe-table--render-default.border--outer .vxe-table--header-wrapper {
    background-color: transparent;
  }
  .vxe-table--render-default {
    color: inherit;
  }
}
</style>
