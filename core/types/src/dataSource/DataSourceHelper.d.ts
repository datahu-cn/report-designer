import { ColumnType, ITableDefinition } from '../common';
export declare class DataSourceHelper {
    static getTableDefinitionFromObject(obj: any): ITableDefinition;
    static getTableDefinitionFromArray(arr: any): ITableDefinition;
    static getColumnType(columnValue: any): ColumnType;
}
