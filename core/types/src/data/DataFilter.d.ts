import { IRelationshipDefinition } from '../package';
import { CodeExpression } from '../common';
export declare enum DataMergeMethod {
    table = "table",
    row = "row"
}
export declare enum DataMergeType {
    none = "none",
    count = "count",
    distinctCount = "distinctCount",
    sum = "sum",
    min = "min",
    max = "max",
    first = "first",
    last = "last",
    avg = "avg",
    collection = "collection",
    code = "code"
}
export interface IFieldInfo {
    tableId: string;
    columnId: string;
    mergeType: DataMergeType;
    mergeCode?: string;
    displayName?: string;
    formatter?: string;
}
export declare enum FilterExpression {
    none = "",
    and = "&&",
    or = "||",
    leftParentheses = "(",
    rightParentheses = ")",
    eq = "eq",
    contains = "contains",
    in = "in",
    notContains = "notContains",
    startsWith = "startsWith",
    notStartsWith = "notStartsWith",
    notEq = "notEq",
    isNull = "isNull",
    isNotNull = "isNotNull",
    gt = "gt",
    gtOrEq = "gtOrEq",
    lt = "lt",
    ltOrEq = "ltOrEq"
}
export declare enum FilterType {
    basic = "basic",
    advanced = "advanced",
    code = "code",
    role = "role"
}
export interface IFilterCondition {
    expression: FilterExpression;
    value: any;
}
export interface IFilterInfo {
    field: IFieldInfo;
    enabled: boolean;
    filterType: FilterType;
    /**
     * advanced filter mergeExpression and conditions
     */
    mergeExpression: FilterExpression.and | FilterExpression.or;
    conditions: Array<IFilterCondition>;
    /**
     *  basic filter data values
     */
    values: any;
    code: string | Function;
}
export declare class DataFilter {
    filterInfos: Array<IFilterInfo>;
    structure: any;
    data: any;
    relationships: Array<IRelationshipDefinition>;
    constructor(filterInfos: Array<IFilterInfo>, structure: any);
    getCodeExpression(filterInfos: Array<IFilterInfo>): CodeExpression;
    filter(data: any, relationships: Array<IRelationshipDefinition>): any;
    private filterRowWithExpression;
    private getCodeFilterInfos;
    private filterRowWithCode;
    filterRow(row: any): boolean;
    filterRelationships(tableId: string, filteredRelationships: Array<IRelationshipDefinition>): void;
    filterRelationship(filterRelation: IRelationshipDefinition, filteredRelationships: Array<IRelationshipDefinition>): void;
}
