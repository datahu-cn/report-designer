import {DataMergeType, IFilterInfo} from '../data'

export interface ITablePosition {
  left: number
  top: number
  width: number
  height: number
}

export enum ColumnType {
  Any = 0,
  String = 1,
  Number = 2,
  Boolean = 3,
  DateTime = 4
}

export enum ColumnOrderBy {
  None = '',
  Asc = 'asc',
  Desc = 'desc'
}

export interface IColumnDefinition {
  id: string
  name: string
  description?: string
  type: ColumnType
  mergeType: DataMergeType
  formatter: string
  alias: string
  isFormula: boolean
  formula: string
  filters: Array<IFilterInfo>
  orderBy?: ColumnOrderBy
}

export interface ITableDefinition {
  id: string
  name: string
  columns: Array<IColumnDefinition>
  useSourceCode: boolean
  sourceCode?: string
  alias: string
  connectorId: string
  rows?: Array<any>
  position?: ITablePosition
  isFormula: boolean
  formula?: string
}
