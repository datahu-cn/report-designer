import { DataMergeType, IFilterInfo } from '../data';
export interface ITablePosition {
    left: number;
    top: number;
    width: number;
    height: number;
}
export declare enum ColumnType {
    Any = 0,
    String = 1,
    Number = 2,
    Boolean = 3,
    DateTime = 4
}
export declare enum ColumnOrderBy {
    None = "",
    Asc = "asc",
    Desc = "desc"
}
export declare enum TableCacheType {
    /** 永远使用实时数据， 不使用缓存 */
    Realtime = "Realtime",
    /** 禁用缓存，同时表示该表为设计中的数据中转表，在报表发布后没有作用 */
    Disabled = "Disabled",
    /** 使用缓存，同时表示该表数据在发布后数据将不再变化， 数据过滤条件中没有随时间、登录用户角色变化的过滤条件 */
    Enabled = "Enabled"
}
export interface IColumnDefinition {
    id: string;
    name: string;
    description?: string;
    type: ColumnType;
    mergeType: DataMergeType;
    formatter: string;
    alias: string;
    isFormula: boolean;
    formula: string;
    filters: Array<IFilterInfo>;
    orderBy?: ColumnOrderBy;
}
export interface ITableDefinition {
    id: string;
    name: string;
    columns: Array<IColumnDefinition>;
    useSourceCode: boolean;
    sourceCode?: string;
    alias: string;
    connectorId: string;
    rows?: Array<any>;
    position?: ITablePosition;
    isFormula: boolean;
    formula?: string;
    cacheType?: TableCacheType;
}
