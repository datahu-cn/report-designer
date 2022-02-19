import * as excel from 'exceljs';
import { ITableDefinition } from '@datahu/core';
export declare class ExcelHelper {
    config: any;
    workbook?: excel.Workbook;
    constructor(config: any);
    readBuffer(): Promise<unknown>;
    readFile(): Promise<void>;
    query(type: number, table: ITableDefinition | undefined): Promise<any>;
    private getColumnType;
    private getStart;
    private getFields;
    private getDataBySheetName;
    getTables(): Promise<Array<ITableDefinition>>;
    getData(tables: Array<ITableDefinition>): Promise<Array<object>>;
    end(): void;
}
