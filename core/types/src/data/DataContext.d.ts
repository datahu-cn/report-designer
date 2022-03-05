import { IChartDefinition, IPackageDefinition } from '../package';
import { ITableDefinition } from '../common';
import { IFilterInfo, IFieldInfo } from './DataFilter';
export declare enum ChartScopeType {
    global = "global",
    self = "self",
    special = "special"
}
export interface IChartScope {
    type: ChartScopeType;
    chartIds: Array<string>;
}
export interface IChartTemp {
    /**
     * 临时过滤条件
     */
    filters: Array<IFilterInfo>;
    /**
     * 数据下钻层主栏目id
     */
    mainFieldId: string;
    /** 影响范围 默认： global 全局, self: 只影响自身, [] chartId array: 指定影响的报表 */
    scope?: IChartScope;
}
export declare class DataContext {
    /** 表格数据筛选之前的完整数据， 用户刷选条件 */
    private dataBeforeTableFilter;
    /** 表格数据刷新之后的完整数据， 用于图表展示 */
    private data;
    /**全局过滤后， 临时过滤前的数据， 一般用于切片器 */
    private globalFilterBeforeTempData;
    /** 全局过滤 + 切片器临时过滤 后的数据 */
    private globalFilterData;
    private chartFilterData;
    definition: IPackageDefinition;
    private structure;
    private fromCache;
    /**
     * 图表组件运行过程中的临时数据， 包括切片器过滤条件，数据下钻状态等信息
     */
    private chartTempData;
    constructor(data: any, definition: IPackageDefinition);
    init(formCache?: boolean): void;
    resetData(): void;
    resetTableDatas(tables: Array<ITableDefinition>): void;
    resetFormulaTables(): void;
    getData(): any;
    getDataBeforeTableFilter(): any;
    getChartTempData(chartId: string): IChartTemp | undefined;
    getGlobalFilterBeforeTempData(chart: IChartDefinition): any;
    /**
     * 设置图表的临时数据信息， 主要为过滤条件和下钻字段
     * @param chartId
     * @param filters  null 和 undifined 时表示不更新
     * @param mainFieldId  null 和 undifined 时表示不更新
     */
    setChartTempData(chart: IChartDefinition, filters: Array<IFilterInfo> | null | undefined, mainFieldId: string | null | undefined): void;
    /**
     * 重置所有筛选数据集， 在数据、表格、字段、 关联关系、刷选条件变化时需主动调用刷选数据
     */
    private resetFilterData;
    private getChartFilters;
    /** 只刷新指定图表的筛选数据集 */
    private resetChartFilterData;
    private getDataAfterFilter;
    private formatData;
    private formatFormulaTableRows;
    private convertValueType2;
    private convertValueType;
    private formatTableData;
    /**
     * 重置所有表格的排序
     * @param table
     */
    private orderByTableData;
    private filterTableData;
    getChartData(chart: IChartDefinition): any;
    getTableData(table: ITableDefinition): Array<any>;
    getTableDataBeforeTableFilter(table: ITableDefinition): Array<any>;
    setTableData(table: ITableDefinition): void;
    addTable(table: ITableDefinition): void;
    removeTable(table: ITableDefinition): void;
    renameTable(table: ITableDefinition, alias: string): void;
    editTableFormula(table: ITableDefinition): void;
    addColumn(table: ITableDefinition): void;
    editColumn(table: ITableDefinition): void;
    renameColumn(table: ITableDefinition): void;
    editColumnType(table: ITableDefinition): void;
    editColumnFilter(table: ITableDefinition): void;
    editColumnOrderBy(table: ITableDefinition): void;
    editColumnFormula(table: ITableDefinition): void;
    removeColumn(table: ITableDefinition): void;
    addChart(chart: IChartDefinition): void;
    removeChart(chart: IChartDefinition): void;
    updateRelations(): void;
    updateRole(): void;
    updateFields(chart: IChartDefinition): void;
    updateFilter(chart: IChartDefinition): void;
    updateGlobalFilter(): void;
    private formatDataStructure;
    getDataStructure(): any;
    getStrctureNames(field: IFieldInfo): any[];
}
