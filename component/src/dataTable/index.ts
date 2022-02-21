import {
  IControl,
  ControlType,
  ComponentControl,
  StyleType,
  DataMergeType,
  Util
} from '@datahu/core'
import {
  BaseComponent,
  BaseComponentOption,
  DataOperationComponentOption,
  StyleComponentOption
} from '@datahu/component-base'
import DataTable from './DataTable.vue'

class TableStyleComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示序号列'
  })
  showSeqence: boolean = false

  @ComponentControl({
    type: ControlType.select,
    title: '显示边框',
    options: [
      {label: '行边框', value: false},
      {label: '全边框', value: true},
      {label: '外边框', value: 'outer'},
      {label: '内边框', value: 'inner'},
      {label: '无边框', value: 'none'}
    ]
  })
  border: string | boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示表头'
  })
  showHeader: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示合并页脚'
  })
  showFooter: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示斑马条纹'
  })
  stripe: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '列宽拖动'
  })
  resizable: boolean = false

  @ComponentControl({
    type: ControlType.style,
    title: '数据行样式',
    options: [StyleType.height, StyleType.color, StyleType.backgroundColor]
  })
  rowStyle: StyleComponentOption = new StyleComponentOption()

  @ComponentControl({
    type: ControlType.text,
    title: '汇总说明',
    description: '只是第一列为非汇总列时显示'
  })
  footerText: string = '合计'
  @ComponentControl({
    type: ControlType.style,
    title: '汇总行样式',
    options: [StyleType.height, StyleType.color, StyleType.backgroundColor]
  })
  footerRowStyle: StyleComponentOption = new StyleComponentOption()

  @ComponentControl({
    type: ControlType.code,
    title: '行条件背景色',
    description: `row['状态'] == '通过' ? 'green' : 'red'`,
    codeDescription: {
      params: [{name: 'row', description: '当前行数据'}],
      return: '颜色字符'
    }
  })
  rowBackgroundColor: string = ''

  @ComponentControl({
    type: ControlType.code,
    title: '行条件文字颜色',
    description: `row['状态'] == '通过' ? 'green' : 'red'`,
    codeDescription: {
      params: [{name: 'row', description: '当前行数据'}],
      return: '颜色字符'
    }
  })
  rowColor: string = ''
}

