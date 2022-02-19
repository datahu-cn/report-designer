import { IChartDefinition } from '../package';
import { DataContext } from './DataContext';
import { DataMergeType, IFieldInfo } from './DataFilter';
/**
 * 数据合并前置约定条件：
 * 1、数据合并必须以一个主栏目开始、 其他栏目都是值或描述栏目， 按主栏目分组合并
 * 2、当主栏目为多个时，按栏目顺序执行数据下钻， 所以同时生效的主栏目只有一个
 */
export declare class ChartData {
    private dataContext;
    private chart;
    private data;
    fieldMap: any;
    private relationships;
    structure: any;
    private ralationshipCache;
    private relationshipDataCache;
    private mapTableCache;
    fields: Array<IFieldInfo>;
    mainFields: Array<IFieldInfo>;
    mainField: IFieldInfo | null;
    private i18n;
    /**
     * 数据下钻状态： level:数据深度， index: 当前数据所属深度
     */
    drillStatus: {
        level: number;
        index: number;
    };
    private dataset;
    constructor(i18n: any, dataContext: DataContext, chart: IChartDefinition);
    isReady(): boolean;
    private initDatasetInfo;
    /**
     * 获取dataset数据中，数据表头对应的栏目信息
     * @param datasetIndex
     * @returns
     */
    getFieldByDatasetIndex(datasetIndex: number): IFieldInfo | null;
    getDatasetIndexByField(field: IFieldInfo): number | null;
    getFieldByName(fieldName: string): IFieldInfo | undefined;
    /** 获取临时过滤之前的图表数据， 一般用于切片器刷选， 切片器不受自身和其他切片器过滤影响 */
    getRowBeforeTempFilter(field: IFieldInfo): Array<any>;
    getMainRowBeforeTempFilter(): any[];
    getRow(field: IFieldInfo): Array<any>;
    getMainRow(): Array<any>;
    getFieldName(field: IFieldInfo): string;
    setFilter(value: any, compare: Function): void;
    /**
     * 数据下钻
     * @param name
     */
    drillDown(name: any): void;
    /**
     * level: 0 恢复， 1： 下钻一层  -1: 上回一层
     * @param level
     */
    drillDownLevel(level: number): void;
    /**
     * 未指定主栏目时，默认第一个栏目为主栏目
     */
    private initMainField;
    /**
     * 第一组栏目默认为主栏目， 当有多组栏目时，第一组栏目必须为不汇总栏目，其他栏目根据第一组栏目选择的主栏目进行分组汇总， 合并为一个表格
     * 当只有一组栏目时， 第一组栏目可以进行汇总，用于卡片组件中
     * @returns
     */
    private merge;
    getDataset(): {
        data: any[][];
        map: any;
    };
    private getFieldMergeValue;
    getMergeValue(rows: Array<any>, columnName: string, mergeType: DataMergeType, mergeCode?: string | null): any;
    private getFieldRows;
    private filterRelationRows;
    private getGroupByMap;
    private getConnectRelationships;
    /**
     * 获取2个表格间的关联关系路线
     * @param fromTableId
     * @param toTableId
     * @param filteredRelationships
     * @param relationPath
     * @returns
     */
    private innerGetConnectRelationships;
}