export class ColumnStyleComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.select,
    title: '适用列',
    multiple: true,
    options: (option: any, chart: any) => {
      let opts = [
        {label: '所有列', value: '__all__'},
        {label: '序号列', value: '__seq__'}
      ]
      if (chart.data && chart.data.dataset.data.length > 0) {
        for (let i = 0; i < chart.data.dataset.data[0].length; i++) {
          opts.push({
            label: chart.data.dataset.data[0][i],
            value: chart.data.dataset.data[0][i]
          })
        }
      }
      return opts
    }
  })
  fields: Array<string> = ['__all__']

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示'
  })
  show: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '列位置序号'
  })
  order: number = 0

  @ComponentControl({
    type: ControlType.text,
    array: true,
    addable: true,
    title: '列分组',
    description:
      '输入分组名称， 相同名称的列将分到同一组，多层分组可添加多个分组名称'
  })
  columnGroups: Array<string> = []

  @ComponentControl({
    type: ControlType.boolean,
    title: '允许排序'
  })
  sortable = false

  @ComponentControl({
    type: ControlType.select,
    title: '默认排序',
    options: [
      {label: '不排序', value: null},
      {label: '正序', value: 'asc'},
      {label: '倒序', value: 'desc'}
    ]
  })
  defaultSort: string | null = null

  @ComponentControl({
    type: ControlType.boolean,
    title: '启用表头刷选'
  })
  filter: boolean = false

  @ComponentControl({
    type: ControlType.styleLength,
    title: '列宽',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  width: string = 'auto'

  @ComponentControl({
    type: ControlType.select,
    title: '单元格类型',
    options: [
      {label: '文本', value: 'text'},
      {label: 'html', value: 'html'}
    ]
  })
  cellType: string = 'text'

  @ComponentControl({
    type: ControlType.select,
    title: '数据汇总',
    options: [
      {label: '不汇总', value: 'none'},
      {label: '自动', value: 'auto'},
      {label: '计数', value: DataMergeType.count},
      {label: '求和', value: DataMergeType.sum}
    ]
  })
  summary: string = 'auto'

  @ComponentControl({
    type: ControlType.boolean,
    title: '自动合并列',
    description: '相邻单元格值相同时自动合并,合并时应设置该列排序'
  })
  mergeColumn: boolean = false

  @ComponentControl({
    type: ControlType.select,
    title: '内容溢出',
    options: [
      {label: '自动换行', value: false},
      {label: '省略号', value: 'ellipsis'},
      {label: '省略号+工具提示', value: 'tooltip'}
    ]
  })
  showOverflow: string = 'tooltip'

  @ComponentControl({
    type: ControlType.select,
    title: '固定列',
    options: [
      {label: '不固定', value: ''},
      {label: '靠左固定', value: 'left'},
      {label: '靠右固定', value: 'right'}
    ]
  })
  fixed: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '表头样式',
    options: [
      StyleType.height,
      StyleType.textAlign,
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.lineHeight,
      StyleType.padding,
      StyleType.backgroundColor
    ]
  })
  headerCellStyle: StyleComponentOption = new StyleComponentOption()

  @ComponentControl({
    type: ControlType.style,
    title: '单元格样式',
    options: [
      StyleType.textAlign,
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.lineHeight,
      StyleType.padding,
      StyleType.backgroundColor
    ]
  })
  cellStyle: StyleComponentOption = new StyleComponentOption()

  @ComponentControl({
    type: ControlType.code,
    title: '单元格条件背景色',
    description: `row['状态'] == '通过' ? 'green' : 'red'`,
    codeDescription: {
      params: [{name: 'row', description: '当前行数据'}],
      return: '颜色字符'
    }
  })
  cellBackgroundColor: string = ''

  @ComponentControl({
    type: ControlType.code,
    title: '单元格条件文字颜色',
    description: `row['状态'] == '通过' ? 'green' : 'red'`,
    codeDescription: {
      params: [{name: 'row', description: '当前行数据'}],
      return: '颜色字符'
    }
  })
  cellColor: string = ''
}

export class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '分组',
    multiple: true
  })
  xaxis = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '值',
    multiple: true
  })
  series = []
}

class TableGroupComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.select,
    title: '行层次结构',
    options: [
      {label: '无层次', value: 'none'},
      {label: '行分组', value: 'rowGroup'},
      // {label: '列分组', value: 'columnGroup'},
      {label: '树形', value: 'tree'}
    ]
  })
  type: string = 'none'

  @ComponentControl({
    type: ControlType.select,
    title: '分组栏',
    multiple: true,
    show(opt: any) {
      return opt.type == 'rowGroup' || opt.type == 'columnGroup'
    },
    options: (option: any, chart: any) => {
      let opts = []
      if (chart.data && chart.data.dataset.data.length > 0) {
        for (let i = 0; i < chart.data.dataset.data[0].length; i++) {
          opts.push({
            label: chart.data.dataset.data[0][i],
            value: chart.data.dataset.data[0][i]
          })
        }
      }
      return opts
    }
  })
  groupField: Array<string> = []

  @ComponentControl({
    type: ControlType.select,
    title: '树形结构父栏目',
    show(opt: any) {
      return opt.type == 'tree'
    },
    options: (option: any, chart: any) => {
      let opts = []
      if (chart.data && chart.data.dataset.data.length > 0) {
        for (let i = 0; i < chart.data.dataset.data[0].length; i++) {
          opts.push({
            label: chart.data.dataset.data[0][i],
            value: chart.data.dataset.data[0][i]
          })
        }
      }
      return opts
    }
  })
  treeParentField: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '树形结构子栏目',
    show(opt: any) {
      return opt.type == 'tree'
    },
    options: (option: any, chart: any) => {
      let opts = []
      if (chart.data && chart.data.dataset.data.length > 0) {
        for (let i = 0; i < chart.data.dataset.data[0].length; i++) {
          opts.push({
            label: chart.data.dataset.data[0][i],
            value: chart.data.dataset.data[0][i]
          })
        }
      }
      return opts
    }
  })
  treeField: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '层次分组行样式',
    options: [StyleType.height, StyleType.color, StyleType.backgroundColor],
    show(opt: any) {
      return opt.type == 'tree' || opt.type == 'rowGroup'
    }
  })
  groupRowStyle: StyleComponentOption = new StyleComponentOption()
}

class TableAnimationComponentOption {
  _enabled: boolean = false
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  direction = 'down'

  @ComponentControl({
    type: ControlType.number,
    title: '播放速度（ms）'
  })
  speed: number = 2000

  @ComponentControl({
    type: ControlType.number,
    title: '播放跳动间隔(px)'
  })
  step: number = 20
}

class DataTableComponentOption extends BaseComponentOption {
  static controls = []
  @ComponentControl({
    type: ControlType.subset,
    title: '栏',
    children: FieldComponentOption.controls
  })
  fields: FieldComponentOption = new FieldComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '数据',
    children: DataOperationComponentOption.controls
  })
  dataOperation: DataOperationComponentOption = new DataOperationComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '表格',
    children: TableStyleComponentOption.controls,
    defaultValue: new TableStyleComponentOption()
  })
  tableStyle: TableStyleComponentOption = new TableStyleComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '列',
    children: ColumnStyleComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: 'show',
    defaultValue: new ColumnStyleComponentOption()
  })
  columnStyles: Array<ColumnStyleComponentOption> = [
    new ColumnStyleComponentOption()
  ]

  @ComponentControl({
    type: ControlType.subset,
    title: '层次结构',
    children: TableGroupComponentOption.controls,
    defaultValue: new TableGroupComponentOption()
  })
  tableGroup: TableGroupComponentOption = new TableGroupComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '动画',
    enableProperty: '_enabled',
    children: TableAnimationComponentOption.controls
  })
  animation: TableAnimationComponentOption = new TableAnimationComponentOption()
}

export class DataTableComponent extends BaseComponent {
  isLayout: boolean = false
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" transform="translate(-0.11 39.89) rotate(-89.69)" fill="none" opacity="0.5" style="isolation:isolate"/><g id="表格图标"><path id="路径_25" data-name="路径 25" d="M7.13,9.37,7,30.49a1.23,1.23,0,0,0,1.22,1.23l23.42.12a1.21,1.21,0,0,0,1.22-1.21h0L33,9.51a1.23,1.23,0,0,0-1.22-1.23L8.36,8.16A1.22,1.22,0,0,0,7.13,9.37Zm8.15,20.68L8.64,30l0-5.08,6.64,0Zm0-6.39-6.64,0,0-5,6.64,0Zm0-6.39-6.64,0,0-5,6.64,0ZM23.28,30.1l-6.65,0,0-5.08,6.64,0Zm0-6.39-6.65,0,0-5,6.64,0Zm0-6.39-6.65,0,0-5.05,6.64,0Zm7.94,12.82-6.66,0,0-5.08,6.64,0Zm0-6.39-6.66,0,0-5,6.64,0Zm0-6.39-6.66,0,0-5,6.64,0Z" fill="#7678ed"/></g></svg>`
  constructor(language: string) {
    super(language)
    this.option.body!.style.borderTopWidth = '0px'
    this.option.body!.style.borderRightWidth = '0px'
    this.option.body!.style.borderBottomWidth = '0px'
    this.option.body!.style.borderLeftWidth = '0px'
    this.option.event.customEvents = [
      {label: '单元格单击', value: 'cell_click'},
      {label: '单元格双击', value: 'cell_dblclick'}
    ]
  }
  title: string = '数据表'
  option: DataTableComponentOption = new DataTableComponentOption()
  getComponent() {
    return DataTable
  }
}
